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
    }
  }

  // Start creating clones and add event listener to keep adding clones
  createClones();
  setInterval(createClones, 1000); // Check and create clones every second to ensure infinite scrolling

  handleServicesAnimation();
});

// Function to determine which section is currently in view
function updateActiveSection() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav ul li a");
  const scrollPosition = window.scrollY + window.innerHeight / 2;

  // First remove active class from all links
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  // Only add active class if we're actually in a section
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      const correspondingLink = document.querySelector(
        `nav a[href="#${section.id}"]`
      );
      if (correspondingLink) {
        correspondingLink.classList.add("active");
      }
    }
  });

  // If we're at the top of the page (with some buffer), don't highlight any nav items
  if (window.scrollY < 100) {
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });
  }
}

// Add scroll event listener
window.addEventListener("scroll", updateActiveSection);
// Run once on page load
document.addEventListener("DOMContentLoaded", updateActiveSection);

// Add this function to handle the animations
function handleServicesAnimation() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Get all case study cards
        const cards = document.querySelectorAll(".case-study");

        if (entry.isIntersecting) {
          // Add animation when scrolling into view
          cards.forEach((card) => {
            card.classList.add("animate");
          });
        } else {
          // Remove animation when scrolling away
          cards.forEach((card) => {
            card.classList.remove("animate");
          });
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "-100px 0px -400px 0px", // Large negative bottom margin to trigger earlier
    }
  );

  const servicesSection = document.querySelector("#services");
  if (servicesSection) {
    observer.observe(servicesSection);
  }
}
