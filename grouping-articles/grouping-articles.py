# grouping articles

import requests
from bs4 import BeautifulSoup

from local_settings import PATH_TO_FILES, FILE_01


def is_article_from_entrepreneur(article_name):
    if "entrepreneur.com" in article_name:
        return True
    return False


def is_article_from_inc(article_name):
    if "inc.com" in article_name:
        return True
    return False


def process_article_from_entrepreneur(article):
    article = parse_article_from_entrepreneur(article)
    print(article)


def parse_article_from_entrepreneur(article):
    article = {
        'page': None,
        'topic': None,
        'readtime': None,
        'headline': None,
    }
    my_request = requests.get(line)
    soup = BeautifulSoup(my_request.text)
    page = soup.find('meta', {'name': 'original-source'})['content']
    topic = soup.find('a', {'class': 'kicker text-red'}).contents[0]
    readtime = soup.find(
        'time', {'class': 'readtime'}).contents[1].strip()
    headline = soup.find(
        'h1', {'class': 'headline'}).contents[0].strip()
    article['page'] = page
    article['topic'] = topic
    article['readtime'] = readtime
    article['headline'] = headline
    return article


with open(PATH_TO_FILES + FILE_01, 'r') as f1:
    content = f1.readlines()
    for line in content:
        if is_article_from_entrepreneur(line):
            process_article_from_entrepreneur(line)
            break
