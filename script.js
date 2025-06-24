// Variables globales
let currentWindow = null;
let isDragging = false;
let dragOffset = { x: 0, y: 0 };
let isPlaying = false;
let currentTrack = 0;
let volume = 50;
let currentTime = 0;
let duration = 100;
let wordWrap = true;

// Données des pistes de musique
const tracks = [
    {
        title: "Track 1",
        artist: "X",
        duration: 180,
        src: "https://soundcloud.com/macktheduke100/london?in=macktheduke100/sets/beat-mix-1&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
    },
    {
        title: "Track 2",
        artist: "X",
        duration: 210,
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        title: "Track 3",
        artist: "X",
        duration: 195,
        src: "https://soundcloud.com/macktheduke/red?in=macktheduke/sets/beat-pack&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
    }
];
const audio = new Audio();
let currentTrackIndex = 0;

// Éléments DOM
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const trackTitle = document.getElementById("trackTitle");
const trackArtist = document.getElementById("trackArtist");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volumeSlider = document.querySelector(".volume-slider");
const playlistItems = document.querySelectorAll(".playlist-item");

// Fonctions
function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.src;
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    audio.load();
}

function playPause() {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
    } else {
        audio.pause();
        playBtn.innerHTML = `<i class="fas fa-play"></i>`;
    }
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
    updatePlaylistUI();
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
    updatePlaylistUI();
}

function updatePlaylistUI() {
    playlistItems.forEach(item => item.classList.remove("active"));
    playlistItems[currentTrackIndex].classList.add("active");
}

