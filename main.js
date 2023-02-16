// When the user scrolls the page, execute myFunction
window.onscroll = function() {scrollbar()};

function scrollbar() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    if (scrolled < 1) {
        document.getElementById("scroll-indicator").style.width = 1 + "%";
    } else {
        document.getElementById("scroll-indicator").style.width = scrolled + "%";
    }
}