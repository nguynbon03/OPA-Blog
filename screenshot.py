"""Screenshot OPA — landing + blog page"""
from playwright.sync_api import sync_playwright
import time, os

OUT = "/Users/nguynbon03/Desktop/MMO/Blog OPA/screenshots"
for f in os.listdir(OUT):
    os.remove(os.path.join(OUT, f))

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page(viewport={"width": 1440, "height": 900})

    # Landing page
    page.goto("http://localhost:3000", wait_until="networkidle")
    time.sleep(1)

    total = page.evaluate("document.body.scrollHeight")
    step = 800
    i = 0
    pos = 0
    while pos < total:
        page.evaluate(f"window.scrollTo({{top: {pos}, behavior: 'instant'}})")
        time.sleep(0.3)
        page.screenshot(path=f"{OUT}/{i:03d}_landing_y{pos}.png")
        pos += step
        i += 1

    # Blog page
    page.goto("http://localhost:3000/blog", wait_until="networkidle")
    time.sleep(1)
    page.screenshot(path=f"{OUT}/{i:03d}_blog.png")
    i += 1

    # Admin login
    page.goto("http://localhost:3000/admin/login", wait_until="networkidle")
    time.sleep(1)
    page.screenshot(path=f"{OUT}/{i:03d}_admin_login.png")

    browser.close()
    print(f"Done! {i+1} screenshots")
