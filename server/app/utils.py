from bs4 import BeautifulSoup


def clean_html(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    return soup.prettify()
