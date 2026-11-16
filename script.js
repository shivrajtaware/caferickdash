const sampleMenu = {
  starters: [
    { name: "Crispy corn & lime", description: "Sweet corn, fresh lime, coriander and a gentle chilli dust.", price: "₹ 280" },
    { name: "Coastal fish fry", description: "A crisp, spiced fish bite with a bright squeeze of lemon.", price: "₹ 420" },
    { name: "Garden paneer tikka", description: "Soft paneer, warming spices and a smoky char.", price: "₹ 360" },
    { name: "Golden calamari", description: "Lightly crisp calamari with a cool herb dip.", price: "₹ 460" }
  ],
  "main-course": [
    { name: "Konkan fish curry & rice", description: "A coastal-style curry served with steamed rice.", price: "₹ 620" },
    { name: "Grilled cottage cheese plate", description: "Spiced paneer, seasonal vegetables and fragrant rice.", price: "₹ 520" },
    { name: "Coastal chicken bowl", description: "Grilled chicken, warm rice, greens and a house dressing.", price: "₹ 580" },
    { name: "Seasonal vegetable thali", description: "A comforting selection of vegetables, rice and breads.", price: "₹ 490" }
  ],
  "pizza-pasta": [
    { name: "Margherita by the sea", description: "Tomato, mozzarella, basil and a crisp stone-baked base.", price: "₹ 480" },
    { name: "Garden harvest pizza", description: "Seasonal vegetables, herbs and mozzarella.", price: "₹ 560" },
    { name: "Creamy mushroom pasta", description: "Mushrooms, parmesan and a silky herb cream.", price: "₹ 520" },
    { name: "Chilli prawn linguine", description: "Prawns, garlic, chilli and a bright citrus finish.", price: "₹ 680" }
  ],
  snacks: [
    { name: "Masala fries", description: "Golden fries tossed with a lively house spice.", price: "₹ 240" },
    { name: "Loaded beach nachos", description: "Crisp corn chips, salsa, cheese and cooling herbs.", price: "₹ 380" },
    { name: "Chicken sliders", description: "Two tender chicken sliders with a tangy slaw.", price: "₹ 420" },
    { name: "Paneer poppers", description: "Crisp bites of seasoned paneer with a fresh dip.", price: "₹ 320" }
  ],
  desserts: [
    { name: "Warm chocolate brownie", description: "A soft-centred chocolate brownie with vanilla cream.", price: "₹ 320" },
    { name: "Tender coconut panna cotta", description: "A delicate coconut dessert with seasonal fruit.", price: "₹ 350" },
    { name: "Mango cheesecake", description: "Creamy cheesecake with a bright mango finish.", price: "₹ 380" },
    { name: "House-made ice cream", description: "Ask about the flavour imagined for today.", price: "₹ 220" }
  ],
  beverages: [
    { name: "Fresh lime soda", description: "Fresh lime, soda and your choice of sweet or salt.", price: "₹ 160" },
    { name: "Cold coffee", description: "A smooth, chilled coffee for a sunny afternoon.", price: "₹ 220" },
    { name: "Iced tea", description: "Slow-steeped tea served cool with a citrus lift.", price: "₹ 180" },
    { name: "Seasonal fruit juice", description: "Freshly blended fruit, based on seasonal availability.", price: "₹ 210" }
  ],
  mocktails: [
    { name: "Konkan sunset", description: "Citrus, kokum and sparkling soda.", price: "₹ 280" },
    { name: "Mint & cucumber cooler", description: "Cucumber, fresh mint, lime and a little fizz.", price: "₹ 260" },
    { name: "Tropical breeze", description: "Pineapple, orange and a bright squeeze of lime.", price: "₹ 290" },
    { name: "Ginger lemon fizz", description: "Fresh ginger, lemon and sparkling water.", price: "₹ 250" }
  ]
};

const menuTabs = [...document.querySelectorAll(".menu-tab")];
const menuList = document.querySelector("#menu-list");

function renderMenu(category) {
  const items = sampleMenu[category] || sampleMenu.starters;
  menuList.replaceChildren(...items.map((item) => {
    const article = document.createElement("article");
    article.className = "menu-item";
    const name = document.createElement("h3");
    name.textContent = item.name;
    const price = document.createElement("span");
    price.className = "price";
    price.textContent = item.price;
    const description = document.createElement("p");
    description.textContent = item.description;
    article.append(name, price, description);
    return article;
  }));
}

menuTabs.forEach((tab, index) => {
  tab.tabIndex = tab.classList.contains("is-active") ? 0 : -1;
  tab.addEventListener("click", () => {
    menuTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
      item.tabIndex = active ? 0 : -1;
    });
    renderMenu(tab.dataset.category);
  });
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? menuTabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + menuTabs.length) % menuTabs.length;
    menuTabs[nextIndex].focus();
    menuTabs[nextIndex].click();
  });
});
renderMenu("starters");

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");
function closeNavigation() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  primaryNav.classList.remove("is-open");
}
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  primaryNav.classList.toggle("is-open", isOpen);
});
primaryNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNavigation));
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeNavigation(); });

