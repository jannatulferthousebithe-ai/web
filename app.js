// ============================================================================
// STRICT SAVE-ONLY SYNC, SQUIRCLE LOGO & THEME 1-5 + CUSTOM ENGINE (app.js)
// ============================================================================

window.__APP_ENGINE_LOADED__ = true;

// Enforce Identical 4-Cornered Squircle Styling on All 4 Logo Boxes
(function enforceUniformSquircleLogoStyles() {
    if (document.getElementById("__squircle_logo_override__")) return;
    const st = document.createElement("style");
    st.id = "__squircle_logo_override__";
    st.innerHTML = `
        #global-header-logo-box,
        #adminTopLogoPreview,
        #admSiteLogoPreviewBox,
        #admFaviconPreviewBox {
            border-radius: 22% !important;
            padding: 0 !important;
            background: #06101e !important;
            overflow: hidden !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            box-shadow: 0 4px 14px rgba(6, 16, 30, 0.22) !important;
        }
        #global-header-logo-box img,
        #adminTopLogoPreview img,
        #admSiteLogoPreviewBox img,
        #admFaviconPreviewBox img,
        #global-header-logo-box svg,
        #adminTopLogoPreview svg,
        #admSiteLogoPreviewBox svg,
        #admFaviconPreviewBox svg {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            display: block !important;
            border-radius: 22% !important;
        }
    `;
    document.head.appendChild(st);
})();

// ============================================================================
// MODULE 2: 4-CORNERED SQUIRCLE LOGO GENERATOR (MATCHES REFERENCE "ZA")
// ============================================================================

const SQUIRCLE_LOGO_PALETTES = [
    { outer: "#050e1a", inset1: "#0d2137", inset2: "#081525", inner: "#09182b", ring1: "#06b6d4", ring2: "#10b981", ring3: "#22c55e", glow: "rgba(16, 185, 129, 0.55)" },
    { outer: "#090c15", inset1: "#261519", inset2: "#120b12", inner: "#160e15", ring1: "#facc15", ring2: "#f97316", ring3: "#ef4444", glow: "rgba(249, 115, 22, 0.55)" },
    { outer: "#060b18", inset1: "#131c38", inset2: "#091024", inner: "#0c142c", ring1: "#38bdf8", ring2: "#6366f1", ring3: "#a855f7", glow: "rgba(99, 102, 241, 0.55)" },
    { outer: "#061017", inset1: "#112822", inset2: "#081514", inner: "#0a1c19", ring1: "#bef264", ring2: "#84cc16", ring3: "#10b981", glow: "rgba(132, 204, 22, 0.55)" },
    { outer: "#090913", inset1: "#281122", inset2: "#130913", inner: "#190c18", ring1: "#f472b6", ring2: "#ec4899", ring3: "#e11d48", glow: "rgba(236, 72, 153, 0.55)" },
    { outer: "#060f18", inset1: "#1b232a", inset2: "#0b1219", inner: "#0f1921", ring1: "#fde047", ring2: "#14b8a6", ring3: "#06b6d4", glow: "rgba(20, 184, 166, 0.55)" },
    { outer: "#070917", inset1: "#1e1333", inset2: "#0b091c", inner: "#120d26", ring1: "#c084fc", ring2: "#8b5cf6", ring3: "#06b6d4", glow: "rgba(139, 92, 246, 0.55)" },
    { outer: "#050c19", inset1: "#0e223d", inset2: "#071224", inner: "#0a182e", ring1: "#67e8f9", ring2: "#3b82f6", ring3: "#2563eb", glow: "rgba(59, 130, 246, 0.55)" }
];

let aiLogoStyleCursor = 0;
window.activeAdminThemeNumber = 1; // 1 to 5 = AI Themes, 6 = Custom Manual Mode

function extractLogoLetters(rawName) {
    const clean = (rawName || "").trim();
    if (!clean) return "ZA";
    const words = clean.split(/\s+/).filter(Boolean);
    if (words.length >= 2) {
        return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
    }
    const lettersOnly = clean.replace(/[^a-zA-Z0-9]/g, "");
    if (lettersOnly.length >= 2) {
        return lettersOnly.substring(0, 2).toUpperCase();
    }
    return (lettersOnly.charAt(0) || "Z").toUpperCase() + "A";
}

function drawRoundedSquircle(ctx, x, y, w, h, r) {
    ctx.beginPath();
    if (typeof ctx.roundRect === "function") {
        ctx.roundRect(x, y, w, h, r);
    } else {
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
    }
}

function generateAICanvasLogoPNG(businessName, styleIndex) {
    const letters = extractLogoLetters(businessName);
    const pal = SQUIRCLE_LOGO_PALETTES[styleIndex % SQUIRCLE_LOGO_PALETTES.length];

    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = pal.outer;
    drawRoundedSquircle(ctx, 0, 0, 600, 600, 132);
    ctx.fill();

    const insetGrad = ctx.createLinearGradient(32, 32, 568, 568);
    insetGrad.addColorStop(0, pal.inset1);
    insetGrad.addColorStop(1, pal.inset2);

    ctx.save();
    ctx.fillStyle = insetGrad;
    drawRoundedSquircle(ctx, 32, 32, 536, 536, 114);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    const ringGrad = ctx.createLinearGradient(68, 68, 532, 532);
    ringGrad.addColorStop(0, pal.ring1);
    ringGrad.addColorStop(0.5, pal.ring2);
    ringGrad.addColorStop(1, pal.ring3);

    ctx.save();
    drawRoundedSquircle(ctx, 72, 72, 456, 456, 102);
    ctx.fillStyle = pal.inner;
    ctx.fill();

    ctx.shadowColor = pal.glow;
    ctx.shadowBlur = 24;
    ctx.strokeStyle = ringGrad;
    ctx.lineWidth = 34;
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 202px 'Inter', 'Arial Black', system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
    ctx.shadowOffsetY = 4;
    ctx.shadowBlur = 10;
    ctx.fillText(letters, 300, 310);
    ctx.restore();

    return canvas.toDataURL("image/png");
}

function updateFormOnlyLogoAndFaviconPreviews(logoDataUrl, faviconDataUrl) {
    const finalFav = faviconDataUrl || logoDataUrl;
    const siteBox = document.getElementById("admSiteLogoPreviewBox");
    const favBox = document.getElementById("admFaviconPreviewBox");

    if (siteBox) {
        siteBox.innerHTML = logoDataUrl ? `<img src="${logoDataUrl}" alt="Site Logo">` : "";
    }
    if (favBox) {
        favBox.innerHTML = finalFav ? `<img src="${finalFav}" alt="Favicon">` : "";
    }
}

function updateSavedAdminTopBar(savedName, savedLogoUrl) {
    const topTitle = document.getElementById("adminTopBrandTitle");
    const topBox = document.getElementById("adminTopLogoPreview");
    if (topTitle) topTitle.innerText = savedName || "OstaraStock Pvt Ltd";
    if (topBox) {
        topBox.innerHTML = savedLogoUrl ? `<img src="${savedLogoUrl}" alt="Logo">` : "";
    }
}

