/* =========================================================
   MOBILE MENU + MOBILE DIVISIONS
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


    /* ---------- MOBILE DIVISIONS DROPDOWN ---------- */

    const divisionToggle  = document.getElementById("divisionMobileToggle");
    const mobileDivisions = document.querySelector(".yojna-mobile-divisions");

    if (divisionToggle && mobileDivisions) {

        divisionToggle.addEventListener("click", function () {

            mobileDivisions.classList.toggle("active");
            divisionToggle.classList.toggle("active");

        });

    }

});