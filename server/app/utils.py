from bs4 import BeautifulSoup


def clean_html(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    return soup.prettify()

def is_california_location(location: str) -> bool:
    california_names = [" CA", " California", " Calif.", " Cali", " Cal"]
    # Convert location to lowercase for case-insensitive comparison
    location_lower = location.lower()
    # Check if any of the California names are in the location string
    return any(name.lower() in location_lower for name in california_names)