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

// const feed = [
//   {
//       type: 'tag',
//       name: 'item',
//       attribs: {},
//       children: [
//           {
//           type: 'tag',
//           name: 'title',
//           attribs: {},
//           children: [
//             {
//               children:[
//                 { 
//                   data: 'Com quase 400 cv, novo BMW M340i é um dos Série 3 mais potentes já produzidos ',
//                   type: 'text' 
//                 } 
//               ]
//             }
//           ],
//           },
//           {
//               type: 'tag',
//               name: 'link',
//               attribs: {},
//               children: [
//                   { 
//                       data:'https://revistaautoesporte.globo.com/Noticias/noticia/2018/11/com-quase-400-cv-novo-bmw-m340i-e-um-dos-serie-3-mais-potentes-ja-produzidos.html',
//                       type: 'text',
//                   } 
//               ],
//           },
//           {
//               type: 'text',
//               name: '',
//               attribs: {},
//               children: [],
//           },
//           {
//               type: 'tag',
//               name: 'description',
//               attribs: {},
//               children: [
//                 {
//                   children:
//                   [{ 
//                     data:'<div class="foto componente_materia midia-largura-620"> <img alt="BMW M340i (Foto: Divulgação/BMW)" height="413" id="303654" src="https://s2.glbimg.com/alMLJ81HL53OQ8EpuMr87JTQ1nA=/620x413/e.glbimg.com/og/ed/f/original/2018/11/16/bmw_m340i_2.jpg" title="BMW M340i (Foto: Divulgação/BMW)" width="620" /><label class="foto-legenda">BMW M340i (Foto: Divulga&ccedil;&atilde;o/BMW)</label></div> <p> &nbsp;</p> <p> A <strong>BMW</strong> vai aproveitar o <strong>Sal&atilde;o do Autom&oacute;vel de Los Angeles</strong>, nos Estados Unidos, para exibir uma nova vers&atilde;o do novo S&eacute;rie 3: o <strong>M340i</strong>. Equipado com um <strong>motor 3.0 de seis cilindros em linha&nbsp;</strong>que entrega at&eacute; <strong>382 cv</strong>, o modelo &eacute; o mais potente S&eacute;rie 3 produzido at&eacute; agora, sem considerar o <a href="https://revistaautoesporte.globo.com/Noticias/noticia/2018/10/bmw-serie-3-o-que-muda-na-nova-geracao-do-seda.html">atual M3</a>, que oferece 425 cv de pot&ecirc;ncia.</p> <div class="saibamais componente_materia expandido"> <strong>saiba mais</strong> <ul> <li> <a href="https://revistaautoesporte.globo.com/Videos/noticia/2018/11/video-audi-q8-bmw-serie-3-e-outros-alemaes-confirmados-para-o-brasil-no-salao-de-sp.html">V&Iacute;DEO: AUDI Q8, BMW S&Eacute;RIE 3 E OUTROS ALEM&Atilde;ES CONFIRMADOS PARA O BRASIL NO SAL&Atilde;O DE SP</a></li> <li> <a href="https://revistaautoesporte.globo.com/testes/noticia/2018/01/sera-que-o-bmw-x3-m40i-honra-tradicao-esportiva-da-marca.html">TESTE: SER&Aacute; QUE O BMW X3 M40I HONRA A TRADI&Ccedil;&Atilde;O ESPORTIVA DA MARCA?</a></li> </ul> </div> <p> &nbsp;</p> <p> O carro tem<strong> torque de 51 kgfm</strong> e &eacute; capaz de acelerar de <strong>0 a 100 km/h em 4,4 segundos</strong>. A <strong>velocidade m&aacute;xima atingida &eacute; de 250 km/h</strong>, limitada automaticamente. A vers&atilde;o tamb&eacute;m vem com <strong>c&acirc;mbio autom&aacute;tico de oito velocidades</strong> - a montadora j&aacute; adiantou que n&atilde;o ser&aacute; oferecida vers&atilde;o com transmiss&atilde;o manual desta vez.</p> <p> Al&eacute;m disso, o modelo conta com tra&ccedil;&atilde;o traseira e integral (na op&ccedil;&atilde;o xDrive), suspens&atilde;o esportiva M Sport e discos de freios dianteiros de 348 mm e traseiros de 345 mm.</p> <div class="foto componente_materia midia-largura-620"> <img alt="BMW M340i (Foto: Divulgação/BMW)" height="413" id="303655" src="https://s2.glbimg.com/Ob5p4EOrXc4xSPJfnlhjn1mlyzA=/620x413/e.glbimg.com/og/ed/f/original/2018/11/16/bmw_m340i.jpg" title="BMW M340i (Foto: Divulgação/BMW)" width="620" /><label class="foto-legenda">BMW M340i (Foto: Divulga&ccedil;&atilde;o/BMW)</label></div> <p> &nbsp;</p> <p> Com o &iacute;nicio das vendas na Europa programadas para o segundo semestre de 2019,<strong> o M340i ainda n&atilde;o tem previs&atilde;o de chegada ao Brasil</strong>. Por outro lado, <a href="https://revistaautoesporte.globo.com/Noticias/noticia/2018/10/bmw-vai-lancar-serie-3-serie-8-e-z4-no-brasil-em-2019.html">o novo S&eacute;rie 3 3, que foi apresentado&nbsp; no Sal&atilde;o de Paris</a>, chega &agrave;s concession&aacute;rias brasileiras no ano que vem - e <a href="https://revistaautoesporte.globo.com/Noticias/noticia/2018/11/u.html">a produ&ccedil;&atilde;o ser&aacute; nacional</a>.</p> ',
//                     type: 'text' 
//                   }],
//                 }
//               ],
//             },

//       ]
//   }
// ]


// creating a promise to work on the result of URL requested
request(options)
  .then($ => $('item'))
  .then((item) => {
    // console.log(feed[0].children[3].children[0].children[0]);
    
    // runningEachItemAndCatchInfo(item);
// console.log(feed.length);


    // console.log(feed);
    // console.log('TROCA');
    // console.log(item);
    
        
  })
  .catch((error) => {
    console.log(error);
  });

      /* main function to run through all the <items> and return de Json ready with all the infos catched
      from the site*/
    runningEachItemAndCatchInfo = (itemArray) => {
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
        // console.log('0', description);
        
        
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

      // console.log('1', description);
      
      // storing the return of the function getTextAndDivs
      const response = getTextAndDivs(jsonInfo, description);
      // now pushing this result into feed[]
      scrapped.feed.push(response);
      }
      // console.log(JSON.stringify(scrapped, null, 2));
      return scrapped;
      
    }

    // function to return the json with the object "description" filled 
    getTextAndDivs = (jsonInfo, description) => {
      // console.log('2', description);
      // console.log(description.length);
      
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