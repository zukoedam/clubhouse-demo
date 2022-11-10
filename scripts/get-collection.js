const chalk = require('chalk');
const writeFileSyncRecursive = require('./utils/write-file');

const DELAY_MS = 400;
const SCRAPE_SIZE = 15000;
const PAGE_SIZE = 100;
const MAX_RETRIES = 3;

const query = offset =>
  fetch('https://api.y00ts.com/y00ts/getY00ts', {
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      pragma: 'no-cache',
      'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Linux"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'sec-gpc': '1',
    },
    referrer: 'https://www.y00ts.com/',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: `{"id":null,"pageSize":${PAGE_SIZE},"pageNumber":${offset + 1},"attributeFilters":{},"attributeSorts":{}}`,
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
  });

const sortIds = ids => {
  ids.sort((a, b) => {
    const aInt = a.id || parseInt(a.name.replace(/[^\d]*/g, ''));
    const bInt = b.id || parseInt(b.name.replace(/[^\d]*/g, ''));

    if (isNaN(aInt) || isNaN(bInt)) {
      return 0;
    }
    return aInt - bInt;
  });
};

const writeJson = (filename, content) => {
  console.log(chalk.blue(`🤖 Generating ${filename}`));
  writeFileSyncRecursive(filename, JSON.stringify(content, null, 2));
  console.log(chalk.green(`🚀 Generated ${filename}`));
};

const infiniteQuery = (ids = [], offset = 0, retry = 0) => {
  if (!(offset % 10)) {
    console.log(chalk.white(`.....${offset * PAGE_SIZE}`));
  }

  query(offset)
    .then(resp => resp.json())
    .then(json => {
      json.y00ts.forEach(({ attributes, image, name, id, mintAddress }) => ids.push({ attributes, image, name, id, mintAddress }));

      if (offset < SCRAPE_SIZE / PAGE_SIZE && json.y00ts.length > 0) {
        setTimeout(() => infiniteQuery(ids, offset + 1, 0), DELAY_MS);
      } else {
        sortIds(ids);
        writeJson('./src/assets/json/collection.json', ids);
      }
    })
    .catch(error => {
      if (retry > MAX_RETRIES) {
        console.log(chalk.red(`❌ Failed to fetch: ${error}`));
      } else {
        setTimeout(() => infiniteQuery(ids, offset, retry + 1), DELAY_MS);
      }
    });
};

console.log(chalk.blue('🚀 Fetching collection'));
infiniteQuery();
