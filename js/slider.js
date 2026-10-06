/* =========================================================
   HERO SLIDER — 5 SLIDES
========================================================= */

(function () {

    const slides = document.querySelectorAll(".yojna-hero-slide");
    const dots = document.querySelectorAll(".yojna-hero-dot");
    const prevBtn = document.querySelector(".yojna-hero-prev");
    const nextBtn = document.querySelector(".yojna-hero-next");
    const counterCurrent = document.querySelector(".yojna-hero-current");

    if (!slides.length) return;

    let currentIndex = 0;
    let autoPlayTimer = null;
    const AUTO_DELAY = 5500;

    /* Helper: format number as 01, 02, ... */
    function pad(n) {
        return n < 10 ? "0" + n : "" + n;
    }

    /* Show a specific slide */
    function goToSlide(index) {

        if (index < 0) {
            index = slides.length - 1;
        }

        if (index >= slides.length) {
            index = 0;
        }

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

    /* Next / Prev */
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

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

    /* Event: Arrows */
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

    /* Event: Dots */
    dots.forEach(function (dot, i) {
        dot.addEventListener("click", function () {
            goToSlide(i);
            resetAutoPlay();
        });
    });

    /* Keyboard navigation */
    document.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") {
            nextSlide();
            resetAutoPlay();
        }
        if (e.key === "ArrowLeft") {
            prevSlide();
            resetAutoPlay();
        }
    });

    /* Touch swipe (mobile) */
    let touchStartX = 0;
    let touchEndX = 0;
    const heroSection = document.querySelector(".yojna-hero");

    if (heroSection) {
        heroSection.addEventListener("touchstart", function (e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        heroSection.addEventListener("touchend", function (e) {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                resetAutoPlay();
            }
        }, { passive: true });
    }

    /* Pause autoplay when tab is hidden */
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    });

    /* Start autoplay on load */
    goToSlide(0);
    startAutoPlay();

})();