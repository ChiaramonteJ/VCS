// scripts/nav.js
//document.addEventListener("DOMContentLoaded", () => {
//    // Load Header
//    fetch("./components/header.html")
//      .then((response) => response.text())
//      .then((data) => {
//        document.querySelector("header").innerHTML = data;
//      });
//  
//    // Load Footer
//    fetch("./components/footer.html")
//      .then((response) => response.text())
//      .then((data) => {
//        document.querySelector("footer").innerHTML = data;
//      });
//  });
// scripts/nav.js
document.addEventListener("DOMContentLoaded", () => {

  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  const currentYear = new Date().getFullYear();

  function applyCurrentYear(root = document) {
    root.querySelectorAll("[data-current-year]").forEach((el) => {
      el.textContent = currentYear;
    });
  }

  // ---- Load HEADER ----
  fetch("/components/header.html")
    .then(res => res.ok ? res.text() : null)
    .then(data => {
      if (data) {
        header.innerHTML = data;
      } else {
        loadFallbackHeader();
      }
    })
    .catch(() => {
      loadFallbackHeader();
    });

  // ---- Load FOOTER ----
  fetch("/components/footer.html")
    .then(res => res.ok ? res.text() : null)
    .then(data => {
      if (data) {
        footer.innerHTML = data;
        applyCurrentYear(footer);
      } else {
        loadFallbackFooter();
      }
    })
    .catch(() => {
      loadFallbackFooter();
    });

  // ---- FALLBACK HEADER ----
  function loadFallbackHeader() {
    header.innerHTML = `
      <nav class="navbar navbar-expand-lg" style="background-color: #ff37fa;">
        <div class="container-fluid">

          <a class="navbar-brand text-white" href="index.html">
            <img src="images/logo/black_vcs_logo.png" alt="Vibrant Cleaning Solutions Logo" width="100">
          </a>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#fallbackNav" aria-expanded="false">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="fallbackNav">
            <ul class="navbar-nav ms-auto">

              <li class="nav-item"><a class="nav-link text-white" href="index.html">Home</a></li>

              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle text-white" data-bs-toggle="dropdown" href="#">Services</a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="/all-services/">All Services</a></li>
                  <li><a class="dropdown-item" href="/services/free-quote/">Free Quote</a></li>
                  <li><a class="dropdown-item" href="/services/basic-clean/">Basic Clean</a></li>
                  <li><a class="dropdown-item" href="/services/weekly-clean/">Weekly Clean</a></li>
                  <li><a class="dropdown-item" href="/services/bi-weekly-cleaning/">Bi-Weekly Cleaning</a></li>
                  <li><a class="dropdown-item" href="/services/monthly-cleaning/">Monthly Cleaning</a></li>
                  <li><a class="dropdown-item" href="/services/deep-clean/">Deep Clean</a></li>
                  <li><a class="dropdown-item" href="/services/mini-deep-clean/">Mini Deep Clean</a></li>
                  <li><a class="dropdown-item" href="/services/appliance-cleaning/">Appliance Cleaning</a></li>
                  <li><a class="dropdown-item" href="/services/laundry-service/">Laundry Service</a></li>
                  <li><a class="dropdown-item" href="/services/maintenance-cleaning/">Maintenance Cleaning</a></li>
                  <li><a class="dropdown-item" href="/services/move-out-cleaning/">Move-Out Cleaning</a></li>
                  <li><a class="dropdown-item" href="/giftcard.html">Gift Cards</a></li>
                </ul>
              </li>

              <li class="nav-item"><a class="nav-link text-white" href="/promotions/">Promotions</a></li>
              <li class="nav-item"><a class="nav-link text-white" href="/stories/">Stories</a></li>
              <li class="nav-item"><a class="nav-link text-white" href="/about/">About</a></li>
              <li class="nav-item"><a class="nav-link text-white" href="/contact/">Contact</a></li>

              <li class="nav-item">
                <a class="btn btn-light text-black" href="https://clienthub.getjobber.com/hubs/d9e1257e-2977-47ab-9813-d8b40251c361/public/requests/2173338/new" 
                   target="_blank" rel="noopener noreferrer">BOOK NOW</a>
              </li>

            </ul>
          </div>

        </div>
      </nav>
    `;
  }

  // ---- FALLBACK FOOTER ----
  function loadFallbackFooter() {
    footer.innerHTML = `
      <div class="bg-dark text-white pt-5 pb-3">
        <div class="container">
          <div class="row g-4">
            <div class="col-12 col-lg-4">
              <h2 class="h5 mb-3">Vibrant Cleaning Solutions LLC</h2>
              <p class="mb-3">
                Professional residential cleaning services across West Michigan, including
                Grand Rapids, Kalamazoo, and surrounding communities.
              </p>
              <div class="d-flex flex-wrap gap-2">
                <a
                  href="https://clienthub.getjobber.com/hubs/d9e1257e-2977-47ab-9813-d8b40251c361/public/requests/2173338/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-light btn-sm"
                >
                  Request Free Quote
                </a>
                <a href="tel:2696807495" class="btn btn-outline-light btn-sm">Call (269) 680-7495</a>
              </div>
            </div>

            <div class="col-6 col-md-4 col-lg-2">
              <h3 class="h6 text-uppercase mb-3">Quick Links</h3>
              <ul class="list-unstyled mb-0">
                <li class="mb-2"><a href="/" class="link-light text-decoration-none">Home</a></li>
                <li class="mb-2"><a href="/all-services/" class="link-light text-decoration-none">All Services</a></li>
                <li class="mb-2"><a href="/service-area/" class="link-light text-decoration-none">Service Area</a></li>
                <li class="mb-2"><a href="/about/" class="link-light text-decoration-none">About</a></li>
                <li><a href="/contact/" class="link-light text-decoration-none">Contact</a></li>
              </ul>
            </div>

            <div class="col-6 col-md-4 col-lg-3">
              <h3 class="h6 text-uppercase mb-3">Popular Services</h3>
              <ul class="list-unstyled mb-0">
                <li class="mb-2"><a href="/services/basic-clean/" class="link-light text-decoration-none">Regular Cleaning</a></li>
                <li class="mb-2"><a href="/services/deep-clean/" class="link-light text-decoration-none">Deep Cleaning</a></li>
                <li class="mb-2"><a href="/services/move-out-cleaning/" class="link-light text-decoration-none">Move-Out Cleaning</a></li>
                <li class="mb-2"><a href="/services/appliance-cleaning/" class="link-light text-decoration-none">Appliance Cleaning</a></li>
                <li><a href="/giftcard.html" class="link-light text-decoration-none">Gift Cards</a></li>
              </ul>
            </div>

            <div class="col-12 col-md-4 col-lg-3">
              <h3 class="h6 text-uppercase mb-3">Contact</h3>
              <ul class="list-unstyled mb-3">
                <li class="mb-2">
                  <a href="tel:2696807495" class="link-light text-decoration-none">(269) 680-7495</a>
                </li>
                <li class="mb-2">
                  <a href="mailto:vibrantcleaningsolutionsllc@gmail.com" class="link-light text-decoration-none">
                    vibrantcleaningsolutionsllc@gmail.com
                  </a>
                </li>
                <li>Serving West Michigan</li>
              </ul>

              <div class="d-flex align-items-center gap-3">
                <a
                  href="https://www.facebook.com/profile.php?id=61585737251909"
                  class="link-light"
                  aria-label="Vibrant Cleaning Solutions on Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="bi bi-facebook fs-5" aria-hidden="true"></i>
                </a>
                <a
                  href="https://www.instagram.com/vibrantcleaning/"
                  class="link-light"
                  aria-label="Vibrant Cleaning Solutions on Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="bi bi-instagram fs-5" aria-hidden="true"></i>
                </a>
                <a
                  href="https://www.tiktok.com/@vibrantcleaningsolutions"
                  class="link-light"
                  aria-label="Vibrant Cleaning Solutions on TikTok"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="bi bi-tiktok fs-5" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>

          <hr class="border-light border-opacity-25 my-4">

          <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
            <p class="mb-0">&copy; <span data-current-year></span> Vibrant Cleaning Solutions LLC. All rights reserved.</p>
            <div class="d-flex flex-wrap gap-3">
              <a href="/sitemap.xml" class="link-light text-decoration-none">Sitemap</a>
              <a href="/robots.txt" class="link-light text-decoration-none">Robots</a>
            </div>
          </div>
        </div>
      </div>
    `;
    applyCurrentYear(footer);
  }

});
