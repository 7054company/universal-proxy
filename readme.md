# 🌐 Universal Proxy Server (Node.js)

A lightweight Express-based proxy server that allows you to forward HTTP and HTTPS requests to any external URL — bypassing CORS, firewalls, or mobile network restrictions.

---

## live
https://universal-proxy-theta.vercel.app/https/api.github.com/repos/7054company/universal-proxy
---
## 🚀 Features

- ✅ Supports both `http` and `https` targets
- ✅ Accepts full URL paths via `/http/<host>/<path>` or `/https/<host>/<path>`
- ✅ Works with raw or encoded characters (e.g., `?`, `&`, `#`, etc.)
- ✅ Allows all IPs, mobile networks, and headers
- ✅ Bypasses CORS for browser apps
- ✅ Deployable anywhere (Render, Railway, Fly.io, etc.)

---

## 📦 Installation

```bash
git clone https://github.com/7054company/universal-proxy.git
cd universal-proxy
npm install
