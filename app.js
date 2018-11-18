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

const test = '';
// creating a promise to work on the result of URL requested
request(options)
  .then($ => $('item'))
  .then((item) => {
    runningEachItemAndCatchInfo(item);
  })
  .catch((error) => {
    console.log(error);
  });

      /* main function to run through all the <items> and return de Json ready with all the infos catched
      from the site*/
    runningEachItemAndCatchInfo = (itemArray) => {
      if(typeof itemArray === 'object') {
        // creating a object that will contain all the content from the result of the crawler
        const scrapped = {
          feed: [],
        };
        let articleLink = '';
        let articleTitle = '';
        // going through all the items one by one
        for (let i = 0, end = itemArray.length; i < end; i += 1) {
          // creating a variable to receive all the content of the <description></description> as a HTML
          const description = cheerio.parseHTML(itemArray[i].children[3].children[0].children[0].data);
          // going through all the tags into <item></item>
        for (let ti = 0, endti = itemArray[i].children.length; ti < endti; ti+=1) {
          // validating if the current tag is <title></title>
          if (itemArray[i].children[ti].name && itemArray[i].children[ti].name === 'title') {
            // setting the title value to a variable
            articleTitle = itemArray[i].children[ti].children[0].children[0].data;
          }
          // validating if the current tag is <link></link>
          if (itemArray[i].children[ti].name && itemArray[i].children[ti].name === 'link') {
            // setting the link value to a variable
            articleLink = itemArray[i].children[ti].children[0].data;
          }
        }
        /* referencing a new object that will be pushed into feed[] 
          and setting the title and link value */
        const jsonInfo = {
          title: articleTitle,
          link: articleLink,
          description: [],
        };

        // storing the return of the function getTextAndDivs
        const response = getTextAndDivs(jsonInfo, description);
        // now pushing this result into feed[]
        scrapped.feed.push(response);
        }
        // console.log(JSON.stringify(scrapped, null, 2));
        return scrapped;
      } else if(typeof itemArray !== 'object'){
        return 'The parameter passed is in a wrong format. \nIt was passed an ' + typeof itemArray + ' when an object was expected \nTry again!' } 
    }

    // function to return the json with the object "description" filled 
    getTextAndDivs = (jsonInfo, description) => {
      // walking through all the tags into <description></description> one by one
      for (let desc = 0, endDesc = description.length; desc < endDesc; desc += 1) {
        // validating if the current tag is <p></p>
        if (description[desc].name === 'p') {
          /* calling the merge function to return the text content to populate
          description when <p></p> */
          const content = mergeText(description[desc].children);
          // just validating if the <p></p> isn't empty
          if (content !== '') {
            // pushing the into description
            jsonInfo.description.push({
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
              jsonInfo.description.push({
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
              jsonInfo.description.push({
                type: 'links',
                content: links,
              });
            }
          }
        }
      }
      return jsonInfo;
    }

    /* function to merge the text of a <p> with the texts of his children
    like a tag <strong>, <a>, etc. */
    mergeText = (textArray) => {
      // creating a aux variable to iterate a text later
      let aux = '';
      // running through all <p> children
      for (let i = 0, end = textArray.length; i < end; i += 1) {
        // validating if has data and is not empty 
        if (textArray[i].data && textArray[i].data.trim() !== '') {
          // then aux sum his previous value with the new string
          aux += textArray[i].data;
          /* if the <p> has more children and using recursion to sum 
          the string value of all children into aux variable */
        } else if (textArray[i].children && textArray[i].children.length > 0) {
          // aux sum his previous value with the new string
          aux += mergeText(textArray[i].children);
        }
      }
      return aux;
    }

  // Exporting all functions to call them into tests file
  module.exports = {
    methodJsonCreator: runningEachItemAndCatchInfo, 
    methodJsonGetTextAndDiv: getTextAndDivs,
    methodMergeText:mergeText,
}