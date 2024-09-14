from flask import Response, jsonify

from app import app
from bs4 import BeautifulSoup
from app.schemas import URLResearchPreviewInputSchema, URLResearchPreviewResultSchema, HTMLContentSchema, ExtractedLinksSchema
from app.services import fetch_url_content, extract_links_from_html
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from app.utils import is_california_location


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


@app.get("/fetch-earthquake-html")
def fetch_earthquake_html():
    """
    Fetches HTML content from the USGS Earthquake website after ensuring the page is fully loaded.
    Returns a JSON response with the HTML content stringified.
    """
    # https://earthquake.usgs.gov/earthquakes/map/?extent=16.13026,-139.83398&extent=59.26588,-87.62695&range=week&magnitude=all&distanceUnit=mi&settings=true
    # target_url = 'https://earthquake.usgs.gov/earthquakes/map/?extent=12.72608,-135.17578&extent=57.42129,-54.84375'
    # this url has all earthquakes from the last week, whereas the last one had 2.5+ in the last two days
    # this is easier to catch california values
    target_url = 'https://earthquake.usgs.gov/earthquakes/map/?extent=16.13026,-139.83398&extent=59.26588,-87.62695&range=week&magnitude=all&distanceUnit=mi&settings=true'
    # Set up Selenium WebDriver (using Chrome in this example)
    options = webdriver.ChromeOptions()
    options.headless = True  # Run in headless mode
    driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=options)

    try:
        driver.get(target_url)

        # Wait for the page to finish loading (e.g., wait for a specific element to be present)
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "cdk-virtual-scroll-content-wrapper"))  # Replace with an appropriate identifier
        )

        # Get the page source (HTML content)
        html_content = driver.page_source

        # Parse the HTML content with BeautifulSoup
        soup = BeautifulSoup(html_content, 'lxml')

        # Initiate an empty list to hold the earthquake data
        earthquake_data = []

        # Find the parent element wrapping all the earthquake items
        parent_element = soup.find(class_="cdk-virtual-scroll-content-wrapper")

        if not parent_element:
            return Response("No earthquake data found", status=404)

        # Extract each earthquake item
        for item in parent_element.find_all("usgs-event-item-detail"):
            magnitude = item.select_one('.callout .ng-star-inserted').text.strip()
            location = item.select_one('.header').text.strip()
            timestamp = item.select_one('.time').text.strip()
            depth = item.select_one('.aside .ng-star-inserted').text.strip()

            # Check if the location is in California
            is_california = is_california_location(location)

            # Append the earthquake data to the list if it's in California
            if is_california:
                earthquake_data.append({
                    'magnitude': magnitude,
                    'location': location,
                    'timestamp': timestamp,
                    'depth': depth,
                    'is_california': is_california
                })            

        # Return the earthquake data as a JSON response
        return jsonify({'earthquake_data': earthquake_data})

    except Exception as e:
        return Response(f"An error occurred while fetching the HTML: {str(e)}", status=500)

    finally:
        driver.quit()