function triggerHighResPngDownload(dataUrl, rawStoreName) {
    if (!dataUrl) return;
    const cleanName = (rawStoreName || "store")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "store";

    try {
        const parts = dataUrl.split(",");
        const byteString = atob(parts[1]);
        const mimeString = parts[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `${cleanName}-logo.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1500);
    } catch (e) {
        const fallbackLink = document.createElement("a");
        fallbackLink.href = dataUrl;
        fallbackLink.download = `${cleanName}-logo.png`;
        document.body.appendChild(fallbackLink);
        fallbackLink.click();
        document.body.removeChild(fallbackLink);
    }
}

// ============================================================================
// MODULE 3: THEME 1 TO 5 UNLIMITED AI GENERATOR + THEME 6 (CUSTOM MANUAL BOX)
// ============================================================================

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Synchronize Theme Selection (1 to 5 = AI Themes, 6 = Custom Manual Mode)
window.selectAdminThemeOption = function(num) {
    window.activeAdminThemeNumber = parseInt(num, 10) || 1;
    if (typeof currentAdminThemeNum !== "undefined") {
        currentAdminThemeNum = window.activeAdminThemeNumber;
    }

    for (let i = 1; i <= 6; i++) {
        const card = document.getElementById(`admThemeCard-${i}`);
        if (card) {
            card.classList.toggle("selected", i === window.activeAdminThemeNumber);
            const radio = card.querySelector('input[type="radio"]');
            if (radio) radio.checked = (i === window.activeAdminThemeNumber);
        }
    }

    // If user clicks "Custom" (6), immediately prepare the Custom Manual Text Boxes!
    if (window.activeAdminThemeNumber === 6) {
        renderCustomManualDescriptionMode();
    }
};

function renderCustomManualDescriptionMode() {
    const bioEl = document.getElementById("admBizBio");
    if (bioEl) {
        bioEl.placeholder = "Write your own custom business description here...";
    }

    const headingEl = document.getElementById("admGenCatHeading");
    if (headingEl) {
        headingEl.innerText = "Custom category descriptions (Write your own)";
    }

    const listEl = document.getElementById("admGenCatList");
    if (listEl) {
        listEl.className = "admin-cat-list-wrap";
        listEl.style.background = "transparent";
        listEl.style.border = "none";
        listEl.style.padding = "0";

        const existingCustomVal = document.getElementById("admCustomCategoryTextarea")?.value || "";
        listEl.innerHTML = `
            <textarea
                id="admCustomCategoryTextarea"
                rows="6"
                class="admin-textarea"
                placeholder="Write your custom categories and descriptions here..."
                style="width: 100%; cursor: text !important;"
            >${existingCustomVal}</textarea>
        `;
    }

    const sheet = document.getElementById("admGeneratedCatCard");
    if (sheet) sheet.style.display = "block";
}

function generateUnlimitedThemeContent(storeName, themeNumber, isBangla) {
    const brand = (storeName || "OstaraStock Pvt Ltd").trim();
    const theme = parseInt(themeNumber, 10) || 1;

    // ------------------------------------------------------------------------
    // THEME 2: NATURAL FOOD PRODUCTS (HONEY, GHEE, OIL, DATES)
    // ------------------------------------------------------------------------
    if (theme === 2) {
        if (isBangla) {
            const hooks = [
                `${brand} এ আপনাকে স্বাগতম — শতভাগ খাঁটি, প্রাকৃতিক এবং কেমিক্যালমুক্ত স্বাস্থ্যকর খাদ্যের বিশ্বস্ত প্রতিষ্ঠান।`,
                `প্রকৃতির আসল বিশুদ্ধতা আপনার পরিবারের কাছে পৌঁছে দিতে ${brand} প্রতিশ্রুতিবদ্ধ।`,
                `ভেজালমুক্ত ও নির্ভেজাল প্রাকৃতিক সুপারফুডের নির্ভরযোগ্য নাম ${brand}।`
            ];
            const middles = [
                `সুন্দরবনের প্রাকৃতিক চাকভাঙা কাঁচা মধু, দেশি গরুর দুধের খাঁটি দানাদার গাওয়া ঘি, কাঠের ঘানিভাঙা সরিষা ও কালোজিরা তেল এবং সৌদি আরবের প্রিমিয়াম আজওয়া ও মরিয়ম খেজুর আমরা সরাসরি মূল উৎস থেকে সংগ্রহ করি।`,
                `আমাদের প্রতিটি খাদ্যপণ্য কোনো প্রকার কৃত্রিম প্রিজারভেটিভ, রঙ বা রাসায়নিক ছাড়াই সম্পূর্ণ স্বাস্থ্যসম্মত উপায়ে প্যাকিং করা হয়।`
            ];
            const closers = [
                `সারা বাংলাদেশে দ্রুত ক্যাশ অন হোম ডেলিভারি এবং শতভাগ কোয়ালিটি গ্যারান্টি নিয়ে ${brand} আপনার পরিবারের সুস্বাস্থ্যের বিশ্বস্ত সঙ্গী।`,
                `গ্রাহকের আস্থা ও ভালোবাসাই আমাদের শক্তি—খাঁটি খাবারের নিশ্চয়তায় ${brand} সর্বদা আপনার পাশে আছে।`
            ];
            return {
                bio: `${pickRandom(hooks)} ${pickRandom(middles)} ${pickRandom(closers)}`,
                categories: [
                    { icon: "🍯", title: "প্রাকৃতিক চাকভাঙা মধু", desc: `${brand} সরবরাহ করে সুন্দরবন ও পাহাড়ি অঞ্চলের ১০০% খাঁটি কাঁচা মধু, যা রোগ প্রতিরোধ ক্ষমতা বাড়াতে অতুলনীয়।` },
                    { icon: "🧈", title: "খাঁটি দানাদার গাওয়া ঘি", desc: `${brand}-এর দেশি গরুর দুধের খাঁটি ঘি আপনার প্রতিদিনের রান্নায় আনে রাজকীয় ঘ্রাণ ও পুষ্টি।` },
                    { icon: "🌱", title: "কাঠের ঘানিভাঙা সরিষা ও কালোজিরা তেল", desc: `কোল্ড-প্রেসড পদ্ধতিতে তৈরি ${brand}-এর খাঁটি তেল হৃদযন্ত্র ও শরীরের জন্য সম্পূর্ণ নিরাপদ।` },
                    { icon: "🌴", title: "প্রিমিয়াম আজওয়া ও মরিয়ম খেজুর", desc: `মদিনা ও মধ্যপ্রাচ্যের সেরা বাগান থেকে বাছাইকৃত তাজা খেজুর সরাসরি পৌঁছে দিচ্ছে ${brand}।` },
                    { icon: "🥜", title: "মিশ্র কাঠবাদাম ও ড্রাই ফ্রুটস", desc: `কাজু, পেস্তা, আখরোট ও আমন্ডের পুষ্টিকর প্যাক যা প্রতিদিনের কর্মশক্তি জোগায়।` },
                    { icon: "🌿", title: "কেমিক্যালমুক্ত অর্গানিক মসলা", desc: `রোদে শুকানো খাঁটি হলুদ, মরিচ ও ধনিয়া গুঁড়া যা আপনার খাবারের প্রাকৃতিক স্বাদ অটুট রাখে।` },
                    { icon: "🫙", title: "সুপারফুড চিয়া সিড ও ইসুবগুল", desc: `ওজন নিয়ন্ত্রণ ও হজমশক্তি বৃদ্ধির জন্য ${brand} নিয়ে এসেছে বাছাইকৃত প্রিমিয়াম গ্রেড সুপারফুড।` },
                    { icon: "🍵", title: "ভেষজ ও অর্গানিক গ্রিন টি", desc: `শরীরকে সতেজ ও টক্সিনমুক্ত রাখতে আমাদের রয়েছে প্রাকৃতিক অ্যান্টিঅক্সিডেন্ট সমৃদ্ধ চা।` },
                    { icon: "🌾", title: "অর্গানিক লাল চাল ও পূর্ণ শস্য", desc: `ফাইবার সমৃদ্ধ ঢেঁকিছাঁটা চাল ও গমের আটা যা ডায়াবেটিস ও সুস্বাস্থ্যের জন্য আদর্শ।` },
                    { icon: "🎁", title: "স্বাস্থ্যকর ফুড গিফট বক্স", desc: `প্রিয়জনকে সুস্থতার উপহার দিতে ${brand} সাজিয়েছে আকর্ষণীয় অর্গানিক ফুড হ্যাম্পার।` }
                ]
            };
        } else {
            const hooks = [
                `Welcome to ${brand} — Your trusted destination for 100% pure, organic, and farm-fresh natural food essentials.`,
                `${brand} brings nature's finest nourishment straight from ethical harvesters to your family table.`,
                `At ${brand}, we believe pure nutrition is the foundation of a healthy life, offering chemical-free superfoods.`
            ];
            const middles = [
                `From raw unfiltered Sundarbans honey and traditional grass-fed clarified ghee to wood-pressed mustard oil, blackseed oil, and imported Medjool & Ajwa dates, every item is lab-vetted for purity.`,
                `We strictly avoid synthetic preservatives, artificial colors, or middlemen—preserving the natural aroma, enzymes, and nutritional value in every jar.`
            ];
            const closers = [
                `With hygienic food-grade packaging and fast nationwide delivery, ${brand} guarantees wholesome authenticity in every bite.`,
                `Thousands of health-conscious families trust ${brand} every day for honest pricing and uncompromised organic quality.`
            ];
            return {
                bio: `${pickRandom(hooks)} ${pickRandom(middles)} ${pickRandom(closers)}`,
                categories: [
                    { icon: "🍯", title: "Raw Forest & Multiflora Honey", desc: `${brand} sources 100% unheated raw honey rich in natural enzymes, antioxidants, and authentic floral taste.` },
                    { icon: "🧈", title: "Artisanal Pure Cow Ghee", desc: `Slow-simmered from cultured grass-fed butter, ${brand} ghee delivers golden texture and rich aroma.` },
                    { icon: "🌱", title: "Cold-Pressed Mustard & Blackseed Oil", desc: `Extracted on traditional wooden presses at low temperatures so ${brand} oils retain full nutritional potency.` },
                    { icon: "🌴", title: "Premium Ajwa & Medjool Dates", desc: `Hand-picked, soft, and nutrient-dense dates imported fresh and sealed cleanly by ${brand}.` },
                    { icon: "🥜", title: "Gourmet Mixed Nuts & Trail Packs", desc: `Crunchy almonds, cashews, pistachios, and walnuts curated by ${brand} for daily heart-healthy energy.` },
                    { icon: "🌿", title: "Stone-Ground Organic Spices", desc: `Zero-filler turmeric, chili, cumin, and mountain herbs processed hygienically under ${brand} supervision.` },
                    { icon: "🫙", title: "Organic Chia, Flax & Super Seeds", desc: `High-fiber omega-rich superfoods from ${brand} designed to boost metabolism and digestive wellness.` },
                    { icon: "🍵", title: "Detox Herbal & Green Teas", desc: `Refreshing botanical infusions selected by ${brand} to support immunity and natural relaxation.` },
                    { icon: "🌾", title: "Unpolished Whole Grains", desc: `Low-GI red rice, rolled oats, and stone-milled flours packed fresh for balanced family meals.` },
                    { icon: "🎁", title: "Healthy Organic Gift Hampers", desc: `${brand} crafts premium eco-friendly nutrition boxes perfect for family festivities and corporate gifting.` }
                ]
            };
        }
    }

    // ------------------------------------------------------------------------
    // THEME 3: COSMETIC & SKINCARE PRODUCTS (UNLIMITED VARIATIONS)
    // ------------------------------------------------------------------------
    if (theme === 3) {
        if (isBangla) {
            const hooks = [
                `${brand} আপনার প্রাকৃতিক সৌন্দর্য ও ত্বকের যত্নে নিয়ে এসেছে ডার্মাটোলজিক্যালি পরীক্ষিত প্রিমিয়াম কসমেটিকস ও স্কিনকেয়ার কালেকশন।`,
                `উজ্জ্বল, স্বাস্থ্যকর ও লাবণ্যময় ত্বকের নির্ভরযোগ্য সঙ্গী হিসেবে ${brand} অফার করছে ১০০% অরিজিনাল বিউটি ও স্কিনকেয়ার পণ্য।`,
                `আধুনিক রূপচর্চায় নিরাপদ ও কার্যকর সমাধান পৌঁছে দিতে ${brand} সবসময় অঙ্গীকারবদ্ধ।`
            ];
            const middles = [
                `প্যারাবেন ও ক্ষতিকর কেমিক্যালমুক্ত ফেস সিরাম, হাইড্রেটিং ময়েশ্চারাইজার, সানস্ক্রিন এবং প্রিমিয়াম মেকআপ পণ্যের মাধ্যমে আমরা আপনার ত্বককে রাখি সতেজ ও প্রাণবন্ত।`,
                `সংবেদনশীল ও সব ধরনের ত্বকের উপযোগী আমাদের প্রতিটি পণ্য সরাসরি অনুমোদিত ডিস্ট্রিবিউটর থেকে যাচাইকৃত।`
            ];
            const closers = [
                `দ্রুত হোম ডেলিভারি ও অথেনটিক গ্যারান্টিসহ ${brand} আপনার প্রতিদিনের রূপচর্চাকে করে তোলে আরও সহজ ও আনন্দময়।`,
                `হাজারো বিউটি-সচেতন গ্রাহকের আস্থা ও ভালোবাসা নিয়ে ${brand} এগিয়ে চলেছে প্রতিদিন।`
            ];
            return {
                bio: `${pickRandom(hooks)} ${pickRandom(middles)} ${pickRandom(closers)}`,
                categories: [
                    { icon: "✨", title: "ব্রাইটনিং ফেস সিরাম", desc: `${brand}-এর ভিটামিন সি ও নিয়াসিনামাইড সিরাম ত্বকের দাগ দূর করে প্রাকৃতিক উজ্জ্বলতা ফিরিয়ে আনে।` },
                    { icon: "🧴", title: "ডিপ হাইড্রেটিং ময়েশ্চারাইজার", desc: `শুষ্ক ও সংবেদনশীল ত্বককে ২৪ ঘণ্টা কোমল রাখতে ${brand} দিচ্ছে বিশেষ ময়েশ্চার ব্যারিয়ার ক্রিম।` },
                    { icon: "☀️", title: "নন-গ্রিজি ইউভি সানস্ক্রিন", desc: `সূর্যের ক্ষতিকর রশ্মি থেকে ত্বককে সুরক্ষিত রাখতে আমাদের রয়েছে SPF 50+ ম্যাট ফিনিশ সানব্লক।` },
                    { icon: "🌿", title: "জেন্টল বোটানিক্যাল ক্লিনজার", desc: `ত্বকের স্বাভাবিক আর্দ্রতা বজায় রেখে গভীর থেকে ময়লা পরিষ্কার করে ${brand}-এর ফেসওয়াশ।` },
                    { icon: "💄", title: "লং-লাস্টিং ভেলভেট লিপস্টিক", desc: `আকর্ষণীয় শেড ও ভিটামিন-ই সমৃদ্ধ লিপ কালার যা ঠোঁটকে রাখে কোমল ও প্রাণবন্ত।` },
                    { icon: "💆‍♀️", title: "অর্গানিক হেয়ার সিরাম ও অয়েল", desc: `চুল পড়া রোধ ও নতুন চুল গজাতে ${brand} নিয়ে এসেছে প্রাকৃতিক হার্বাল হেয়ার ট্রিটমেন্ট।` },
                    { icon: "👁️", title: "ওয়াটারপ্রুফ আই মেকআপ", desc: `স্মাজ-প্রুফ কাজল, আইলাইনার ও মাশকারার এক্সক্লুসিভ কালেকশন এখন ${brand}-এ।` },
                    { icon: "🧖‍♀️", title: "কোরিয়ান গ্লো শিট মাস্ক", desc: `মাত্র ১৫ মিনিটে ক্লান্ত ত্বকে ইনস্ট্যান্ট গ্লাস-স্কিন গ্লো আনতে অনন্য আমাদের শিট মাস্ক।` },
                    { icon: "💅", title: "প্রিমিয়াম নেইল পলিশ ও কেয়ার", desc: `চিপ-রেজিস্ট্যান্ট গ্লসি নেইল কালার ও কিউটিকল অয়েল কালেকশন।` },
                    { icon: "🌸", title: "সিগনেচার পারফিউম ও বডি মিস্ট", desc: `সারাদিন সতেজ সুবাস ধরে রাখতে ${brand} অফার করছে লং-লাস্টিং ফ্রেগরেন্স।` }
                ]
            };
        } else {
            const hooks = [
                `${brand} blends clean dermatological science with luxury beauty to bring out your natural radiance.`,
                `Discover authentic, clinically tested skincare and high-performance cosmetics curated exclusively at ${brand}.`,
                `At ${brand}, we empower your daily self-care routine with gentle, toxin-free formulations built for lasting glow.`
            ];
            const middles = [
                `Every serum, barrier moisturizer, broad-spectrum sunscreen, and velvet lip color at ${brand} is 100% cruelty-free, paraben-free, and vetted for visible results.`,
                `We partner directly with certified labs and global beauty innovators so you never have to worry about counterfeits or harsh irritants.`
            ];
            const closers = [
                `With climate-safe packaging and rapid doorstep delivery, ${brand} is your trusted partner in modern skincare.`,
                `Join thousands of glowing customers who rely on ${brand} for authentic beauty essentials every single day.`
            ];
            return {
                bio: `${pickRandom(hooks)} ${pickRandom(middles)} ${pickRandom(closers)}`,
                categories: [
                    { icon: "✨", title: "Active Radiance Face Serums", desc: `${brand} delivers concentrated Vitamin C, Hyaluronic Acid, and Peptide serums for luminous glass skin.` },
                    { icon: "🧴", title: "Barrier-Repair Moisturizers", desc: `Lock in 24-hour hydration with ${brand}'s ceramide-infused lightweight creams and gels.` },
                    { icon: "☀️", title: "Invisible SPF 50+ Sunscreens", desc: `Zero-white-cast broad-spectrum UV defense engineered by ${brand} for daily outdoor protection.` },
                    { icon: "🌿", title: "pH-Balanced Botanical Cleansers", desc: `Gently dissolve makeup and impurities without stripping natural skin oils with ${brand}.` },
                    { icon: "💄", title: "Velvet Matte & Satin Lipsticks", desc: `Richly pigmented, transfer-proof lip colors infused with nourishing botanical butters.` },
                    { icon: "💆‍♀️", title: "Scalp & Hair Revitalizing Elixirs", desc: `${brand} strengthens roots and restores silky shine with rosemary and biotin hair oils.` },
                    { icon: "👁️", title: "Precision Eye Makeup & Mascara", desc: `Waterproof liners, brow sculptors, and volumizing mascaras for all-day definition.` },
                    { icon: "🧖‍♀️", title: "Hydro-Glow Korean Sheet Masks", desc: `Soothing centella and collagen masks curated by ${brand} for instant skin recovery.` },
                    { icon: "💅", title: "Salon-Grade Nail Lacquers", desc: `High-gloss, chip-resistant formulas in modern seasonal shades.` },
                    { icon: "🌸", title: "Artisanal Body Mists & Perfumes", desc: `Captivating floral and woody scent profiles crafted for lasting confidence.` }
                ]
            };
        }
    }

    // ------------------------------------------------------------------------
    // THEME 4: JEWELLERY PRODUCTS (UNLIMITED VARIATIONS)
    // ------------------------------------------------------------------------
    if (theme === 4) {
        if (isBangla) {
            const hooks = [
                `${brand} মানেই আভিজাত্য, শৈল্পিক নকশা এবং নিখুঁত কারুকার্যের অপূর্ব সমন্বয়।`,
                `আপনার প্রতিটি বিশেষ মুহূর্তকে রাজকীয় দ্যুতিতে রাঙিয়ে তুলতে ${brand} নিয়ে এসেছে এক্সক্লুসিভ জুয়েলারি কালেকশন।`,
                `ঐতিহ্যবাহী গহনা থেকে শুরু করে আধুনিক ফ্যাশন জুয়েলারির বিশ্বস্ত প্রতিষ্ঠান ${brand}।`
            ];
            const middles = [
                `ট্র্যাডিশনাল ব্রাইডাল সেট, মিনিম্যালিস্ট গোল্ড-প্লেটেড চেইন, ডায়মন্ড-কাট রিং ও প্রিমিয়াম স্টোন জুয়েলারি—প্রতিটি গহনা আমরা তৈরি করি সর্বোচ্চ মান ও অ্যান্টি-টার্নিশ ফিনিশিং দিয়ে।`,
                `আমাদের দক্ষ কারিগরদের নিখুঁত হাতের ছোঁয়ায় প্রতিটি নেকলেস, দুল ও চুড়ি পায় অনন্য নান্দনিক রূপ।`
            ];
            const closers = [
                `প্রিমিয়াম ভেলভেট গিফট বক্স এবং সারা দেশে নিরাপদ ডেলিভারিসহ ${brand} আপনার সৌন্দর্যের সেরা সঙ্গী।`,
                `রঙের স্থায়িত্ব ও শতভাগ কোয়ালিটি নিশ্চয়তায় হাজারো গ্রাহকের প্রথম পছন্দ ${brand}।`
            ];
            return {
                bio: `${pickRandom(hooks)} ${pickRandom(middles)} ${pickRandom(closers)}`,
                categories: [
                    { icon: "💍", title: "ডায়মন্ড-কাট সলিটেয়ার রিং", desc: `${brand}-এর নিখুঁত ফিনিশিংয়ের আংটি প্রতিটি বিশেষ মুহূর্তকে করে তোলে চিরস্মরণীয়।` },
                    { icon: "👑", title: "রাজকীয় ব্রাইডাল নেকলেস সেট", desc: `বিয়ে ও জমকালো আয়োজনের জন্য ${brand}-এর রয়েছে এক্সক্লুসিভ হ্যান্ডক্রাফটেড ব্রাইডাল গহনা।` },
                    { icon: "✨", title: "১৮ ক্যারেট গোল্ড-প্লেটেড চেইন", desc: `প্রতিদিন ব্যবহারের উপযোগী ওয়াটার-রেজিস্ট্যান্ট ও অ্যান্টি-টার্নিশ লকেট ও চেইন।` },
                    { icon: "💎", title: "ন্যাচারাল রত্নপাথর ও জেমস্টোন", desc: `সার্টিফাইড প্রিমিয়াম স্টোন ও জিরকন বসানো আভিজাত্যময় জুয়েলারি কালেকশন।` },
                    { icon: "👂", title: "ট্রেন্ডি ঝুমকা ও স্টাড ইয়াররিংস", desc: `দেশি ও ওয়েস্টার্ন উভয় পোশাকের সাথে মানানসই হালকা ওজনের আকর্ষণীয় দুল।` },
                    { icon: "💫", title: "ডিজাইনার ব্রেসলেট ও চুড়ি", desc: `হাতের সৌন্দর্য বাড়াতে ${brand} এনেছে মডার্ন কাফ ব্রেসলেট ও কুন্দনের বালা।` },
                    { icon: "👰", title: "ঐতিহ্যবাহী কুন্দন ও মিনাকারি", desc: `নিখুঁত কারিগরি দক্ষতায় তৈরি মুঘল ধাঁচের মিনাকারি ও পোলকি গহনা।` },
                    { icon: "🌸", title: "মিনিম্যালিস্ট অফিস ওয়্যার গহনা", desc: `সিম্পল ও এলিগ্যান্ট লুকের জন্য ${brand}-এর হালকা ডিজাইনের ডেইলি জুয়েলারি।` },
                    { icon: "🎁", title: "লাক্সারি ভেলভেট গিফট বক্স", desc: `প্রিয়জনকে উপহার দেওয়ার জন্য প্রতিটি গহনা আসে প্রিমিয়াম সিগনেচার বক্সে।` },
                    { icon: "🛡️", title: "লং-লাস্টিং কালার গ্যারান্টি", desc: `ঘাম ও পানিতেও উজ্জ্বলতা অটুট রাখতে ${brand} ব্যবহার করে উন্নত মাইক্রো-প্লেটিং প্রযুক্তি।` }
                ]
            };
        } else {
            const hooks = [
                `${brand} crafts timeless fine jewellery and modern statement pieces designed to celebrate every moment.`,
                `Welcome to ${brand} — where heritage goldsmithing meets contemporary minimalist luxury.`,
                `Elevate your personal style with ${brand}'s curated collection of anti-tarnish, artisanal jewellery.`
            ];
            const middles = [
                `Combining hypoallergenic precious metals, 18k PVD gold plating, and precision-cut cubic zirconia & gemstones, ${brand} delivers heirloom-grade brilliance.`,
                `Every ring, necklace, and earring at ${brand} is hand-inspected for stone security, mirror polish, and featherlight comfort.`
            ];
            const closers = [
                `Shipped in signature velvet keepsake boxes with insured delivery, ${brand} makes luxury effortless.`,
                `From bridal grandeur to everyday elegance, ${brand} is trusted by jewellery lovers nationwide.`
            ];
            return {
                bio: `${pickRandom(hooks)} ${pickRandom(middles)} ${pickRandom(closers)}`,
                categories: [
                    { icon: "💍", title: "Precision-Cut Solitaire Rings", desc: `${brand} hand-sets radiant stones in durable, skin-safe bands built for everyday elegance.` },
                    { icon: "👑", title: "Royal Bridal Necklace Ensembles", desc: `Intricate chokers and layered bridal sets crafted by ${brand} master artisans.` },
                    { icon: "✨", title: "18K Gold-Plated Minimalist Chains", desc: `Tarnish-resistant, waterproof everyday pendants and layering necklaces from ${brand}.` },
                    { icon: "💎", title: "Certified Gemstone Treasures", desc: `Vibrant emerald, ruby, and sapphire-inspired creations inspected for clarity.` },
                    { icon: "👂", title: "Statement Jhumkas & Drop Earrings", desc: `Featherlight comfort meets dazzling movement in ${brand}'s curated earring collection.` },
                    { icon: "💫", title: "Luxury Cuffs & Stackable Bangles", desc: `Precision-clasped wristwear designed to complement both festive and formal attire.` },
                    { icon: "👰", title: "Heritage Kundan & Pearl Sets", desc: `Timeless cultural artistry reimagined by ${brand} for modern celebrations.` },
                    { icon: "🌸", title: "Hypoallergenic Daily Wear", desc: `100% nickel-free and lead-free pieces safe for the most sensitive skin.` },
                    { icon: "🎁", title: "Signature Velvet Keepsake Boxes", desc: `Every ${brand} order arrives in presentation-ready luxury gift packaging.` },
                    { icon: "🛡️", title: "Lifetime Luster & Care Support", desc: `Protected with advanced PVD coating so your ${brand} jewellery stays brilliant for years.` }
                ]
            };
        }
    }

    // ------------------------------------------------------------------------
    // THEME 5: CLOTHING & FASHION APPAREL (UNLIMITED VARIATIONS)
    // ------------------------------------------------------------------------
    if (theme === 5) {
        if (isBangla) {
            const hooks = [
                `${brand} আধুনিক ফ্যাশন ও আরামদায়ক পোশাকের এক অনন্য ঠিকানা।`,
                `ট্রেন্ডি ডিজাইন ও প্রিমিয়াম ফেব্রিকের সমন্বয়ে আপনার প্রতিদিনের স্টাইলকে নতুন মাত্রা দেয় ${brand}।`,
                `পরিবারের সবার জন্য মানসম্মত ও রুচিশীল পোশাকের বিশ্বস্ত ব্র্যান্ড ${brand}।`
            ];
            const middles = [
                `১০০% প্রিমিয়াম কম্বড কটন, উন্নত স্টিচিং এবং নিখুঁত কালার ফিনিশিংয়ে আমরা তৈরি করি নারী, পুরুষ ও শিশুদের জন্য এক্সক্লুসিভ ক্যাজুয়াল, ফর্মাল ও এথনিক পোশাক।`,
                `প্রতিটি পোশাকের কাপড়, সেলাই ও সাইজ মেজারমেন্ট আমাদের কোয়ালিটি টিম দ্বারা নিখুঁতভাবে যাচাই করা হয়।`
            ];
            const closers = [
                `সহজ সাইজ এক্সচেঞ্জ সুবিধা ও দ্রুত ডেলিভারিসহ ${brand} প্রতিটি ঋতুতে আপনাকে দেয় আত্মবিশ্বাসী লুক।`,
                `সাশ্রয়ী মূল্যে সেরা ফ্যাশন অভিজ্ঞতা দিতে ${brand} সবসময় আপনার পাশে রয়েছে।`
            ];
            return {
                bio: `${pickRandom(hooks)} ${pickRandom(middles)} ${pickRandom(closers)}`,
                categories: [
                    { icon: "👕", title: "প্রিমিয়াম কটন টি-শার্ট ও পোলো", desc: `${brand}-এর ব্রিদেবল ফেব্রিকের টি-শার্ট গরমে দেয় সর্বোচ্চ আরাম ও নিখুঁত ফিটিং।` },
                    { icon: "👗", title: "ডিজাইনার কুর্তি ও থ্রি-পিস", desc: `আধুনিক প্রিন্ট ও সূক্ষ্ম এমব্রয়ডারির সমন্বয়ে তৈরি ${brand}-এর ফেস্টিভ কালেকশন।` },
                    { icon: "👔", title: "এক্সিকিউটিভ ফর্মাল ও ক্যাজুয়াল শার্ট", desc: `অফিস বা যেকোনো অনুষ্ঠানের জন্য আয়রন-ফ্রি প্রিমিয়াম ফিনিশিং শার্ট।` },
                    { icon: "👖", title: "স্ট্রেচেবল ডেনিম ও চিনো প্যান্ট", desc: `সারাদিন স্বাচ্ছন্দ্যে চলাফেরার জন্য ${brand} এনেছে টেকসই ও আরামদায়ক ট্রাউজার।` },
                    { icon: "🧥", title: "উইন্টার হুডি ও জ্যাকেট", desc: `শীতের ফ্যাশনে উষ্ণতা ও স্টাইল যোগ করতে প্রিমিয়াম ফ্লিস কাপড়ের আউটওয়্যার।` },
                    { icon: "🥻", title: "ঐতিহ্যবাহী জামদানি ও সিল্ক শাড়ি", desc: `বাংলার ঐতিহ্যবাহী বুনন ও আধুনিক রঙের ছোঁয়ায় সাজানো ${brand}-এর শাড়ি সম্ভার।` },
                    { icon: "🩳", title: "স্পোর্টস ও অ্যাক্টিভওয়্যার", desc: `জিম ও অনুশীলনের জন্য ঘাম-শোষক ও দ্রুত শুকানো ফেব্রিকের ট্র্যাকসুট।` },
                    { icon: "👶", title: "শিশুদের কোমল সুতি পোশাক", desc: `বাচ্চাদের সংবেদনশীল ত্বকের জন্য ১০০% অর্গানিক কটনে তৈরি কিউট পোশাক।` },
                    { icon: "🧣", title: "মডেস্ট হিজাব, স্টোল ও ওড়না", desc: `প্রিমিয়াম শিফন ও জর্জেট ফেব্রিকের আরামদায়ক ও আকর্ষণীয় কালেকশন।` },
                    { icon: "📏", title: "নিখুঁত সাইজ ও সহজ এক্সচেঞ্জ", desc: `${brand}-এ পাচ্ছেন স্ট্যান্ডার্ড সাইজ চার্ট এবং ডেলিভারির পর সহজ সাইজ এক্সচেঞ্জ সুবিধা।` }
                ]
            };
        } else {
            const hooks = [
                `${brand} redefines modern wardrobe essentials by uniting breathable luxury fabrics, tailored silhouettes, and enduring craftsmanship.`,
                `Step into effortless confidence with ${brand} — your premier destination for contemporary fashion and ethnic wear.`,
                `At ${brand}, every garment is designed to balance timeless aesthetics with all-day wearable comfort.`
            ];
            const middles = [
                `From heavyweight combed-cotton basics and wrinkle-free formal shirts to festive handloom ensembles, ${brand} sources only grade-A textiles.`,
                `Every stitch, dye lot, and size spec undergoes multi-point inspection so your clothes retain their fit and color wash after wash.`
            ];
            const closers = [
                `Backed by fast dispatch and hassle-free size exchanges, ${brand} makes upgrading your wardrobe seamless.`,
                `Thousands of fashion-forward shoppers choose ${brand} for uncompromised quality and honest value.`
            ];
            return {
                bio: `${pickRandom(hooks)} ${pickRandom(middles)} ${pickRandom(closers)}`,
                categories: [
                    { icon: "👕", title: "Heavyweight Combed Cotton Tees", desc: `Pre-shrunk, fade-resistant tees and polos crafted by ${brand} for all-day comfort.` },
                    { icon: "👗", title: "Contemporary Ethnic & Fusion Wear", desc: `Artisanal embroidery and vibrant prints tailored for effortless elegance.` },
                    { icon: "👔", title: "Wrinkle-Resistant Formal Shirts", desc: `Sharp collars and breathable micro-weaves designed by ${brand} for modern professionals.` },
                    { icon: "👖", title: "Flex-Fit Denim & Tailored Chinos", desc: `Engineered with 4-way stretch so your ${brand} trousers move with you seamlessly.` },
                    { icon: "🧥", title: "Premium Fleece Hoodies & Outerwear", desc: `Cozy thermal insulation paired with clean, modern streetwear aesthetics.` },
                    { icon: "🥻", title: "Handloom Silks & Festive Drapes", desc: `Celebrate heritage craftsmanship with ${brand}'s curated festive collection.` },
                    { icon: "🩳", title: "Moisture-Wicking Activewear", desc: `High-performance athletic sets built for breathability and durability.` },
                    { icon: "👶", title: "Organic Cotton Kids' Apparel", desc: `Ultra-soft, skin-friendly outfits designed for active little ones.` },
                    { icon: "🧣", title: "Luxury Scarves, Stoles & Accessories", desc: `Elevate any outfit with ${brand}'s lightweight drapes and finishing touches.` },
                    { icon: "📏", title: "Precision Sizing & Easy Exchanges", desc: `Every ${brand} garment undergoes strict measurement QC backed by hassle-free size swaps.` }
                ]
            };
        }
    }

    // ------------------------------------------------------------------------
    // THEME 1: DROPSHIPPING & FAST FULFILLMENT (UNLIMITED VARIATIONS)
    // ------------------------------------------------------------------------
    if (isBangla) {
        const bnHooks = [
            `${brand} ছোট থেকে বড় প্রতিটি অনলাইন ব্যবসায় আধুনিক প্রযুক্তি এবং দ্রুত ফুলফিলমেন্ট সেবার নিখুঁত সমন্বয় নিয়ে এসেছে।`,
            `${brand}-এর মাধ্যমে আপনার ই-কমার্স স্টোরের প্রোডাক্ট সোর্সিং, স্টক ম্যানেজমেন্ট এবং ডেলিভারি এখন এক জায়গায় আরও সহজ ও গতিশীল।`,
            `আধুনিক অটোমেশন এবং নির্ভরযোগ্য সাপ্লাই চেইনের সমন্বয়ে ${brand} আপনার ব্যবসাকে প্রতিদিন আরও লাভজনক ও বিশ্বস্ত করে তোলে।`
        ];
        const bnMiddles = [
            `আমাদের অভিজ্ঞ টিম প্রতিটি অর্ডার নিখুঁতভাবে যাচাই ও প্যাকিং করে, যাতে আপনার গ্রাহক সঠিক সময়ে সঠিক পণ্যটি হাতে পান।`,
            `স্বচ্ছ প্রাইসিং এবং কোনো লুকানো চার্জ ছাড়াই আমরা ক্ষুদ্র উদ্যোক্তা থেকে শুরু করে প্রতিষ্ঠিত ব্র্যান্ডগুলোর চাহিদা অনুযায়ী সমাধান তৈরি করি।`
        ];
        const bnClosers = [
            `দ্রুত ও নিরাপদ ডেলিভারি নেটওয়ার্কের মাধ্যমে ${brand} আপনার ব্যবসাকে পৌঁছে দেয় প্রতিটি প্রান্তে।`,
            `হাজারো সন্তুষ্ট মার্চেন্ট ও গ্রাহকের আস্থা আমাদের প্রতিদিন আরও উন্নত সেবা দিতে অনুপ্রাণিত করে।`
        ];
        return {
            bio: `${pickRandom(bnHooks)} ${pickRandom(bnMiddles)} ${pickRandom(bnClosers)}`,
            categories: [
                { icon: "📦", title: "Product sourcing", desc: `${brand} জনপ্রিয় পণ্য বাছাই থেকে শুরু করে ভেরিফায়েড সাপ্লাইয়ারের সাথে যোগাযোগ সহজ করে তোলে।` },
                { icon: "📊", title: "Inventory management", desc: `${brand} আপনার স্টোরের পণ্যের তালিকা এবং স্টক প্ল্যানিং এক জায়গায় সুশৃঙ্খল রাখে।` },
                { icon: "🚚", title: "Order fulfilment", desc: `অর্ডার আসার সাথে সাথে প্যাকিং এবং দ্রুত শিপিংয়ের প্রতিটি ধাপ পরিচালনা করে ${brand}।` },
                { icon: "🔍", title: "Shipment tracking", desc: `${brand}-এর মাধ্যমে অর্ডারের অগ্রগতি এবং লাইভ ডেলিভারি স্ট্যাটাস সহজেই ট্র্যাক করা যায়।` },
                { icon: "🏷️", title: "Branded packaging", desc: `আপনার নিজস্ব ব্র্যান্ডের লোগো ও কাস্টম প্যাকেজিংকে সর্বোচ্চ গুরুত্ব দেয় ${brand}।` },
                { icon: "📈", title: "Sales analytics", desc: `প্রোডাক্ট ও অর্ডারের লাইভ ডেটা বিশ্লেষণ করে পরবর্তী সেলস পরিকল্পনা করতে সাহায্য করে ${brand}।` },
                { icon: "🤝", title: "Supplier coordination", desc: `${brand} সরাসরি প্রস্তুতকারকদের ওয়ার্কফ্লো সমন্বয় করে যাতে অর্ডার দ্রুত প্রস্তুত হয়।` },
                { icon: "🛒", title: "Online catalogue", desc: `${brand} ক্রেতাদের জন্য পণ্যের বিবরণ, হোলসেল মূল্য ও প্রফিট মার্জিন স্পষ্টভাবে তুলে ধরে।` },
                { icon: "💬", title: "Customer communication", desc: `যেকোনো প্রশ্ন বা আপডেটে সপ্তাহে ৭ দিন দ্রুত ও আন্তরিক সাপোর্ট নিশ্চিত করে ${brand}।` },
                { icon: "📈", title: "Growth planning", desc: `নতুন ট্রেন্ডিং পণ্য এবং দ্রুত ডেলিভারি নেটওয়ার্কের মাধ্যমে আপনার ব্যবসার টেকসই প্রবৃদ্ধি ঘটায় ${brand}।` }
            ]
        };
    } else {
        const enHooks = [
            `${brand} From small to large ${brand} brings the perfect blend of modern technology and caring service to every business.`,
            `${brand} simplifies every part of your online business in one place — products, orders, and fulfilment are now within easy reach.`,
            `With ${brand}, your products reach the right customer at the right time — that is our promise on every single order.`
        ];
        const enMiddles = [
            `By combining modern technology with caring service, ${brand} grows more reliable every day. Our experienced team oversees every order personally, so your customer receives the right product on time.`,
            `From small entrepreneurs to established brands we shape solutions around what each business needs with transparent pricing and zero hidden charges.`
        ];
        const enClosers = [
            `${brand} has one goal: to make your business growth sustainable, automated, and highly profitable.`,
            `The trust of thousands of satisfied merchants inspires ${brand} to deliver faster and better every single day.`
        ];
        return {
            bio: `${pickRandom(enHooks)} ${pickRandom(enMiddles)} ${pickRandom(enClosers)}`,
            categories: [
                { icon: "📦", title: "Product sourcing", desc: `${brand} simplifies sourcing, from picking popular products to contacting suppliers. For any question or issue, our customer support team is with you seven days a week.` },
                { icon: "📊", title: "Inventory management", desc: `${brand} keeps your store's product list and stock planning organised in one place. By combining modern technology with caring service, ${brand} grows more reliable every day.` },
                { icon: "🚚", title: "Order fulfilment", desc: `${brand} helps you manage every step of packing and shipping once an order arrives. From small entrepreneurs to established brands we shape solutions around what each business needs.` },
                { icon: "🔍", title: "Shipment tracking", desc: `With ${brand}, order progress and delivery status are easy to follow. Every product is quality-checked before dispatch, so buyer trust always stays strong.` },
                { icon: "🏷️", title: "Branded packaging", desc: `${brand} gives importance to packaging that shows off your own brand. The love of thousands of satisfied customers inspires us to do better every single day.` },
                { icon: "📈", title: "Sales analytics", desc: `${brand} helps you understand product and order data to plan your next sales moves. Cash on delivery and easy returns make every purchase completely hassle-free.` },
                { icon: "🤝", title: "Supplier coordination", desc: `${brand} keeps supplier workflows organised so orders are easier to prepare. ${brand} has one goal to make your business growth sustainable and profitable.` },
                { icon: "🛒", title: "Online catalogue", desc: `${brand} presents product details, prices and choices clearly for shoppers. Our experienced team oversees every order personally, so your customer receives the right product on time.` },
                { icon: "💬", title: "Customer communication", desc: `${brand} values clear communication with customers on questions and updates. Transparent pricing with no hidden charges ${brand} believes honest business is the key to long-term success.` },
                { icon: "📈", title: "Growth planning", desc: `${brand} helps you plan around new products, orders and customer demand. Through a fast and secure delivery network, we take your business to every district.` }
            ]
        };
    }
}

