// Scrolls to top of page
window.onLoad = document.documentElement.scrollTop = 0;

// When the user loads, scrolls, resizes, or rotates the page, update the website
window.onload = updateSite;
window.onscroll = updateSite;
window.onresize = updateSite;
ScreenOrientation.onChange = updateSite;

// When the user clicks the return arrow, execute setScrollingToTop
document.getElementById("return-link").onclick = setScrollingToTop;

// Variable to track whether the user has triggered the return arrow yet
let shownBefore = false;

// Variable to track whether the return arrow is scrolling the page up
let scrollingToTop = false;

// Window variables
let viewportHeight;
let navHeight;
let viewHeight;
let scrollLength;
let scrolled;
let scrolledPercent;

// Sets and updates global variables
function setVars() {
    // Gets the height of the viewport
    viewportHeight = document.documentElement.clientHeight;

    // Gets the height of navigation bar
    navHeight = document.getElementById("navbar").offsetHeight;

    // Gets the height of what the user can see
    viewHeight = viewportHeight - navHeight;

    // Gets how much the user can scroll
    scrollLength = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    // Gets how much the user has scrolled
    scrolled = document.documentElement.scrollTop;

    // Calculates the percentage of the user's scroll relative to the total scroll length
    scrolledPercent = (scrolled / scrollLength) * 100;

    // Set a global css variable to the height of visible content
    document.querySelector(":root").style.setProperty("--visible-content", viewHeight + "px");

    // Set a global css variable to the height of content that isn't visible, AKA the height of the navigation bar
    document.querySelector(":root").style.setProperty("--hidden-content", navHeight + "px");
}

function updateSite() {
    // Updates variables
    setVars();

    // Move the whole page down by the height of the navigation bar
    document.getElementById("header-content").style.top = navHeight + "px";


    // Slide header over to the left and show intro text when scrolled enough
    if (!scrollingToTop && scrolled >= (0.75 * viewHeight)) {
        // Aliases for elements
        const splashText = document.getElementById("splash-text");
        const introText = document.getElementById("intro-wrapper");
        const introContent = document.getElementById("intro-content");

        // New header view after being scrolled
        splashText.style.width = 40 + "%";
        splashText.style.bottom = 0 + "%";
        splashText.style.background = "#222831cc";

        // Header scroll animation
        splashText.style.transition =
            "width 500ms 150ms ease-in," +
            "background-color 500ms 250ms ease-in, " +
            "bottom 100ms ease-in-out";

        // New intro background view after being scrolled
        introText.style.width = 60 + "%";
        introText.style.background = "#353b42cc";

        // Intro background scroll animation
        introText.style.transition = "width 500ms 150ms ease-in";

        // Show intro content after scrolling enough
        if (!scrollingToTop && scrolled >= (1 * viewHeight)) {

            introContent.querySelector("h2").style.opacity = "1";
            introContent.querySelector("h2").className = "animate__animated animate__fadeInDown";
            introContent.querySelector("p").style.top = 0 + "";

            // Intro paragraph scroll animation
            introContent.querySelector("p").style.transition = "top 750ms 500ms ease-in-out";
        } else {
            introContent.querySelector("h2").style.opacity = "0";
            introContent.querySelector("h2").className = "animate__animated animate__fadeOutUp";
            introContent.querySelector("p").style.top = 100 + "vh";

            // Intro paragraph scroll animation
            introContent.querySelector("p").style.transition = "top 750ms 500ms ease-in-out";
        }


    } else {
        // Aliases for elements
        const splashText = document.getElementById("splash-text");
        const introText = document.getElementById("intro-wrapper");
        const introContent = document.getElementById("intro-content");

        // Default view for splash text
        splashText.style.width = 100 + "%";
        splashText.style.bottom = 15 + "%";
        splashText.style.background = "";

        // Don't play header animation if the user pressed the return arrow
        scrollingToTop ? splashText.style.transition = "" : splashText.style.transition =
            "width 500ms 100ms ease-in," +
            "background-color 500ms ease-in, " +
            "bottom 100ms 650ms ease-in-out";

        //Default view for intro text
        introText.style.width = 0 + "%";
        splashText.style.background = "";

        // Don't play intro text animation if the user pressed the return arrow
        scrollingToTop ? introText.style.transition = "" : introText.style.transition = "width 500ms 100ms ease-in";


        // Don't play intro paragraph animation if the user pressed the return arrow
        scrollingToTop ? introContent.querySelector("p").style.transition = "" :
            introContent.querySelector("p").style.transition =
                "top 200ms ease-in";
    }

    // Scroll bar logic
    if (scrolledPercent < 0.1) {
        // When the user scrolls to top of page, set width of scroll bar to 0.1%, so it remains visible
        document.getElementById("scroll-indicator").style.width = 0.1 + "%";
    } else {
        // Update width of scroll bar element at the bottom of the page
        document.getElementById("scroll-indicator").style.width = scrolledPercent + "%";
    }

    // Return arrow animation logic
    if (scrolled >= (2 * viewHeight)) {
        // Show return arrow and animate entrance
        document.getElementById("return-arrow").className = "cta animate__animated animate__bounceInRight";
        // Activate link on return arrow on entrance
        document.getElementById("return-link").setAttribute("href", "#splash-screen");

        // Lets browser remember that the user has triggered the return arrow
        shownBefore = true;
    } else if (shownBefore === false) {
        // Don't show the exit animation if the user hasn't triggered entrance animation yet
        // Keeps the arrow hidden until entrance animation triggers
        document.getElementById("return-arrow").className = "cta hide";
    } else {
        // If user HAS triggered entrance before and has scrolled up far enough, hide the return arrow with an animation
        document.getElementById("return-arrow").className = "cta animate__animated animate__backOutRight";
        // Remove href property on return arrow exit to prevent invisible link
        document.getElementById("return-link").removeAttribute("href");
    }

    if (scrolled >= scrollLength - 50) {
        document.getElementById("return-arrow").style.bottom = 70 + "px";
        document.getElementById("return-arrow").style.transition = "bottom 100ms";
    } else {
        document.getElementById("return-arrow").style.bottom = 20 + "px";
        document.getElementById("return-arrow").style.transition = "bottom 100ms";
    }

}

// Sets setScrollingToTop to true when the user clicks on the return arrow
// This makes sure that everything is already in place when the user returns to the top of the page
function setScrollingToTop() {
    scrollingToTop = true;
    setTimeout(function () {
        scrollingToTop = false;
    }, 1000);
}