function updateProgress() {
    if (!isNaN(audio.duration)) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${percent}%`;
        currentTimeEl.textContent = formatTime(audio.currentTime);
        durationEl.textContent = formatTime(audio.duration);
    }
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

// Événements
playBtn.addEventListener("click", playPause);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);
audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextTrack);
volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value / 100;
});

playlistItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        currentTrackIndex = index;
        loadTrack(index);
        audio.play();
        updatePlaylistUI();
    });
});

// Lancer la première piste
loadTrack(currentTrackIndex);


// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    createParticles();
});

function initializeApp() {
    // Gestion du login
    const loginBtn = document.getElementById('loginBtn');
    const guestBtn = document.getElementById('guestBtn');
    const loginScreen = document.getElementById('loginScreen');
    const desktop = document.getElementById('desktop');
    
    loginBtn.addEventListener('click', function() {
        showLoadingBar();
        setTimeout(() => {
            loginScreen.style.opacity = '0';
            loginScreen.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                loginScreen.classList.add('hidden');
                desktop.classList.remove('hidden');
                startDesktop();
            }, 300);
        }, 2000);
    });

    guestBtn.addEventListener('click', function() {
        loginScreen.style.opacity = '0';
        loginScreen.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            loginScreen.classList.add('hidden');
            desktop.classList.remove('hidden');
            startDesktop();
        }, 300);
    });
    
    // Gestion des icônes du bureau
    const desktopIcons = document.querySelectorAll('.desktop-icon');
    desktopIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Désélectionner toutes les icônes
            desktopIcons.forEach(i => i.classList.remove('selected'));
            // Sélectionner l'icône cliquée
            this.classList.add('selected');
            
            const windowId = this.dataset.window;
            const action = this.dataset.action;
            
            if (windowId) {
                openWindow(windowId);
            } else if (action === 'download-cv') {
                downloadCV();
            }
        });
        
        // Effet de double-clic
        icon.addEventListener('dblclick', function() {
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
    
    // Gestion des boutons de contrôle des fenêtres
    const closeButtons = document.querySelectorAll('.window-close');
    const minimizeButtons = document.querySelectorAll('.window-minimize');
    const maximizeButtons = document.querySelectorAll('.window-maximize');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const windowId = this.dataset.window;
            closeWindow(windowId);
        });
    });

    minimizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const windowId = this.dataset.window;
            minimizeWindow(windowId);
        });
    });

    maximizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const windowId = this.dataset.window;
            maximizeWindow(windowId);
        });
    });
    
    // Gestion du drag and drop des fenêtres
    initializeWindowDragging();
    
    // Gestion des onglets de compétences
    initializeSkillsTabs();
    
    // Gestion du portfolio
    initializePortfolio();
    
    // Gestion du menu démarrer
    initializeStartMenu();
    
    // Gestion des notifications
    initializeNotifications();
    
    // Gestion du contrôle de volume
    initializeVolumeControl();
    
    // Gestion du menu contextuel
    initializeContextMenu();
    
    // Démarrage de l'horloge
    updateDateTime();
    updateClock();
    setInterval(updateDateTime, 1000);
    setInterval(updateClock, 1000);
    
    // Gestion du formulaire de contact
    initializeContactForm();
    
    // Gestion de la calculatrice
    initializeCalculator();
    
    // Gestion du bloc-notes
    initializeNotepad();
    
    // Gestion du lecteur de musique
    initializeMusicPlayer();
    
    // Gestion de la galerie
    initializeGallery();
    
    // Gestion de la recherche
    initializeSearch();
}

function showLoadingBar() {
    const loadingBar = document.querySelector('.loading-bar');
    const loadingProgress = document.querySelector('.loading-progress');
    
    loadingBar.classList.remove('hidden');
    setTimeout(() => {
        loadingProgress.style.width = '100%';
    }, 100);
}

function startDesktop() {
    // Animation d'entrée des icônes
    const icons = document.querySelectorAll('.desktop-icon');
    icons.forEach((icon, index) => {
        icon.style.opacity = '0';
        icon.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            icon.style.transition = 'all 0.5s ease';
            icon.style.opacity = '1';
            icon.style.transform = 'translateX(0)';
        }, index * 100);
    });
    
    // Animation de la barre des tâches
    const taskbar = document.querySelector('.taskbar');
    taskbar.style.transform = 'translateY(100%)';
    setTimeout(() => {
        taskbar.style.transition = 'transform 0.5s ease';
        taskbar.style.transform = 'translateY(0)';
    }, 500);

    // Animation des widgets
    const widgets = document.querySelectorAll('.weather-widget, .clock-widget');
    widgets.forEach((widget, index) => {
        widget.style.opacity = '0';
        widget.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            widget.style.transition = 'all 0.5s ease';
            widget.style.opacity = '1';
            widget.style.transform = 'translateY(0)';
        }, 800 + index * 200);
    });
}

function openWindow(windowId) {
    const window = document.getElementById(windowId + 'Window');
    if (!window) return;
    
    // Fermer la fenêtre actuelle si elle existe
    if (currentWindow && currentWindow !== window) {
        currentWindow.classList.add('hidden');
    }
    
    // Ouvrir la nouvelle fenêtre
    window.classList.remove('hidden');
    window.classList.remove('minimized');
    currentWindow = window;
    
    // Animation d'ouverture
    window.style.opacity = '0';
    window.style.transform = 'scale(0.8) translateY(-20px)';
    
    setTimeout(() => {
        window.style.transition = 'all 0.3s ease';
        window.style.opacity = '1';
        window.style.transform = 'scale(1) translateY(0)';
    }, 10);
    
    // Positionner la fenêtre de manière aléatoire
    const maxX = window.innerWidth - window.offsetWidth - 50;
    const maxY = window.innerHeight - window.offsetHeight - 100;
    const randomX = Math.max(50, Math.random() * maxX);
    const randomY = Math.max(50, Math.random() * maxY);
    
    window.style.left = randomX + 'px';
    window.style.top = randomY + 'px';
    
    // Ajouter à la barre des tâches
    addToTaskbar(windowId);
    
    // Animation des barres de compétences si c'est la fenêtre skills
    if (windowId === 'skills') {
        setTimeout(() => {
            animateSkillBars();
        }, 500);
    }
}

function closeWindow(windowId) {
    const window = document.getElementById(windowId + 'Window');
    if (!window) return;
    
    // Animation de fermeture
    window.style.transition = 'all 0.3s ease';
    window.style.opacity = '0';
    window.style.transform = 'scale(0.8) translateY(-20px)';
    
    setTimeout(() => {
        window.classList.add('hidden');
        if (currentWindow === window) {
            currentWindow = null;
        }
        removeFromTaskbar(windowId);
    }, 300);
}

function minimizeWindow(windowId) {
    const window = document.getElementById(windowId + 'Window');
    if (!window) return;
    
    window.classList.add('minimized');
    setTimeout(() => {
        window.classList.add('hidden');
    }, 300);
}

function maximizeWindow(windowId) {
    const window = document.getElementById(windowId + 'Window');
    if (!window) return;
    
    window.classList.toggle('maximized');
}

function addToTaskbar(windowId) {
    const taskbarApps = document.getElementById('taskbarApps');
    const existingApp = document.querySelector(`[data-app="${windowId}"]`);
    
    if (existingApp) {
        existingApp.classList.add('active');
        return;
    }
    
    const appButton = document.createElement('button');
    appButton.className = 'taskbar-app active';
    appButton.dataset.app = windowId;
    
    const icon = getWindowIcon(windowId);
    const title = getWindowTitle(windowId);
    
    appButton.innerHTML = `<i class="${icon}"></i><span>${title}</span>`;
    
    appButton.addEventListener('click', function() {
        const window = document.getElementById(windowId + 'Window');
        if (window.classList.contains('hidden') || window.classList.contains('minimized')) {
            openWindow(windowId);
        } else {
            minimizeWindow(windowId);
        }
    });
    
    taskbarApps.appendChild(appButton);
}

function removeFromTaskbar(windowId) {
    const appButton = document.querySelector(`[data-app="${windowId}"]`);
    if (appButton) {
        appButton.remove();
    }
}

function getWindowIcon(windowId) {
    const icons = {
        about: 'fas fa-user-circle',
        skills: 'fas fa-tools',
        experience: 'fas fa-briefcase',
        portfolio: 'fas fa-folder-open',
        contact: 'fas fa-envelope',
        calculator: 'fas fa-calculator',
        notepad: 'fas fa-sticky-note',
        music: 'fas fa-music',
        gallery: 'fas fa-images'
    };
    return icons[windowId] || 'fas fa-window-maximize';
}

function getWindowTitle(windowId) {
    const titles = {
        about: 'À propos',
        skills: 'Compétences',
        experience: 'Expérience',
        portfolio: 'Portfolio',
        contact: 'Contact',
        calculator: 'Calculatrice',
        notepad: 'Bloc-notes',
        music: 'Musique',
        gallery: 'Galerie'
    };
    return titles[windowId] || 'Fenêtre';
}

function initializeWindowDragging() {
    const windows = document.querySelectorAll('.window');
    
    windows.forEach(window => {
        const header = window.querySelector('.window-header');
        
        header.addEventListener('mousedown', function(e) {
            if (e.target.classList.contains('window-close') || 
                e.target.classList.contains('window-minimize') || 
                e.target.classList.contains('window-maximize')) return;
            
            isDragging = true;
            currentWindow = window;
            
            const rect = window.getBoundingClientRect();
            dragOffset.x = e.clientX - rect.left;
            dragOffset.y = e.clientY - rect.top;
            
            window.style.zIndex = '1000';
            document.body.style.userSelect = 'none';
        });
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging || !currentWindow) return;
        
        const x = e.clientX - dragOffset.x;
        const y = e.clientY - dragOffset.y;
        
        // Limites de l'écran
        const maxX = window.innerWidth - currentWindow.offsetWidth;
        const maxY = window.innerHeight - currentWindow.offsetHeight - 48; // 48px pour la barre des tâches
        
        currentWindow.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
        currentWindow.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
    });
    
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            document.body.style.userSelect = '';
            
            if (currentWindow) {
                currentWindow.style.zIndex = '100';
            }
        }
    });
}

function initializeSkillsTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Désactiver tous les onglets
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Activer l'onglet sélectionné
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Animer les barres de compétences si nécessaire
            if (targetTab === 'technical' || targetTab === 'creative') {
                setTimeout(() => {
                    animateSkillBars();
                }, 100);
            }
        });
    });
}

function initializePortfolio() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Mettre à jour les boutons actifs
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrer les éléments
            portfolioItems.forEach(item => {
                const category = item.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

function initializeStartMenu() {
    const startButton = document.getElementById('startButton');
    const startMenu = document.getElementById('startMenu');
    const startMenuItems = document.querySelectorAll('.start-menu-item');
    
    startButton.addEventListener('click', function() {
        startMenu.classList.toggle('hidden');
        this.classList.toggle('active');
    });
    
    startMenuItems.forEach(item => {
        item.addEventListener('click', function() {
            const windowId = this.dataset.window;
            if (windowId) {
                openWindow(windowId);
                startMenu.classList.add('hidden');
                startButton.classList.remove('active');
            }
        });
    });
    
    // Fermer le menu en cliquant ailleurs
    document.addEventListener('click', function(e) {
        if (!startButton.contains(e.target) && !startMenu.contains(e.target)) {
            startMenu.classList.add('hidden');
            startButton.classList.remove('active');
        }
    });
}

function initializeNotifications() {
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationCenter = document.getElementById('notificationCenter');
    
    notificationBtn.addEventListener('click', function() {
        notificationCenter.classList.toggle('hidden');
    });
    
    // Fermer le centre de notifications en cliquant ailleurs
    document.addEventListener('click', function(e) {
        if (!notificationBtn.contains(e.target) && !notificationCenter.contains(e.target)) {
            notificationCenter.classList.add('hidden');
        }
    });
}

function initializeVolumeControl() {
    const volumeBtn = document.getElementById('volumeBtn');
    const volumeControl = document.getElementById('volumeControl');
    
    volumeBtn.addEventListener('click', function() {
        volumeControl.classList.toggle('hidden');
    });
    
    // Fermer le contrôle de volume en cliquant ailleurs
    document.addEventListener('click', function(e) {
        if (!volumeBtn.contains(e.target) && !volumeControl.contains(e.target)) {
            volumeControl.classList.add('hidden');
        }
    });
}

function initializeContextMenu() {
    const contextMenu = document.getElementById('contextMenu');
    const desktop = document.querySelector('.wallpaper');
    
    desktop.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        
        contextMenu.style.left = e.clientX + 'px';
        contextMenu.style.top = e.clientY + 'px';
        contextMenu.classList.remove('hidden');
    });
    
    // Fermer le menu contextuel
    document.addEventListener('click', function() {
        contextMenu.classList.add('hidden');
    });
    
    // Gestion des actions du menu contextuel
    const contextItems = document.querySelectorAll('.context-item');
    contextItems.forEach(item => {
        item.addEventListener('click', function() {
            const action = this.dataset.action;
            handleContextAction(action);
            contextMenu.classList.add('hidden');
        });
    });
}

function handleContextAction(action) {
    switch(action) {
        case 'refresh':
            location.reload();
            break;
        case 'wallpaper':
            changeWallpaper();
            break;
        case 'settings':
            openWindow('settings');
            break;
        case 'new-folder':
            createNewFolder();
            break;
    }
}

function changeWallpaper() {
    const wallpapers = [
        'https://wallpapercave.com/wp/wp2757874.jpg',
        'https://images.unsplash.com/photo-1557683316-973673baf926',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64',
        'https://images.unsplash.com/photo-1557682250-33bd709cbe85'
    ];
    
    const currentWallpaper = document.querySelector('.wallpaper');
    const randomWallpaper = wallpapers[Math.floor(Math.random() * wallpapers.length)];
    
    currentWallpaper.style.backgroundImage = `url(${randomWallpaper})`;
    showNotification('Fond d\'écran changé !', 'success');
}

function createNewFolder() {
    showNotification('Fonctionnalité en développement', 'info');
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
        }, index * 200);
    });
}

function updateDateTime() {
    const now = new Date();
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    
    if (timeElement && dateElement) {
        // Format de l'heure
        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        
        // Format de la date
        const dateOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        };
        
        timeElement.textContent = now.toLocaleTimeString('fr-FR', timeOptions);
        dateElement.textContent = now.toLocaleDateString('fr-FR', dateOptions);
    }
}

function updateClock() {
    const now = new Date();
    const clockTime = document.getElementById('clockTime');
    const clockDate = document.getElementById('clockDate');
    
    if (clockTime && clockDate) {
        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        
        const dateOptions = {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        };
        
        clockTime.textContent = now.toLocaleTimeString('fr-FR', timeOptions);
        clockDate.textContent = now.toLocaleDateString('fr-FR', dateOptions);
    }
}

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulation d'envoi
            const button = this.querySelector('button');
            const originalText = button.innerHTML;
            
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
                button.style.background = '#10b981';
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.background = '#02577a';
                    button.disabled = false;
                    this.reset();
                    showNotification('Message envoyé avec succès !', 'success');
                }, 2000);
            }, 1500);
        });
    }
}

function initializeCalculator() {
    // Les fonctions de calculatrice sont déjà définies globalement
    // Ajout d'événements clavier
    document.addEventListener('keydown', function(e) {
        const calcWindow = document.getElementById('calculatorWindow');
        if (!calcWindow.classList.contains('hidden')) {
            handleCalculatorKeyboard(e);
        }
    });
}

function initializeNotepad() {
    const notepadText = document.getElementById('notepadText');
    const charCount = document.getElementById('charCount');
    const wordCount = document.getElementById('wordCount');
    
    if (notepadText) {
        // Charger le contenu sauvegardé
        const savedContent = localStorage.getItem('notepadContent');
        if (savedContent) {
            notepadText.value = savedContent;
        }
        
        // Mettre à jour les compteurs
        notepadText.addEventListener('input', function() {
            const text = this.value;
            const chars = text.length;
            const words = text.trim() ? text.trim().split(/\s+/).length : 0;
            
            if (charCount) charCount.textContent = `${chars} caractères`;
            if (wordCount) wordCount.textContent = `${words} mots`;
            
            // Sauvegarder automatiquement
            localStorage.setItem('notepadContent', text);
        });
        
        // Déclencher l'événement initial
        notepadText.dispatchEvent(new Event('input'));
    }
}

function initializeMusicPlayer() {
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progress');
    const volumeSlider = document.querySelector('.volume-slider');
    const playlistItems = document.querySelectorAll('.playlist-item');
    
    if (playBtn) {
        playBtn.addEventListener('click', togglePlay);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', previousTrack);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextTrack);
    }
    
    if (volumeSlider) {
        volumeSlider.addEventListener('input', function() {
            volume = this.value;
            updateVolumeIcon();
        });
    }
    
    playlistItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            selectTrack(index);
        });
    });
    
    // Simuler la progression de la musique
    setInterval(updateMusicProgress, 1000);
    
    // Initialiser l'affichage
    updateTrackInfo();
}

function initializeGallery() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const galleryGrid = document.querySelector('.gallery-grid');
    const searchInput = document.querySelector('.gallery-search input');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const view = this.dataset.view;
            
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            if (view === 'list') {
                galleryGrid.style.gridTemplateColumns = '1fr';
            } else {
                galleryGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(150px, 1fr))';
            }
        });
    });
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const galleryItems = document.querySelectorAll('.gallery-item');
            
            galleryItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            if (searchTerm.length > 2) {
                performSearch(searchTerm);
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.toLowerCase();
                performSearch(searchTerm);
            }
        });
    }
}

function performSearch(term) {
    const searchableItems = [
        { name: 'À propos', window: 'about', keywords: ['profil', 'présentation', 'christian', 'sanogo'] },
        { name: 'Compétences', window: 'skills', keywords: ['skills', 'compétences', 'html', 'css', 'javascript', 'canva'] },
        { name: 'Expérience', window: 'experience', keywords: ['travail', 'emploi', 'sancofa', 'webdesigner'] },
        { name: 'Portfolio', window: 'portfolio', keywords: ['projets', 'réalisations', 'travaux'] },
        { name: 'Contact', window: 'contact', keywords: ['email', 'téléphone', 'adresse', 'message'] },
        { name: 'Calculatrice', window: 'calculator', keywords: ['calcul', 'mathématiques', 'nombres'] },
        { name: 'Bloc-notes', window: 'notepad', keywords: ['notes', 'texte', 'écriture'] },
        { name: 'Musique', window: 'music', keywords: ['audio', 'son', 'playlist'] },
        { name: 'Galerie', window: 'gallery', keywords: ['images', 'photos', 'visuels'] }
    ];
    
    const results = searchableItems.filter(item => 
        item.name.toLowerCase().includes(term) || 
        item.keywords.some(keyword => keyword.includes(term))
    );
    
    if (results.length > 0) {
        const firstResult = results[0];
        openWindow(firstResult.window);
        showNotification(`Ouverture de ${firstResult.name}`, 'info');
    } else {
        showNotification('Aucun résultat trouvé', 'warning');
    }
}

// Fonctions de la calculatrice
function appendToDisplay(value) {
    const display = document.getElementById('calcDisplay');
    if (display.value === '0' && value !== '.') {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearCalculator() {
    document.getElementById('calcDisplay').value = '0';
}

function deleteLast() {
    const display = document.getElementById('calcDisplay');
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = '0';
    }
}

function calculateResult() {
    const display = document.getElementById('calcDisplay');
    try {
        const result = eval(display.value.replace('×', '*'));
        display.value = result;
    } catch (error) {
        display.value = 'Erreur';
        setTimeout(() => {
            display.value = '0';
        }, 1500);
    }
}

function handleCalculatorKeyboard(e) {
    const key = e.key;
    
    if ('0123456789'.includes(key)) {
        appendToDisplay(key);
    } else if ('+-*/'.includes(key)) {
        appendToDisplay(key === '*' ? '×' : key);
    } else if (key === '.') {
        appendToDisplay(key);
    } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        calculateResult();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearCalculator();
    } else if (key === 'Backspace') {
        deleteLast();
    }
}

// Fonctions du bloc-notes
function saveNote() {
    const content = document.getElementById('notepadText').value;
    localStorage.setItem('notepadContent', content);
    showNotification('Note sauvegardée !', 'success');
}

function clearNote() {
    if (confirm('Êtes-vous sûr de vouloir effacer tout le contenu ?')) {
        document.getElementById('notepadText').value = '';
        localStorage.removeItem('notepadContent');
        document.getElementById('charCount').textContent = '0 caractères';
        document.getElementById('wordCount').textContent = '0 mots';
        showNotification('Contenu effacé', 'info');
    }
}

function downloadNote() {
    const content = document.getElementById('notepadText').value;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notes.txt';
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Note téléchargée !', 'success');
}

function toggleWordWrap() {
    const textarea = document.getElementById('notepadText');
    wordWrap = !wordWrap;
    textarea.style.whiteSpace = wordWrap ? 'pre-wrap' : 'pre';
    showNotification(`Retour à la ligne ${wordWrap ? 'activé' : 'désactivé'}`, 'info');
}

// Fonctions du lecteur de musique
function togglePlay() {
    isPlaying = !isPlaying;
    const playBtn = document.getElementById('playBtn');
    const albumArt = document.querySelector('.album-art');
    
    if (isPlaying) {
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        albumArt.style.animationPlayState = 'running';
    } else {
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        albumArt.style.animationPlayState = 'paused';
    }
}

function previousTrack() {
    currentTrack = currentTrack > 0 ? currentTrack - 1 : tracks.length - 1;
    selectTrack(currentTrack);
}

function nextTrack() {
    currentTrack = currentTrack < tracks.length - 1 ? currentTrack + 1 : 0;
    selectTrack(currentTrack);
}

function selectTrack(index) {
    currentTrack = index;
    currentTime = 0;
    
    // Mettre à jour la playlist
    const playlistItems = document.querySelectorAll('.playlist-item');
    playlistItems.forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    updateTrackInfo();
    updateProgress();
}

function updateTrackInfo() {
    const track = tracks[currentTrack];
    document.getElementById('trackTitle').textContent = track.title;
    document.getElementById('trackArtist').textContent = track.artist;
    document.getElementById('duration').textContent = formatTime(track.duration);
}

function updateMusicProgress() {
    if (isPlaying && currentTime < tracks[currentTrack].duration) {
        currentTime++;
        updateProgress();
    } else if (currentTime >= tracks[currentTrack].duration) {
        nextTrack();
    }
}

function updateProgress() {
    const track = tracks[currentTrack];
    const progressPercent = (currentTime / track.duration) * 100;
    
    document.getElementById('progress').style.width = progressPercent + '%';
    document.getElementById('currentTime').textContent = formatTime(currentTime);
}

function updateVolumeIcon() {
    const volumeIcon = document.querySelector('.volume-container i');
    
    if (volume == 0) {
        volumeIcon.className = 'fas fa-volume-mute';
    } else if (volume < 50) {
        volumeIcon.className = 'fas fa-volume-down';
    } else {
        volumeIcon.className = 'fas fa-volume-up';
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Fonctions de gestion du système
function showShutdownDialog() {
    document.getElementById('shutdownDialog').classList.remove('hidden');
}

function closeShutdownDialog() {
    document.getElementById('shutdownDialog').classList.add('hidden');
}

function restartSystem() {
    showNotification('Redémarrage du système...', 'info');
    setTimeout(() => {
        location.reload();
    }, 2000);
}

function shutdownSystem() {
    const desktop = document.getElementById('desktop');
    desktop.style.transition = 'all 1s ease';
    desktop.style.opacity = '0';
    desktop.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        document.body.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #000;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-family: 'Segoe UI', sans-serif;
                font-size: 2rem;
            ">
                <div style="text-align: center;">
                    <i class="fas fa-power-off" style="font-size: 4rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <p>Système arrêté</p>
                    <p style="font-size: 1rem; opacity: 0.7; margin-top: 1rem;">
                        Merci d'avoir consulté mon CV !
                    </p>
                </div>
            </div>
        `;
    }, 1000);
}