const header = document.querySelector(".site-header");
const backToTop = document.querySelector(".back-to-top");
window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
  backToTop.classList.toggle("is-visible", window.scrollY > 650);
}, { passive: true });
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
document.querySelector("#year").textContent = String(new Date().getFullYear());

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}

const reservationForm = document.querySelector("#reservation-form");
const reservationButton = document.querySelector("#reservation-submit");
const buttonLabel = reservationButton.querySelector(".button-label");
const feedback = document.querySelector("#form-feedback");
const dateField = reservationForm.elements.date;
const now = new Date();
const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
dateField.min = localDate;
let submissionPending = false;
let requestSubmitted = false;
const requiredFields = [...reservationForm.querySelectorAll("[required]")];

function validateField(field) {
  const error = document.querySelector(`#${field.name}-error`);
  let message = "";
  if (field.name === "phone") {
    const normalizedPhone = field.value.trim().replace(/[\s()-]/g, "");
    const validIndianMobile = /^(?:\+91)?[6-9]\d{9}$/.test(normalizedPhone);
    if (!normalizedPhone) message = "Please enter your mobile number.";
    else if (!validIndianMobile) message = "Enter a valid Indian mobile number.";
  } else if (!field.checkValidity()) {
    if (field.validity.valueMissing) message = "Please fill in this field.";
    else if (field.name === "name" && field.validity.tooShort) message = "Please enter your full name.";
    else if (field.name === "date" && field.validity.rangeUnderflow) message = "Please choose today or a future date.";
    else message = "Please check this field.";
  }
  field.setAttribute("aria-invalid", String(Boolean(message)));
  if (error) error.textContent = message;
  return message === "";
}

function resetSubmittedState() {
  if (!requestSubmitted) return;
  requestSubmitted = false;
  reservationButton.disabled = false;
  reservationButton.classList.remove("is-loading");
  buttonLabel.textContent = "Request a reservation";
  feedback.hidden = true;
  feedback.textContent = "";
}

requiredFields.forEach((field) => {
  field.addEventListener("blur", () => validateField(field));
  field.addEventListener("input", () => {
    resetSubmittedState();
    if (field.hasAttribute("aria-invalid")) validateField(field);
    if (!submissionPending) feedback.hidden = true;
  });
  field.addEventListener("change", () => {
    resetSubmittedState();
    if (field.hasAttribute("aria-invalid")) validateField(field);
    if (!submissionPending) feedback.hidden = true;
  });
});
reservationForm.elements.requests.addEventListener("input", resetSubmittedState);

reservationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (submissionPending || requestSubmitted) return;
  const valid = requiredFields.map(validateField).every(Boolean);
  if (!valid) {
    const firstInvalid = requiredFields.find((field) => field.getAttribute("aria-invalid") === "true");
    firstInvalid?.focus();
    feedback.classList.add("is-error");
    feedback.textContent = "Please check the highlighted fields and try again.";
    feedback.hidden = false;
    return;
  }

  submissionPending = true;
  feedback.classList.remove("is-error");
  feedback.textContent = "Sending your request…";
  feedback.hidden = false;
  reservationButton.disabled = true;
  reservationButton.classList.add("is-loading");
  buttonLabel.textContent = "Sending request";

  window.setTimeout(() => {
    submissionPending = false;
    requestSubmitted = true;
    reservationButton.classList.remove("is-loading");
    buttonLabel.textContent = "Request received";
    feedback.textContent = "Your reservation request has been received. Our team will contact you to confirm your table.";
    feedback.hidden = false;
  }, 750);
});

const lightbox = document.querySelector("#lightbox");
const galleryItems = [...document.querySelectorAll(".gallery-item")];
const lightboxImage = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector("figcaption");
let activeImageIndex = 0;
let previousFocus = null;

function showGalleryImage(index) {
  activeImageIndex = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[activeImageIndex];
  lightboxImage.src = item.dataset.full;
  lightboxImage.alt = item.querySelector("img").alt;
  lightboxCaption.textContent = item.querySelector(".gallery-label").childNodes[0].textContent.trim();
}
function openLightbox(index) {
  previousFocus = document.activeElement;
  showGalleryImage(index);
  lightbox.hidden = false;
  document.body.classList.add("no-scroll");
  lightbox.querySelector(".lightbox-close").focus();
}
function closeLightbox() {
  lightbox.hidden = true;
  document.body.classList.remove("no-scroll");
  lightboxImage.removeAttribute("src");
  previousFocus?.focus();
}
galleryItems.forEach((item, index) => item.addEventListener("click", () => openLightbox(index)));
lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.querySelector(".lightbox-prev").addEventListener("click", () => showGalleryImage(activeImageIndex - 1));
lightbox.querySelector(".lightbox-next").addEventListener("click", () => showGalleryImage(activeImageIndex + 1));
lightbox.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (event) => {
  if (lightbox.hidden) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showGalleryImage(activeImageIndex - 1);
  if (event.key === "ArrowRight") showGalleryImage(activeImageIndex + 1);
});
