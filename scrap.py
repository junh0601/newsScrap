import requests
from bs4 import BeautifulSoup
import json
import re
import os
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

p = re.compile('([A-Z])\w+')

today_news_url = "https://www.yna.co.kr/theme/headlines-history"

indeed_result = requests.get(today_news_url)

soup = BeautifulSoup(indeed_result.text, "html.parser")

datas = soup.select("section > div > ul > li > div > div.news-con > a")

newslist = []

for i in datas:
    news = {}
    id = p.search(i['href']).group()
    url = "https://www.yna.co.kr/view/" + id

    news["id"] = id
    news["url"] = url
    news["title"] = i.strong.string
    news["date"] = i.parent.find("span", "txt-time").string
    news['img'] = "https:" + i.parent.parent.img["src"]

    # news ai summary
    page_result = requests.get(url)
    page_soup = BeautifulSoup(page_result.text, "html.parser")
    page_datas = page_soup.select(
        "header > div > div.tooltip-type01.tlp-summary01 > div > article > div.scroller > p "
    )
    article = []
    for i in page_datas:
        article.append(i.string)
    news["article"] = article
    newslist.append(news)
print('스크래핑 완료')

with open(os.path.join(BASE_DIR, 'news.json'), 'w+',
          encoding='utf-8') as json_file:
    json.dump(newslist, json_file, ensure_ascii=False, indent='\t')

print("json 저장 완료")
