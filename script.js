const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");
const navLinks = nav ? nav.querySelectorAll("a") : [];

function closeNav() {
  body.classList.remove("nav-open");
  if (navToggle) {
    navToggle.setAttribute("aria-expanded", "false");
  }
}

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeNav();
  });
});

document.addEventListener("click", (event) => {
  if (!body.classList.contains("nav-open")) {
    return;
  }
  if (nav && nav.contains(event.target)) {
    return;
  }
  if (navToggle && navToggle.contains(event.target)) {
    return;
  }
  closeNav();
});

window.addEventListener("load", () => {
  body.classList.add("page-loaded");
});

const currentPath = window.location.pathname.split("/").pop() || "index.html";
navLinks.forEach((link) => {
  if (link.getAttribute("href") === currentPath) {
    link.classList.add("active");
  }
});

const revealItems = document.querySelectorAll("[data-reveal]");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const galleryImages = Array.from(document.querySelectorAll(".gallery img"));
const lightbox = document.getElementById("lightbox");

if (galleryImages.length && lightbox) {
  const lightboxImage = lightbox.querySelector(".lightbox-image");
  const closeButton = lightbox.querySelector(".lightbox-close");
  const prevButton = lightbox.querySelector(".lightbox-nav.prev");
  const nextButton = lightbox.querySelector(".lightbox-nav.next");
  let currentIndex = 0;

  const updateLightboxImage = () => {
    const current = galleryImages[currentIndex];
    lightboxImage.src = current.src;
    lightboxImage.alt = current.alt || "Ilustraci\u00f3n ampliada";
  };

  const openLightbox = (index) => {
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    body.classList.add("no-scroll");
  };

  const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    body.classList.remove("no-scroll");
  };

  const showNext = () => {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateLightboxImage();
  };

  const showPrev = () => {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
  };

  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });

  closeButton.addEventListener("click", closeLightbox);
  nextButton.addEventListener("click", showNext);
  prevButton.addEventListener("click", showPrev);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("open")) {
      return;
    }
    if (event.key === "Escape") {
      closeLightbox();
    }
    if (event.key === "ArrowRight") {
      showNext();
    }
    if (event.key === "ArrowLeft") {
      showPrev();
    }
  });
}
