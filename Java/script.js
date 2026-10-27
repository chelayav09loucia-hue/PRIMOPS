    
// Display the date and time in the footer
function updateDateTime() {
    const now = new Date();

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    };

    const datetimeElement = document.getElementById("datetime");

    if (datetimeElement) {
        datetimeElement.textContent = now.toLocaleString("en-US", options);
    }
}

// Update the date and time immediately and every second
updateDateTime();
setInterval(updateDateTime, 1000);


// Function for the Change Content button
function changeContent() {
    const paragraph = document.getElementById("welcome-text");

    if (paragraph) {
        paragraph.textContent = "Explore Prime Ops Congo: Our People, Projects and Operations!";
    }
}


// Open the lightbox
function openModal() {
    document.getElementById("myModal").style.display = "block";
    document.body.style.overflow = "hidden";
}


// Close the lightbox
function closeModal() {
    document.getElementById("myModal").style.display = "none";
    document.body.style.overflow = "auto";
}


// Keep track of the current slide
let slideIndex = 1;


// Display the next or previous slide
function plusSlides(n) {
    showSlides(slideIndex + n);
}


// Display a selected slide using its thumbnail
function currentSlide(n) {
    showSlides(n);
}


// Display the correct image and caption
function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("demo");
    const captionText = document.getElementById("caption");

    if (slides.length === 0) {
        return;
    }

    // Move to the first slide after the last one
    if (n > slides.length) {
        slideIndex = 1;
    } else if (n < 1) {
        slideIndex = slides.length;
    } else {
        slideIndex = n;
    }

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Remove active styling from all thumbnails
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    // Show the selected slide
    slides[slideIndex - 1].style.display = "block";

    // Highlight the selected thumbnail
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add("active");

        // Update the caption
        captionText.textContent = dots[slideIndex - 1].alt;
    }
}


// Close the lightbox when clicking outside the image
window.addEventListener("click", function(event) {
    const modal = document.getElementById("myModal");

    if (event.target === modal) {
        closeModal();
    }
});


// Close the lightbox with the Escape key
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeModal();
    }
});


// Show the first slide when the page loads
showSlides(1);   

// ===================================
// SWIPE LEFT AND RIGHT IN THE LIGHTBOX
// ===================================

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

const galleryModal = document.getElementById("myModal");

if (galleryModal) {

    // Record where the finger touches the screen
    galleryModal.addEventListener("touchstart", function (event) {
        touchStartX = event.changedTouches[0].screenX;
        touchStartY = event.changedTouches[0].screenY;
    }, { passive: true });

    // Detect the direction of the swipe
    galleryModal.addEventListener("touchend", function (event) {
        touchEndX = event.changedTouches[0].screenX;
        touchEndY = event.changedTouches[0].screenY;

        const differenceX = touchEndX - touchStartX;
        const differenceY = touchEndY - touchStartY;

        // Only change pictures for a clear horizontal swipe
        if (Math.abs(differenceX) > 50 &&
            Math.abs(differenceX) > Math.abs(differenceY)) {

            if (differenceX < 0) {
                // Swipe left: show the next picture
                plusSlides(1);
            } else {
                // Swipe right: show the previous picture
                plusSlides(-1);
            }
        }
    }, { passive: true });
}
// Contact form validation and success message
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {

        // Prevent the page from reloading
        event.preventDefault();

        // Get form values
        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Get error message elements
        const nameError = document.getElementById("nameError");
        const phoneError = document.getElementById("phoneError");
        const emailError = document.getElementById("emailError");
        const messageError = document.getElementById("messageError");
        const successMessage = document.getElementById("successMessage");

        // Clear previous messages
        nameError.textContent = "";
        phoneError.textContent = "";
        emailError.textContent = "";
        messageError.textContent = "";
        successMessage.textContent = "";

        // Track validation errors
        let isValid = true;

        // Validate full name
        if (name.length < 3) {
            nameError.textContent =
                "Please enter a name containing at least 3 characters.";
            isValid = false;
        }

        // Validate phone number
        const phoneDigits = phone.replace(/\D/g, "");
        const phonePattern = /^\+?[0-9\s()-]+$/;

        if (!phonePattern.test(phone) ||
            phoneDigits.length < 9 ||
            phoneDigits.length > 15) {

            phoneError.textContent =
                "Please enter a valid phone number.";
            isValid = false;
        }

        // Validate email address
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            emailError.textContent =
                "Please enter a valid email address.";
            isValid = false;
        }

        // Validate message
        if (message.length < 10) {
            messageError.textContent =
                "Your message must contain at least 10 characters.";
            isValid = false;
        }

        // Display the result
        if (isValid) {
            successMessage.textContent =
                "Success! Your form has passed validation.";

            successMessage.style.color = "green";
            successMessage.style.fontWeight = "bold";

            // Reset the form after successful validation
            contactForm.reset();
        }
    });
}