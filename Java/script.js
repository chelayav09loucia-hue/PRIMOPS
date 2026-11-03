
/* =========================================
   PRIME OPS CONGO - WEBSITE JAVASCRIPT
   WEDE PART 3
========================================= */


/* =========================================
   1. DATE AND TIME
========================================= */

function updateDateTime() {

    const datetimeElement = document.getElementById("datetime");

    if (datetimeElement) {

        const now = new Date();

        datetimeElement.textContent =
            now.toLocaleString("en-ZA", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            });
    }
}


/* =========================================
   2. DYNAMIC WELCOME CONTENT
========================================= */

function changeContent() {

    const welcome = document.getElementById("welcome-text");

    if (welcome) {

        welcome.textContent =
            "Prime Ops Congo - Optimisation, Performance, Solutions!";
    }
}


/* =========================================
   3. GALLERY LIGHTBOX
========================================= */

let slideIndex = 1;

function openModal() {

    const modal = document.getElementById("myModal");

    if (modal) {

        modal.style.display = "block";
        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        showSlides(slideIndex);
    }
}


function closeModal() {

    const modal = document.getElementById("myModal");

    if (modal) {

        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";
    }
}


function plusSlides(number) {

    showSlides(slideIndex + number);
}


function currentSlide(number) {

    showSlides(number);
}


