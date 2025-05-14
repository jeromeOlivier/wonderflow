// NAVIGATION
let resizeTimer;
const navigation = document.querySelector(".navigation");
const hamburger = document.querySelector("#hamburger");

// click events
hamburger.addEventListener("click", function () {
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

navigation.addEventListener("click", function () {
    if (navigation.classList.contains("slide-in")) {
        navigation.classList.remove("slide-in");
        navigation.classList.add("slide-out");
        hamburger.classList.toggle("close");
    }
});

// When the window is resized
window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    navigation.classList.add("no-transition");
    resizeTimer = setTimeout(() => {
        navigation.classList.remove("no-transition");
    }, 10);

    if (window.innerWidth > 960) {
        navigation.classList.remove("hide", "slide-in", "slide-out");
    } else {
        navigation.classList.remove("slide-in", "slide-out");
        navigation.classList.add("hide");
        hamburger.classList.remove("close");
    }
});

// FOOTER
const getYear = () => new Date().getFullYear().toString();
document.getElementById("year").innerHTML = getYear();

function adjustSvgStroke() {
    const svg = document.querySelector("#footer-wave svg");
    if (svg) {
        const rect = svg.getBoundingClientRect();
        let desiredStrokeWidthPixel = 1;
        const strokeScale = rect.width / 960; // svg viewBox width is 960
        svg.style["stroke-width"] = desiredStrokeWidthPixel / strokeScale + "px";
    }
}

window.addEventListener("resize", adjustSvgStroke);
adjustSvgStroke();

// CURSOR
const $circle = document.querySelector('.cursor-circle');

let delay = 8;
let endX = window.innerWidth / 2;
let endY = window.innerHeight / 2;
let _x = endX;
let _y = endY;
let cursorVisible = false;
let cursorEnlarged = false;
let isOverInteractiveElement = false;

function mouseMoveHandler(e) {
    cursorVisible = true;
    if (!isOverInteractiveElement) toggleCursorVisibility();
    endX = e.clientX;
    endY = e.clientY;
    if (_x === undefined && _y === undefined) {
        _x = endX;
        _y = endY;
    }
}

function mouseEnterDocumentHandler(e) {
    cursorVisible = true;
    const target = e.target;
    if (target instanceof Element && target.matches('button, input, textarea')) {
        $circle.style.opacity = '0';
        isOverInteractiveElement = true;
    } else {
        toggleCursorVisibility();
        isOverInteractiveElement = false;
    }
}

function mouseLeaveDocumentHandler() {
    cursorVisible = false;
    toggleCursorVisibility();
    isOverInteractiveElement = false;
}

function handleLinkMouseEnter() {
    cursorEnlarged = true;
    toggleCursorSize();
}

function handleLinkMouseLeave() {
    cursorEnlarged = false;
    toggleCursorSize();
}

function handleInteractiveElementMouseEnter() {
    $circle.style.opacity = '0';
    isOverInteractiveElement = true;
}

function handleInteractiveElementMouseLeave() {
    $circle.style.opacity = cursorVisible ? '1' : '0';
    isOverInteractiveElement = false;
}

function animate() {
    _x += (endX - _x) / delay;
    _y += (endY - _y) / delay;
    if ($circle) {
        $circle.style.top = `${_y}px`;
        $circle.style.left = `${_x}px`;
    }
    requestAnimationFrame(animate);
}

function toggleCursorSize() {
    if ($circle) {
        $circle.style.transform = cursorEnlarged
            ? 'translate(-50%, -50%) scale(1.5)'
            : 'translate(-50%, -50%) scale(1)';
    }
}

function toggleCursorVisibility() {
    if ($circle) {
        $circle.style.opacity = cursorVisible ? '1' : '0';
    }
}

function initializeCursor() {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mousemove', mouseMoveHandler);

    document.removeEventListener('mouseenter', mouseEnterDocumentHandler);
    document.addEventListener('mouseenter', mouseEnterDocumentHandler);

    document.removeEventListener('mouseleave', mouseLeaveDocumentHandler);
    document.addEventListener('mouseleave', mouseLeaveDocumentHandler);

    const initialInteractiveElements = document.querySelectorAll('button, input, textarea');
    initialInteractiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleInteractiveElementMouseEnter);
        el.removeEventListener('mouseleave', handleInteractiveElementMouseLeave);
        el.addEventListener('mouseenter', handleInteractiveElementMouseEnter);
        el.addEventListener('mouseleave', handleInteractiveElementMouseLeave);
    });

    const initialLinks = document.querySelectorAll('a');
    initialLinks.forEach(el => {
        el.removeEventListener('mouseenter', handleLinkMouseEnter);
        el.removeEventListener('mouseleave', handleLinkMouseLeave);
        el.addEventListener('mouseenter', handleLinkMouseEnter);
        el.addEventListener('mouseleave', handleLinkMouseLeave);
    });

    animate();
}

