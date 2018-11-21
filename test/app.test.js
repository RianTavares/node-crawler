const cheerio = require('cheerio');
const myMethods = require('../src/functions');

// importing functions
const jsonCreator = myMethods.methodJsonCreator;
const getTextAndDivs = myMethods.methodJsonGetTextAndDiv;
const mergeText = myMethods.methodMergeText;

// mocking values into variables to test runningEachItemAndCatchInfo
const feed = [
  {
    type: 'tag',
    name: 'item',
    attribs: {},
    children: [
      {
        type: 'tag',
        name: 'title',
        attribs: {},
        children: [
          {
            children: [
              {
                data:
                  'Com quase 400 cv, novo BMW M340i é um dos Série 3 mais potentes já produzidos ',
                type: 'text',
              },
            ],
          },
        ],
      },
      {
        type: 'tag',
        name: 'link',
        attribs: {},
        children: [
          {
            data:
              'https://revistaautoesporte.globo.com/Noticias/noticia/2018/11/com-quase-400-cv-novo-bmw-m340i-e-um-dos-serie-3-mais-potentes-ja-produzidos.html',
            type: 'text',
          },
        ],
      },
      {
        type: 'text',
        name: '',
        attribs: {},
        children: [],
      },
      {
        type: 'tag',
        name: 'description',
        attribs: {},
        children: [
          {
            children: [
              {
                data:
                  '<div class="foto componente_materia midia-largura-620"> <img alt="BMW M340i (Foto: Divulgação/BMW)" height="413" id="303654" src="https://s2.glbimg.com/alMLJ81HL53OQ8EpuMr87JTQ1nA=/620x413/e.glbimg.com/og/ed/f/original/2018/11/16/bmw_m340i_2.jpg" title="BMW M340i (Foto: Divulgação/BMW)" width="620" /><label class="foto-legenda">BMW M340i (Foto: Divulga&ccedil;&atilde;o/BMW)</label></div> <p> &nbsp;</p> <p> A <strong>BMW</strong> vai aproveitar o <strong>Sal&atilde;o do Autom&oacute;vel de Los Angeles</strong>, nos Estados Unidos, para exibir uma nova vers&atilde;o do novo S&eacute;rie 3: o <strong>M340i</strong>. Equipado com um <strong>motor 3.0 de seis cilindros em linha </strong>que entrega at&eacute; <strong>382 cv</strong>, o modelo &eacute; o mais potente S&eacute;rie 3 produzido at&eacute; agora, sem considerar o <a href="https://revistaautoesporte.globo.com/Noticias/noticia/2018/10/bmw-serie-3-o-que-muda-na-nova-geracao-do-seda.html">atual M3</a>, que oferece 425 cv de pot&ecirc;ncia.</p> <div class="saibamais componente_materia expandido"> <strong>saiba mais</strong> <ul> <li> <a href="https://revistaautoesporte.globo.com/Videos/noticia/2018/11/video-audi-q8-bmw-serie-3-e-outros-alemaes-confirmados-para-o-brasil-no-salao-de-sp.html">V&Iacute;DEO: AUDI Q8, BMW S&Eacute;RIE 3 E OUTROS ALEM&Atilde;ES CONFIRMADOS PARA O BRASIL NO SAL&Atilde;O DE SP</a></li> <li> <a href="https://revistaautoesporte.globo.com/testes/noticia/2018/01/sera-que-o-bmw-x3-m40i-honra-tradicao-esportiva-da-marca.html">TESTE: SER&Aacute; QUE O BMW X3 M40I HONRA A TRADI&Ccedil;&Atilde;O ESPORTIVA DA MARCA?</a></li> </ul> </div> <p> &nbsp;</p> <p> O carro tem<strong> torque de 51 kgfm</strong> e &eacute; capaz de acelerar de <strong>0 a 100 km/h em 4,4 segundos</strong>. A <strong>velocidade m&aacute;xima atingida &eacute; de 250 km/h</strong>, limitada automaticamente. A vers&atilde;o tamb&eacute;m vem com <strong>c&acirc;mbio autom&aacute;tico de oito velocidades</strong> - a montadora j&aacute; adiantou que n&atilde;o ser&aacute; oferecida vers&atilde;o com transmiss&atilde;o manual desta vez.</p> <p> Al&eacute;m disso, o modelo conta com tra&ccedil;&atilde;o traseira e integral (na op&ccedil;&atilde;o xDrive), suspens&atilde;o esportiva M Sport e discos de freios dianteiros de 348 mm e traseiros de 345 mm.</p> <div class="foto componente_materia midia-largura-620"> <img alt="BMW M340i (Foto: Divulgação/BMW)" height="413" id="303655" src="https://s2.glbimg.com/Ob5p4EOrXc4xSPJfnlhjn1mlyzA=/620x413/e.glbimg.com/og/ed/f/original/2018/11/16/bmw_m340i.jpg" title="BMW M340i (Foto: Divulgação/BMW)" width="620" /><label class="foto-legenda">BMW M340i (Foto: Divulga&ccedil;&atilde;o/BMW)</label></div> <p> &nbsp;</p> <p> Com o &iacute;nicio das vendas na Europa programadas para o segundo semestre de 2019,<strong> o M340i ainda n&atilde;o tem previs&atilde;o de chegada ao Brasil</strong>. Por outro lado, <a href="https://revistaautoesporte.globo.com/Noticias/noticia/2018/10/bmw-vai-lancar-serie-3-serie-8-e-z4-no-brasil-em-2019.html">o novo S&eacute;rie 3 3, que foi apresentado  no Sal&atilde;o de Paris</a>, chega &agrave;s concession&aacute;rias brasileiras no ano que vem - e <a href="https://revistaautoesporte.globo.com/Noticias/noticia/2018/11/u.html">a produ&ccedil;&atilde;o ser&aacute; nacional</a>.</p> ',
                type: 'text',
              },
            ],
          },
        ],
      },
    ],
  },
];
const responseFeed = {
  feed: [
    {
      description: [
        {
          content:
            'https://s2.glbimg.com/alMLJ81HL53OQ8EpuMr87JTQ1nA=/620x413/e.glbimg.com/og/ed/f/original/2018/11/16/bmw_m340i_2.jpg',
          type: 'image',
        },
        {
          content:
            ' A BMW vai aproveitar o Salão do Automóvel de Los Angeles, nos Estados Unidos, para exibir uma nova versão do novo Série 3: o M340i. Equipado com um motor 3.0 de seis cilindros em linha que entrega até 382 cv, o modelo é o mais potente Série 3 produzido até agora, sem considerar o atual M3, que oferece 425 cv de potência.',
          type: 'text',
        },
        {
          content: [
            'https://revistaautoesporte.globo.com/Videos/noticia/2018/11/video-audi-q8-bmw-serie-3-e-outros-alemaes-confirmados-para-o-brasil-no-salao-de-sp.html',
            'https://revistaautoesporte.globo.com/testes/noticia/2018/01/sera-que-o-bmw-x3-m40i-honra-tradicao-esportiva-da-marca.html',
          ],
          type: 'links',
        },
        {
          content:
            ' O carro tem torque de 51 kgfm e é capaz de acelerar de 0 a 100 km/h em 4,4 segundos. A velocidade máxima atingida é de 250 km/h, limitada automaticamente. A versão também vem com câmbio automático de oito velocidades - a montadora já adiantou que não será oferecida versão com transmissão manual desta vez.',
          type: 'text',
        },
        {
          content:
            ' Além disso, o modelo conta com tração traseira e integral (na opção xDrive), suspensão esportiva M Sport e discos de freios dianteiros de 348 mm e traseiros de 345 mm.',
          type: 'text',
        },
        {
          content:
            'https://s2.glbimg.com/Ob5p4EOrXc4xSPJfnlhjn1mlyzA=/620x413/e.glbimg.com/og/ed/f/original/2018/11/16/bmw_m340i.jpg',
          type: 'image',
        },
        {
          content:
            ' Com o ínicio das vendas na Europa programadas para o segundo semestre de 2019, o M340i ainda não tem previsão de chegada ao Brasil. Por outro lado, o novo Série 3 3, que foi apresentado  no Salão de Paris, chega às concessionárias brasileiras no ano que vem - e a produção será nacional.',
          type: 'text',
        },
      ],
      link:
        'https://revistaautoesporte.globo.com/Noticias/noticia/2018/11/com-quase-400-cv-novo-bmw-m340i-e-um-dos-serie-3-mais-potentes-ja-produzidos.html',
      title:
        'Com quase 400 cv, novo BMW M340i é um dos Série 3 mais potentes já produzidos ',
    },
  ],
};
const string = '';
const responseFeedError = 'The parameter passed is in a wrong format. \nIt was passed an string when an object was expected \nTry again!';

