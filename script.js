// GenerEdge — site interactions

(function () {
  "use strict";

  // ----- Sticky header -----
  const header = document.querySelector(".site-header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 24);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ----- Mobile navigation -----
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  navToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });

  mainNav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );

  // ----- Scroll reveal -----
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  // ----- Animated counters in hero stats -----
  const counters = document.querySelectorAll(".stat-value[data-count]");
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ("IntersectionObserver" in window && counters.length) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => statsObserver.observe(el));
  }

  // ----- Lead form -----
  const form = document.getElementById("leadForm");
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.className = "form-status";
    status.textContent = "";

    let valid = true;
    form.querySelectorAll("input[required]").forEach((input) => {
      const empty = input.type === "checkbox" ? !input.checked : !input.value.trim();
      const badEmail =
        input.type === "email" && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
      input.classList.toggle("invalid", empty || badEmail);
      if (empty || badEmail) valid = false;
    });

    if (!valid) {
      status.classList.add("err");
      status.textContent = "Please complete the required fields.";
      return;
    }

    // NOTE: wire this up to your CRM / form endpoint (e.g. Gravity Forms, HubSpot).
    const button = form.querySelector("button[type=submit]");
    button.disabled = true;
    button.textContent = "Submitting…";

    setTimeout(() => {
      form.reset();
      button.disabled = false;
      button.textContent = "Check My Options";
      status.classList.add("ok");
      status.textContent = "✓ Thank you! Our team will reach out within one business day.";
    }, 900);
  });

  form.querySelectorAll("input").forEach((input) =>
    input.addEventListener("input", () => input.classList.remove("invalid"))
  );
})();
