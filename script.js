document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Easy contact: generate links to send an email (email app or Gmail web)
  const contactForm = document.getElementById("contact-form");
  if (contactForm instanceof HTMLFormElement) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = new FormData(contactForm);
      const name = String(data.get("name") ?? "").trim();
      const email = String(data.get("email") ?? "").trim();
      const type = String(data.get("type") ?? "").trim();
      const item = String(data.get("item") ?? "").trim();
      const message = String(data.get("message") ?? "").trim();

      const toEmail = "dawatashilama59@gmail.com";
      const subject = `[Angry Bird Crochet] ${type}${item ? ` - ${item}` : ""}`;
      const body = [
        `Name: ${name}`,
        `Customer email: ${email}`,
        `Request type: ${type}`,
        item ? `Item: ${item}` : null,
        "",
        "Message:",
        message,
      ]
        .filter(Boolean)
        .join("\n");

      const mailto = `mailto:${encodeURIComponent(toEmail)}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;

      const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        toEmail,
      )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      const actions = document.getElementById("contact-actions");
      const mailtoLink = document.getElementById("contact-mailto");
      const gmailLink = document.getElementById("contact-gmail");

      if (actions) actions.hidden = false;
      if (mailtoLink instanceof HTMLAnchorElement) mailtoLink.href = mailto;
      if (gmailLink instanceof HTMLAnchorElement) gmailLink.href = gmail;

      // Auto-try email app first (fastest), but the links remain visible if it doesn't work.
      window.location.href = mailto;
    });
  }

  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const links = document.getElementById("nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu after clicking a link (mobile)
    links.addEventListener("click", (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      if (!target.classList.contains("nav-link")) return;

      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  }

  // Active link highlight based on hash
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  function setActiveFromHash() {
    const hash = window.location.hash || "#home";
    navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === hash));
  }

  window.addEventListener("hashchange", setActiveFromHash);
  setActiveFromHash();
});
