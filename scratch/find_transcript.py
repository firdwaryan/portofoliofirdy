import json

with open('C:/Users/HP/.gemini/antigravity/brain/64b12d1f-fa05-489c-a321-7795b88ae54d/.system_generated/logs/transcript.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        data = json.loads(line)
        c = str(data.get('content', '')).lower()
        if ('peran' in c or 'bullet' in c or 'samping' in c) and data.get('source') == 'USER_EXPLICIT':
            idx = data.get('step_index')
            print(f'User step {idx}: {c[:200]}')
