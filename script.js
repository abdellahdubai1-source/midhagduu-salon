/* =========================================================
   Midhagduu Salon — script.js
   1) Mobile menu toggle
   2) Close menu on link tap
   3) Scroll-reveal animations
   4) Auto footer year
   ========================================================= */

(function () {
  "use strict";

  /* ---------- 1) Mobile menu toggle ---------- */
  var toggle = document.getElementById("menu-toggle");
  var nav = document.getElementById("primary-nav");

  function closeMenu() {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    /* 2) Close the menu after tapping any nav link (mobile) */
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    /* Close menu when tapping outside of it */
    document.addEventListener("click", function (e) {
      if (nav.classList.contains("open") &&
          !nav.contains(e.target) &&
          !toggle.contains(e.target)) {
        closeMenu();
      }
    });
  }

  /* ---------- 3) Scroll-reveal animations ---------- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    /* Fallback: just show everything */
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- 4) Auto footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
})();
