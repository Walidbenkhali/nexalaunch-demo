
# Read the current HTML file to check for social media icons
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Check if there are social media links
if 'social' in html.lower():
    print("Social media section found in HTML")
else:
    print("No social media section found")

# Let's check the original file
with open('NexaLaunch-Final.html', 'r', encoding='utf-8') as f:
    original = f.read()
    
# Search for social media in original
import re
social_section = re.search(r'<div class="social-links">(.*?)</div>', original, re.DOTALL)
if social_section:
    print("\nFound social links in original file:")
    print(social_section.group(0)[:500])
else:
    print("No social links found in original")
