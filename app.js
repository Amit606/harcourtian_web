document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    /* ==========================================
       STICKY HEADER SCROLL EFFECT
       ========================================== */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================
       MOBILE MENU TOGGLE
       ========================================== */
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const iconMenu = mobileToggle.querySelector('.icon-menu');
    const iconClose = mobileToggle.querySelector('.icon-close');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        iconMenu.classList.toggle('hidden');
        iconClose.classList.toggle('hidden');
    });

    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            iconMenu.classList.remove('hidden');
            iconClose.classList.add('hidden');
        });
    });

    /* ==========================================
       ACTIVE LINK ON SCROLL (INTERSECTION OBSERVER)
       ========================================== */
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is in center of viewport
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    /* ==========================================
       FAQ ACCORDION (SMOOTH TRANSITIONS)
       ========================================== */
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.parentElement;
            const content = currentItem.querySelector('.accordion-content');
            const isActive = currentItem.classList.contains('active');

            // Collapse all other items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.accordion-content').style.maxHeight = null;
            });

            // Toggle current item
            if (!isActive) {
                currentItem.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    /* ==========================================
       TESTIMONIALS SLIDER
       ========================================== */
    const track = document.getElementById('testimonial-track');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    const slides = Array.from(track.children);
    let currentIndex = 0;

    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // wrap back
        }
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slides.length - 1; // wrap to end
        }
        updateSlider();
    });

    // Auto play testimonials slider every 8 seconds
    let sliderInterval = setInterval(() => {
        nextBtn.click();
    }, 8000);

    // Pause autoplay on interaction
    const testimonialWrapper = document.querySelector('.testimonials-slider-wrapper');
    testimonialWrapper.addEventListener('mouseenter', () => clearInterval(sliderInterval));
    testimonialWrapper.addEventListener('mouseleave', () => {
        sliderInterval = setInterval(() => {
            nextBtn.click();
        }, 8000);
    });

    /* ==========================================
       INTERACTIVE PHONE MOCKUP ROUTER (HERO)
       ========================================== */
    const appContainer = document.querySelector('.phone-mockup .app-container');
    const appBottomNav = document.querySelector('.phone-mockup .app-bottom-nav');

    // 1. Gather all default dashboard items
    const homeElements = Array.from(appContainer.children).filter(el => !el.classList.contains('app-bottom-nav'));

    // Create container wrapper for home screen
    const homeScreen = document.createElement('div');
    homeScreen.className = 'app-screen active';
    homeScreen.id = 'app-screen-home';
    homeElements.forEach(el => homeScreen.appendChild(el));
    appContainer.insertBefore(homeScreen, appBottomNav);

    // 2. Define pages/screens content templates
    const screens = {
        directory: `
            <div class="showcase-screen-header">
                <i data-lucide="chevron-left" class="header-back cursor-pointer" onclick="window.switchPhoneScreen('home')"></i>
                <span>Alumni Directory</span>
                <i data-lucide="bell" class="header-bell"></i>
            </div>
            <div class="showcase-screen-content">
                <div class="screen-search">
                    <i data-lucide="search"></i>
                    <input type="text" placeholder="Search by name..." style="background:none; border:none; font-size:0.55rem; width:100%; outline:none;" readonly />
                </div>
                <div class="screen-user-item">
                    <div class="user-avatar bg-blue">AG</div>
                    <div class="user-details">
                        <div class="user-name">Amit Gupta</div>
                        <div class="user-info">MCA 2010 | Software Engineer</div>
                    </div>
                    <div class="user-status active"></div>
                </div>
                <div class="screen-user-item">
                    <div class="user-avatar bg-indigo">VS</div>
                    <div class="user-details">
                        <div class="user-name">Vipin Singh</div>
                        <div class="user-info">CSE 2009 | Architect</div>
                    </div>
                    <div class="user-status active"></div>
                </div>
                <div class="screen-user-item">
                    <div class="user-avatar bg-green">AS</div>
                    <div class="user-details">
                        <div class="user-name">Aminesh Shukla</div>
                        <div class="user-info">IT 2011 | Product Manager</div>
                    </div>
                    <div class="user-status"></div>
                </div>
            </div>
        `,
        nearby: `
            <div class="showcase-screen-header">
                <i data-lucide="chevron-left" class="header-back cursor-pointer" onclick="window.switchPhoneScreen('home')"></i>
                <span>Nearby Alumni</span>
                <i data-lucide="map-pin" class="header-bell"></i>
            </div>
            <div class="showcase-screen-content relative-pos">
                <div class="map-bg">
                    <div class="map-grid"></div>
                    <div class="map-pin-point pin-1"><i data-lucide="map-pin"></i></div>
                    <div class="map-pin-point pin-2"><i data-lucide="map-pin"></i></div>
                    <div class="map-pin-point pin-3"><i data-lucide="map-pin"></i></div>
                    <div class="map-pin-point pin-main"><i data-lucide="navigation"></i></div>
                </div>
                <div class="screen-floating-alumni">
                    <div class="mini-avatar">VS</div>
                    <div class="mini-text">
                        <div>Vipin Singh (2.5 km away)</div>
                        <span class="btn-chat-mini"><i data-lucide="message-square"></i> Chat</span>
                    </div>
                </div>
            </div>
        `,
        jobs: `
            <div class="showcase-screen-header">
                <i data-lucide="chevron-left" class="header-back cursor-pointer" onclick="window.switchPhoneScreen('home')"></i>
                <span>Jobs & Referrals</span>
                <i data-lucide="plus-circle" class="header-bell"></i>
            </div>
            <div class="showcase-screen-content">
                <div class="job-list-card">
                    <div class="job-badge">Referral Available</div>
                    <div class="job-role">Senior React Developer</div>
                    <div class="job-company">Google Inc.</div>
                    <div class="job-posted">Posted by Amit (MCA '10)</div>
                </div>
                <div class="job-list-card" style="margin-top: 6px;">
                    <div class="job-badge bg-green-light">Full Time</div>
                    <div class="job-role">Data Analyst</div>
                    <div class="job-company">Microsoft</div>
                    <div class="job-posted">Posted by Rohan (IT '15)</div>
                </div>
            </div>
        `,
        events: `
            <div class="showcase-screen-header">
                <i data-lucide="chevron-left" class="header-back cursor-pointer" onclick="window.switchPhoneScreen('home')"></i>
                <span>Events & Meets</span>
                <i data-lucide="calendar" class="header-bell"></i>
            </div>
            <div class="showcase-screen-content">
                <div class="upcoming-events-header">Upcoming Events</div>
                <div class="event-card-item">
                    <div class="event-banner-placeholder bg-blue-soft" style="height:45px;">
                        <i data-lucide="image" style="width:10px; height:10px;"></i>
                    </div>
                    <div class="event-card-title" style="font-size:0.55rem;">MCA Connect 2026 Alumni Meet</div>
                    <div class="event-card-time" style="font-size:0.45rem;"><i data-lucide="calendar"></i> 22 Feb 2026</div>
                    <div class="event-card-location" style="font-size:0.45rem;"><i data-lucide="map-pin"></i> New Delhi</div>
                </div>
            </div>
        `,
        businesses: `
            <div class="showcase-screen-header">
                <i data-lucide="chevron-left" class="header-back cursor-pointer" onclick="window.switchPhoneScreen('home')"></i>
                <span>Businesses</span>
                <i data-lucide="search" class="header-bell"></i>
            </div>
            <div class="showcase-screen-content">
                <div class="biz-card-item">
                    <div class="biz-logo bg-orange-soft">TS</div>
                    <div class="biz-info">
                        <div class="biz-name">TechSolutions Ltd</div>
                        <div class="biz-owner">Owned by Vipin (CSE '09)</div>
                        <div class="biz-desc">IT Services & Consulting</div>
                    </div>
                </div>
                <div class="biz-card-item" style="margin-top: 6px;">
                    <div class="biz-logo bg-purple-soft">KF</div>
                    <div class="biz-info">
                        <div class="biz-name">KetoFoods Inc</div>
                        <div class="biz-owner">Owned by Riya (CHE '14)</div>
                        <div class="biz-desc">Healthy Diet Foods Supplier</div>
                    </div>
                </div>
            </div>
        `,
        news: `
            <div class="showcase-screen-header">
                <i data-lucide="chevron-left" class="header-back cursor-pointer" onclick="window.switchPhoneScreen('home')"></i>
                <span>News Feed</span>
                <i data-lucide="edit-3" class="header-bell"></i>
            </div>
            <div class="showcase-screen-content">
                <div class="feed-post-card">
                    <div class="feed-author">
                        <div class="author-avatar bg-indigo">AS</div>
                        <div class="author-details">
                            <div class="author-name">Aminesh</div>
                            <div class="author-time">2 hours ago</div>
                        </div>
                    </div>
                    <div class="feed-content">
                        Thrilled to share that I have started a new position as Principal Product Manager at Amazon! Special thanks to Harcourt mentors.
                    </div>
                    <div class="feed-actions">
                        <span><i data-lucide="heart"></i> 45</span>
                        <span><i data-lucide="message-square"></i> 12</span>
                    </div>
                </div>
            </div>
        `,
        profile: `
            <div class="showcase-screen-header">
                <i data-lucide="chevron-left" class="header-back cursor-pointer" onclick="window.switchPhoneScreen('home')"></i>
                <span>My Profile</span>
                <i data-lucide="settings" class="header-bell"></i>
            </div>
            <div class="showcase-screen-content">
                <div style="text-align:center; padding: 12px 0;">
                    <div class="user-avatar bg-blue" style="width: 44px; height: 44px; font-size: 1rem; margin: 0 auto 8px;">AG</div>
                    <h5 style="font-size:0.75rem; font-weight:700; color:var(--text-dark); margin:0;">Amit Gupta</h5>
                    <p style="font-size:0.55rem; color:var(--text-muted); margin:2px 0 0;">MCA | 2010 Batch</p>
                </div>
                <div style="background:var(--bg-light); border-radius:6px; padding:8px; border:1px solid var(--border-color); font-size:0.6rem; text-align:left;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                        <span style="color:var(--text-muted)">Alumni ID:</span>
                        <span style="font-weight:700; color:var(--text-dark)">HC-2010-0941</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                        <span style="color:var(--text-muted)">Verification:</span>
                        <span style="font-weight:700; color:var(--success-color)">Verified ✓</span>
                    </div>
                    <div style="display:flex; justify-content:space-between;">
                        <span style="color:var(--text-muted)">Connection:</span>
                        <span style="font-weight:700; color:var(--text-dark)">234 Alumni</span>
                    </div>
                </div>
            </div>
        `
    };

    // Helper: Create dynamic screen containers
    Object.keys(screens).forEach(key => {
        const screenDiv = document.createElement('div');
        screenDiv.className = 'app-screen';
        screenDiv.id = `app-screen-${key}`;
        screenDiv.innerHTML = screens[key];
        screenDiv.style.display = 'none';
        appContainer.insertBefore(screenDiv, appBottomNav);
    });

    // 3. Switch screen logic
    window.switchPhoneScreen = function(screenName) {
        // Hide all screens
        document.querySelectorAll('.phone-mockup .app-screen').forEach(scr => {
            scr.style.display = 'none';
            scr.classList.remove('active');
        });

        // Show targets
        const targetScreen = document.getElementById(`app-screen-${screenName}`);
        if (targetScreen) {
            targetScreen.style.display = 'flex';
            targetScreen.style.flexDirection = 'column';
            targetScreen.style.flex = '1';
            targetScreen.classList.add('active');
        }

        // Re-init lucide icons on the newly shown view
        lucide.createIcons();

        // Update Bottom Nav Active States
        const navItems = document.querySelectorAll('.phone-mockup .app-bottom-nav .nav-item');
        navItems.forEach(item => item.classList.remove('active'));

        if (screenName === 'home') {
            navItems[0].classList.add('active');
        } else if (screenName === 'directory' || screenName === 'nearby') {
            navItems[1].classList.add('active');
        } else if (screenName === 'jobs') {
            navItems[2].classList.add('active');
        } else if (screenName === 'events') {
            navItems[3].classList.add('active');
        } else if (screenName === 'profile') {
            navItems[4].classList.add('active');
        }
    };

    // 4. Register event listeners for Phone Mockup Elements

    // Home view action buttons
    const appBtnDir = document.querySelector('.phone-mockup .app-btn-blue');
    const appBtnNearby = document.querySelector('.phone-mockup .app-btn-light');
    if (appBtnDir) appBtnDir.addEventListener('click', () => window.switchPhoneScreen('directory'));
    if (appBtnNearby) appBtnNearby.addEventListener('click', () => window.switchPhoneScreen('nearby'));

    // Grid menu buttons
    const gridItems = document.querySelectorAll('.phone-mockup .app-grid-item');
    if (gridItems.length >= 4) {
        gridItems[0].addEventListener('click', () => window.switchPhoneScreen('jobs'));
        gridItems[1].addEventListener('click', () => window.switchPhoneScreen('events'));
        gridItems[2].addEventListener('click', () => window.switchPhoneScreen('businesses'));
        gridItems[3].addEventListener('click', () => window.switchPhoneScreen('news'));
    }

    // Bottom Navigation tabs
    const appNavItems = document.querySelectorAll('.phone-mockup .app-bottom-nav .nav-item');
    if (appNavItems.length >= 5) {
        appNavItems[0].addEventListener('click', () => window.switchPhoneScreen('home'));
        appNavItems[1].addEventListener('click', () => window.switchPhoneScreen('directory'));
        appNavItems[2].addEventListener('click', () => window.switchPhoneScreen('jobs'));
        appNavItems[3].addEventListener('click', () => window.switchPhoneScreen('events'));
        appNavItems[4].addEventListener('click', () => window.switchPhoneScreen('profile'));
    }

    // Event card inside dashboard
    const appEventCard = document.querySelector('.phone-mockup .app-event-card');
    if (appEventCard) appEventCard.addEventListener('click', () => window.switchPhoneScreen('events'));
});
