document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('h2');
    const navLinks = document.querySelectorAll('.sidebar ul li');
    let isScrolling = false;

    // Funzione per aggiornare lo stato dei link nella sidebar
    function changeLinkState() {
        let index = sections.length;

        while (--index && window.scrollY + window.innerHeight / 2 < sections[index].offsetTop) { }

        navLinks.forEach((link) => link.classList.remove('active'));

        // Se siamo all'inizio della pagina, evidenziamo sempre il primo capitolo
        if (window.scrollY === 0) {
            navLinks[0].classList.add('active');
        } else if (index >= 0) {
            navLinks[index].classList.add('active');
        }

        // Check if we're at the bottom of the page
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
            navLinks.forEach((link) => link.classList.remove('active'));
            navLinks[navLinks.length - 1].classList.add('active');
        }
    }

    // Funzione ricorsiva per il monitoraggio dello scroll
    function monitorScroll() {
        if (!isScrolling) {
            changeLinkState();
        }
        requestAnimationFrame(monitorScroll); // Richiama la funzione ricorsivamente
    }

    // Imposta il capitolo 1 come attivo all'inizio della pagina
    navLinks.forEach((link) => link.classList.remove('active'));
    navLinks[0].classList.add('active');

    // Avvia il monitoraggio dello scroll
    monitorScroll();

    navLinks.forEach((link, index) => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Previene il comportamento di default del link

            let targetPosition = sections[index].offsetTop;

            // Se il primo link viene cliccato, scrolla all'inizio della pagina
            if (index === 0) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                // Scrolla un po' sopra il target
                window.scrollTo({ top: targetPosition - window.innerHeight * 0.2, behavior: 'smooth' });
            }

            // Rimuove la classe active da tutti i link
            navLinks.forEach((link) => link.classList.remove('active'));
            // Aggiunge la classe active al link cliccato
            event.currentTarget.classList.add('active');

            // Disabilita temporaneamente l'aggiornamento dello stato dei link
            isScrolling = true;
            setTimeout(() => {
                isScrolling = false;
            }, 1000); // Timeout per garantire che lo scroll sia completato
        });
    });

    window.addEventListener('scroll', function () {
        isScrolling = true;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function () {
            isScrolling = false;
        }, 100); // Aggiustare il valore del timeout secondo necessità
    });

    let scrollTimeout = null;
});


/*BLURRING IMAGE AND MAKING IT FULL SCREEN SIZE:*/
function openFullscreen(img) {
    const fullscreenContainer = document.getElementById("fullscreen-container");
    const fullscreenImage = document.getElementById("fullscreen-image");
    const content = document.querySelector('.content');
    const sidebar = document.querySelector('.sidebar');

    // Mostra l'immagine a tutto schermo
    fullscreenImage.src = img.src;
    fullscreenContainer.style.display = "flex";

    // Reset della scala al valore iniziale quando si apre l'immagine
    currentScale = 1.3;
    fullscreenImage.style.transform = `scale(${currentScale})`;

    // Applica l'effetto blur al contenuto della pagina
    content.classList.add("blurred");
    sidebar.classList.add("blurred");

    // Aggiungi l'evento di chiusura quando si clicca fuori dall'immagine o dai controlli
    fullscreenContainer.onclick = function(event) {
        if (event.target === fullscreenContainer) {
            closeFullscreen();
        }
    };
}

function closeFullscreen() {
    const fullscreenContainer = document.getElementById("fullscreen-container");
    const content = document.querySelector('.content');
    const sidebar = document.querySelector('.sidebar');

    // Nascondi il contenitore fullscreen
    fullscreenContainer.style.display = "none";

    // Rimuovi l'effetto blur dal contenuto della pagina
    content.classList.remove("blurred");
    sidebar.classList.remove("blurred");
}

// Funzione per aumentare lo zoom
function zoomIn() {
    const fullscreenImage = document.getElementById("fullscreen-image");
    currentScale += 0.5; // Incrementa la scala di 0.1
    fullscreenImage.style.transform = `scale(${currentScale})`;
}

// Funzione per diminuire lo zoom
function zoomOut() {
    const fullscreenImage = document.getElementById("fullscreen-image");
    currentScale = Math.max(0.5, currentScale - 0.5); // Decrementa la scala di 0.1, non va sotto 0.1
    fullscreenImage.style.transform = `scale(${currentScale})`;
}
