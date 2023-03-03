// When the user scrolls the page, execute myFunction
window.onscroll = function() {scrollbar()};

function scrollbar() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    if (scrolled < 0.1) {
        document.getElementById("scroll-indicator").style.width = 0.1 + "%";
    } else {
        document.getElementById("scroll-indicator").style.width = scrolled + "%";
    }
}

function myScrollFunc() {
    let myID = document.getElementById("return-arrow");
    let windowHeight = document.documentElement.clientHeight
    let y = window.scrollY;
    if (y > ((windowHeight/4) - 52)) {
        myID.className = "cta show"
        document.getElementById("return-link").setAttribute("href", "#splash-screen");
    } else {
        myID.className = "cta hide"
        document.getElementById("return-link").removeAttribute("href");
    }
}
window.addEventListener("scroll", myScrollFunc);