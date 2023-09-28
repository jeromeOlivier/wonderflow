function toTop() {
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 100);
}

const textarea = document.querySelector("#message");
textarea.addEventListener("input", autoResize, false);

function autoResize() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
}