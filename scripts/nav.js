// scripts/nav.js
document.addEventListener("DOMContentLoaded", () => {
    // Load Header
    fetch("./components/header.html")
      .then((response) => response.text())
      .then((data) => {
        document.querySelector("header").innerHTML = data;
      });
  
    // Load Footer
    fetch("./components/footer.html")
      .then((response) => response.text())
      .then((data) => {
        document.querySelector("footer").innerHTML = data;
      });
  });