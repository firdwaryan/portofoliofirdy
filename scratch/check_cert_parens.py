with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

in_cert = False
for i, l in enumerate(lines):
    if 'id="slide-certifications"' in l:
        in_cert = True
    if 'id="slide-projects"' in l:
        in_cert = False
    if in_cert:
        if '(' in l or ')' in l:
            print(f'{i+1}: {l.strip()}')
