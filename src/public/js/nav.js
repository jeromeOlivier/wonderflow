// navigation
const navigation = document.querySelector('nav');
const hamburger = document.querySelector("#hamburger");

// click events
hamburger.addEventListener("click", function() {
    console.log("Resize event fired");
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

// resize events
window.addEventListener("resize", function() {
    if (window.innerWidth > 970) {
        navigation.classList.remove("hide");
        navigation.classList.remove("slide-in");
        navigation.classList.remove("slide-out");
    } else {
        navigation.classList.remove("slide-out");
        navigation.classList.remove("slide-in");
        navigation.classList.add("hide");
    }
});