function clearAllNotifications() {
    const notificationsList = document.getElementById('notificationsList');
    notificationsList.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Aucune notification</p>';
    
    // Mettre à jour le badge
    const badge = document.querySelector('.notification-badge');
    badge.textContent = '0';
    badge.style.display = 'none';
}

function downloadCV() {
    // Simulation du téléchargement
    showNotification('Téléchargement du CV en cours...', 'info');
    
    setTimeout(() => {
        // Créer un lien de téléchargement factice
        const link = document.createElement('a');
        link.href = '#';
        link.download = 'CV_Christian_SANOGO.pdf';
        
        showNotification('CV téléchargé avec succès !', 'success');
    }, 2000);
}

// Gestion des raccourcis clavier
document.addEventListener('keydown', function(e) {
    // Échap pour fermer la fenêtre actuelle
    if (e.key === 'Escape' && currentWindow) {
        const windowId = currentWindow.id.replace('Window', '');
        closeWindow(windowId);
    }
    
    // Ctrl + Alt + T pour ouvrir le terminal (bloc-notes)
    if (e.ctrlKey && e.altKey && e.key === 't') {
        e.preventDefault();
        openWindow('notepad');
    }
    
    // Ctrl + Alt + C pour ouvrir la calculatrice
    if (e.ctrlKey && e.altKey && e.key === 'c') {
        e.preventDefault();
        openWindow('calculator');
    }
    
    // F11 pour plein écran
    if (e.key === 'F11') {
        e.preventDefault();
        toggleFullscreen();
    }
});

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// Gestion du clic sur le bureau pour fermer les fenêtres
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('wallpaper')) {
        // Désélectionner toutes les icônes
        const icons = document.querySelectorAll('.desktop-icon');
        icons.forEach(icon => icon.classList.remove('selected'));
    }
});

