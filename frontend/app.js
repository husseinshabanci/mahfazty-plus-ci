document.addEventListener("DOMContentLoaded", () => {
  console.log("Plain homepage initialized. Ready to build!");

  async function fetchStrapiData() {
    try {
      const response = await fetch("http://localhost:1337/api/landing-page");
      if (!response.ok) throw new Error("Failed to fetch landing page data");

      const { data } = await response.json();
      if (!data) return;

      const logoTextEl = document.getElementById("logo-text-span");
      const logoImgEl = document.getElementById("logo-img");
      if (logoImgEl && data.logoImage) {
        const logoUrl = data.logoImage.url;
        logoImgEl.src = logoUrl.startsWith("http") ? logoUrl : `http://localhost:1337${logoUrl}`;
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
          a.textContent = link.label;
          li.appendChild(a);
          navLinksUl.appendChild(li);
        });
      }

      const marqueeTrack = document.querySelector(".ready-marquee-track");
      if (marqueeTrack) {
        marqueeTrack.innerHTML = "";
        const assetBase = "http://localhost:1337";
        const logos = Array.isArray(data.companyLogos)
          ? data.companyLogos.flatMap((entry) => {
              const logo = entry?.logo;
              if (!entry?.name || !logo?.url) return [];
              const logoUrl = logo.url;
              const resolvedUrl = logoUrl.startsWith("http") ? logoUrl : `${assetBase}${logoUrl}`;
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

      const heroMockupEl = document.getElementById("hero-mockup-img");
      if (heroMockupEl && data.heroImage) {
        const imageUrl = data.heroImage.url;
        heroMockupEl.src = imageUrl.startsWith("http") ? imageUrl : `http://localhost:1337${imageUrl}`;
      }
    } catch (err) {
      console.warn("Strapi API fetch failed, using fallback content:", err);
    }
  }

  fetchStrapiData();

  const initScrollTransitions = () => {
    const targets = document.querySelectorAll(".fade-in-up");
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
