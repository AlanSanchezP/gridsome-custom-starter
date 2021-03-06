// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(actions => {
    const items = actions.addCollection('Item');

    items.addNode({
      id: 0,
      title : 'Esse inventore, eveniet eligendi',
      thumbnail : '~/assets/img/logo/logo.png',
      description: `Quos reprehenderit ducimus esse cumque veniam adipisci. Labore soluta deleniti repudiandae nisi non fuga autem odio debitis alias hic, dicta dolorem eum doloribus minus! Aut sit illum commodi sint quas.`
    });
    items.addNode({
      id: 1,
      title: 'Doloreq cumque voluptatum',
      thumbnail: '~/assets/img/logo/logo.png',
      description: `Modi ratione magni veniam laudantium architecto excepturi facere pariatur consequuntur voluptatum cupiditate veritatis sequi natus! Quaerat repellendus facilis error placeat blanditiis ea.`
    });
  });

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
