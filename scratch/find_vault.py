import sys
with open('script.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if 'initCredentialVault' in l:
        print(f"Line {i+1}: {l.strip()}")
        start = max(0, i - 20)
        end = min(len(lines), i + 25)
        for j in range(start, end):
            print(f"{j+1}: {lines[j]}", end="")
        break