// ============================================================================
// ADMIN UI CONTROLLERS (STRICT SAVE-ONLY COMMIT RULE!)
// ============================================================================

let latestGeneratedCategories = [];

window.populateAdminFieldsFromSaved = function() {
    let data = null;
    try {
        const raw = localStorage.getItem("app_store_data");
        if (raw) data = JSON.parse(raw);
    } catch (e) {}

    const savedName = (data && data.businessName) ? data.businessName : "OstaraStock Pvt Ltd";
    const savedEmail = (data && data.businessEmail) ? data.businessEmail : "info@ostarastock.shop";
    const savedPhone = (data && data.mobileNumber) ? data.mobileNumber : "+94741987700";
    const savedAddress = (data && data.businessAddress) ? data.businessAddress : "Floor 14, Colpetty Central Point, No. 45 Galle Road, Colombo 03, 00300, Western Province, Sri Lanka";
    const savedBio = (data && data.businessDescription) ? data.businessDescription : "";

    if (document.getElementById("admBizName")) document.getElementById("admBizName").value = savedName;
    if (document.getElementById("admBizEmail")) document.getElementById("admBizEmail").value = savedEmail;
    if (document.getElementById("admBizPhone")) document.getElementById("admBizPhone").value = savedPhone;
    if (document.getElementById("admBizAddress")) document.getElementById("admBizAddress").value = savedAddress;
    if (document.getElementById("admBizBio")) document.getElementById("admBizBio").value = savedBio;

    if (document.getElementById("admMetaTitle")) {
        document.getElementById("admMetaTitle").value = (data && data.metaTitle) ? data.metaTitle : `${savedName} — Dropshipping fulfillment built for speed`;
    }
    if (document.getElementById("admMetaDesc")) {
        document.getElementById("admMetaDesc").value = (data && data.metaDescription) ? data.metaDescription : "Source winning products and fulfill orders in days, not weeks, with a US-stocked catalog and automated logistics.";
    }

    if (data && data.theme) {
        window.selectAdminThemeOption(data.theme);
    }

    const activeLogo = (data && data.businessLogo) ? data.businessLogo : generateAICanvasLogoPNG(savedName, aiLogoStyleCursor);
    const activeFavicon = (data && data.faviconImage) ? data.faviconImage : activeLogo;

    window.pendingLogoSvgDataUrl = activeLogo;
    window.pendingFaviconDataUrl = activeFavicon;

    updateSavedAdminTopBar(savedName, activeLogo);
    updateFormOnlyLogoAndFaviconPreviews(activeLogo, activeFavicon);

    const extraBtns = document.getElementById("admGeneratedLogoActions");
    if (extraBtns) extraBtns.style.setProperty("display", "none", "important");

    const catSheet = document.getElementById("admGeneratedCatCard");
    if (catSheet) catSheet.style.display = "none";
};

