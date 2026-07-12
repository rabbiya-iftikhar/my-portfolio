// 1. Dynamic Auto-Typing Script Setup
const dynamicText = document.querySelector(".highlight");
const words = ["Full-Stack Web Developer", "UI/UX Layout Designer", "Information Technology Specialist"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    dynamicText.textContent = currentChar;

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(typeEffect, 90);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 40);
    } else {
        isDeleting = !isDeleting;
        wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
        setTimeout(typeEffect, 1500); // Wait time on complete word
    }
}

// 2. High-Performance Intersection Observer for Scroll Dynamic Reveals
const observerOptions = {
    root: null,
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
};

const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Run features synchronously when DOM elements load completely
document.addEventListener("DOMContentLoaded", () => {
    typeEffect();

    // Intercept grid blocks for automatic upward slide transition
    const elementsToAnimate = document.querySelectorAll(".skill-card, .project-card, h2");
    elementsToAnimate.forEach(element => {
        element.classList.add("reveal-element");
        scrollObserver.observe(element);
    });
});