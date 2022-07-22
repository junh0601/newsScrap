const main = document.getElementById("innerMain")

let entireHtml =""


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
                        <p>${x}</p>
                    `
                    html += texts
                });
                html += "</li></ul><hr>"
                entireHtml += html;
            });


        }
        main.innerHTML = entireHtml;

  });


