const ajax = new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
ajax.open('GET', NEWS_URL, false);
ajax.send(); // 데이터 가져오기


const newsFeed = JSON.parse(ajax.response); // response에 데이터 담겨있음.
const ul = document.createElement('ul');    // ul 태그 만들기

for(let i = 0; i < 10; i++){    // 게시물 10개 가져오기
  const li = document.createElement('li');    // li 태그 만들기

  li.innerHTML = newsFeed[i].title;   // li에 newsFeed.title 넣기

  ul.appendChild(li);   // ul에 li 추가
    
}
document.getElementById('root').appendChild(ul);  // id가 root인 곳에 ul 넣기