function showSlides(number) {

    const slides = document.getElementsByClassName("mySlides");

    const dots = document.getElementsByClassName("demo");

    const caption = document.getElementById("caption");

    if (slides.length === 0) {
        return;
    }

    if (number > slides.length) {
        slideIndex = 1;

    } else if (number < 1) {
        slideIndex = slides.length;

    } else {
        slideIndex = number;
    }

    for (let i = 0; i < slides.length; i++) {

        slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {

        dots[i].classList.remove("active");
    }

    slides[slideIndex - 1].style.display = "block";

    if (dots[slideIndex - 1]) {

        dots[slideIndex - 1].classList.add("active");

        if (caption) {

            caption.textContent = dots[slideIndex - 1].alt;
        }
    }
}


/* =========================================
   4. GALLERY MOBILE SWIPE
========================================= */

function setupGallerySwipe() {

    const modal = document.getElementById("myModal");

    if (!modal) {
        return;
    }

    let touchStartX = 0;
    let touchStartY = 0;

    modal.addEventListener("touchstart", function(event) {

        touchStartX = event.changedTouches[0].screenX;

        touchStartY = event.changedTouches[0].screenY;

    }, { passive: true });


    modal.addEventListener("touchend", function(event) {

        const touchEndX = event.changedTouches[0].screenX;

        const touchEndY = event.changedTouches[0].screenY;

        const differenceX = touchEndX - touchStartX;

        const differenceY = touchEndY - touchStartY;

        if (
            Math.abs(differenceX) > 50 &&
            Math.abs(differenceX) > Math.abs(differenceY)
        ) {

            if (differenceX < 0) {

                plusSlides(1);

            } else {

                plusSlides(-1);
            }
        }

    }, { passive: true });
}


/* =========================================
   5. SERVICE SEARCH AND FILTER
========================================= */

function filterServices() {

    const searchInput = document.getElementById("serviceSearch");

    const filterInput = document.getElementById("serviceFilter");

    const serviceCards = document.querySelectorAll(".service-card");

    const noServices = document.getElementById("noServices");

    if (!searchInput || !filterInput) {
        return;
    }

    const searchText = searchInput.value.toLowerCase();

    const selectedCategory = filterInput.value;

    let visibleCount = 0;

    serviceCards.forEach(function(card) {

        const text = card.textContent.toLowerCase();

        const category = card.dataset.category;

        const matchesSearch = text.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        if (matchesSearch && matchesCategory) {

            card.style.display = "";

            visibleCount++;

        } else {

            card.style.display = "none";
        }
    });

    if (noServices) {

        noServices.style.display =
            visibleCount === 0 ? "block" : "none";
    }
}


/* =========================================
   6. SERVICE DETAILS MODAL
========================================= */

function showServiceDetails(service) {

    const modal = document.getElementById("serviceModal");

    const title = document.getElementById("modalTitle");

    const description = document.getElementById("modalDescription");

    if (!modal || !title || !description) {
        return;
    }

    const details = {

        engineering: {

            title: "Construction and Engineering",

            description:
                "Prime Ops Congo provides industrial planning, " +
                "engineering support, structural planning and " +
                "site development solutions. Contact us to discuss " +
                "your project requirements and request a quotation."
        },

        logistics: {

            title: "Cross-Border Logistics",

            description:
                "Our logistics solutions support supply chain " +
                "coordination, cargo transportation and cross-border " +
                "route planning between the DRC and South Africa."
        },

        mining: {

            title: "Mining Solutions",

            description:
                "Our mining solutions support site operations, " +
                "raw material handling and mining infrastructure. " +
                "Contact us to discuss your project requirements."
        },

        management: {

            title: "Operations Management",

            description:
                "Our operations management solutions focus on " +
                "monitoring, coordination, performance analysis " +
                "and operational planning."
        }

    };

    if (details[service]) {

        title.textContent = details[service].title;

        description.textContent = details[service].description;

        modal.style.display = "flex";
    }
}


function closeServiceModal() {

    const modal = document.getElementById("serviceModal");

    if (modal) {

        modal.style.display = "none";
    }
}


/* =========================================
   7. FAQ ACCORDION
========================================= */

function setupFAQ() {

    const questions = document.querySelectorAll(".faq-question");

    questions.forEach(function(button) {

        button.addEventListener("click", function() {

            const answer = button.nextElementSibling;

            if (!answer) {
                return;
            }

            const isOpen =
                button.getAttribute("aria-expanded") === "true";

            button.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

            answer.style.display = isOpen ? "none" : "block";
        });
    });
}


/* =========================================
   8. FORM VALIDATION AND AJAX SUBMISSION
========================================= */

/*
   IMPORTANT:
   Replace YOUR_FORM_ID with your real Formspree form ID.

   Example:
   https://formspree.io/f/abcdefgh

   Both forms below use the same Formspree endpoint.
*/

const FORMSPREE_ENDPOINT =
   "https://formspree.io/f/xvkkvrez";


async function sendForm(form, feedback, subject) {

    if (!form.checkValidity()) {

        form.reportValidity();

        return;
    }

    const emailInputs = form.querySelectorAll('input[type="email"]');

    for (const input of emailInputs) {

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {

            feedback.textContent = "Please enter a valid email address.";

            feedback.style.color = "red";

            input.focus();

            return;
        }
    }

    const phoneInputs = form.querySelectorAll('input[type="tel"]');

    for (const input of phoneInputs) {

        const phone = input.value.trim();

        const digits = phone.replace(/\D/g, "");

        if (
            !/^\+?[0-9\s()-]+$/.test(phone) ||
            digits.length < 9 ||
            digits.length > 15
        ) {

            feedback.textContent = "Please enter a valid phone number.";

            feedback.style.color = "red";

            input.focus();

            return;
        }
    }

    if (
        FORMSPREE_ENDPOINT.includes("YOUR_FORM_ID")
    ) {

        feedback.textContent =
            "Your information is valid, but email submission is not configured yet. Please add your Formspree endpoint.";

        feedback.style.color = "red";

        return;
    }

    const submitButton = form.querySelector('button[type="submit"]');

    const originalText = submitButton
        ? submitButton.textContent
        : "Submit";

    if (submitButton) {

        submitButton.disabled = true;

        submitButton.textContent = "Sending...";
    }

    feedback.textContent = "Sending your information...";

    feedback.style.color = "#1f6f8b";

    const formData = new FormData(form);

    formData.append("_subject", subject);

    try {

        const response = await fetch(FORMSPREE_ENDPOINT, {

            method: "POST",

            body: formData,

            headers: {
                "Accept": "application/json"
            }

        });

        if (response.ok) {

            feedback.textContent =
                "Thank you! Your information has been submitted successfully. Prime Ops Congo will contact you.";

            feedback.style.color = "green";

            form.reset();

        } else {

            feedback.textContent =
                "Your submission could not be sent. Please check your details and try again.";

            feedback.style.color = "red";
        }

    } catch (error) {

        feedback.textContent =
            "Connection error. Please check your internet connection and try again.";

        feedback.style.color = "red";

    } finally {

        if (submitButton) {

            submitButton.disabled = false;

            submitButton.textContent = originalText;
        }
    }
}


/* =========================================
   9. GENERAL CONTACT FORM
========================================= */

function setupContactForm() {

    const form = document.getElementById("contactForm");

    if (!form) {
        return;
    }

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        const feedback = document.getElementById("successMessage");

        if (!feedback) {
            return;
        }

        sendForm(
            form,
            feedback,
            "New Contact Message - Prime Ops Congo"
        );
    });
}


