document.addEventListener('DOMContentLoaded', () => {
    const cards = document.getElementById('cards');
    let isDown = false;
    let startX;
    let scrollLeft;
    let startY;
    let isVerticalScroll = false;

    const moveCards = (e) => {
        if (!isDown || isVerticalScroll) return;
        const x = (e.touches ? e.touches[0].pageX : e.pageX) - cards.offsetLeft;
        const walk = (x - startX) * 2; // Adjust multiplier for smoother drag
        cards.scrollLeft = scrollLeft - walk;
    };

    const startDrag = (e) => {
        isDown = true;
        startX = (e.touches ? e.touches[0].pageX : e.pageX) - cards.offsetLeft;
        startY = e.touches ? e.touches[0].pageY : e.pageY;
        scrollLeft = cards.scrollLeft;
        isVerticalScroll = false; // Reset on new drag
    };

    const stopDrag = () => {
        isDown = false;
    };

    const handleTouchMove = (e) => {
        if (!isDown) return;

        const x = e.touches[0].pageX - cards.offsetLeft;
        const y = e.touches[0].pageY;
        const diffX = Math.abs(x - startX);
        const diffY = Math.abs(y - startY);

        // Determine if user is scrolling vertically
        if (diffY > diffX) {
            isVerticalScroll = true; // User is scrolling vertically
        } else {
            e.preventDefault(); // Prevent vertical scrolling if horizontal scroll is more significant
            moveCards(e); // Continue moving cards horizontally
        }
    };

    cards.addEventListener('mousedown', startDrag);
    cards.addEventListener('mouseleave', stopDrag);
    cards.addEventListener('mouseup', stopDrag);
    cards.addEventListener('mousemove', (e) => {
        if (isDown) {
            e.preventDefault(); // Prevent text selection or other default actions
            moveCards(e); // Move cards horizontally
        }
    });

    // Touch event listeners
    cards.addEventListener('touchstart', startDrag);
    cards.addEventListener('touchend', stopDrag);
    cards.addEventListener('touchmove', handleTouchMove);
});
