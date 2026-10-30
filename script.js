// ============================================================================
// MASTER FRONTEND SYNC & 4-CORNERED SQUIRCLE HEADER LOGO ENGINE (script.js)
// ============================================================================

const DEMO_DEFAULT_STORE = {
    businessName: "OstaraStock Pvt Ltd",
    name: "OstaraStock Pvt Ltd",
    slug: "ostarastock",
    businessEmail: "info@ostarastock.shop",
    email: "info@ostarastock.shop",
    mobileNumber: "+94741987700",
    mobile: "+94741987700",
    businessAddress: "Floor 14, Colpetty Central Point, No. 45 Galle Road, Colombo 03, 00300, Western Province, Sri Lanka",
    address: "Floor 14, Colpetty Central Point, No. 45 Galle Road, Colombo 03, 00300, Western Province, Sri Lanka",
    description: "",
    businessDescription: "",
    metaTitle: "OstaraStock Pvt Ltd — Dropshipping fulfillment built for speed",
    metaDescription: "Source winning products and fulfill orders in days, not weeks, with a US-stocked catalog and automated logistics.",
    businessLogo: null,
    logoImage: null,
    faviconImage: null,
    theme: 1,
    lang: "en",
    isWebsiteLive: true,
    isClonedInstance: false,
    categoryDescriptions: []
};

(function ensureAppJsLoaded() {
    if (!window.__APP_ENGINE_LOADED__) {
        const existing = document.querySelector('script[src*="app.js"]');
        if (!existing) {
            const s = document.createElement("script");
            s.src = "app.js";
            s.defer = true;
            document.head.appendChild(s);
        }
    }
})();

function extractFirstAndLastInitials(rawName) {
    const clean = (rawName || "").trim();
    if (!clean) return "ZA";
    const words = clean.split(/\s+/).filter(Boolean);
    if (words.length >= 2) {
        return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
    }
    const single = clean.replace(/[^a-zA-Z0-9]/g, "");
    if (single.length >= 2) {
        return single.substring(0, 2).toUpperCase();
    }
    return (single.charAt(0) || "Z").toUpperCase() + "A";
}

function createCleanStoreSlug(rawName) {
    if (!rawName || !rawName.trim()) return "";
    return rawName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "").substring(0, 32);
}

function getCurrentStoreSlug() {
    const params = new URLSearchParams(window.location.search);
    const storeParam = params.get("store");
    if (storeParam) {
        const cleaned = storeParam.toLowerCase().replace(/[^a-z0-9-_]/g, "");
        if (cleaned) {
            localStorage.setItem("currentStoreSlug", cleaned);
            return cleaned;
        }
    }
    return localStorage.getItem("currentStoreSlug") || "";
}

function getStoreData(slug) {
    const targetSlug = slug || getCurrentStoreSlug();
    const allStores = JSON.parse(localStorage.getItem("allStores") || "{}");
    if (targetSlug && allStores[targetSlug]) {
        return { ...DEMO_DEFAULT_STORE, ...allStores[targetSlug] };
    }
    const savedRaw = localStorage.getItem("app_store_data");
    if (savedRaw) {
        try {
            const parsed = JSON.parse(savedRaw);
            if (parsed && typeof parsed === "object") {
                return { ...DEMO_DEFAULT_STORE, ...parsed };
            }
        } catch (e) {}
    }
    return { ...DEMO_DEFAULT_STORE };
}

function saveStoreData(slug, data) {
    const cleanSlug = createCleanStoreSlug(data.businessName || data.name) || slug || "store";
    data.slug = cleanSlug;

    const allStores = JSON.parse(localStorage.getItem("allStores") || "{}");
    allStores[cleanSlug] = data;

    localStorage.setItem("allStores", JSON.stringify(allStores));
    localStorage.setItem("app_store_data", JSON.stringify(data));
    localStorage.setItem("currentStoreSlug", cleanSlug);
}

// 4-Cornered Squircle SVG Fallback (Matches "ZA" Reference Image 100%)
window.buildHexagonLogoSVG = function(initialsText) {
    const text = (initialsText || "").substring(0, 2).toUpperCase();
    return `
      <svg width="42" height="42" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%; display: block;">
        <defs>
          <linearGradient id="sqInset" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0d2137"/>
            <stop offset="100%" stop-color="#081525"/>
          </linearGradient>
          <linearGradient id="sqRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#06b6d4"/>
            <stop offset="50%" stop-color="#10b981"/>
            <stop offset="100%" stop-color="#22c55e"/>
          </linearGradient>
        </defs>
        <rect width="60" height="60" rx="13.5" fill="#050e1a"/>
        <rect x="3.2" y="3.2" width="53.6" height="53.6" rx="11.5" fill="url(#sqInset)" stroke="rgba(255,255,255,0.05)" stroke-width="0.5"/>
        <rect x="7.2" y="7.2" width="45.6" height="45.6" rx="10.2" fill="#09182b" stroke="url(#sqRing)" stroke-width="3.4"/>
        <text x="30" y="31" text-anchor="middle" dominant-baseline="central" fill="#ffffff" font-family="'Inter', Arial, sans-serif" font-weight="900" font-size="20">${text}</text>
      </svg>
    `;
};

if (!sessionStorage.getItem("__REAL_BASE_PATH__")) {
    const initialPath = window.location.pathname;
    if (initialPath.endsWith(".html") || initialPath === "/" || initialPath.endsWith("/")) {
        sessionStorage.setItem("__REAL_BASE_PATH__", initialPath);
    } else {
        sessionStorage.setItem("__REAL_BASE_PATH__", "/index.html");
    }
}

