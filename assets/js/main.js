// Molecule — small enhancements for the static site.
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "923018510470";

  // Mobile menu toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Highlight the nav item of the section in view
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav a"));
  if ("IntersectionObserver" in window) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = byId[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("is-active"); });
          link.classList.add("is-active");
        } else {
          link.classList.remove("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  // Contact form: no backend on a static host, so the message opens in WhatsApp.
  var form = document.getElementById("contact-form");
  var note = document.getElementById("form-note");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var provider = form.elements.provider.value;
      var message = form.elements.message.value.trim();

      if (!name || !email || !form.elements.email.checkValidity()) {
        note.textContent = "Please enter your name and a valid email.";
        (name ? form.elements.email : form.elements.name).focus();
        return;
      }

      var lines = ["Name: " + name, "Email: " + email];
      if (provider) lines.push("Service Provider: " + provider);
      if (message) lines.push("", message);

      var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener");
      note.textContent = "Thank you. Your message is ready to send in WhatsApp.";
      form.reset();
    });
  }

  // Cookie notice
  var cookie = document.getElementById("cookie");
  var KEY = "molecule-cookie-ok";
  try {
    if (cookie && !localStorage.getItem(KEY)) cookie.hidden = false;
  } catch (err) {
    if (cookie) cookie.hidden = false;
  }
  var ok = document.getElementById("cookie-ok");
  if (ok) {
    ok.addEventListener("click", function () {
      cookie.hidden = true;
      try { localStorage.setItem(KEY, "1"); } catch (err) { /* ignore */ }
    });
  }
})();
