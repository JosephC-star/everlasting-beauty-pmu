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
document.querySelectorAll(".filter").forEach((button) =>
  button.addEventListener("click", () => {
    document.querySelector(".filter.active")?.classList.remove("active");
    button.classList.add("active");
    const filter = button.dataset.filter;
    document
      .querySelectorAll(".comparison")
      .forEach((card) =>
        card.classList.toggle("hidden", filter !== "all" && card.dataset.category !== filter),
      );
  }),
);
const grid = document.querySelector(".comparison-grid");
const more = document.querySelector(".gallery-more");
more.addEventListener("click", () => {
  const expanded = grid.classList.toggle("expanded");
  more.textContent = expanded ? "Show Fewer Results" : "Show More Results";
});
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
