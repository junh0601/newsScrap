const htmlDate = document.getElementById("date")
const htmlTime = document.getElementById("time")
const main = document.getElementById("innerMain")
const weatherIcon = document.getElementById("weatherIcon");
const weatherTemp = document.getElementById("weather_temp");
const weatherPos = document.getElementById("weather_pos");

const API_KEY = "d2aab5f5c4c9fe0fce6481b412cea172";


//weather
function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
        weatherTemp.innerText = data.main.temp+"°C"
        weatherPos.innerText =  data.name + "/"+data.sys.country
      weatherIcon.src=`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    });
}
function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

// date 
const now = new Date();
const year = now.getFullYear().toString();
const padmonth = (now.getMonth()+1).toString().padStart(2,"0");
const paddate = now.getDate().toString().padStart(2,"0");
const TextDate = `${year}년 ${[padmonth]}월 ${paddate}일`;

function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    htmlTime.innerText = `${hours}:${minutes}:${seconds}`;
  }
  
  getClock();
  setInterval(getClock, 1000);

htmlDate.innerText = TextDate;


//article

let entireHtml =""


function quoutify (str) {
    
    const splited = str.split("\"")

    if (splited.length>=3){
        splited.splice(1,0,"<span class='quoute'>");
        splited.splice(3,0,"</span>");
        splited.splice(5,0,"<span class='quoute'>");
        splited.splice(7,0,"</span>");
        splited.splice(9,0,"<span class='quoute'>");
        splited.splice(11,0,"</span>");
        return splited.join("")
    }else {
        return str
    }
}


fetch('https://raw.githubusercontent.com/junh0601/newsScrap/master/news.json')
  .then((response) => response.json())
  .then((data) => {
        if(data.length===0){
            entireHtml=`<center><h3>기사가 없습니다.</h3></center>`
        }else{
            data.forEach( (i) => {
                let html = `
                    <div class="img_and_detail">
                        <img class="news_img" src=${i.img}>
                        <div class="div_detail">
                            <h4 class="news_title">${i.title}</h4>
                            <small>${i.date}</small>
                        </div>
                    </div>
                    <div class="div_text">          
                `;

                i.article.forEach((x)=>{
                    const texts = `
                        <p>${quoutify(x)}</p>
                    `
                    html += texts
                });

                html += `<a href=${i.url} target='_blank'>more</a></div><hr>`
                entireHtml += html; 
            });
        }
        main.innerHTML = entireHtml;

  });

const gopast = document.getElementById("gopast")
const yesterday = year+padmonth+(now.getDate()-1).toString().padStart(2, 0);
gopast.href = `https://www.yna.co.kr/theme/headlines-history?date=${yesterday}`
gopast.innerText = "어제 뉴스 보러가기"
gopast.target = "_blank"
