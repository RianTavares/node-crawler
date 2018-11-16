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

// creating a promise to work on the result of URL requested
request(options)
  .then($ => $('item'))
  .then((item) => {
    // going through all the items one by one
    for (let i = 0, end = item.length; i < end; i += 1) {
      // creating a variable to receive all the content of the <description></description> as a HTML
      const description = cheerio.parseHTML(item[i].children[3].children[0].children[0].data);
      // referencing a new object that will be pushed into feed[]
      const text = {
        title: '',
        link: '',
        description: [],
      };
      // walking through all the tags into <description></description> one by one
      for (let desc = 1, endDesc = description.length; desc < endDesc; desc += 1) {
        // validating if the current tag is <p></p>
        if (description[desc].name === 'p') {
          /* calling the merge function to return the text content to populate
          description when <p></p> */
          const content = mergeText(description[desc].children);
          // just validating if the <p></p> isn't empty
          if (content !== '') {
            // pushing the into description
            text.description.push({
              type: 'text',
              content,
            });
          }
          // validating if the current tag is <div></div>
        } else if (description[desc].name === 'div') {
          // walking through all the children of the <div></div>
          for (let j = 0, endj = description[desc].children.length; j < endj; j += 1) {
             // validating if the current tag is <img/>
            if (description[desc].children[j].name && description[desc].children[j].name === 'img') {
              // pushing <img/> info into description
              text.description.push({
                type: 'image',
                content: description[desc].children[j].attribs.src,
              });
              // validating if the current tag is <ul></ul>
            } else if (description[desc].children[j].name && description[desc].children[j].name === 'ul') {
              // creating a array to receive the links
              links = [];
              // walking through all the of the <ul></ul>
              for (let li = 0, endli = description[desc].children[j].children.length;
                li < endli; li += 1) {
                // validating if the current tag is <li></li>
                if (description[desc].children[j].children[li].name === 'li') {
                  // pushing into the array the link inside the current <li><li>
                  links.push(description[desc].children[j].children[li].children[1].attribs.href);
                }
              }
              // pushing into description de links block
              text.description.push({
                type: 'links',
                content: links,
              });
            }
          }
        }
      }
      // pushing into feed all the infos catched
      scrapped.feed.push(text);
    }
    console.log(JSON.stringify(scrapped, null, 2));
  })
  .catch((error) => {
    console.log(error);
  });
/* function to merge the text of a <p> with the texts of his children
 like a tag <strong>, <a>, etc. */
mergeText = (textArray) => {
  let aux = '';
  for (let i = 0, end = textArray.length; i < end; i += 1) {
    if (textArray[i].data && textArray[i].data.trim() !== '') {
      aux += textArray[i].data;
    } else if (textArray[i].children && textArray[i].children.length > 0) {
      aux += mergeText(textArray[i].children);
    }
  }
  return aux;
};
