
# Read the original file
with open('NexaLaunch-Final.html', 'r', encoding='utf-8') as f:
    content = f.read()

import re

# Extract CSS
css_match = re.search(r'<style>(.*?)</style>', content, re.DOTALL)
css_content = css_match.group(1).strip() if css_match else ""

# Extract JavaScript
js_matches = re.findall(r'<script>(.*?)</script>', content, re.DOTALL)
js_content = '\n\n'.join([js.strip() for js in js_matches if js.strip()])

# Create HTML without style and script tags
html_content = content
html_content = re.sub(r'<style>.*?</style>', '', html_content, flags=re.DOTALL)
html_content = re.sub(r'<script>.*?</script>', '', html_content, flags=re.DOTALL)

# Now let's add social media icons to the footer
# First, let's check the footer section
footer_match = re.search(r'<footer.*?</footer>', html_content, re.DOTALL)
if footer_match:
    print("Footer found, adding social media icons...")
    footer_content = footer_match.group(0)
    print("\nCurrent footer preview:")
    print(footer_content[:500])
