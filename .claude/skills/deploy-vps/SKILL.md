---
name: deploy-vps
description: "VPS deployment guide for Next.js projects. Docker + Nginx + SSL + GitHub Actions SSH auto-deploy. Use when user says 'deploy', 'go live', 'make public', 'host', 'VPS', or asks about deployment."
user_invocable: true
---

# Deploy VPS — Next.js to Production

Deploy Next.js app to VPS with Docker + Nginx + SSL.

---

## Architecture

```
Internet
  │
  ├── HTTPS (443) ──→ Nginx ──→ Next.js (3000)
  │                     │
  │                     └── SSL (Let's Encrypt, auto-renew)
  │
  └── VPS (Docker Compose)
        ├── app       (Next.js standalone, port 3000)
        ├── mongo     (MongoDB 7, internal only)
        └── nginx     (reverse proxy, port 80/443)
```

## Quick Deploy (copy-paste)

### 1. VPS Setup (one-time, 10 min)

```bash
# SSH in as root, create deploy user
adduser deploy && usermod -aG sudo deploy
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker deploy

# Firewall
sudo ufw allow OpenSSH && sudo ufw allow 80/tcp && sudo ufw allow 443/tcp && sudo ufw enable

# Install certbot
sudo apt install -y certbot python3-certbot-nginx nginx
```

### 2. Clone + Deploy

```bash
ssh deploy@YOUR_VPS
git clone YOUR_REPO /opt/blog-opa && cd /opt/blog-opa
cp .env.local.example .env.production
nano .env.production  # Fill: MONGODB_URI, NEXTAUTH_SECRET, etc.

docker compose -f docker-compose.prod.yml --env-file .env.production up -d --build
```

### 3. Nginx + SSL

```bash
# Point domain A record to VPS IP first
sudo tee /etc/nginx/sites-available/blog.conf << 'EOF'
server {
    listen 80;
    server_name blog.yourdomain.com;
    client_max_body_size 50M;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF
sudo ln -sf /etc/nginx/sites-available/blog.conf /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d blog.yourdomain.com --non-interactive --agree-tos -m your@email.com
```

### 4. GitHub Actions Auto-Deploy

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with: { node-version: 20 }
    - run: npm ci && npm run build
    - uses: appleboy/ssh-action@v1
      with:
        host: ${{ secrets.VPS_HOST }}
        username: ${{ secrets.VPS_USER }}
        key: ${{ secrets.VPS_SSH_KEY }}
        script: |
          cd /opt/blog-opa && git pull origin main
          docker compose -f docker-compose.prod.yml --env-file .env.production up -d --build
          sleep 10 && curl -sf http://localhost:3000 || exit 1
```

**GitHub Secrets needed:** `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`

### 5. Update

```bash
ssh deploy@VPS
cd /opt/blog-opa && git pull && docker compose -f docker-compose.prod.yml up -d --build
```

---

## Cost

```
VPS (2GB RAM)     $5-6/mo
Domain            ~$1/mo
SSL               $0 (Let's Encrypt)
MongoDB           $0 (self-host)
────────────────────────
Total             ~$6-7/mo
```

---

## Safety

```
[R:HIGH] Production deployment — always verify:
  [ ] .env.production NOT in git
  [ ] NEXTAUTH_SECRET is random 32+ chars
  [ ] MongoDB not exposed to internet (internal Docker network)
  [ ] Firewall only allows 22, 80, 443
  [ ] SSL certificate valid
```
