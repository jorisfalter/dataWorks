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
  const bannerContainer = document.querySelector(".banner-container");
  const animationDuration = 10; // Duration for one full slide in seconds

  // Clone the banner for seamless looping
  function createClones() {
    const clonesRequired =
      Math.ceil(window.innerWidth / bannerSlide.offsetWidth) + 1;
    const existingClones = document.querySelectorAll(
      ".banner-slide.clone"
    ).length;

    if (existingClones < clonesRequired) {
      const clone = bannerSlide.cloneNode(true);
      clone.classList.add("clone");
      bannerContainer.appendChild(clone);
      bannerSlide.style.animation = `slide ${animationDuration}s linear infinite`;
      clone.style.animation = `slide ${animationDuration}s linear infinite`;
    }
  }

  // Start creating clones and add event listener to keep adding clones
  createClones();
  setInterval(createClones, 1000); // Check and create clones every second to ensure infinite scrolling

  // Ensure smooth animation
  const slides = document.querySelectorAll(
    ".banner-slide, .banner-slide.clone"
  );
  slides.forEach((slide) => {
    slide.style.animation = `slide ${animationDuration}s linear infinite`;
  });
});
