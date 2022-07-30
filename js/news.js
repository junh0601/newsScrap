const htmlDate = document.getElementById("date")
const htmlTime = document.getElementById("time")
const main = document.getElementById("innerMain")
const weatherIcon = document.getElementById("weatherIcon");
const weatherTemp = document.getElementById("weather_temp");
const weatherPos = document.getElementById("weather_pos");
const update = document.getElementById("update");

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
      weatherIcon.src=`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherIcon.alt=data.weather[0].main
    });
}
function onGeoError() {
  alert("Can't find you. No weather for you.");
}

await navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

// date 
const now = new Date();
const year = now.getFullYear().toString();
const padmonth = (now.getMonth()+1).toString().padStart(2,"0");
const paddate = now.getDate().toString().padStart(2,"0");
const day = [ "일", "월", "화", "수", "목", "금" ,"토"][now.getDay()]
const TextDate = `${[padmonth]}월 ${paddate}일 (${day})`;

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


await fetch('https://raw.githubusercontent.com/junh0601/newsScrap/master/news.json')
  .then((response) => response.json())
  .then((data) => {
        update.innerText=`마지막 업데이트 ${data[1]}`;
        if(data[0].length===0){
            entireHtml=`<center><h3>기사가 없습니다.</h3></center>`
        }else{
            data[0].forEach( (i) => {
                let html = `
                    <div id=${i.id} class="newscontainer">
                        <button class="readBtn">☑️읽지않음</button>
                        <div class="img_and_detail">
                            <img class="news_img" src=${i.img || "no-image.png"}>
                            <div class="div_detail">
                                <h4 class="news_title">${i.title}</h4>
                                <small>${i.date}</small>
                                <a href=${i.url} target='_blank'>more</a>
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

                html += `
                        </div>
                        <hr>
                        </div>`
                entireHtml += html; 
                
            });
        }
        main.innerHTML = entireHtml;

  });

const gopast = document.getElementById("gopast")
const yesterday = year+padmonth+(now.getDate()-1).toString().padStart(2, 0);
gopast.href = `https://m.yna.co.kr/theme/headlines-history?date=${yesterday}`
gopast.innerText = "어제 뉴스 보러가기🔗"
gopast.target = "_blank"

//local strage
const localId = `${[padmonth]}${paddate}(${day})`
if (!localStorage.getItem(localId)){
    localStorage.clear();
    localStorage.setItem(localId, JSON.stringify([]))
    }
const read = JSON.parse(localStorage.getItem(localId));
read.forEach( i => {
    const alreadyRead = document.getElementById(i);
    alreadyRead.classList.add("alreadyRead");
})

const alreadyReadBtn = document.querySelectorAll(`.alreadyRead > .readBtn`)
alreadyReadBtn.forEach(x => x.innerText = "✅읽음")

const btn = document.querySelectorAll(".readBtn")
btn.forEach(i => {
    i.addEventListener("click", function(event){
        const classObj = this.parentNode.classList
        let innerStorage = JSON.parse(localStorage.getItem(localId));
        if(classObj.contains("alreadyRead")){
            i.innerText = "☑️읽지않음"
            classObj.remove("alreadyRead")
            innerStorage = innerStorage.filter( (x) => x !== this.parentNode.id)
        }else{
            i.innerText = "✅읽음"
            classObj.add("alreadyRead")
            innerStorage.push(this.parentNode.id);
            
        }
        localStorage.setItem(localId, JSON.stringify(innerStorage));
        console.log(JSON.parse(localStorage.getItem(localId)))
    })
})