document.addEventListener("DOMContentLoaded", () => {
  console.log("Plain homepage initialized. Ready to build!");

  const restoreTop = () => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
    setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }), 0);
    setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }), 50);
  };

  window.addEventListener("pageshow", (event) => {
    if (event.persisted || performance.getEntriesByType("navigation")[0]?.type === "reload") {
      restoreTop();
    }
  });
  window.addEventListener("load", restoreTop);
  restoreTop();

  const API_BASE_URL = window.__STRAPI_BASE_URL__ || "http://localhost:1337";
  const LOCALES = {
    en: {
      htmlLang: "en",
      dir: "ltr",
      langButton: "العربية",
      navCta: "Open Account",
      navFallbacks: ["Home", "Market", "Orders", "Manage"],
      heroTitle: "Stay in control when the market moves.",
      heroDescription:
        "A focused investing experience for people at every stage, whether you are building confidence, staying active, or making faster decisions with clarity.",
      heroPrimaryBtnText: "Get Started",
      downloadTitle: "Trade when you're ready, from wherever you're working.",
      downloadDescription:
        "Available on iOS and Android for investors who want a mobile workflow that keeps up with the market.",
      readyKicker: "Ready to start investing?",
      readyTitle: "Open your account and get access to a cleaner way to invest.",
      readyDescription:
        "Move from exploring to acting with a mobile-first experience built for clarity, control, and steady progress.",
      readyPrimary: "Start Investing",
      downloadBadgeAppStore: {
        sub: "Available on the",
        main: "App Store",
      },
      downloadBadgeGooglePlay: {
        sub: "Available on",
        main: "Google Play",
      },
      footerSocial: "Social",
      footerLegal: "Legal",
      footerCompany: "Company",
      footerTerms: "Terms of Use",
      footerPrivacy: "Privacy Policy",
      footerPress: "Press",
      footerCareers: "Careers",
      footerCopyright: "© 2026 Mahfazty CIBC. All rights reserved.",
    },
    ar: {
      htmlLang: "ar-EG",
      dir: "rtl",
      langButton: "English",
      navCta: "افتح حساب",
      navFallbacks: ["الرئيسية", "السوق", "الطلبات", "إدارة"],
      heroTitle: "ابقَ متحكّمًا عندما يتحرك السوق.",
      heroDescription:
        "تجربة استثمار مركزة تناسبك في كل المراحل، سواء كنت بتبني ثقتك، أو بتتابع استثماراتك، أو بتاخد قرارات أسرع وبوضوح أكبر.",
      heroPrimaryBtnText: "ابدأ الآن",
      downloadTitle: "اتداول وقت ما تكون جاهز، من أي مكان إنت فيه.",
      downloadDescription:
        "متاح على iOS وAndroid للمستثمرين اللي عايزين تجربة موبايل تواكب السوق.",
      readyKicker: "جاهز تبدأ الاستثمار؟",
      readyTitle: "افتح حسابك واحصل على طريقة أوضح للاستثمار.",
      readyDescription:
        "انتقل من الاستكشاف إلى التنفيذ بتجربة موبايل مصممة للوضوح والتحكم والتقدم المستمر.",
      readyPrimary: "ابدأ الاستثمار",
      downloadBadgeAppStore: {
        sub: "متاح على",
        main: "App Store",
      },
      downloadBadgeGooglePlay: {
        sub: "متاح على",
        main: "Google Play",
      },
      footerSocial: "السوشيال",
      footerLegal: "قانوني",
      footerCompany: "الشركة",
      footerTerms: "شروط الاستخدام",
      footerPrivacy: "سياسة الخصوصية",
      footerPress: "الصحافة",
      footerCareers: "الوظائف",
      footerCopyright: "© 2026 Mahfazty CIBC. جميع الحقوق محفوظة.",
    },
  };
  const STORAGE_KEY = "mahfazty_locale";
  let currentLocale = "en";

  const applyStaticTranslations = (locale) => {
    const copy = LOCALES[locale] || LOCALES.en;
    document.documentElement.lang = copy.htmlLang;
    document.documentElement.dir = copy.dir;

    const langTxt = document.getElementById("lang-txt");
    if (langTxt) langTxt.textContent = copy.langButton;

    const navCta = document.getElementById("nav-btn-cta");
    if (navCta) navCta.textContent = copy.navCta;

    const heroTitle = document.getElementById("hero-title");
    if (heroTitle) heroTitle.textContent = copy.heroTitle;

    const heroDesc = document.getElementById("hero-desc");
    if (heroDesc) heroDesc.textContent = copy.heroDescription;

    const heroPrimary = document.getElementById("hero-btn-primary");
    if (heroPrimary) heroPrimary.textContent = copy.heroPrimaryBtnText;

    const downloadTitle = document.getElementById("download-title");
    if (downloadTitle) downloadTitle.textContent = copy.downloadTitle;

    const downloadDesc = document.getElementById("download-desc");
    if (downloadDesc) downloadDesc.textContent = copy.downloadDescription;

    const readyKicker = document.querySelector(".ready-kicker");
    if (readyKicker) readyKicker.textContent = copy.readyKicker;

    const readyTitle = document.querySelector(".ready-title");
    if (readyTitle) readyTitle.textContent = copy.readyTitle;

    const readyDescription = document.querySelector(".ready-description");
    if (readyDescription) readyDescription.textContent = copy.readyDescription;

    const readyPrimary = document.querySelector(".ready-primary");
    if (readyPrimary) readyPrimary.textContent = copy.readyPrimary;

    const appStoreSub = document.querySelector(".download-badges .badge-btn:nth-child(1) .badge-sub");
    const appStoreMain = document.querySelector(".download-badges .badge-btn:nth-child(1) .badge-main");
    if (appStoreSub) appStoreSub.textContent = copy.downloadBadgeAppStore.sub;
    if (appStoreMain) appStoreMain.textContent = copy.downloadBadgeAppStore.main;

    const playSub = document.querySelector(".download-badges .badge-btn:nth-child(2) .badge-sub");
    const playMain = document.querySelector(".download-badges .badge-btn:nth-child(2) .badge-main");
    if (playSub) playSub.textContent = copy.downloadBadgeGooglePlay.sub;
    if (playMain) playMain.textContent = copy.downloadBadgeGooglePlay.main;

    const footerSocial = document.querySelector(".footer-links-col:nth-child(1) .footer-links-title");
    const footerLegal = document.querySelector(".footer-links-col:nth-child(2) .footer-links-title");
    const footerCompany = document.querySelector(".footer-links-col:nth-child(3) .footer-links-title");
    if (footerSocial) footerSocial.textContent = copy.footerSocial;
    if (footerLegal) footerLegal.textContent = copy.footerLegal;
    if (footerCompany) footerCompany.textContent = copy.footerCompany;

    const footerTerms = document.querySelector(".footer-links-col:nth-child(2) .footer-link:nth-child(2)");
    const footerPrivacy = document.querySelector(".footer-links-col:nth-child(2) .footer-link:nth-child(3)");
    const footerPress = document.querySelector(".footer-links-col:nth-child(3) .footer-link:nth-child(2)");
    const footerCareers = document.querySelector(".footer-links-col:nth-child(3) .footer-link:nth-child(3)");
    if (footerTerms) footerTerms.textContent = copy.footerTerms;
    if (footerPrivacy) footerPrivacy.textContent = copy.footerPrivacy;
    if (footerPress) footerPress.textContent = copy.footerPress;
    if (footerCareers) footerCareers.textContent = copy.footerCareers;

    const footerCopyright = document.querySelector(".footer-copyright");
    if (footerCopyright) footerCopyright.textContent = copy.footerCopyright;
  };

  const setLocale = (nextLocale) => {
    currentLocale = nextLocale === "ar" ? "ar" : "en";
    localStorage.setItem(STORAGE_KEY, currentLocale);
    applyStaticTranslations(currentLocale);
    fetchStrapiData(currentLocale);
  };

  const resolveApiUrl = (path) => {
    if (!path) return path;
    if (/^https?:\/\//i.test(path)) return path;
    return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  };

  const translateNavLabel = (label, locale) => {
    if (locale !== "ar" || !label) return label;
    const normalized = label.trim().toLowerCase();
    const map = {
      home: "الرئيسية",
      market: "السوق",
      orders: "الطلبات",
      manage: "إدارة",
      learn: "تعلم",
      careers: "الوظائف",
      blog: "المدونة",
      help: "المساعدة",
      "open account": "افتح حساب",
      "download app": "تحميل التطبيق",
    };
    return map[normalized] || label;
  };

  async function fetchStrapiData(locale = "en") {
    try {
      const response = await fetch(resolveApiUrl(`/api/landing-page?locale=${locale}`));
      if (!response.ok) throw new Error("Failed to fetch landing page data");

      const { data } = await response.json();
      if (!data) return;

      const logoTextEl = document.getElementById("logo-text-span");
      const logoImgEl = document.getElementById("logo-img");
      if (logoImgEl && data.logoImage) {
        const logoUrl = data.logoImage.url;
        logoImgEl.src = resolveApiUrl(logoUrl);
        logoImgEl.style.display = "block";
        if (logoTextEl) logoTextEl.style.display = "none";
      } else if (logoTextEl && data.logoText) {
        logoTextEl.textContent = data.logoText;
        logoTextEl.style.display = "block";
        if (logoImgEl) logoImgEl.style.display = "none";
      }

      const navLinksUl = document.getElementById("nav-links");
      if (navLinksUl && data.navLinks && data.navLinks.length > 0) {
        navLinksUl.innerHTML = "";
        data.navLinks.forEach((link, idx) => {
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.href = link.url;
          a.id = `nav-link-${idx + 1}`;
          a.textContent = translateNavLabel(link.label, locale);
          li.appendChild(a);
          navLinksUl.appendChild(li);
        });
      } else if (navLinksUl) {
        const copy = LOCALES[locale] || LOCALES.en;
        const fallbacks = copy.navFallbacks || LOCALES.en.navFallbacks;
        navLinksUl.innerHTML = fallbacks.map((label) => `<li><a href="#download">${label}</a></li>`).join("");
      }

      if (navLinksUl && locale === "ar") {
        navLinksUl.querySelectorAll("a").forEach((anchor) => {
          anchor.textContent = translateNavLabel(anchor.textContent, "ar");
        });
      }

      const marqueeTrack = document.querySelector(".ready-marquee-track");
      if (marqueeTrack) {
        marqueeTrack.innerHTML = "";
        const logos = Array.isArray(data.companyLogos)
          ? data.companyLogos.flatMap((entry) => {
              const logo = entry?.logo;
              if (!entry?.name || !logo?.url) return [];
              const logoUrl = logo.url;
              const resolvedUrl = resolveApiUrl(logoUrl);
              return [{ name: entry.name, url: resolvedUrl }];
            })
          : [];

        if (logos.length > 0) {
          const repeatedLogos = [...logos, ...logos];
          marqueeTrack.innerHTML = repeatedLogos.map((logo) => `
            <span class="ready-logo-circle" title="${logo.name}" aria-label="${logo.name}">
              <img src="${logo.url}" alt="${logo.name}" class="ready-logo-image">
            </span>
          `).join("");
        } else if (Array.isArray(data.companyLogos) && data.companyLogos.length > 0) {
          marqueeTrack.innerHTML = data.companyLogos.map((entry) => `
            <span class="ready-logo-pill">${entry?.name ?? ""}</span>
          `).join("");
        }
      }

      const ctaBtn = document.getElementById("nav-btn-cta");
      if (ctaBtn && data.downloadText && data.downloadLink) {
        ctaBtn.textContent = data.downloadText;
        ctaBtn.href = data.downloadLink;
      }

      const heroPrimaryBtn = document.getElementById("hero-btn-primary");
      if (heroPrimaryBtn && data.heroPrimaryBtnText) {
        heroPrimaryBtn.textContent = data.heroPrimaryBtnText;
      }
      if (heroPrimaryBtn && data.heroPrimaryBtnLink) {
        heroPrimaryBtn.href = data.heroPrimaryBtnLink;
      }

      const heroSecondaryBtn = document.getElementById("hero-btn-secondary");
      if (heroSecondaryBtn && data.heroSecondaryBtnText) {
        heroSecondaryBtn.textContent = data.heroSecondaryBtnText;
      }

      const heroTitleEl = document.getElementById("hero-title");
      if (heroTitleEl && data.heroTitle) {
        heroTitleEl.textContent = data.heroTitle;
      }

      const heroDescEl = document.getElementById("hero-desc");
      if (heroDescEl && data.heroDescription) {
        heroDescEl.textContent = data.heroDescription;
      }
    } catch (err) {
      console.warn("Strapi API fetch failed, using fallback content:", err);
    }
  }

  localStorage.setItem(STORAGE_KEY, currentLocale);
  applyStaticTranslations(currentLocale);
  fetchStrapiData(currentLocale);

  const langBtn = document.getElementById("lang-btn");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      setLocale(currentLocale === "en" ? "ar" : "en");
    });
  }

  const initScrollTransitions = () => {
    const targets = document.querySelectorAll(".fade-in-up, .reveal-item");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, {
      threshold: 0.15
    });

    targets.forEach((target) => observer.observe(target));
  };

  initScrollTransitions();

  const initRoadmapRail = () => {
    const processSection = document.querySelector(".process-section");
    const steps = Array.from(document.querySelectorAll(".roadmap-step"));
    const spineFill = document.querySelector(".roadmap-spine-fill");
    if (!processSection || steps.length === 0) return;

    const updateRail = () => {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const firstRect = steps[0].getBoundingClientRect();
      const lastRect = steps[steps.length - 1].getBoundingClientRect();
      const start = firstRect.top;
      const end = lastRect.bottom - viewportHeight * 0.25;
      const total = Math.max(1, end - start);
      const current = Math.min(end, Math.max(start, viewportHeight * 0.5));
      const progress = Math.min(1, Math.max(0, (viewportHeight * 0.5 - start) / total));
      if (spineFill) {
        spineFill.style.setProperty("--spine-progress", `${Math.round(progress * 100)}%`);
        spineFill.style.setProperty("--spine-glow", `${(0.18 + progress * 0.42).toFixed(2)}`);
        spineFill.style.height = `${Math.round(progress * 100)}%`;
      }

      steps.forEach((step) => {
        const stepRect = step.getBoundingClientRect();
        const stepCenter = stepRect.top + stepRect.height / 2;
        const distanceFromCenter = Math.abs(stepCenter - viewportHeight * 0.5);
        const isActive = distanceFromCenter <= viewportHeight * 0.28;
        step.classList.toggle("is-active", isActive);
      });
    };

    updateRail();
    window.addEventListener("scroll", updateRail, { passive: true });
    window.addEventListener("resize", updateRail);
  };
  initRoadmapRail();

  const initPhoneParallax = () => {
    const phones = document.querySelectorAll(".roadmap-phone-frame");
    if (phones.length === 0) return;

    phones.forEach((phone) => {
      const glare = phone.querySelector(".glass-glare");
      const reverse = phone.closest(".roadmap-step-reverse");
      const baseY = 0;
      const baseZ = 0;

      phone.addEventListener("mousemove", (event) => {
        const rect = phone.getBoundingClientRect();
        const x = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const y = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        const tiltY = baseY + Math.max(-12, Math.min(12, x * 12));
        const tiltX = Math.max(-12, Math.min(12, -y * 12));
        phone.style.transform = `rotateY(${tiltY}deg) rotateX(${tiltX}deg) rotateZ(${baseZ}deg)`;
        if (glare) glare.style.transform = `translate3d(${-x * 18}px, ${-y * 14}px, 3px)`;
      });

      phone.addEventListener("mouseleave", () => {
        phone.style.transform = `rotateY(${baseY}deg) rotateX(0deg) rotateZ(${baseZ}deg)`;
        if (glare) glare.style.transform = "translate3d(0, 0, 3px)";
      });
    });
  };

  // Keep the roadmap mockups static in the simple presentation.

  const initHeaderScroll = () => {
    const header = document.querySelector("header");
    if (!header) return;
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  };

  initHeaderScroll();
});
