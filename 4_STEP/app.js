const container = document.getElementById('root');
const ajax = new XMLHttpRequest();
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

function getData(url) {     // 중복되는 open, send, JSON.parse을 함수로 묶어 중복 최소화
  ajax.open('GET', url, false);
  ajax.send(); // 데이터 가져오기

  return JSON.parse(ajax.response);
}

function newsFeed() {
  const newsFeed = getData(NEWS_URL);
  const newsList = [];

  newsList.push('<ul>');

  for(let i = 0; i < 10; i++){    // 게시물 10개 가져오기
  // DOM API를 최소화 사용, 문자열을 이용해서 마크업 구조 사용
    newsList.push(`   
      <li>
        <a href="#${newsFeed[i].id}">
          ${newsFeed[i].title} (${newsFeed[i].comments_count})
        </a>
      </li>
    `);
}

newsList.push('</ul>');

container.innerHTML = newsList.join('')   // 구분자 없는 join

}

const ul = document.createElement('ul');    // ul 태그 만들기

function newsDetail() {
  const id = location.hash.substring(1)

  const newsContent = getData(CONTENT_URL.replace('@id', id));

  container.innerHTML = `
    <h1>${newsContent.title}</h1>
    <div>
      <a href="#">목록으로</a>
    </div>
  `;
}

function router() {
  const routePath = location.hash;

  if (routePath === '') {   // location.hash 값이 #이면 참으로 반환
    newsFeed();
  } else {
    newsDetail();
  }
}

window.addEventListener('hashchange', router);

router();

