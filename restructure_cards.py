import re

filepath = "/Users/dhruvsingh/Desktop/lvspices/app/page.tsx"

with open(filepath, 'r') as f:
    content = f.read()

# Pattern: match each lv-card-body that contains chapter-tag + title + desc + pills
# Strategy: inside each lv-card-body, wrap (lv-chapter-tag + lv-card-title) in lv-card-header
# and wrap (lv-card-desc + lv-card-pills + lv-card-badge) in lv-card-footer

def restructure_card_body(match):
    body_inner = match.group(1)
    
    # Find split point: after lv-card-title closing </h2>
    h2_end = body_inner.find('</h2>')
    if h2_end == -1:
        return match.group(0)
    
    header_part = body_inner[:h2_end + 5].strip()
    footer_part = body_inner[h2_end + 5:].strip()
    
    return f'''<div className="lv-card-body">
            <div className="lv-card-header">
              {header_part}
            </div>
            <div className="lv-card-footer">
              {footer_part}
            </div>
          </div>'''

# Match each lv-card-body block
pattern = re.compile(r'<div className="lv-card-body">\s*(.*?)\s*</div>\n          <div className="lv-card-img"', re.DOTALL)

new_content = pattern.sub(
    lambda m: restructure_card_body(m) + '\n          <div className="lv-card-img"',
    content
)

with open(filepath, 'w') as f:
    f.write(new_content)

print("Done! Card bodies restructured.")