initializeCursor();

// TESTIMONIALS SLIDER
let testimonials = [];
let dots = [];
const INTERVAL_PERIOD = 5000;
let current = 0;
let interval = null;

function showTestimonial(index) {
    testimonials.forEach(t => t.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    current = index;
}

function nextTestimonial() {
    current = (current + 1) % testimonials.length;
    showTestimonial(current);
}

function startAutoSlide() {
    interval = setInterval(nextTestimonial, INTERVAL_PERIOD);
}

function resetAutoSlide() {
    clearInterval(interval);
    startAutoSlide();
}

function refreshTestimonials() {
    testimonials = document.querySelectorAll('.testimonial');
    dots = document.querySelectorAll('.testimonial-dot');

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            showTestimonial(index);
            resetAutoSlide();
        });
    });

    current = 0;

    if (testimonials.length > 0 && dots.length > 0) {
        showTestimonial(current);
    }

    clearInterval(interval);
}

function initializeCanvas() {
    const canvas = document.getElementById('bg-canvas');

    if (!canvas) {
        console.warn('Canvas with id="bg-canvas" not found.');
        return;
    }

    const ctx = canvas.getContext('2d');
    let circles = [];

    const movementArea = {
        widthRatio: 0.9,
        heightRatio: 0.9,
    };

    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        ctx.setTransform(1, 0, 0, 1, 0, 0); // <-- critical fix
    }

    function createCircles() {
        const colors = [
            '#FFF590', '#B3FFD9', '#FFB3B3', '#E0B3FF', '#AEEBFF'
        ];

        circles = [];

        const availableWidth = canvas.width * movementArea.widthRatio;
        const availableHeight = canvas.height * movementArea.heightRatio;
        const offsetX = (canvas.width - availableWidth) / 2;
        const offsetY = (canvas.height - availableHeight) / 2;

        colors.forEach(color => {
            for (let i = 0; i < 3; i++) {
                const radius = Math.random() * 15 + 5;
                circles.push({
                    x: Math.random() * (availableWidth - radius * 4) + offsetX + radius * 2,
                    y: Math.random() * (availableHeight - radius * 4) + offsetY + radius * 2,
                    radius: radius,
                    color: color,
                    dx: (Math.random() - 0.5) * 0.28,
                    dy: (Math.random() - 0.5) * 0.28,
                    offsetX,
                    offsetY,
                    availableWidth,
                    availableHeight,
                });
            }
        });

        circles = shuffleArray(circles);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function animateCanvas() {
        if (!canvas || !ctx) return; // Stop if canvas disappeared

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        circles.forEach(c => {
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
            ctx.fillStyle = c.color;
            ctx.fill();

            c.x += c.dx;
            c.y += c.dy;

            if (c.x + c.radius >= c.offsetX + c.availableWidth || c.x - c.radius <= c.offsetX) {
                c.dx *= -1;
            }
            if (c.y + c.radius >= c.offsetY + c.availableHeight || c.y - c.radius <= c.offsetY) {
                c.dy *= -1;
            }
        });

        requestAnimationFrame(animateCanvas);
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
        createCircles();
    });

    resizeCanvas();
    createCircles();
    animateCanvas();
}

function rebindInteractiveElementHoverListeners(scope = document) {
    const interactiveElements = scope.querySelectorAll('button, input, textarea');
    interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleInteractiveElementMouseEnter);
        el.removeEventListener('mouseleave', handleInteractiveElementMouseLeave);
        el.addEventListener('mouseenter', handleInteractiveElementMouseEnter);
        el.addEventListener('mouseleave', handleInteractiveElementMouseLeave);
    });

    const links = scope.querySelectorAll('a');
    links.forEach(el => {
        el.removeEventListener('mouseenter', handleLinkMouseEnter);
        el.removeEventListener('mouseleave', handleLinkMouseLeave);
        el.addEventListener('mouseenter', handleLinkMouseEnter);
        el.addEventListener('mouseleave', handleLinkMouseLeave);
    });
}

function rehydratePage(scope = document) {
    const testimonialElements = scope.querySelectorAll('.testimonial');
    const dotElements = scope.querySelectorAll('.testimonial-dot');
    if (testimonialElements.length > 0 && dotElements.length > 0) {
        refreshTestimonials();
        showTestimonial(0);
        startAutoSlide();
    }

    const canvas = scope.querySelector('#bg-canvas');
    if (canvas) {
        initializeCanvas();
    }

    initializeCursor();
    rebindInteractiveElementHoverListeners(scope);
}

document.addEventListener('DOMContentLoaded', () => {
    rehydratePage();
});

document.addEventListener('htmx:load', (event) => {
    const scope = event.target;
    if (scope) {
        rehydratePage(scope);
    }
});





