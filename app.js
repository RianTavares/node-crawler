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

request(options)
  .then($ => $('item'))
  .then((item) => {
    for (let i = 0, end = item.length; i < end; i += 1) {
      const description = cheerio.parseHTML(item[i].children[3].children[0].children[0].data);
      const text = {
        title: '',
        link: '',
        description: [],
      };
      for (let desc = 1, endDesc = description.length; desc < endDesc; desc += 1) {
        if (description[desc].name === 'p') {
          const content = mergeText(description[desc].children);
          if (content !== '') {
            text.description.push({
              type: 'text',
              content,
            });
          }
        } else if (description[desc].name === 'div') {
          for (let j = 0, endj = description[desc].children.length; j < endj; j += 1) {
            if (description[desc].children[j].name && description[desc].children[j].name === 'img') {
              text.description.push({
                type: 'image',
                content: description[desc].children[j].attribs.src,
              });
            } else if (description[desc].children[j].name && description[desc].children[j].name === 'ul') {
              links = [];
              for (let li = 0, endli = description[desc].children[j].children.length;
                li < endli; li += 1) {
                if (description[desc].children[j].children[li].name === 'li') {
                  links.push(description[desc].children[j].children[li].children[1].attribs.href);
                }
              }
              text.description.push({
                type: 'links',
                content: links,
              });
            }
          }
        }
      }
      scrapped.feed.push(text);
    }
    console.log(JSON.stringify(scrapped, null, 2));
  })
  .catch((error) => {
    console.log(error);
  });