// "+ Generate Description" Button Handler (Themes 1-5 = AI Generation, Theme 6 Custom = Manual Editable Text Box!)
window.handleAdminGenerateBioClick = function(btnEl) {
    if (typeof triggerButtonPulse === "function") triggerButtonPulse(btnEl);

    const themeNum = window.activeAdminThemeNumber || 1;

    // IF CUSTOM (THEME 6) IS SELECTED: Do NOT generate AI text! Open Editable Custom Text Box instead!
    if (themeNum === 6) {
        renderCustomManualDescriptionMode();
        const bioEl = document.getElementById("admBizBio");
        if (bioEl) bioEl.focus();
        return;
    }

    const nameInput = document.getElementById("admBizName");
    const storeName = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : "OstaraStock Pvt Ltd";
    const isBangla = document.getElementById("admLangBnRadio") && document.getElementById("admLangBnRadio").checked;

    if (btnEl) {
        const originalText = btnEl.innerHTML;
        btnEl.innerHTML = `⏳ Generating...`;
        btnEl.disabled = true;

        setTimeout(() => {
            const generated = generateUnlimitedThemeContent(storeName, themeNum, isBangla);
            latestGeneratedCategories = generated.categories;

            const bioEl = document.getElementById("admBizBio");
            if (bioEl) bioEl.value = generated.bio;

            const headingEl = document.getElementById("admGenCatHeading");
            if (headingEl) {
                headingEl.innerText = `Generated category descriptions Theme ${themeNum}`;
            }

            const listEl = document.getElementById("admGenCatList");
            if (listEl) {
                listEl.className = "admin-cat-list-wrap";
                listEl.style.background = "#ffffff";
                listEl.style.border = "none";
                listEl.style.padding = "0";
                listEl.innerHTML = generated.categories.map(item => `
                    <div style="padding-bottom: 10px; border-bottom: 1px solid #f1f5f9;">
                        <div style="font-size: 0.85rem; font-weight: 800; color: #0f172a; margin-bottom: 3px;">${item.icon} ${item.title}</div>
                        <div style="font-size: 0.82rem; color: #334155; line-height: 1.55;">${item.desc}</div>
                    </div>
                `).join("");
            }

            const sheet = document.getElementById("admGeneratedCatCard");
            if (sheet) sheet.style.display = "block";

            btnEl.innerHTML = originalText;
            btnEl.disabled = false;
        }, 280);
    }
};

