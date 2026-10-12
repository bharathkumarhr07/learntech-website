
document.addEventListener("DOMContentLoaded", () => {
    // Navigation menu
    const menuToggle = document.getElementById("menuToggle");
    const mainMenu = document.getElementById("mainMenu");

    if (menuToggle && mainMenu) {
        menuToggle.addEventListener("click", () => {
            const isOpen = mainMenu.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }

    // Footer year
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Purchase Course - Open WhatsApp app
    const purchaseButton = document.getElementById("purchaseButton");

    if (purchaseButton) {
        purchaseButton.addEventListener("click", () => {
            const courseName =
                document.querySelector(".banner-text h1")
                    ?.textContent.trim() || "LearnTech Course";

            const whatsappNumber = "919148816072";

            const message =
                `Hello LearnTech! I am interested in purchasing the ${courseName} course. Please share the course price and enrollment details.`;

            const encodedMessage = encodeURIComponent(message);

            const whatsappAppURL =
                `whatsapp://send?phone=${whatsappNumber}&text=${encodedMessage}`;

            const whatsappFallbackURL =
                `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            // Try to open the WhatsApp app directly
            window.location.href = whatsappAppURL;

            // Provide a fallback if the app does not open
            const shareStatus = document.getElementById("shareStatus");

            if (shareStatus) {
                shareStatus.innerHTML =
                    `If WhatsApp does not open, <a href="${whatsappFallbackURL}" target="_blank" rel="noopener noreferrer">click here to continue</a>.`;
            }
        });
    }

    // Share Course
    const shareButton = document.getElementById("shareCourse");
    const shareStatus = document.getElementById("shareStatus");

    if (shareButton) {
        shareButton.addEventListener("click", async () => {
            const shareData = {
                title: document.title,
                text: "Check out this course on LearnTech!",
                url: window.location.href
            };

            try {
                if (navigator.share) {
                    await navigator.share(shareData);
                } else {
                    await navigator.clipboard.writeText(shareData.url);

                    if (shareStatus) {
                        shareStatus.textContent = "Course link copied!";
                    }
                }
            } catch (error) {
                if (error.name !== "AbortError" && shareStatus) {
                    shareStatus.textContent =
                        "Unable to share. Please copy the course link.";
                }
            }
        });
    }
});