/* =========================================
   10. BUSINESS ENQUIRY FORM
========================================= */

function setupEnquiryForm() {

    const form = document.getElementById("enquiryForm");

    if (!form) {
        return;
    }

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        const feedback = document.getElementById("enquiryFeedback");

        if (!feedback) {
            return;
        }

        sendForm(
            form,
            feedback,
            "New Business Enquiry - Prime Ops Congo"
        );
    });
}


/* =========================================
   11. LEAFLET INTERACTIVE MAPS
========================================= */

function setupMaps() {

    if (typeof L === "undefined") {
        return;
    }

    // Lubumbashi map

    const lubumbashiElement = document.getElementById("map");

    if (lubumbashiElement && !lubumbashiElement.dataset.mapLoaded) {

        lubumbashiElement.dataset.mapLoaded = "true";

        const lubumbashiLocation = [-11.6876, 27.5026];

        const map = L.map(lubumbashiElement).setView(
            lubumbashiLocation,
            13
        );

        L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                attribution: "&copy; OpenStreetMap contributors",
                maxZoom: 19
            }
        ).addTo(map);

        L.marker(lubumbashiLocation)
            .addTo(map)
            .bindPopup(
                "<b>Lubumbashi</b><br>Democratic Republic of Congo"
            );

        setTimeout(function() {

            map.invalidateSize();

        }, 500);

    }


    // Gauteng map

    const gautengElement = document.getElementById("gautengMap");

    if (gautengElement && !gautengElement.dataset.mapLoaded) {

        gautengElement.dataset.mapLoaded = "true";

        const gautengLocation = [-26.2041, 28.0473];

        const gautengMap = L.map(gautengElement).setView(
            gautengLocation,
            9
        );

        L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                attribution: "&copy; OpenStreetMap contributors",
                maxZoom: 19
            }
        ).addTo(gautengMap);

        L.marker([-26.2041, 28.0473])
            .addTo(gautengMap)
            .bindPopup(
                "<b>Johannesburg</b><br>Gauteng, South Africa"
            );

        L.marker([-25.7479, 28.2293])
            .addTo(gautengMap)
            .bindPopup(
                "<b>Pretoria</b><br>Gauteng, South Africa"
            );

        setTimeout(function() {

            gautengMap.invalidateSize();

        }, 500);
    }
}


/* =========================================
   12. CLOSE MODALS
========================================= */

function setupModalControls() {

    document.addEventListener("keydown", function(event) {

        if (event.key === "Escape") {

            closeModal();

            closeServiceModal();
        }
    });

    const galleryModal = document.getElementById("myModal");

    if (galleryModal) {

        galleryModal.addEventListener("click", function(event) {

            if (event.target === galleryModal) {

                closeModal();
            }
        });
    }

    const serviceModal = document.getElementById("serviceModal");

    if (serviceModal) {

        serviceModal.addEventListener("click", function(event) {

            if (event.target === serviceModal) {

                closeServiceModal();
            }
        });
    }
}


/* =========================================
   13. START WEBSITE FUNCTIONS
========================================= */

document.addEventListener("DOMContentLoaded", function() {

    // Date and time

    updateDateTime();

    setInterval(updateDateTime, 1000);


    // Gallery

    if (document.querySelector(".mySlides")) {

        showSlides(1);

        setupGallerySwipe();
    }


    // Service search

    const searchInput = document.getElementById("serviceSearch");

    const filterInput = document.getElementById("serviceFilter");

    if (searchInput) {

        searchInput.addEventListener("input", filterServices);
    }

    if (filterInput) {

        filterInput.addEventListener("change", filterServices);
    }


    // Other website functions

    setupFAQ();

    setupContactForm();

    setupEnquiryForm();

    setupMaps();

    setupModalControls();

});


