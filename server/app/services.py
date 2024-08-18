import requests
from bs4 import BeautifulSoup
from app.utils import clean_html

def fetch_url_content(url):
    try:
        response = requests.get(url)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, 'html.parser')
        title = soup.title.string if soup.title else "No title found"
        head_content = soup.head.prettify()
        body_content = soup.body.prettify()
        html_content = clean_html(response.text)

        return {
            "title": title, 
            "content": html_content,
            "head_content_only": head_content,
            "body_content_only": body_content,
        }, 200
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}, 500

def extract_links_from_html(html_content, og_url):
    import re
    soup = BeautifulSoup(html_content, 'html.parser')
    extracted_links = []

    for a in soup.find_all('a', href=True):
        href = a['href']
        label = a.get_text(strip=True)
        if not re.match(r'http[s]?://', href):
            href = og_url.rstrip('/') + '/' + href.lstrip('/')
        extracted_links.append({"url": href, "label": label or ""})

    return {"links": extracted_links}, 200