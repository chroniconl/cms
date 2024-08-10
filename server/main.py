import requests
from apiflask import APIFlask, Schema
from apiflask.fields import String
from apiflask.validators import Length, URL
from bs4 import BeautifulSoup

app = APIFlask(__name__)  # Use APIFlask instead of Flask


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

        return {"title": title, "content": response.text}, 200
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}, 500


@app.get("/")  # Decorate the hello_world route
def hello_world():
    return "Hello World!"


if __name__ == "__main__":
    app.run(debug=True)
