document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM is loaded'); // ✅ Check of script geladen wordt

    const hamburgerButton = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');

    console.log('hamburgerButton:', hamburgerButton);
    console.log('mainNav:', mainNav);

    if (!hamburgerButton || !mainNav) {
        console.warn('❌ Required elements not found.');
        return;
    }

    hamburgerButton.addEventListener('click', () => {
        console.log('Hamburger clicked!');

        hamburgerButton.classList.toggle('active');
        mainNav.classList.toggle('nav-open');
    });

    document.querySelectorAll('.main-nav ul a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('nav-open');
            hamburgerButton.classList.remove('active');
        });
    });

    const isMobile = window.matchMedia("(max-width: 768px)");

    function checkMobile(e) {
        if (!e.matches && mainNav.classList.contains('nav-open')) {
            hamburgerButton.classList.remove('active');
            mainNav.classList.remove('nav-open');
        }
    }

    checkMobile(isMobile);
    isMobile.addEventListener('change', checkMobile);
});
