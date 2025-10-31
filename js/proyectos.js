document.addEventListener('DOMContentLoaded', function () {
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const imageModal = document.getElementById('imageModal');
    let currentZoom = 1;
    let isDragging = false;
    let startX, startY, initialX, initialY;

    // Update modal image when clicking on gallery images
    document.querySelectorAll('.gallery-img').forEach(img => {
        img.addEventListener('click', function() {
            modalImage.src = this.src;
            modalCaption.textContent = this.alt;
            currentZoom = 1;
            modalImage.style.transform = 'scale(1) translate(0px, 0px)';
        });
    });

    // Zoom controls
    document.getElementById('zoomIn').addEventListener('click', () => {
        currentZoom = Math.min(currentZoom * 1.2, 5);
        updateImageTransform();
    });

    document.getElementById('zoomOut').addEventListener('click', () => {
        currentZoom = Math.max(currentZoom / 1.2, 1);
        updateImageTransform();
    });

    document.getElementById('resetZoom').addEventListener('click', () => {
        currentZoom = 1;
        modalImage.style.transform = 'scale(1) translate(0px, 0px)';
    });

    // Mouse wheel zoom
    modalImage.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            currentZoom = Math.min(currentZoom * 1.1, 5);
        } else {
            currentZoom = Math.max(currentZoom / 1.1, 1);
        }
        updateImageTransform();
    });

    // Drag functionality
    modalImage.addEventListener('mousedown', startDragging);
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', stopDragging);

    // Touch support
    modalImage.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startDragging(e.touches[0]);
    });
    window.addEventListener('touchmove', (e) => {
        if (isDragging) {
            e.preventDefault();
            drag(e.touches[0]);
        }
    });
    window.addEventListener('touchend', stopDragging);

    function startDragging(e) {
        if (currentZoom > 1) {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            const transform = new DOMMatrix(window.getComputedStyle(modalImage).transform);
            initialX = transform.m41;
            initialY = transform.m42;
        }
    }

    function drag(e) {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        modalImage.style.transform = `scale(${currentZoom}) translate(${(initialX + dx) / currentZoom}px, ${(initialY + dy) / currentZoom}px)`;
    }

    function stopDragging() {
        isDragging = false;
    }

    function updateImageTransform() {
        const transform = new DOMMatrix(window.getComputedStyle(modalImage).transform);
        const translateX = transform.m41 / transform.m11;
        const translateY = transform.m42 / transform.m22;
        modalImage.style.transform = `scale(${currentZoom}) translate(${translateX}px, ${translateY}px)`;
    }

    // Reset when modal closes
    imageModal.addEventListener('hidden.bs.modal', () => {
        currentZoom = 1;
        modalImage.style.transform = 'scale(1) translate(0px, 0px)';
    });
});