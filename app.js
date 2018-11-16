const request = require('request-promise-native');
const cheerio = require('cheerio');


const options = {
  uri: 'https://revistaautoesporte.globo.com/rss/ultimas/feed.xml?fbclid=IwAR1FCoTiAaXy3k-0pR-AUi5X5mrlVjRWFxkn5oDPfo3F6utkwSwtDiqrH1o',
  transform(body) {
    return cheerio.load(body, {
      normalizeWhitespace: true,
      xmlMode: true,
    });
  },
};

// creating a object that will contain all the content from the result of the crawler
const scrapped = {
  feed: [],
};

