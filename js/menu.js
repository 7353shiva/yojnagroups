/* =========================================================
   MOBILE MENU + HERO SLIDER
   Shared across all pages
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* ---------- MOBILE MENU TOGGLE ---------- */

    const mobileToggle = document.getElementById("yojnaMobileToggle");
    const mobileNav    = document.getElementById("yojnaMobileNav");

    if (mobileToggle && mobileNav) {

        mobileToggle.addEventListener("click", function () {

            mobileNav.classList.toggle("active");

            const icon = mobileToggle.querySelector("i");

            if (mobileNav.classList.contains("active")) {
                icon.classList.remove("bi-list");
                icon.classList.add("bi-x");
            } else {
                icon.classList.remove("bi-x");
                icon.classList.add("bi-list");
            }

        });

    }


    /* ---------- HERO SLIDER ---------- */

    const heroSlides = document.querySelectorAll(".yojna-hero-slide");
    let currentSlide = 0;

    if (heroSlides.length > 1) {

        setInterval(function () {

            heroSlides[currentSlide].classList.remove("active");

            currentSlide++;

            if (currentSlide >= heroSlides.length) {
                currentSlide = 0;
            }

            heroSlides[currentSlide].classList.add("active");

        }, 5000);

    }

});