import re
from flask import Response
import requests
from apiflask import APIFlask, Schema
from apiflask.fields import String, List, Nested
from apiflask.validators import Length, URL
from bs4 import BeautifulSoup

app = APIFlask(__name__)  # Use APIFlask instead of Flask

# Function to clean up and prettify HTML
def clean_html(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    return soup.prettify()


# Input schema for URL validation
class URLResearchPreviewInputSchema(Schema):
    url = String(required=True, validate=(Length(1), URL()))


# Output schema for success response
class URLResearchPreviewResultSchema(Schema):
    content = String()
    title = String()


@app.get("/v1/research/preview")
@app.input(URLResearchPreviewInputSchema, location='query')
@app.output(URLResearchPreviewResultSchema, status_code=200)
def research_url(query_data):  # Add query_data argument here
    """
    Fetches content from a specified URL and extracts the title.=
    """
    url = query_data['url']
    try:
        response = requests.get(url)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, 'html.parser')
        # Extract the title
        title = soup.title.string if soup.title else "No title found"
        html_content = clean_html(response.text)


        return {"title": title, "content": html_content}, 200
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}, 500


# Input schema for HTML content
class HTMLContentSchema(Schema):
    html_content = String(required=True, validate=Length(1))
    og_url = String(required=True, validate=URL())

# Output schema for extracted links
class LinkSchema(Schema):
    url = String()
    label = String()

class ExtractedLinksSchema(Schema):
    links = List(Nested(LinkSchema))

@app.post("/v1/research/extract-links")
@app.input(HTMLContentSchema)
@app.output(ExtractedLinksSchema, status_code=200)
def extract_links(data):
    """
    Extracts all the links from the provided HTML content.
    """
    html_content = data['html_content']
    og_url = data['og_url']
    soup = BeautifulSoup(html_content, 'html.parser')

    extracted_links = []

    # Extract all links and their labels
    for a in soup.find_all('a', href=True):
        href = a['href']
        label = a.get_text(strip=True)  # Get the label, if it exists
        
        # If the href is a relative URL, prepend the og_url
        if not re.match(r'http[s]?://', href):
            href = og_url.rstrip('/') + '/' + href.lstrip('/')
        
        extracted_links.append({"url": href, "label": label or ""})

    return {"links": extracted_links}, 200


@app.get("/")  # Decorate the hello_world route
def hello_world():
    return "Hello World!"


if __name__ == "__main__":
    app.run(debug=True)
