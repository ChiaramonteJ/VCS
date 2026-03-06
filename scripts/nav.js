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
      <footer class="bg-light text-center text-black py-3">
        <div class="container">
          <p>© ${new Date().getFullYear()} Vibrant Cleaning Solutions LLC. All rights reserved.</p>
          <p>
            Follow us:
            <a href="https://www.facebook.com/vibrantcleaningsolutions" class="text-black mx-2"><i class="bi bi-facebook"></i></a>
            <a href="https://www.instagram.com/vibrantcleaning/" class="text-black mx-2"><i class="bi bi-instagram"></i></a>
            <a href="https://www.tiktok.com/@vibrantcleaningsolutions" class="text-black mx-2"><i class="bi bi-tiktok"></i></a>
          </p>
        </div>
      </footer>
    `;
  }

});
