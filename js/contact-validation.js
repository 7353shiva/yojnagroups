/* =========================================================
   CONTACT FORM VALIDATION
   Phone + Email
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* ---------- PHONE VALIDATION ---------- */

    const phoneInput = document.getElementById("phone");

    if (phoneInput) {
        phoneInput.addEventListener("input", function () {
            this.value = this.value.replace(/\D/g, "").slice(0, 10);
        });
    }


    /* ---------- EMAIL VALIDATION ---------- */

    const emailInput = document.getElementById("email");
    const emailForm  = document.querySelector(".contact-form");

    if (emailInput && emailForm) {

        /* Valid email structure — must have @, domain, dot, 2+ letter TLD */
        const strictEmail = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

        /* Common typo domains (missing letters, swapped letters, etc.) */
        const typoDomains = /@(gmao|gmai|gmil|gmal|gamil|gmial|gnail|gmaill|gmai|gmailc|yahooo|yaho|yaoo|hotmial|hotmal|hotmai|outllok|outlok|outloo|rediffmai|iclod|iclould)\./i;

        /* Real-time feedback */
        emailInput.addEventListener("input", function () {

            const value = this.value.trim();

            if (value === "") {
                this.setCustomValidity("");
                return;
            }

            if (!strictEmail.test(value)) {
                this.setCustomValidity("Please enter a valid email address (e.g. name@gmail.com)");
            } else if (typoDomains.test(value)) {
                this.setCustomValidity("Did you mean Gmail / Yahoo / Outlook? Please check your email.");
            } else {
                this.setCustomValidity("");
            }
        });

        /* Block submission if invalid */
        emailForm.addEventListener("submit", function (e) {

            const value = emailInput.value.trim();

            if (!strictEmail.test(value)) {
                e.preventDefault();
                emailInput.setCustomValidity("Please enter a valid email address (e.g. name@gmail.com)");
                emailInput.reportValidity();
                emailInput.focus();
                return;
            }

            if (typoDomains.test(value)) {
                e.preventDefault();
                emailInput.setCustomValidity("Did you mean Gmail / Yahoo / Outlook? Please check your email.");
                emailInput.reportValidity();
                emailInput.focus();
                return;
            }

            /* Valid — clear any previous error */
            emailInput.setCustomValidity("");
        });
    }

});