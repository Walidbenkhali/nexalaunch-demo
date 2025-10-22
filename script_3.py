
# Save the updated files with social media icons working properly
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css_content)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("✅ Files updated successfully with social media icons!")
print("\n📁 Files created:")
print("- index.html (with Font Awesome CDN)")
print("- style.css (with social icons styling)")
print("- script.js (mobile menu + smooth interactions)")

# Verify social icons in HTML
if 'social-icon' in html_content and 'fa-facebook' in html_content:
    print("\n✅ Social media icons verified:")
    social_matches = re.findall(r'class="social-icon.*?".*?fa-([\w-]+)', html_content)
    print(f"   Found {len(social_matches)} social icons: {', '.join(set(social_matches))}")
else:
    print("\n⚠️ Social icons might need verification")

# Check CSS for social icon styles
if '.social-icon' in css_content:
    print("\n✅ Social icon styles found in CSS")
else:
    print("\n⚠️ Social icon styles not found")
