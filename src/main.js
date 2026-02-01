import "./css/home-timer.css";
import "./css/organizers.css";
import "./js/countdown.js";
import "./js/technical-tracks.js";
import "./js/register-modal.js";
import "./js/nav-active.js";
import { initGalleryLightbox } from "./js/gallery-lightbox.js";

initGalleryLightbox();

const y = document.getElementById("footer-year");
if (y) y.textContent = new Date().getFullYear();