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
        
}

