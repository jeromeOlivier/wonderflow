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
}

// Initialize testimonials first time
refreshTestimonials();
showTestimonial(current);
startAutoSlide();

// HTMX EVENTS
document.addEventListener('htmx:load', (event) => {
  const targetElement = event.target;
  if (targetElement) {
    const interactiveElements = targetElement.querySelectorAll('button, input, textarea');
    interactiveElements.forEach(el => {
      el.removeEventListener('mouseenter', handleInteractiveElementMouseEnter);
      el.removeEventListener('mouseleave', handleInteractiveElementMouseLeave);
      el.addEventListener('mouseenter', handleInteractiveElementMouseEnter);
      el.addEventListener('mouseleave', handleInteractiveElementMouseLeave);
    });

    const links = targetElement.querySelectorAll('a');
    links.forEach(el => {
      el.removeEventListener('mouseenter', handleLinkMouseEnter);
      el.removeEventListener('mouseleave', handleLinkMouseLeave);
      el.addEventListener('mouseenter', handleLinkMouseEnter);
      el.addEventListener('mouseleave', handleLinkMouseLeave);
    });

    // Reattach testimonial dots
    refreshTestimonials();
  }
});