window.handleAdminGenerateLogoAgain = function(btnEl) {
    if (typeof triggerButtonPulse === "function") triggerButtonPulse(btnEl);

    aiLogoStyleCursor++;
    const nameInput = document.getElementById("admBizName");
    const storeName = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : "OstaraStock Pvt Ltd";

    const pngDataUrl = generateAICanvasLogoPNG(storeName, aiLogoStyleCursor);
    window.pendingLogoSvgDataUrl = pngDataUrl;
    window.pendingFaviconDataUrl = pngDataUrl;

    updateFormOnlyLogoAndFaviconPreviews(pngDataUrl, pngDataUrl);

    const extraBtns = document.getElementById("admGeneratedLogoActions");
    if (extraBtns) {
        extraBtns.style.setProperty("display", "inline-flex", "important");
    }
};

window.applyGeneratedAsLogoOnly = function(btnEl) {
    if (typeof triggerButtonPulse === "function") triggerButtonPulse(btnEl);
    if (window.pendingLogoSvgDataUrl) {
        const siteBox = document.getElementById("admSiteLogoPreviewBox");
        if (siteBox) siteBox.innerHTML = `<img src="${window.pendingLogoSvgDataUrl}" alt="Site Logo">`;
    }
};

window.applyGeneratedAsFaviconOnly = function(btnEl) {
    if (typeof triggerButtonPulse === "function") triggerButtonPulse(btnEl);
    if (window.pendingLogoSvgDataUrl) {
        window.pendingFaviconDataUrl = window.pendingLogoSvgDataUrl;
        const favBox = document.getElementById("admFaviconPreviewBox");
        if (favBox) favBox.innerHTML = `<img src="${window.pendingLogoSvgDataUrl}" alt="Favicon">`;
    }
};

