// navigation
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

// resize events
window.addEventListener("resize", function() {
    clearTimeout(resizeTimer);
    navigation.classList.add("no-transition");
    resizeTimer = setTimeout(() => {
        navigation.classList.remove("no-transition");
    }, 10);
    if (window.innerWidth > 960) {
        navigation.classList.remove("hide");
        navigation.classList.remove("slide-in");
        navigation.classList.remove("slide-out");
    } else {
        navigation.classList.remove("slide-out");
        navigation.classList.remove("slide-in");
        navigation.classList.add("hide");
        hamburger.classList.remove("close");
    }
});
