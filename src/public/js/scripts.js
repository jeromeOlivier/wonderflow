// NAVIGATION
let resizeTimer;
const navigation = document.querySelector(".navigation");
const hamburger = document.querySelector("#hamburger");

// click events
hamburger.addEventListener("click", function() {
    if (navigation.classList.contains("hide")) {
        navigation.classList.remove("hide");
    }
    if (navigation.classList.contains("slide-out")) {
        navigation.classList.remove("slide-out");
        navigation.classList.add("slide-in");
    } else if (navigation.classList.contains("slide-in")) {
        navigation.classList.remove("slide-in");
        navigation.classList.add("slide-out");
    } else {
        navigation.classList.add("slide-in");
    }
    hamburger.classList.toggle("close");
});

navigation.addEventListener("click", function() {
    if (navigation.classList.contains("slide-in")) {
        navigation.classList.remove("slide-in");
        navigation.classList.add("slide-out");
        hamburger.classList.toggle("close");
    }
});

// When the window is resized
window.addEventListener("resize", function() {
    // Clear any existing timeout to avoid conflicts
    clearTimeout(resizeTimer);
    // Temporarily stop transitions
    navigation.classList.add("no-transition");
    // After a brief delay, allow transitions again
    resizeTimer = setTimeout(() => {
        navigation.classList.remove("no-transition");
    }, 10);
    // If the window is wide (e.g., desktop view)
    if (window.innerWidth > 960) {
        // Make sure navigation isn't hidden or sliding
        navigation.classList.remove("hide");
        navigation.classList.remove("slide-in");
        navigation.classList.remove("slide-out");
        // Else, if the window is narrow (e.g., mobile view)
    } else {
        // Hide navigation and reset any sliding
        navigation.classList.remove("slide-out");
        navigation.classList.remove("slide-in");
        navigation.classList.add("hide");
        hamburger.classList.remove("close");
    }
});

// FOOTER
// get current year
const getYear = () => new Date().getFullYear().toString();
document.getElementById("year").innerHTML = getYear();

// adjust svg stroke width in footer
function adjustSvgStroke() {
    const svg = document.querySelector("#footer-wave svg");
    const rect = svg.getBoundingClientRect();

    let desiredStrokeWidthPixel = 1;

    const strokeScale = rect.width / 960; // svg viewBox width is 960
    svg.style["stroke-width"] = desiredStrokeWidthPixel / strokeScale + "px";
}

window.addEventListener("resize", adjustSvgStroke);

// Run the function initially to set correct stroke
adjustSvgStroke();
