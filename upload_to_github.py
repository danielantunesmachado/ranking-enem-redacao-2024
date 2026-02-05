#!/usr/bin/env python3
import os
import base64
import json
import subprocess
import requests

# Obter token do GitHub CLI
token = subprocess.check_output(['gh', 'auth', 'token']).decode().strip()

# Configurações
REPO_OWNER = "danielantunesmachado"
REPO_NAME = "ranking-enem-redacao-2024"
BRANCH = "main"
BASE_URL = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/contents"

headers = {
    "Authorization": f"token {token}",
    "Accept": "application/vnd.github.v3+json"
}

def upload_file(file_path, github_path):
    """Upload um arquivo para o GitHub via API"""
    try:
        with open(file_path, 'rb') as f:
            content = base64.b64encode(f.read()).decode()
        
        data = {
            "message": f"Add {os.path.basename(github_path)}",
            "content": content,
            "branch": BRANCH
        }
        
        url = f"{BASE_URL}/{github_path}"
        response = requests.put(url, headers=headers, json=data)
        
        if response.status_code in [201, 200]:
            print(f"✓ {github_path}")
            return True
        else:
            print(f"✗ {github_path}: {response.status_code} - {response.text[:100]}")
            return False
    except Exception as e:
        print(f"✗ {github_path}: {str(e)}")
        return False

# Lista de arquivos principais para fazer upload
files_to_upload = [
    ("/home/ubuntu/ranking-enem-redacao/package.json", "package.json"),
    ("/home/ubuntu/ranking-enem-redacao/tsconfig.json", "tsconfig.json"),
    ("/home/ubuntu/ranking-enem-redacao/vite.config.ts", "vite.config.ts"),
    ("/home/ubuntu/ranking-enem-redacao/client/index.html", "client/index.html"),
    ("/home/ubuntu/ranking-enem-redacao/client/src/index.css", "client/src/index.css"),
    ("/home/ubuntu/ranking-enem-redacao/client/src/main.tsx", "client/src/main.tsx"),
    ("/home/ubuntu/ranking-enem-redacao/client/src/App.tsx", "client/src/App.tsx"),
]

print(f"Fazendo upload de {len(files_to_upload)} arquivos para {REPO_OWNER}/{REPO_NAME}...")
print()

success_count = 0
for local_path, github_path in files_to_upload:
    if os.path.exists(local_path):
        if upload_file(local_path, github_path):
            success_count += 1
    else:
        print(f"✗ Arquivo não encontrado: {local_path}")

print()
print(f"Upload concluído: {success_count}/{len(files_to_upload)} arquivos enviados com sucesso")