function applyLiveUrlMasking(customBusinessName) {
    try {
        if (window.location.protocol === "file:") return;
        const savedRaw = localStorage.getItem("app_store_data");
        if (!savedRaw && !customBusinessName) return;

        let nameToMask = customBusinessName || "";
        if (!nameToMask && savedRaw) {
            const parsed = JSON.parse(savedRaw);
            nameToMask = parsed.businessName || parsed.name || "";
        }

        const slug = createCleanStoreSlug(nameToMask);
        if (!slug) return;

        const maskedUrl = `/${slug}/index.html`;
        if (window.location.pathname !== maskedUrl) {
            window.history.replaceState({ maskedSlug: slug }, "", maskedUrl);
        }
    } catch (e) {}
}

window.addEventListener("beforeunload", () => {
    try {
        sessionStorage.setItem("scrollPosition", window.scrollY);
        const realPath = sessionStorage.getItem("__REAL_BASE_PATH__") || "/index.html";
        if (window.location.protocol !== "file:" && window.location.pathname !== realPath) {
            window.history.replaceState({}, "", realPath);
        }
    } catch (e) {}
});

function updateBrowserTabFavicon(iconDataUrl) {
    if (!iconDataUrl) return;
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
    }
    link.href = iconDataUrl;
}

// Override index.html's syncAdminDataToHome so it NEVER forces border-radius: 50% (Circle)!
window.syncAdminDataToHome = function() {
    applyGlobalStoreData();
};

function applyGlobalStoreData() {
    const savedRaw = localStorage.getItem("app_store_data");
    const hasSavedData = Boolean(savedRaw);
    const data = getStoreData();

    const brandName = hasSavedData ? (data.businessName || data.name || "") : "";
    const brandEmail = hasSavedData ? (data.businessEmail || data.email || "") : DEMO_DEFAULT_STORE.businessEmail;
    const brandPhone = hasSavedData ? (data.mobileNumber || data.mobile || "") : DEMO_DEFAULT_STORE.mobileNumber;
    const brandAddress = hasSavedData ? (data.businessAddress || data.address || "") : DEMO_DEFAULT_STORE.businessAddress;
    const brandDescription = hasSavedData ? (data.businessDescription || data.description || "") : "";
    const uploadedLogo = hasSavedData ? (data.businessLogo || data.logoImage || null) : null;
    const uploadedFavicon = hasSavedData ? (data.faviconImage || uploadedLogo || null) : null;

    const initials = extractFirstAndLastInitials(brandName);

    if (hasSavedData && (data.metaTitle || brandName)) {
        document.title = data.metaTitle ? data.metaTitle : `${brandName} — Official Store`;
    } else {
        document.title = DEMO_DEFAULT_STORE.metaTitle;
    }

    if (uploadedFavicon) {
        updateBrowserTabFavicon(uploadedFavicon);
    }

    document.querySelectorAll('#global-header-brand-name, #footer-brand-title, #copyright-brand, [data-bind="business-name"], .brand-name-text').forEach(el => {
        el.innerText = brandName;
    });

    // Website Header Logo Box — Strictly 4-Cornered Squircle (22% radius, NOT 50% circle!)
    const logoBox = document.getElementById("global-header-logo-box");
    if (logoBox) {
        logoBox.style.setProperty("border-radius", "22%", "important");
        logoBox.style.setProperty("padding", "0", "important");
        logoBox.style.overflow = "hidden";
        if (uploadedLogo) {
            logoBox.innerHTML = `<img src="${uploadedLogo}" alt="${brandName}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 22%;">`;
        } else {
            logoBox.innerHTML = window.buildHexagonLogoSVG(brandName ? initials : "");
        }
    }

    const heroTitle = document.getElementById("hero-title");
    if (heroTitle) {
        heroTitle.innerHTML = brandName
            ? `From checkout to doorstep in <span class="highlight">2-5</span> <span class="highlight">days</span> with ${brandName}.`
            : `From checkout to doorstep in <span class="highlight">2-5</span> <span class="highlight">days.</span>`;
    }

    document.querySelectorAll('[data-bind="footer-brand-text"], #footerBusinessDescription, #footer-description-text').forEach(el => {
        el.innerText = brandDescription;
    });

    document.querySelectorAll('#cta-email, [data-bind="business-email"], .footer-email-text, .store-email-display').forEach(el => {
        el.innerText = brandEmail;
        const anchor = el.tagName === "A" ? el : el.closest("a");
        if (anchor) {
            anchor.href = brandEmail ? `mailto:${brandEmail}` : "#";
        }
    });

    document.querySelectorAll('[data-bind="mobile-number"], .footer-phone-text').forEach(el => {
        el.innerText = brandPhone;
        const anchor = el.tagName === "A" ? el : el.closest("a");
        if (anchor) {
            anchor.href = brandPhone ? `tel:${brandPhone.replace(/\s+/g, "")}` : "#";
        }
    });

    document.querySelectorAll('[data-bind="business-address"], .footer-address-text').forEach(el => {
        el.innerText = brandAddress;
    });

    if (hasSavedData && brandName) {
        applyLiveUrlMasking(brandName);
    }
}

window.addEventListener("storage", (e) => {
    if (e.key === "app_store_data" || e.key === "allStores" || e.key === "currentStoreSlug") {
        applyGlobalStoreData();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    applyGlobalStoreData();
});