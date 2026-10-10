function loadPageComponents() {
    const navbar = document.getElementById('navbar');
    const footer = document.getElementById('footer');

    if (navbar) {
        fetch('components/navbar.html')
            .then((response) => response.text())
            .then((html) => {
                navbar.innerHTML = html;

                const currentPath = window.location.pathname;
                const normalizedPath = currentPath === '/' ? '/' : currentPath.replace(/\/$/, '');

                document.querySelectorAll('.nav-links a').forEach((link) => {
                    const target = link.getAttribute('href');
                    const normalizedTarget = target === '/' ? '/' : target.replace(/\/$/, '');

                    if (
                        (normalizedTarget === '/' && normalizedPath === '/') ||
                        (normalizedTarget !== '/' && normalizedPath.endsWith(normalizedTarget))
                    ) {
                        link.classList.add('active');
                    }
                });
            })
            .catch((error) => {
                console.error('Errore nel caricamento della navbar:', error);
            });
    }

    if (footer) {
        fetch('components/footer.html')
            .then((response) => response.text())
            .then((html) => {
                footer.innerHTML = html;
            })
            .catch((error) => {
                console.error('Errore nel caricamento del footer:', error);
            });
    }
}

document.addEventListener('DOMContentLoaded', loadPageComponents);
