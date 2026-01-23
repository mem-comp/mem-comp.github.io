document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const panels = document.querySelectorAll('.panel');
    const transitionDuration = 100;

    function showPanel(panelId, updateHash = true) {
        const targetPanel = document.getElementById(panelId);
        const activePanel = document.querySelector('.panel.active');
        const targetButton = document.querySelector(`.nav-btn[data-panel="${panelId}"]`);

        if (!targetPanel || targetPanel === activePanel) return;

        navButtons.forEach(btn => btn.classList.remove('active'));
        if (targetButton) {
            targetButton.classList.add('active');
        }

        if (activePanel) {
            activePanel.classList.add('fade-out');
            
            setTimeout(() => {
                activePanel.classList.remove('active', 'fade-out');
                activePanel.style.display = 'none';
                
                targetPanel.style.display = 'block';
                targetPanel.classList.add('fade-in');

                void targetPanel.offsetWidth;

                targetPanel.classList.add('active');
                targetPanel.classList.remove('fade-in');
            }, transitionDuration);
        } else {
            targetPanel.style.display = 'block';
            targetPanel.classList.add('active');
        }

        if (updateHash) {
            history.pushState(null, '', `#${panelId}`);
        }
    }

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const panelId = this.getAttribute('data-panel');
            showPanel(panelId);
        });
    });

    function handleHashChange() {
        const hash = window.location.hash.slice(1);
        if (hash && document.getElementById(hash)) {
            showPanel(hash, false);
        }
    }

    window.addEventListener('hashchange', handleHashChange);

    const initialHash = window.location.hash.slice(1);
    if (initialHash && document.getElementById(initialHash)) {
        panels.forEach(panel => {
            panel.classList.remove('active');
            panel.style.display = 'none';
        });
        navButtons.forEach(btn => btn.classList.remove('active'));
        
        const targetPanel = document.getElementById(initialHash);
        const targetButton = document.querySelector(`.nav-btn[data-panel="${initialHash}"]`);
        
        targetPanel.style.display = 'block';
        targetPanel.classList.add('active');
        if (targetButton) {
            targetButton.classList.add('active');
        }
    }

    window.addEventListener('popstate', function() {
        handleHashChange();
    });
});
