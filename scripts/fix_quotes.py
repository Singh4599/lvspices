#!/usr/bin/env python3
"""
Fix all unquoted #111111 occurrences in TSX/TS files.
Adds single quotes around #111111 wherever it appears unquoted.
"""
import os
import re
import sys

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Pattern: #111111 NOT already surrounded by quotes
    # We need to add quotes in these cases:
    # 1. : #111111, or : #111111\n  -> : '#111111',
    # 2. = #111111; -> = '#111111';
    # 3. ( #111111) or , #111111) -> ('...' or , '...')
    # 4. default param: color = #111111, -> color = '#111111',
    
    # The safest approach: wrap any bare #111111 that isn't already in a string
    # We'll use a regex that matches #111111 NOT preceded by ' or "
    
    def add_quotes(m):
        text = m.group(0)
        pre = m.group(1)
        post = m.group(2)
        
        # If already quoted, skip
        if pre in ("'", '"') or post in ("'", '"'):
            return text
        
        return pre + "'" + "#111111" + "'" + post
    
    # Replace: (space or : or = or ,)#111111(, or ; or ) or space or \n)
    # That are NOT already inside quotes
    content = re.sub(
        r"(?<!['\"])(#111111)(?!['\"])",
        lambda m: "'" + m.group(1) + "'",
        content
    )
    
    # But now we may have double-quoted: ''#111111'' -> '#111111'
    content = content.replace("''#111111''", "'#111111'")
    content = content.replace('""#111111""', '"#111111"')
    # And JSX attributes: color="'#111111'" -> color="#111111"
    content = content.replace('"\'#111111\'"', '"#111111"')
    content = content.replace("\"'#111111'\"", '"#111111"')
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed: {filepath}")

def main():
    roots = [
        '/Users/dhruvsingh/Desktop/lvspices/app',
        '/Users/dhruvsingh/Desktop/lvspices/components',
    ]
    
    for root in roots:
        for dirpath, dirnames, filenames in os.walk(root):
            # Skip node_modules and .next
            dirnames[:] = [d for d in dirnames if d not in ('node_modules', '.next')]
            for filename in filenames:
                if filename.endswith(('.tsx', '.ts', '.css', '.js')):
                    fix_file(os.path.join(dirpath, filename))
    
    print("All done!")

if __name__ == '__main__':
    main()
