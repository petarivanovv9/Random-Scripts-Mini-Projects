# grouping articles

# imports
import requests
from bs4 import BeautifulSoup
import os

# settings
from local_settings import PATH_TO_FILES, PATH_SAVE_FILES, FILE_FORMAT
from local_settings import FILE_01


def is_article_from_entrepreneur(article_name):
    return 'entrepreneur.com' in article_name


def is_article_from_inc(article_name):
    return 'inc.com' in article_name


def format_string(filename):
    words = filename.lower().split(' ')
    filename = '-'.join(words) + FILE_FORMAT
    return filename


def format_article_to_string(article):
    result = ''
    result += '##' + article['headline']
    result += '\n'
    result += '####[Go to READ]' + '(' + article['page'] + ')'
    result += '   |   ' + article['readtime'] + '   '
    result += '   |   ' + article['topic'] + '   |'
    result += '\n'
    result += '##### '
    result += (40 * '<>')
    return result


def is_article_exist(article_page, filename):
    if os.path.exists(PATH_SAVE_FILES + filename):
        with open(PATH_SAVE_FILES + filename, 'r') as f:
            content = f.readlines()
            for line in content:
                if article_page in line:
                    return True
    return False


def process_article_from_entrepreneur(article):
    article = parse_article_from_entrepreneur(article)
    filename = format_string(article['topic'])

    if is_article_exist(article['page'], filename) is True:
        return

    with open(PATH_SAVE_FILES + filename, 'a') as f:
        text = format_article_to_string(article)
        f.write(text)
        f.write('\n')


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
