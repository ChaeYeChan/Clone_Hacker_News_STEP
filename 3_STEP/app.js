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


const newsFeed = getData(NEWS_URL);
const ul = document.createElement('ul');    // ul 태그 만들기

window.addEventListener('hashchange', function() {
  const id = location.hash.substring(1)

  const newsContent = getData(CONTENT_URL.replace('@id', id));
  const title = document.createElement('h1');

  title.innerHTML = newsContent.title;

  content.appendChild(title);

});

for(let i = 0; i < 10; i++){    // 게시물 10개 가져오기
  const div = document.createElement('div');
  // DOM API를 최소화 사용, 문자열을 이용해서 마크업 구조 사용
  div.innerHTML = `   
    <li>
      <a href="#${newsFeed[i].id}">
        ${newsFeed[i].title} (${newsFeed[i].comments_count})
      </a>
    </li>
  `;

  ul.appendChild(div.firstElementChild);   // ul에 li 추가
}

container.appendChild(ul);
container.appendChild(content);

