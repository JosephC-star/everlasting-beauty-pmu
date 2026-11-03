const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", open);
  document.body.classList.toggle("menu-open", open);
});
nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
  }),
);
const grid = document.querySelector(".comparison-grid");
const more = document.querySelector(".gallery-more");
const galleryCards = [...document.querySelectorAll(".comparison")];
const galleryLimit = 4;
let currentFilter = "all";
let galleryExpanded = false;

function updateGallery() {
  const matchingCards = galleryCards.filter(
    (card) => currentFilter === "all" || card.dataset.category === currentFilter,
  );

  galleryCards.forEach((card) => {
    const matches = matchingCards.includes(card);
    const position = matchingCards.indexOf(card);
    card.classList.toggle("hidden", !matches);
    card.classList.toggle(
      "gallery-collapsed",
      matches && !galleryExpanded && position >= galleryLimit,
    );
  });

  more.hidden = matchingCards.length <= galleryLimit;
  more.textContent = galleryExpanded ? "Show Fewer Results" : "Show More Results";
}

document.querySelectorAll(".filter").forEach((button) =>
  button.addEventListener("click", () => {
    document.querySelector(".filter.active")?.classList.remove("active");
    button.classList.add("active");
    currentFilter = button.dataset.filter;
    galleryExpanded = false;
    updateGallery();
  }),
);

more.addEventListener("click", () => {
  galleryExpanded = !galleryExpanded;
  updateGallery();
  if (!galleryExpanded) grid.scrollIntoView({ behavior: "smooth", block: "start" });
});

updateGallery();
const lightbox = document.querySelector(".lightbox");
document.querySelectorAll(".comparison img").forEach((image) =>
  image.addEventListener("click", () => {
    lightbox.querySelector("img").src = image.src;
    lightbox.querySelector("img").alt = image.alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  }),
);
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
}
lightbox.querySelector("button").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }),
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
document.querySelector("#year").textContent = new Date().getFullYear();
