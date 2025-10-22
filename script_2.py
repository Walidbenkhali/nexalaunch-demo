
# Good! Social media icons are already in the original file
# Let's verify they're using Font Awesome and recreate the files properly

# Check if Font Awesome is included
if 'fontawesome' in content.lower() or 'fa-' in content:
    print("✅ Font Awesome icons are included in the original file")
    
# Check for CDN link
cdn_match = re.search(r'<link.*?fontawesome.*?>', content, re.IGNORECASE)
if cdn_match:
    print("✅ Font Awesome CDN found:")
    print(cdn_match.group(0))
    fa_cdn = cdn_match.group(0)
else:
    print("⚠️ Font Awesome CDN not found, will add it")
    fa_cdn = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">'

# Now create proper HTML with Font Awesome
html_start = content.find('<!DOCTYPE')
head_start = content.find('<head>')
head_end = content.find('</head>') + 7

# Get the head section
head_section = content[head_start:head_end]

# Create new head with Font Awesome and external CSS
new_head = '''<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NexaLaunch - Professional Landing Page Templates</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>'''

# Create HTML content
html_content = content[:head_start] + new_head + content[head_end:]

# Remove style tags
html_content = re.sub(r'<style>.*?</style>', '', html_content, flags=re.DOTALL)

# Remove script tags (inline scripts only)
html_content = re.sub(r'<script>(?!.*?src=).*?</script>', '', html_content, flags=re.DOTALL)

# Add script tag before closing body
html_content = re.sub(r'</body>', '    <script src="script.js"></script>\n</body>', html_content)

# Clean up whitespace
html_content = re.sub(r'\n\s*\n\s*\n+', '\n\n', html_content)

print("\n✅ HTML recreated with Font Awesome icons included!")
