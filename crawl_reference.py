"""Crawl OmniAgent — close popup via JS injection before page loads"""
from playwright.sync_api import sync_playwright
import time, os

OUT = "/Users/nguynbon03/Desktop/MMO/Blog OPA/reference_shots"
for f in os.listdir(OUT):
    os.remove(os.path.join(OUT, f))

URL = "https://omniagent.framer.website"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    context = browser.new_context(
        viewport={"width": 1440, "height": 900},
        user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    )

    # Inject script BEFORE page loads to prevent popup
    context.add_init_script("""
        // Override any Framer adaptive preview
        window.__framer_importFromPackage = () => {};
        Object.defineProperty(window, '__framer_adaptive_preview__', { value: false, writable: false });
    """)

    page = context.new_page()

    # Block framer template overlay resources
    page.route("**/*adaptive*", lambda route: route.abort())
    page.route("**/*preview*modal*", lambda route: route.abort())

    page.goto(URL, wait_until="networkidle", timeout=30000)
    time.sleep(2)

    # Nuclear option: remove ALL overlays via DOM
    page.evaluate("""(() => {
        const removeOverlays = () => {
            const all = document.querySelectorAll('*');
            for (const el of all) {
                const s = window.getComputedStyle(el);
                const z = parseInt(s.zIndex) || 0;
                if (s.position === 'fixed' && z > 5) {
                    const text = el.textContent || '';
                    const isNav = el.querySelector('a[href*="Home"], a[href*="Pricing"]');
                    const isBuyBtn = text.includes('Buy Template') || text.includes('Made in');
                    if (!isNav && !isBuyBtn) {
                        el.style.display = 'none';
                        el.style.visibility = 'hidden';
                        el.style.pointerEvents = 'none';
                    }
                }
            }
            document.querySelectorAll('[class*="overlay"], [class*="modal"], [class*="backdrop"]').forEach(el => {
                el.style.display = 'none';
            });
            document.body.style.overflow = 'auto';
            document.body.style.pointerEvents = 'auto';
            document.documentElement.style.overflow = 'auto';
        };
        removeOverlays();
        setTimeout(removeOverlays, 1000);
        setTimeout(removeOverlays, 2000);
    })()""")
    time.sleep(3)

    # Click escape and click away
    page.keyboard.press("Escape")
    time.sleep(0.3)
    page.mouse.click(1, 1)
    time.sleep(0.3)

    total_height = page.evaluate("document.body.scrollHeight")
    print(f"Page height: {total_height}px")

    step = 600
    i = 0
    pos = 0

    while pos < total_height:
        page.evaluate(f"window.scrollTo({{top: {pos}, behavior: 'instant'}})")
        time.sleep(0.5)
        # Re-hide any reappearing overlays
        page.evaluate("""
            document.querySelectorAll('*').forEach(el => {
                const s = window.getComputedStyle(el);
                if (s.position === 'fixed' && (parseInt(s.zIndex)||0) > 5) {
                    const isNav = el.querySelector('a');
                    if (!isNav && !el.textContent.includes('Buy')) {
                        el.style.display = 'none';
                    }
                }
            });
        """)
        time.sleep(0.2)
        page.screenshot(path=f"{OUT}/{i:03d}_y{pos}.png")
        print(f"  [{i:03d}] y={pos}")
        pos += step
        i += 1

    page.screenshot(path=f"{OUT}/{i:03d}_bottom.png")
    browser.close()
    print(f"\\nDone! {i+1} screenshots")
