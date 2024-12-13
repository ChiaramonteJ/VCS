document.addEventListener("DOMContentLoaded", () => {
    // Fetch Header
    fetch("header.html") // Fetches from /blogposts/
      .then((response) => response.text())
      .then((data) => {
        document.querySelector("header").innerHTML = data;
      })
      .catch((error) => console.error("Error loading header:", error));
  
    // Fetch Footer
    fetch("footer.html") // Fetches from /blogposts/
      .then((response) => response.text())
      .then((data) => {
        document.querySelector("footer").innerHTML = data;
      })
      .catch((error) => console.error("Error loading footer:", error));
  });