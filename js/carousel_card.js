document.addEventListener('DOMContentLoaded', () => {
    const cards = document.getElementById('cards');
    let isDown = false;
    let startX;
    let scrollLeft;
    let animationFrameId;
  
    const moveCards = (e) => {
        if (!isDown) return;
        const x = e.pageX - cards.offsetLeft;
        const walk = (x - startX) * 2; // Reduce multiplier for smoother drag
        cards.scrollLeft = scrollLeft - walk;
    };
  
    const startDrag = (e) => {
        isDown = true;
        startX = e.pageX - cards.offsetLeft;
        scrollLeft = cards.scrollLeft;
        animationFrameId = requestAnimationFrame(() => moveCards(e));
    };
  
    const stopDrag = () => {
        isDown = false;
        cancelAnimationFrame(animationFrameId);
    };
  
    cards.addEventListener('mousedown', startDrag);
    cards.addEventListener('mouseleave', stopDrag);
    cards.addEventListener('mouseup', stopDrag);
    cards.addEventListener('mousemove', (e) => {
        if (isDown) {
            e.preventDefault();
            animationFrameId = requestAnimationFrame(() => moveCards(e));
        }
    });
  
    // Similar approach for touch events
    cards.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - cards.offsetLeft;
        scrollLeft = cards.scrollLeft;
    });
  
    cards.addEventListener('touchend', stopDrag);
    cards.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - cards.offsetLeft;
        const walk = (x - startX) * 2; // Reduce multiplier for smoother drag
        cards.scrollLeft = scrollLeft - walk;
    });
  });
  