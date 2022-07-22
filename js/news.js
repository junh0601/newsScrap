const htmlDate = document.getElementById("date")
const htmlTime = document.getElementById("time")
const main = document.getElementById("innerMain")

const city = document.getElementById("city");
const weather = document.getElementById("weather");

const API_KEY = "d2aab5f5c4c9fe0fce6481b412cea172";


//weather
function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      city.innerText = data.name;
      weather.innerText = data.weather[0].main + " / " + data.main.temp
    });
}
function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

// date 
const now = new Date();

const TextDate = `${now.getFullYear()}년 ${now.getMonth()}월 ${now.getDate()}일`

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
            entireHtml="<center><h3>기사가 없습니다.</h3></center>"
        }else{
            data.forEach( (i) => {
                let html = `
                    <ul><center>
                        <li><img class="news_img" src=${i.img}></li></center>
                        <li><a href=${i.url} target="_blank">
                            <h3 class="news_title">${i.title}</h3>
                        </a></li>
                        <li><small>${i.date}</small></li>
                    <li>
                `;

                i.article.forEach((x)=>{
                    const texts = `
                        <p>${quoutify(x)}</p>
                    `
                    html += texts
                });
                html += "</li></ul><hr>"
                entireHtml += html;
            });


        }
        main.innerHTML = entireHtml;

  });

