/* ============================================================
   Shamil Prematunga — portfolio interactions
   ============================================================ */
(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* mark that JS is active so reveal styles apply (content stays visible without JS) */
  document.documentElement.classList.add("js");

  /* ---- current year ---- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---- nav: scrolled state + scroll progress ---- */
  const nav = $("#nav");
  const progress = $("#scrollProgress");
  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle("is-scrolled", y > 12);
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = h > 0 ? (y / h) * 100 + "%" : "0%";
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- mobile nav toggle ---- */
  const toggle = $("#navToggle");
  const links = $("#navLinks");
  if (toggle && links) {
    const closeMenu = () => {
      links.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    $$("a", links).forEach((a) => a.addEventListener("click", closeMenu));
  }

  /* ---- active nav link on scroll (scroll spy) ---- */
  const sections = $$("main section[id]");
  const navLinkMap = new Map();
  $$('#navLinks a[href^="#"]').forEach((a) => {
    navLinkMap.set(a.getAttribute("href").slice(1), a);
  });
  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            navLinkMap.forEach((a) => a.classList.remove("is-active"));
            const link = navLinkMap.get(e.target.id);
            if (link) link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---- reveal on scroll ---- */
  const revealTargets = [
    ".section__head", ".about__grid", ".stackgroup", ".tl",
    ".consulting", ".filters", ".project", ".research__main",
    ".research__side", ".repo", ".award", ".contentcard", ".contact", ".stats",
  ];
  const revealEls = $$(revealTargets.join(","));
  revealEls.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = Math.min((i % 6) * 60, 300) + "ms";
  });
  if ("IntersectionObserver" in window) {
    const revObs = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => revObs.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---- count-up stats ---- */
  const countEls = $$(".stat__num[data-count]");
  const runCount = (el) => {
    const target = parseInt(el.getAttribute("data-count"), 10) || 0;
    const suffix = el.getAttribute("data-suffix") || "";
    const dur = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + (p === 1 ? suffix : "");
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window && countEls.length) {
    const cObs = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            runCount(e.target);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    countEls.forEach((el) => cObs.observe(el));
  } else {
    countEls.forEach((el) => {
      el.textContent = (el.getAttribute("data-count") || "") + (el.getAttribute("data-suffix") || "");
    });
  }

  /* ---- project filters ---- */
  const filterBtns = $$(".filter");
  const projects = $$(".project");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const f = btn.getAttribute("data-filter");
      projects.forEach((p) => {
        const cats = (p.getAttribute("data-cat") || "").split(" ");
        const show = f === "all" || cats.includes(f);
        p.classList.toggle("is-hidden", !show);
      });
    });
  });
})();
