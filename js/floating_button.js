function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
}

function goToHomepage() {
    window.location.href = "/";
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
