/* =========================================================
   YOJNA GROUP — MAIN SCRIPT
   Mobile Menu · Hero Slider · Testimonials Carousel
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =========================================================
       1. MOBILE MENU TOGGLE
    ========================================================= */

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


    /* =========================================================
       2. MOBILE DIVISIONS DROPDOWN
    ========================================================= */

    const divisionToggle  = document.getElementById("divisionMobileToggle");
    const mobileDivisions = document.querySelector(".yojna-mobile-divisions");

    if (divisionToggle && mobileDivisions) {

        divisionToggle.addEventListener("click", function () {

            mobileDivisions.classList.toggle("active");
            divisionToggle.classList.toggle("active");

        });

    }


    /* =========================================================
       3. HERO SLIDER — 5 SLIDES
    ========================================================= */

    (function initHeroSlider() {

        const slides         = document.querySelectorAll(".yojna-hero-slide");
        const dots           = document.querySelectorAll(".yojna-hero-dot");
        const prevBtn        = document.querySelector(".yojna-hero-prev");
        const nextBtn        = document.querySelector(".yojna-hero-next");
        const counterCurrent = document.querySelector(".yojna-hero-current");

        if (!slides.length) return;

        let currentIndex  = 0;
        let autoPlayTimer = null;
        const AUTO_DELAY  = 5500;

        /* Pad number — 1 → "01" */
        function pad(n) {
            return n < 10 ? "0" + n : "" + n;
        }

        /* Show specific slide */
        function goToSlide(index) {

            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;

            slides.forEach(function (slide, i) {
                slide.classList.toggle("active", i === index);
            });

            dots.forEach(function (dot, i) {
                dot.classList.toggle("active", i === index);
            });

            if (counterCurrent) {
                counterCurrent.textContent = pad(index + 1);
            }

            currentIndex = index;
        }

        function nextSlide() { goToSlide(currentIndex + 1); }
        function prevSlide() { goToSlide(currentIndex - 1); }

        /* Autoplay */
        function startAutoPlay() {
            stopAutoPlay();
            autoPlayTimer = setInterval(nextSlide, AUTO_DELAY);
        }

        function stopAutoPlay() {
            if (autoPlayTimer) {
                clearInterval(autoPlayTimer);
                autoPlayTimer = null;
            }
        }

        function resetAutoPlay() {
            stopAutoPlay();
            startAutoPlay();
        }

        /* Arrows */
        if (nextBtn) {
            nextBtn.addEventListener("click", function () {
                nextSlide();
                resetAutoPlay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", function () {
                prevSlide();
                resetAutoPlay();
            });
        }

        /* Dots */
        dots.forEach(function (dot, i) {
            dot.addEventListener("click", function () {
                goToSlide(i);
                resetAutoPlay();
            });
        });

        /* Keyboard */
        document.addEventListener("keydown", function (e) {
            if (e.key === "ArrowRight") { nextSlide(); resetAutoPlay(); }
            if (e.key === "ArrowLeft")  { prevSlide(); resetAutoPlay(); }
        });

        /* Touch swipe */
        let touchStartX = 0;
        const heroSection = document.querySelector(".yojna-hero");

        if (heroSection) {

            heroSection.addEventListener("touchstart", function (e) {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            heroSection.addEventListener("touchend", function (e) {
                const diff = touchStartX - e.changedTouches[0].screenX;

                if (Math.abs(diff) > 50) {
                    if (diff > 0) nextSlide();
                    else          prevSlide();
                    resetAutoPlay();
                }
            }, { passive: true });

        }

        /* Pause when tab hidden */
        document.addEventListener("visibilitychange", function () {
            if (document.hidden) {
                stopAutoPlay();
            } else {
                startAutoPlay();
            }
        });

        /* Init */
        goToSlide(0);
        startAutoPlay();

    })();


    /* =========================================================
       4. TESTIMONIALS CAROUSEL — TRUE INFINITE LOOP
    ========================================================= */

    (function initTestimonialsCarousel() {

        const track   = document.getElementById("testimonialTrack");
        const prevBtn = document.getElementById("testimonialPrev");
        const nextBtn = document.getElementById("testimonialNext");

        if (!track) return;

        const originalSlides = Array.from(
            track.querySelectorAll(".yojna-testimonial-slide")
        );

        if (!originalSlides.length) return;

        const SLIDE_WIDTH_PCT = 42;
        const AUTO_DELAY      = 5000;
        const realCount       = originalSlides.length;
        const CLONES          = 3;

        /* Build infinite track:
           [last 3 clones] + [originals] + [first 3 clones] */

        for (let i = realCount - CLONES; i < realCount; i++) {
            if (i < 0) continue;
            const clone = originalSlides[i].cloneNode(true);
            clone.classList.add("clone");
            clone.classList.remove("active");
            track.insertBefore(clone, track.firstChild);
        }

        for (let i = 0; i < CLONES; i++) {
            const clone = originalSlides[i].cloneNode(true);
            clone.classList.add("clone");
            clone.classList.remove("active");
            track.appendChild(clone);
        }

        const allSlides = track.querySelectorAll(".yojna-testimonial-slide");

        let current = CLONES;
        let isTransitioning = false;
        let autoPlayTimer = null;

        /* Apply transform */
        function applyTransform(animate) {

            if (animate === false) {
                track.style.transition = "none";
            } else {
                track.style.transition =
                    "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)";
            }

            const offsetPct = (100 - SLIDE_WIDTH_PCT) / 2;
            const translate = -(current * SLIDE_WIDTH_PCT) + offsetPct;

            track.style.transform = "translateX(" + translate + "%)";

            allSlides.forEach(function (s, i) {
                s.classList.toggle("active", i === current);
            });

            if (animate === false) {
                void track.offsetWidth;
                track.style.transition =
                    "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)";
            }
        }

        function goTo(index) {
            if (isTransitioning) return;
            isTransitioning = true;
            current = index;
            applyTransform(true);
        }

        /* Handle end of transition → invisible reset */
        track.addEventListener("transitionend", function (e) {

            if (e.propertyName !== "transform") return;

            if (current < CLONES) {
                current = current + realCount;
                applyTransform(false);
            } else if (current >= CLONES + realCount) {
                current = current - realCount;
                applyTransform(false);
            }

            isTransitioning = false;
        });

        /* Init */
        applyTransform(false);

        /* Controls */
        if (nextBtn) {
            nextBtn.addEventListener("click", function () {
                goTo(current + 1);
                resetAutoPlay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", function () {
                goTo(current - 1);
                resetAutoPlay();
            });
        }

        /* Keyboard */
        document.addEventListener("keydown", function (e) {
            if (e.key === "ArrowRight") { goTo(current + 1); resetAutoPlay(); }
            if (e.key === "ArrowLeft")  { goTo(current - 1); resetAutoPlay(); }
        });

        /* Swipe */
        let touchStartX = 0;

        track.addEventListener("touchstart", function (e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener("touchend", function (e) {
            const diff = touchStartX - e.changedTouches[0].screenX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) goTo(current + 1);
                else          goTo(current - 1);
                resetAutoPlay();
            }
        }, { passive: true });

        /* Autoplay */
        function startAutoPlay() {
            autoPlayTimer = setInterval(function () {
                goTo(current + 1);
            }, AUTO_DELAY);
        }

        function resetAutoPlay() {
            clearInterval(autoPlayTimer);
            startAutoPlay();
        }

        startAutoPlay();

        /* Pause on hover */
        const carousel = document.querySelector(".yojna-testimonials-carousel");

        if (carousel) {
            carousel.addEventListener("mouseenter", function () {
                clearInterval(autoPlayTimer);
            });

            carousel.addEventListener("mouseleave", function () {
                resetAutoPlay();
            });
        }

        /* Responsive */
        window.addEventListener("resize", function () {
            applyTransform(false);
        });

    })();


});