from apiflask import Schema
from apiflask.fields import String, List, Nested
from apiflask.validators import Length, URL

# Input schema for URL validation
class URLResearchPreviewInputSchema(Schema):
    url = String(required=True, validate=(Length(1), URL()))

# Output schema for success response
class URLResearchPreviewResultSchema(Schema):
    content = String()
    title = String()
    head_content_only = String()
    body_content_only = String()

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