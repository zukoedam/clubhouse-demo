const chalk = require('chalk');
const writeFileSyncRecursive = require('./utils/write-file');
const collection = require('../src/assets/json/collection.json');
const { traits } = require('../config.json');

const writeJson = (filename, content) => {
  console.log(chalk.blue(`🤖 Generating ${filename}`));
  writeFileSyncRecursive(filename, JSON.stringify(content, null, 2));
  console.log(chalk.green(`🚀 Generated ${filename}`));
};

const getTrait = (attributes, trait) => (attributes.find(({ trait_type }) => trait_type === trait) || {}).value;

const filterList = () => {
  const members = collection
    .filter(({ attributes }) =>
      attributes.every(({ trait_type, value }) => {
        const validTraits = traits[trait_type];
        return validTraits ? validTraits.includes(value) : true;
      }),
    )
    .map(({ attributes, image, name, mintAddress }) => ({
      name,
      image,
      mintAddress,
      background: getTrait(attributes, 'Background'),
    }));

  writeJson('./src/assets/json/members.json', members);
};

console.log(chalk.blue('🚀 Starting member list'));
filterList();
