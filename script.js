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

    // Step 1: Show dot loader for 1.5 seconds
    setTimeout(() => {
        dotLoader.classList.add('fade-out');
        
        // Step 2: After dot loader fades, start the main page loading animation
        setTimeout(() => {
            dotLoader.style.display = 'none';
            
            // Trigger the main loading animation
            loadingContainer.classList.add('start-animation');
            
            // Step 3: After main loading animation completes (1900ms), reveal the content
            setTimeout(() => {
                mainPage.classList.add('fade-in');
                header.classList.add('fade-in');

                // NEW: Initialize star field after page reveal
                createStars(1000); 

            }, 1900); 
        }, 500); 
    }, 1500); 
});


// =========================================================================
// DOM Content Loaded: Star Field, Waving Hand, Initial Setup
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Waving Hand Animation on profile image hover
    const imgDiv = document.querySelector('.img_div');
    const wavingHand = document.querySelector('.waving__hand');

    if (imgDiv && wavingHand) {
        imgDiv.addEventListener('mouseenter', () => {
            wavingHand.classList.add('waving__hand_animation');
        });

        imgDiv.addEventListener('mouseleave', () => {
            wavingHand.classList.remove('waving__hand_animation');
        });
    }

    // Initialize Geolocation and Time Update
    initializeGeolocation();
});

// ... (Rest of existing JS functions like calculateProgress, easeInOutCubic, animateEraser) ...


// =========================================================================
// Experience Bar Scroll Animation Logic
// Fills a vertical bar and moves an image along its path based on scroll position.
// =========================================================================

/**
 * Calculates the scroll progress within the 'experience' section.
 * Uses adjusted viewport/section heights for smoother bar timing.
 */
function calculateProgress() {
    const experienceSection = document.querySelector('.experience');
    if (!experienceSection) return 0;
    
    const scrollPosition = window.scrollY;
    const sectionTop = experienceSection.offsetTop;
    const sectionHeight = experienceSection.scrollHeight;
    const windowHeight = window.innerHeight;
    
    // Formula to calculate progress:
    // It accounts for the scroll needed to bring the section into view,
    // and adjusts the total distance to make the bar fill more gradually 
    // (using 60% of windowHeight at the start and 40% at the end).
    let progress = (scrollPosition - sectionTop + (windowHeight * 0.6)) / 
                   (sectionHeight + (windowHeight * 0.4));
    
    // Clamp progress between 0 and 1
    progress = Math.max(0, Math.min(1, progress));
    
    // Apply easing for a smoother, more natural start and end
    return easeInOutCubic(progress);
}

/**
 * Cubic ease-in-out function for smooth acceleration and deceleration.
 * @param {number} t - Progress (0 to 1).
 * @returns {number} - Eased progress (0 to 1).
 */
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Updates the visual height of the bar and the position/style of the image.
 * @param {number} progress - The eased scroll progress (0 to 1).
 */
function updateBarAndImage(progress) {
    if (!experienceBar || !bar || !barImg) return;
    
    const maxBarHeight = experienceBar.scrollHeight;
    const barHeight = progress * maxBarHeight;
    
    // 1. Update filled bar height
    bar.style.height = `${barHeight}px`;
    
    // 2. Position image: Image moves from bottom (maxBarHeight) to top (0)
    const imagePosition = maxBarHeight - barHeight;
    barImg.style.bottom = `${Math.max(0, Math.min(maxBarHeight, imagePosition))}px`;
    
    // 3. Apply subtle scale and ensure visibility
    const scale = 0.9 + (progress * 0.1);
    barImg.style.transform = `translateY(50%) scale(${scale})`;
    barImg.style.opacity = '1';
    
    // 4. Color and Glow effects based on progress (0: red-ish, 1: green-ish)
    const hue = progress * 120; // 0 (red) to 120 (green)
    barImg.style.borderColor = `hsla(${hue}, 80%, 65%, 0.8)`;
    const glowIntensity = 10 + (progress * 20);
    barImg.style.boxShadow = `0 0 ${glowIntensity}px rgba(59, 130, 246, ${0.5 + progress * 0.3})`;
}

/**
 * Smoothly interpolates the current progress towards the target progress 
 * using requestAnimationFrame (rAF).
 */
function animateProgress() {
    // Easing factor (0.25) controls the animation speed. Higher = faster response.
    currentProgress += (targetProgress - currentProgress) * 0.25;
    
    updateBarAndImage(currentProgress);
    
    // Continue animation until the current progress is very close to the target
    if (Math.abs(targetProgress - currentProgress) > 0.001) {
        animationFrameId = requestAnimationFrame(animateProgress);
    } else {
        animationFrameId = null;
    }
}

/**
 * Main function called by the scroll handler to update the target and start rAF.
 */
function bar_motion_scrolling() {
    targetProgress = calculateProgress();
    
    // Start the animation loop if it's not already running
    if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(animateProgress);
    }
}

/**
 * Throttled scroll handler using requestAnimationFrame for performance.
 */
function handleScroll() {
    if (!tickingScroll) {
        window.requestAnimationFrame(() => {
            bar_motion_scrolling();
            tickingScroll = false;
        });
        tickingScroll = true;
    }
}

// Attach event listeners
document.addEventListener('scroll', handleScroll, { passive: true });
window.addEventListener('resize', bar_motion_scrolling);

