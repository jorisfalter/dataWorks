// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Sliding Banner
document.addEventListener("DOMContentLoaded", function () {
  const bannerSlide = document.querySelector(".banner-slide");
  const clone = bannerSlide.cloneNode(true);
  bannerSlide.parentNode.appendChild(clone);

  // Calculate the width of the original banner
  const bannerWidth = bannerSlide.offsetWidth;

  // Add a small gap between the original and cloned banner
  clone.style.marginLeft = "30px"; // Adjust this value as needed
});
