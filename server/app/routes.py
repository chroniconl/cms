from flask import Response
from app import app
from app.schemas import URLResearchPreviewInputSchema, URLResearchPreviewResultSchema, HTMLContentSchema, ExtractedLinksSchema
from app.services import fetch_url_content, extract_links_from_html


@app.get("/v1/research/preview")
@app.input(URLResearchPreviewInputSchema, location='query')
@app.output(URLResearchPreviewResultSchema, status_code=200)
def research_url(query_data):
    """
    Fetches content from a specified URL and extracts the title.
    """
    return fetch_url_content(query_data['url'])

@app.post("/v1/research/extract-links")
@app.input(HTMLContentSchema)
@app.output(ExtractedLinksSchema, status_code=200)
def extract_links(data):
    """
    Extracts all the links from the provided HTML content.
    """
    return extract_links_from_html(data['html_content'], data['og_url'])

