// =========================================================================
// Global Constants and Utility Variables
// =========================================================================

// Cache frequently used DOM elements
const bar = document.querySelector('.bar');
const experienceBar = document.querySelector('.experience__bar');
const barImg = document.querySelector('.experience__bar img');
const eraser = document.querySelector('.eraser');
const col1 = document.querySelector('.col1');
const col2 = document.querySelector('.col2');

// Variables for the Experience Bar scroll animation
let currentProgress = 0;
let targetProgress = 0;
let animationFrameId = null; 
let tickingScroll = false; 

// Variables for the Education Bar animation
let barAnimationFrame = null;
let currentBarHeight = 0;
let targetBarHeight = 0;

// Variables for the Eraser animation
let targetRotation = -50; 
let currentRotation = -50;


// =========================================================================
// Star Blinking Animation Logic (NEWLY ADDED)
// =========================================================================

/**
 * Creates and appends random stars to the star container.
 * Stars are positioned using viewport units (vw/vh) and given randomized 
 * animation properties to create a natural, twinkling effect.
 * @param {number} count The number of stars to generate.
 */
function createStars(count) {
    // The star container is assumed to be a full-screen element (e.g., in index.html)
    const starContainer = document.getElementById('star-container');
    if (!starContainer) return;

    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random size between 1px and 3px
        const size = Math.random() * 2 + 1; 
        
        // Random position (0 to 98vw/vh) to cover the screen and avoid edge cutoff
        const x = Math.random() * 98;
        const y = Math.random() * 98;
        
        // Random delay (negative value starts animation instantly at a random point)
        const delay = Math.random() * -15; 
        // Random duration (5s to 15s) for varied twinkle speed
        const duration = Math.random() * 10 + 5; 

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${x}vw`;
        star.style.top = `${y}vh`;
        star.style.animationDelay = `${delay}s`;
        star.style.animationDuration = `${duration}s`;
        
        starContainer.appendChild(star);
    }
}


// =========================================================================
// Page Loading & Dot Loader Control
// =========================================================================

window.addEventListener('load', function() {
    const dotLoader = document.getElementById('dotLoader');
    const loadingContainer = document.querySelector('.loading');
    const mainPage = document.querySelector('.main__page');
    const header = document.querySelector('header');
    
    if (!dotLoader || !loadingContainer || !mainPage || !header) return;

    
});