// Effets visuels supplémentaires
document.addEventListener('mousemove', function(e) {
    // Effet de parallaxe subtil sur le fond d'écran
    const wallpaper = document.querySelector('.wallpaper');
    if (wallpaper) {
        const x = (e.clientX / window.innerWidth) * 5;
        const y = (e.clientY / window.innerHeight) * 5;
        wallpaper.style.transform = `translate(${x}px, ${y}px) scale(1.01)`;
    }
});

// Gestion du redimensionnement de la fenêtre
window.addEventListener('resize', function() {
    // Repositionner les fenêtres si elles sortent de l'écran
    const windows = document.querySelectorAll('.window:not(.hidden)');
    windows.forEach(window => {
        const rect = window.getBoundingClientRect();
        
        if (rect.right > window.innerWidth) {
            window.style.left = (window.innerWidth - window.offsetWidth - 20) + 'px';
        }
        
        if (rect.bottom > window.innerHeight - 48) {
            window.style.top = (window.innerHeight - window.offsetHeight - 68) + 'px';
        }
    });
});

// Création d'effets de particules
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.querySelector('.desktop').appendChild(particlesContainer);
    
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% de chance de créer une particule
            createParticle(particlesContainer);
        }
    }, 1000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    
    container.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 6000);
}

// Gestion des notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = getNotificationIcon(type);
    notification.innerHTML = `
        <i class="${icon}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        border-left: 4px solid ${getNotificationColor(type)};
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    return colors[type] || colors.info;
}

// Initialisation des tooltips
function initializeTooltips() {
    const elements = document.querySelectorAll('[title]');
    elements.forEach(element => {
        const title = element.getAttribute('title');
        element.setAttribute('data-tooltip', title);
        element.removeAttribute('title');
        element.classList.add('tooltip');
    });
}

// Gestion de la météo (simulation)
function updateWeather() {
    const weatherIcon = document.querySelector('.weather-icon');
    const weatherTemp = document.querySelector('.weather-temp');
    
    const weathers = [
        { icon: '☀️', temp: '28°C' },
        { icon: '⛅', temp: '25°C' },
        { icon: '🌧️', temp: '22°C' },
        { icon: '⛈️', temp: '20°C' }
    ];
    
    const randomWeather = weathers[Math.floor(Math.random() * weathers.length)];
    weatherIcon.textContent = randomWeather.icon;
    weatherTemp.textContent = randomWeather.temp;
}

// Mettre à jour la météo toutes les 30 secondes
setInterval(updateWeather, 30000);

// Initialisation finale
document.addEventListener('DOMContentLoaded', function() {
    initializeTooltips();
    
    // Message de bienvenue
    setTimeout(() => {
        showNotification('Bienvenue sur mon CV interactif !', 'success');
    }, 3000);
});