window.downloadAndUseLogoAndFavicon = function(btnEl) {
    if (typeof triggerButtonPulse === "function") triggerButtonPulse(btnEl);
    const nameInput = document.getElementById("admBizName");
    const storeName = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : "store";

    if (!window.pendingLogoSvgDataUrl) {
        window.pendingLogoSvgDataUrl = generateAICanvasLogoPNG(storeName, aiLogoStyleCursor);
    }
    window.pendingFaviconDataUrl = window.pendingLogoSvgDataUrl;

    updateFormOnlyLogoAndFaviconPreviews(window.pendingLogoSvgDataUrl, window.pendingFaviconDataUrl);
    triggerHighResPngDownload(window.pendingLogoSvgDataUrl, storeName);
};

window.removeAdminLogo = function(btnEl) {
    if (typeof triggerButtonPulse === "function") triggerButtonPulse(btnEl);
    window.pendingLogoSvgDataUrl = null;
    const siteBox = document.getElementById("admSiteLogoPreviewBox");
    if (siteBox) siteBox.innerHTML = "";
    const extraBtns = document.getElementById("admGeneratedLogoActions");
    if (extraBtns) extraBtns.style.setProperty("display", "none", "important");
};

window.removeAdminFavicon = function(btnEl) {
    if (typeof triggerButtonPulse === "function") triggerButtonPulse(btnEl);
    window.pendingFaviconDataUrl = null;
    const favBox = document.getElementById("admFaviconPreviewBox");
    if (favBox) favBox.innerHTML = "";
};

