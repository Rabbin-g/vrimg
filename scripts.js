/* ==========================
   scripts.js
   ========================== */

/* ===== NAVBAR TOGGLE ===== */
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

/* ===== SMOOTH SCROLLING ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
    navMenu.classList.remove("active"); // close mobile menu after click
  });
});

/* ===== GALLERY LIGHTBOX ===== */
const galleryItems = document.querySelectorAll(".gallery-item img");

// Create lightbox container
const lightbox = document.createElement("div");
lightbox.id = "lightbox";
document.body.appendChild(lightbox);

galleryItems.forEach(image => {
  image.addEventListener("click", e => {
    lightbox.classList.add("active");
    const img = document.createElement("img");
    img.src = image.src;
    while (lightbox.firstChild) {
      lightbox.removeChild(lightbox.firstChild);
    }
    lightbox.appendChild(img);
  });
});

lightbox.addEventListener("click", e => {
  if (e.target !== e.currentTarget) return;
  lightbox.classList.remove("active");
});

/* ===== COUNTER ANIMATION (Optional for Accomplishments) ===== */
const counters = document.querySelectorAll(".counter");
const speed = 200; // lower = faster

const animateCounters = () => {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 30);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
};

/* Trigger counters when section is visible */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
    }
  });
});

document.querySelectorAll(".accomplishments").forEach(section => {
  observer.observe(section);
});