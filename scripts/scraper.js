const fs = require('fs');
const chalk = require('chalk');
const writeFileSyncRecursive = require('./utils/write-file');
const config = require('../config.json');

// don't query too fast or coralcube will block
const DELAY_MS = 400;
const SCRAPE_SIZE = 15000;
const PAGE_SIZE = 50;
const TRAITS = config.traits;

const query = offset => fetch(
  `https://api.coralcube.io/v1/getItems?offset=${offset * PAGE_SIZE}&page_size=${PAGE_SIZE}&ranking=price_asc&symbol=y00ts`,
  {
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      pragma: 'no-cache',
      'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': "'Linux'",
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'sec-gpc': '1',
    },
    referrer: 'https://coralcube.io/',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: `{"traits":${JSON.stringify(TRAITS)}}`,
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
  },
);

const sortIds = ids => {
  ids.sort((a, b) => {
    const aInt = parseInt(a.name.replace(/[^\d]*/g, ''));
    const bInt = parseInt(b.name.replace(/[^\d]*/g, ''));

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
      json.items.forEach(({ image, mint, name }) => ids.push({ image, mint, name }));

      if (offset < SCRAPE_SIZE / PAGE_SIZE && json.items.length > 0) {
        setTimeout(() => infiniteQuery(ids, offset + 1, 0), DELAY_MS);
      } else {
        sortIds(ids);
        writeJson('./src/assets/json/members.json', ids);
      }
    })
    .catch((error) => {
      if (retry > 3) {
        console.log(chalk.red(`❌ Failed scraping: ${error}`));
      } else {
        setTimeout(() => infiniteQuery(ids, offset, retry + 1), DELAY_MS);
      }
    });
};

console.log(chalk.blue('🚀 Starting scraper'));
infiniteQuery();