window.handleAdminSaveChangesClick = function(btnEl) {
    if (typeof triggerButtonPulse === "function") triggerButtonPulse(btnEl);

    const name = (document.getElementById("admBizName")?.value || "").trim();
    const email = (document.getElementById("admBizEmail")?.value || "").trim();
    const phone = (document.getElementById("admBizPhone")?.value || "").trim();
    const address = (document.getElementById("admBizAddress")?.value || "").trim();
    const bio = (document.getElementById("admBizBio")?.value || "").trim();
    const metaTitle = (document.getElementById("admMetaTitle")?.value || "").trim();
    const metaDesc = (document.getElementById("admMetaDesc")?.value || "").trim();
    const fbPixel = (document.getElementById("admFbPixel")?.value || "").trim();
    const gtmId = (document.getElementById("admGtmId")?.value || "").trim();
    const fbVerify = (document.getElementById("admFbVerify")?.value || "").trim();
    const isLive = document.getElementById("admWebLiveToggle") ? document.getElementById("admWebLiveToggle").checked : true;

    let saved = {};
    try {
        saved = JSON.parse(localStorage.getItem("app_store_data") || "{}");
    } catch (e) {}

    const finalLogo = window.pendingLogoSvgDataUrl || generateAICanvasLogoPNG(name || "OstaraStock Pvt Ltd", aiLogoStyleCursor);
    const finalFavicon = window.pendingFaviconDataUrl || finalLogo;

    saved.businessName = name;
    saved.name = name;
    saved.slug = createCleanStoreSlug(name) || "store";
    saved.businessEmail = email;
    saved.email = email;
    saved.mobileNumber = phone;
    saved.mobile = phone;
    saved.businessAddress = address;
    saved.address = address;
    saved.businessDescription = bio;
    saved.description = bio;
    saved.metaTitle = metaTitle || `${name} — Dropshipping fulfillment built for speed`;
    saved.metaDescription = metaDesc;
    saved.fbPixelId = fbPixel;
    saved.gtmId = gtmId;
    saved.fbDomainVerification = fbVerify;
    saved.isWebsiteLive = isLive;
    saved.theme = window.activeAdminThemeNumber || 1;
    saved.businessLogo = finalLogo;
    saved.logoImage = finalLogo;
    saved.faviconImage = finalFavicon;

    // Save custom category text if Custom mode (6) was used, otherwise save generated categories
    const customCatInput = document.getElementById("admCustomCategoryTextarea");
    if (window.activeAdminThemeNumber === 6 && customCatInput) {
        saved.customCategoryText = customCatInput.value.trim();
    } else if (latestGeneratedCategories.length > 0) {
        saved.categoryDescriptions = latestGeneratedCategories;
    }

    saveStoreData(saved.slug, saved);

    const displayTitle = name || "OstaraStock Pvt Ltd";
    updateSavedAdminTopBar(displayTitle, finalLogo);
    updateFormOnlyLogoAndFaviconPreviews(finalLogo, finalFavicon);

    const catSheet = document.getElementById("admGeneratedCatCard");
    if (catSheet) catSheet.style.display = "none";

    const extraBtns = document.getElementById("admGeneratedLogoActions");
    if (extraBtns) extraBtns.style.setProperty("display", "none", "important");

    const moreContainer = document.getElementById("admMoreSettingsContainer");
    const moreLabel = document.getElementById("admMoreSettingsBtnLabel");
    if (moreContainer) moreContainer.style.display = "none";
    if (moreLabel) moreLabel.innerText = "⚙ More settings";

    if (typeof updateBrowserTabFavicon === "function") updateBrowserTabFavicon(finalFavicon);
    if (name && typeof applyLiveUrlMasking === "function") applyLiveUrlMasking(name);
    if (typeof syncAdminDataToHome === "function") syncAdminDataToHome();
    if (typeof applyGlobalStoreData === "function") applyGlobalStoreData();

    const banner = document.getElementById("adminSavedGreenBanner");
    if (banner) {
        banner.style.display = "block";
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => {
            banner.style.display = "none";
        }, 4000);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const extraBtns = document.getElementById("admGeneratedLogoActions");
    if (extraBtns) extraBtns.style.setProperty("display", "none", "important");

    const adminLogoEl = document.getElementById("adminTopLogoPreview");
    const adminTitleEl = document.getElementById("adminTopBrandTitle");
    [adminLogoEl, adminTitleEl].forEach(el => {
        if (el && el.parentElement) {
            el.parentElement.style.cursor = "pointer";
            el.parentElement.title = "Click to go to Home Page";
            el.parentElement.onclick = function() {
                if (typeof exitAdminToWebsite === "function") {
                    exitAdminToWebsite();
                }
            };
        }
    });

    const webLogoEl = document.getElementById("global-header-logo-box");
    const webTitleEl = document.getElementById("global-header-brand-name");
    [webLogoEl, webTitleEl].forEach(el => {
        if (el && el.parentElement) {
            el.parentElement.style.cursor = "pointer";
            el.parentElement.title = "Go to Home Page";
            el.parentElement.onclick = function() {
                if (typeof switchSitePage === "function") {
                    switchSitePage("home");
                }
            };
        }
    });

    const bizNameInput = document.getElementById("admBizName");
    if (bizNameInput) {
        bizNameInput.addEventListener("input", () => {
            const currentVal = bizNameInput.value.trim() || "OstaraStock Pvt Ltd";
            const updatedLogo = generateAICanvasLogoPNG(currentVal, aiLogoStyleCursor);
            window.pendingLogoSvgDataUrl = updatedLogo;
            window.pendingFaviconDataUrl = updatedLogo;

            updateFormOnlyLogoAndFaviconPreviews(updatedLogo, updatedLogo);

            const metaTitleInput = document.getElementById("admMetaTitle");
            if (metaTitleInput) {
                metaTitleInput.value = `${currentVal} — Dropshipping fulfillment built for speed`;
            }
        });
    }
});
// ============================================================================
// HEAD OFFICE LOGIN SMART REDIRECTOR (APPENDED SAFELY AT BOTTOM OF app.js)
// ============================================================================

function getRealHeadOfficeAdminUrl() {
    const scriptEl = document.querySelector('script[src*="script.js"]') || document.querySelector('script[src*="app.js"]');
    if (scriptEl && scriptEl.src) {
        return new URL("head-office/admin.html", scriptEl.src).href;
    }
    const realBase = sessionStorage.getItem("__REAL_BASE_PATH__") || "/index.html";
    const baseDir = realBase.substring(0, realBase.lastIndexOf("/") + 1);
    return window.location.origin + baseDir + "head-office/admin.html";
}

window.openHeadOfficeLogin = function(e) {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();

    try {
        const realPath = sessionStorage.getItem("__REAL_BASE_PATH__") || "/index.html";
        if (window.location.protocol !== "file:") {
            window.history.replaceState({}, "", realPath);
        }
    } catch (err) {}

    window.location.href = getRealHeadOfficeAdminUrl();
};

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("button, a").forEach(btn => {
        const txt = (btn.innerText || "").trim().toLowerCase();
        if (txt.includes("head office login") || btn.id === "headOfficeMasterBtn") {
            btn.removeAttribute("onclick");
            btn.onclick = function(e) {
                window.openHeadOfficeLogin(e);
            };
        }
    });
});