// mocking values into variables to test getTextAndDivs
const data = '<div class="foto componente_materia midia-largura-620"> <img alt="BMW M340i (Foto: Divulgação/BMW)" height="413" id="303654" src="https://s2.glbimg.com/alMLJ81HL53OQ8EpuMr87JTQ1nA=/620x413/e.glbimg.com/og/ed/f/original/2018/11/16/bmw_m340i_2.jpg" title="BMW M340i (Foto: Divulgação/BMW)" width="620" /><label class="foto-legenda">BMW M340i (Foto: Divulga&ccedil;&atilde;o/BMW)</label></div> <p> &nbsp;</p> <p> A <strong>BMW</strong> vai aproveitar o <strong>Sal&atilde;o do Autom&oacute;vel de Los Angeles</strong>, nos Estados Unidos, para exibir uma nova vers&atilde;o do novo S&eacute;rie 3: o <strong>M340i</strong>. Equipado com um <strong>motor 3.0 de seis cilindros em linha </strong>que entrega at&eacute; <strong>382 cv</strong>, o modelo &eacute; o mais potente S&eacute;rie 3 produzido at&eacute; agora, sem considerar o <a href="https://revistaautoesporte.globo.com/Noticias/noticia/2018/10/bmw-serie-3-o-que-muda-na-nova-geracao-do-seda.html">atual M3</a>, que oferece 425 cv de pot&ecirc;ncia.</p> <div class="saibamais componente_materia expandido"> <strong>saiba mais</strong> <ul> <li> <a href="https://revistaautoesporte.globo.com/Videos/noticia/2018/11/video-audi-q8-bmw-serie-3-e-outros-alemaes-confirmados-para-o-brasil-no-salao-de-sp.html">V&Iacute;DEO: AUDI Q8, BMW S&Eacute;RIE 3 E OUTROS ALEM&Atilde;ES CONFIRMADOS PARA O BRASIL NO SAL&Atilde;O DE SP</a></li> <li> <a href="https://revistaautoesporte.globo.com/testes/noticia/2018/01/sera-que-o-bmw-x3-m40i-honra-tradicao-esportiva-da-marca.html">TESTE: SER&Aacute; QUE O BMW X3 M40I HONRA A TRADI&Ccedil;&Atilde;O ESPORTIVA DA MARCA?</a></li> </ul> </div> <p> &nbsp;</p> <p> O carro tem<strong> torque de 51 kgfm</strong> e &eacute; capaz de acelerar de <strong>0 a 100 km/h em 4,4 segundos</strong>. A <strong>velocidade m&aacute;xima atingida &eacute; de 250 km/h</strong>, limitada automaticamente. A vers&atilde;o tamb&eacute;m vem com <strong>c&acirc;mbio autom&aacute;tico de oito velocidades</strong> - a montadora j&aacute; adiantou que n&atilde;o ser&aacute; oferecida vers&atilde;o com transmiss&atilde;o manual desta vez.</p> <p> Al&eacute;m disso, o modelo conta com tra&ccedil;&atilde;o traseira e integral (na op&ccedil;&atilde;o xDrive), suspens&atilde;o esportiva M Sport e discos de freios dianteiros de 348 mm e traseiros de 345 mm.</p> <div class="foto componente_materia midia-largura-620"> <img alt="BMW M340i (Foto: Divulgação/BMW)" height="413" id="303655" src="https://s2.glbimg.com/Ob5p4EOrXc4xSPJfnlhjn1mlyzA=/620x413/e.glbimg.com/og/ed/f/original/2018/11/16/bmw_m340i.jpg" title="BMW M340i (Foto: Divulgação/BMW)" width="620" /><label class="foto-legenda">BMW M340i (Foto: Divulga&ccedil;&atilde;o/BMW)</label></div> <p> &nbsp;</p> <p> Com o &iacute;nicio das vendas na Europa programadas para o segundo semestre de 2019,<strong> o M340i ainda n&atilde;o tem previs&atilde;o de chegada ao Brasil</strong>. Por outro lado, <a href="https://revistaautoesporte.globo.com/Noticias/noticia/2018/10/bmw-vai-lancar-serie-3-serie-8-e-z4-no-brasil-em-2019.html">o novo S&eacute;rie 3 3, que foi apresentado  no Sal&atilde;o de Paris</a>, chega &agrave;s concession&aacute;rias brasileiras no ano que vem - e <a href="https://revistaautoesporte.globo.com/Noticias/noticia/2018/11/u.html">a produ&ccedil;&atilde;o ser&aacute; nacional</a>.</p> ';
const description = cheerio.parseHTML(data);
const jsonInfo = {
  title: 'teste getTextAndDivs',
  link: 'http://teste.com',
  description: [],
};
const responseJsonInfo = {
  description: [
    {
      content:
        'https://s2.glbimg.com/alMLJ81HL53OQ8EpuMr87JTQ1nA=/620x413/e.glbimg.com/og/ed/f/original/2018/11/16/bmw_m340i_2.jpg',
      type: 'image',
    },
    {
      content:
        ' A BMW vai aproveitar o Salão do Automóvel de Los Angeles, nos Estados Unidos, para exibir uma nova versão do novo Série 3: o M340i. Equipado com um motor 3.0 de seis cilindros em linha que entrega até 382 cv, o modelo é o mais potente Série 3 produzido até agora, sem considerar o atual M3, que oferece 425 cv de potência.',
      type: 'text',
    },
    {
      content: [
        'https://revistaautoesporte.globo.com/Videos/noticia/2018/11/video-audi-q8-bmw-serie-3-e-outros-alemaes-confirmados-para-o-brasil-no-salao-de-sp.html',
        'https://revistaautoesporte.globo.com/testes/noticia/2018/01/sera-que-o-bmw-x3-m40i-honra-tradicao-esportiva-da-marca.html',
      ],
      type: 'links',
    },
    {
      content:
        ' O carro tem torque de 51 kgfm e é capaz de acelerar de 0 a 100 km/h em 4,4 segundos. A velocidade máxima atingida é de 250 km/h, limitada automaticamente. A versão também vem com câmbio automático de oito velocidades - a montadora já adiantou que não será oferecida versão com transmissão manual desta vez.',
      type: 'text',
    },
    {
      content:
        ' Além disso, o modelo conta com tração traseira e integral (na opção xDrive), suspensão esportiva M Sport e discos de freios dianteiros de 348 mm e traseiros de 345 mm.',
      type: 'text',
    },
    {
      content:
        'https://s2.glbimg.com/Ob5p4EOrXc4xSPJfnlhjn1mlyzA=/620x413/e.glbimg.com/og/ed/f/original/2018/11/16/bmw_m340i.jpg',
      type: 'image',
    },
    {
      content:
        ' Com o ínicio das vendas na Europa programadas para o segundo semestre de 2019, o M340i ainda não tem previsão de chegada ao Brasil. Por outro lado, o novo Série 3 3, que foi apresentado  no Salão de Paris, chega às concessionárias brasileiras no ano que vem - e a produção será nacional.',
      type: 'text',
    },
  ],
  link: 'http://teste.com',
  title: 'teste getTextAndDivs',
};
// mocking values into variables to test mergeText
const textArray = [
  {
    type: 'text',
    data: ' A quinta geração do Honda CR-V',
  },
  {
    type: 'tag',
    name: 'a',
    namespace: 'http://www.w3.org/1999/xhtml',
    attribs: {
      href:
        'https://revistaautoesporte.globo.com/testes/noticia/2018/06/teste-honda-cr-v-touring-15-turbo-cvt.html',
    },
    'x-attribsNamespace': { href: undefined },
    'x-attribsPrefix': { href: undefined },
  },
  {
    type: 'text',
    data:
      ' cresceu, ganhou motor turbo e diversos itens de série, mas não oferece opção de sete lugares e ficou muito mais cara. Agora, o carro vem importado dos Estados Unidos e é vendido em versão única, a topo de linha Touring, por quase R$ 200 mil. Dê o play e descubra se ainda vale a pena levar o SUV para a garagem?',
  },
];
const responseTextArray = ' A quinta geração do Honda CR-V cresceu, ganhou motor turbo e diversos itens de série, mas não oferece opção de sete lugares e ficou muito mais cara. Agora, o carro vem importado dos Estados Unidos e é vendido em versão única, a topo de linha Touring, por quase R$ 200 mil. Dê o play e descubra se ainda vale a pena levar o SUV para a garagem?';

// Tests
/* if passed the rigth format to runningEachItemAndCatchInfo
with content should return the responseFeed */
test('It should return the crawler response in Json format', () => {
  expect(jsonCreator(feed)).toEqual(responseFeed);
});

/* if passed the wrong format to runningEachItemAndCatchInfo with
content should return the responseFeedError */
test('Should return a message saying that a string, which is a wrong format, was passed', () => {
  expect(jsonCreator(string)).toBe(responseFeedError);
});

// if passed the rigth format to getTextAndDivs with content should return the respondeJsonInfo
test('It should return a json of items with their description filled', () => {
  expect(getTextAndDivs(jsonInfo, description)).toEqual(responseJsonInfo);
});

// if passed the rigth format to mergeText with content should return the responseTextArray
test('It should return a string that was merged right', () => {
  expect(mergeText(textArray)).toEqual(responseTextArray);
});
