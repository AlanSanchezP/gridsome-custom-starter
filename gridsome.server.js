// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const fs = require('fs');
const yaml = require('js-yaml');

const itemsFileContent = fs.readFileSync('./src/data/items.yml', 'utf8');
const itemsData = yaml.load(itemsFileContent);

module.exports = function (api) {
  api.loadSource(actions => {
    const items = actions.addCollection('Item');

    for (const item of itemsData) {
      items.addNode(item);
    }
  });

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
