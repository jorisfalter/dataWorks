// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const bannerSlide = document.querySelector(".banner-slide");
  const clone = bannerSlide.cloneNode(true);
  bannerSlide.parentNode.appendChild(clone);

  // Ensure smooth scrolling by wrapping the banner in an overflow-hidden container
  const bannerContainer = document.querySelector(".banner-container");

  // Set up the animation for sliding
  const animationDuration = 10; // Duration in seconds
  bannerSlide.style.animation = `slide ${animationDuration}s linear infinite`;
  // clone.style.animation = `slide ${animationDuration}s linear infinite`;

  // Set widths and ensure the elements align properly
  const bannerWidth = bannerSlide.offsetWidth;
  // clone.style.marginLeft = "0"; // Ensure no unnecessary gaps
});
