const main = document.getElementById("innerMain")

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

