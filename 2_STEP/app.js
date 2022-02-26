const container = document.getElementById('root');
const ajax = new XMLHttpRequest();
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

ajax.open('GET', NEWS_URL, false);
ajax.send(); // 데이터 가져오기


const newsFeed = JSON.parse(ajax.response); // response에 데이터 담겨있음.
const ul = document.createElement('ul');    // ul 태그 만들기

window.addEventListener('hashchange', function() {
  const id = location.hash.substring(1)

  ajax.open('GET', CONTENT_URL.replace('@id', id), false);
  ajax.send();

  const newsContent = JSON.parse(ajax.response);
  const title = document.createElement('h1');

  title.innerHTML = newsContent.title;

  content.appendChild(title);

});

for(let i = 0; i < 10; i++){    // 게시물 10개 가져오기
  const li = document.createElement('li');    // li 태그 만들기
  const a = document.createElement('a');

  a.href = `#${newsFeed[i].id}`;
  a.innerHTML = `${newsFeed[i].title} (${newsFeed[i].comments_count})`;   // li에 newsFeed.title 넣기


  li.appendChild(a);
  ul.appendChild(li);   // ul에 li 추가
    
}

container.appendChild(ul);
container.appendChild(content);

