function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
}

function goToHomepage() {
    window.location.href = "/index.html";
}


window.onscroll = function() { toggleScrollButton() };

window.onscroll = function() { toggleScrollButton() };

function toggleScrollButton() {
    const homeButton = document.getElementById('homeButton');
    // Check if the user has scrolled 200px down the page
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        homeButton.classList.add('show'); // Add 'show' class to make the button visible
    } else {
        homeButton.classList.remove('show'); // Remove "show" class to hide the button
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
