// Navigation is delivered in the HTML, without a fetch or layout replacement.
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-current-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
  const normalize = (path) => path.replace(/index\.html$/, "").replace(/\/$/, "") || "/";
  const current = normalize(window.location.pathname);
  document.querySelectorAll("#site-header a[href]").forEach((link) => {
    if (link.origin === window.location.origin && normalize(link.pathname) === current) {
      link.setAttribute("aria-current", "page");
    }
  });
  // Links stay reachable when Bootstrap is unavailable or scripts are disabled.
  if (window.bootstrap) document.documentElement.classList.add("has-bootstrap");
});