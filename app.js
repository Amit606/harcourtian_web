document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    /* ==========================================
       GLOBAL TOAST NOTIFICATIONS CONTROLLER
       ========================================== */
    window.showToast = function (message, type = 'success') {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i data-lucide="check-circle-2"></i>
            <span>${message}</span>
        `;
        toastContainer.appendChild(toast);
        lucide.createIcons();

        // Trigger animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        // Remove toast after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 4000);
    };


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
    if (track) {
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
        if (testimonialWrapper) {
            testimonialWrapper.addEventListener('mouseenter', () => clearInterval(sliderInterval));
            testimonialWrapper.addEventListener('mouseleave', () => {
                sliderInterval = setInterval(() => {
                    nextBtn.click();
                }, 8000);
            });
        }
    }

    /* ==========================================
       INTERACTIVE PHONE MOCKUP ROUTER (HERO)
       ========================================== */
    const appContainer = document.querySelector('.phone-mockup .app-container');
    if (appContainer) {
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
                        <div class="job-badge">Full Time</div>
                        <div class="job-role">Backend Engineer (Java)</div>
                        <div class="job-company">Sanmit Technologies</div>
                        <div class="job-posted">Posted by Radhika (CSE '20)</div>
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
                        <div class="biz-logo bg-blue-soft">DY</div>
                        <div class="biz-info">
                            <div class="biz-name">Dylit.info</div>
                            <div class="biz-owner">Owned by Akhil (CSE '94)</div>
                            <div class="biz-desc">AI Content Growth Platform</div>
                        </div>
                    </div>
                    <div class="biz-card-item" style="margin-top: 6px;">
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
        window.switchPhoneScreen = function (screenName) {
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
    }

    /* ==========================================
       ALUMNI BUSINESS DIRECTORY CONTROLLER
       ========================================== */
    const bizGrid = document.getElementById('biz-grid');
    if (bizGrid) {
        // Initial list of businesses
        let businesses = [
            {
                id: 7,
                name: 'Dylit.info',
                category: 'technology',
                owner: 'Akhil Khare',
                branch: 'CSE',
                batch: '1994',
                logoClass: 'biz-logo-cyan',
                logoText: 'DY',
                desc: 'An AI-powered content growth platform designed for creators, solopreneurs, and small businesses to simplify content creation, SEO/AEO optimization, and multi-channel promotion.',
                location: 'Hyderabad, Telangana',
                website: 'https://home.dylit.info/',
                email: 'akhil.khare.94@alumni.hbtu.ac.in',
                phone: '',
                linkedin: 'https://www.linkedin.com/in/akhil-khare-219a4/',
                discount: 'Free Pro Plan access for 1 months for all HBTU/HBTI Alumni'
            },
            {
                id: 8,
                name: 'Dabbax Food Aggregator P Ltd',
                category: 'food',
                owner: 'Mamata Swaroop',
                branch: 'MCA',
                batch: '1994',
                logoClass: 'biz-logo-orange',
                logoText: 'DB',
                desc: 'A tech-driven corporate food aggregator providing customized food catering solutions, daily high-quality meal subscriptions, and digital food court management services.',
                location: 'Noida Sector 78, Noida',
                website: 'https://www.dabba-x.com/',
                email: '',
                phone: '08128899686',
                linkedin: 'https://www.linkedin.com/in/mamtaswaroop/',
                discount: '10% discount on corporate lunch bookings & catering orders'
            },
            {
                id: 9,
                name: 'Kloudrac',
                category: 'technology',
                owner: 'Atul Singhal',
                branch: 'MCA',
                batch: '2004',
                logoClass: 'biz-logo-blue',
                logoText: 'KR',
                desc: 'A Salesforce Summit (Platinum) Partner specializing in cloud consulting, custom application development, Salesforce implementations, and digital transformation services.',
                location: 'Noida, Uttar Pradesh',
                website: 'https://www.kloudrac.com/',
                email: 'atul.singhal.04@alumni.hbtu.ac.in',
                phone: '',
                linkedin: 'https://www.linkedin.com/company/kloudrac/',
                discount: 'Free Salesforce readiness audit and IT consultation for alumni-led businesses'
            },
            {
                id: 10,
                name: 'SANMIT Technologies Private Limited',
                category: 'technology',
                owner: 'Sanjeev Batra',
                branch: 'MCA',
                batch: '2001',
                logoClass: 'biz-logo-cyan',
                logoText: 'ST',
                desc: 'A global technology consulting firm providing specialized services in IT strategy, digital transformation, cloud computing, data analytics, and AI/ML implementations.',
                location: 'Noida, Uttar Pradesh',
                website: 'https://sanmittechnologies.com/',
                email: 'sanjeev.batra@sanmittechnologies.com',
                phone: '',
                linkedin: 'https://www.linkedin.com/in/sanjeevbatra24/',
                discount: 'Free 1-hour IT Strategy & Digital Transformation consultation for HBTU alumni startups'
            }
        ];

        // Active filter variables
        let activeCategory = 'all';
        let searchQuery = '';

        // DOM elements
        const searchInput = document.getElementById('biz-search');
        const filterPills = document.querySelectorAll('.category-pill');
        const bizModal = document.getElementById('biz-details-modal');
        const bizForm = document.getElementById('register-biz-form');
        const toastContainer = document.getElementById('toast-container');

        // Render function
        function renderBusinesses() {
            bizGrid.innerHTML = '';

            const filtered = businesses.filter(biz => {
                const matchesCategory = activeCategory === 'all' || biz.category === activeCategory;
                const matchesSearch = biz.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    biz.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    biz.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    biz.location.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesCategory && matchesSearch;
            });

            if (filtered.length === 0) {
                bizGrid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 40px; border: 1px dashed var(--border-color); border-radius: var(--border-radius-md); background: var(--bg-light);">
                        <i data-lucide="info" style="width: 48px; height: 48px; color: var(--text-muted); margin-bottom: 12px;"></i>
                        <h4 style="color: var(--text-dark); margin-bottom: 6px;">No Businesses Found</h4>
                        <p style="color: var(--text-muted); font-size: 0.95rem;">Try adjusting your keywords or category filters.</p>
                    </div>
                `;
                lucide.createIcons();
                return;
            }

            filtered.forEach(biz => {
                const card = document.createElement('div');
                card.className = 'biz-card';
                card.innerHTML = `
                    <div>
                        <div class="biz-card-header">
                            <div class="biz-logo-placeholder ${biz.logoClass}">${biz.logoText}</div>
                            <div class="biz-meta">
                                <h3 class="biz-card-title">${biz.name}</h3>
                                <span class="biz-category-badge">${biz.category}</span>
                            </div>
                        </div>
                        <div class="biz-owner-info">
                            <i data-lucide="user"></i>
                            <span>Owned by <strong class="biz-owner-name">${biz.owner}</strong> (${biz.branch} '${biz.batch.slice(-2)})</span>
                        </div>
                        <p class="biz-desc">${biz.desc}</p>
                        <div class="biz-location">
                            <i data-lucide="map-pin"></i>
                            <span>${biz.location}</span>
                        </div>
                        ${biz.discount ? `
                            <div class="biz-discount-badge">
                                <i data-lucide="tag"></i>
                                <span>${biz.discount}</span>
                            </div>
                        ` : ''}
                    </div>
                    <div class="biz-ctas">
                        <a href="${biz.website}" target="_blank" class="btn btn-secondary">
                            <i data-lucide="globe"></i>
                            <span>Website</span>
                        </a>
                        <button class="btn btn-primary btn-view-details" data-id="${biz.id}">
                            <i data-lucide="eye"></i>
                            <span>Details</span>
                        </button>
                    </div>
                `;
                bizGrid.appendChild(card);
            });

            // Re-bind Lucide icons
            lucide.createIcons();

            // Bind click events on new Details buttons
            document.querySelectorAll('.btn-view-details').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = parseInt(btn.getAttribute('data-id'));
                    openDetailsModal(id);
                });
            });
        }

        // Open details modal
        function openDetailsModal(id) {
            const biz = businesses.find(b => b.id === id);
            if (!biz || !bizModal) return;

            // Track details view in Google Analytics
            if (typeof gtag === 'function') {
                gtag('event', 'view_business_details', {
                    'business_id': id,
                    'business_name': biz.name,
                    'business_category': biz.category
                });
            }

            const modalContent = bizModal.querySelector('.biz-modal-content');

            // Generate details view
            const detailsHtml = `
                <button class="biz-modal-close" id="modal-close-btn" aria-label="Close Modal">
                    <i data-lucide="x" style="width: 24px; height: 24px;"></i>
                </button>
                <div class="modal-header-biz">
                    <div class="biz-logo-placeholder ${biz.logoClass}">${biz.logoText}</div>
                    <div>
                        <h2 class="modal-biz-title">${biz.name}</h2>
                        <span class="biz-category-badge">${biz.category}</span>
                    </div>
                </div>
                
                <div class="modal-details-list">
                    <div class="modal-detail-item">
                        <i data-lucide="user"></i>
                        <div>
                            <strong>Founder:</strong>
                            <span>${biz.owner} (${biz.branch} | Batch of ${biz.batch})</span>
                        </div>
                    </div>
                    <div class="modal-detail-item">
                        <i data-lucide="map-pin"></i>
                        <div>
                            <strong>Location:</strong>
                            <span>${biz.location}</span>
                        </div>
                    </div>
                    <div class="modal-detail-item">
                        <i data-lucide="mail"></i>
                        <div>
                            <strong>Email:</strong>
                            <a href="mailto:${biz.email}">${biz.email}</a>
                        </div>
                    </div>
                    <div class="modal-detail-item">
                        <i data-lucide="phone"></i>
                        <div>
                            <strong>Contact:</strong>
                            <a href="tel:${biz.phone}">${biz.phone}</a>
                        </div>
                    </div>
                    <div class="modal-detail-item">
                        <i data-lucide="linkedin"></i>
                        <div>
                            <strong>LinkedIn:</strong>
                            <a href="${biz.linkedin}" target="_blank">Founder Profile</a>
                        </div>
                    </div>
                    <div class="modal-detail-item">
                        <i data-lucide="globe"></i>
                        <div>
                            <strong>Website:</strong>
                            <a href="${biz.website}" target="_blank">${biz.website}</a>
                        </div>
                    </div>
                </div>
                
                ${biz.discount ? `
                    <div class="biz-discount-badge" style="margin-bottom: 24px; padding: 14px;">
                        <i data-lucide="tag" style="width: 20px; height: 20px;"></i>
                        <div>
                            <strong style="display:block; font-size:0.95rem; color:#065f46; margin-bottom:2px;">Alumni Exclusive Offer</strong>
                            <span style="font-size:0.85rem; color:#0f5132;">${biz.discount}</span>
                        </div>
                    </div>
                ` : ''}
                
                <div style="display: flex; gap: 12px; margin-top: 10px;">
                    <a href="${biz.website}" target="_blank" class="btn btn-primary" style="flex:1;">
                        <i data-lucide="external-link"></i>
                        <span>Visit Website</span>
                    </a>
                    <a href="mailto:${biz.email}?subject=Inquiry%20from%20Harcourtian%20Connect%20-%20${encodeURIComponent(biz.name)}" class="btn btn-secondary" style="flex:1;">
                        <i data-lucide="mail"></i>
                        <span>Send Inquiry</span>
                    </a>
                </div>
            `;

            modalContent.innerHTML = detailsHtml;
            bizModal.classList.add('open');
            lucide.createIcons();

            // Bind modal close button
            const closeBtn = document.getElementById('modal-close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', closeDetailsModal);
            }
        }

        // Close details modal
        function closeDetailsModal() {
            if (bizModal) {
                bizModal.classList.remove('open');
            }
        }

        // Close modal when clicking outside content
        if (bizModal) {
            bizModal.addEventListener('click', (e) => {
                if (e.target === bizModal) {
                    closeDetailsModal();
                }
            });
        }

        // Search Input listener
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value;
                renderBusinesses();
            });
        }

        // Category Pills listener
        filterPills.forEach(pill => {
            pill.addEventListener('click', () => {
                filterPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                activeCategory = pill.getAttribute('data-category');
                renderBusinesses();
            });
        });

        // Toast notifications controller is now global

        // Registration form handler
        if (bizForm) {
            bizForm.addEventListener('submit', (e) => {
                e.preventDefault();

                // Get fields
                const name = document.getElementById('register-biz-name').value.trim();
                const category = document.getElementById('register-biz-category').value;
                const owner = document.getElementById('register-owner-name').value.trim();
                const branch = document.getElementById('register-branch').value;
                const batch = document.getElementById('register-batch').value.trim();
                const location = document.getElementById('register-location').value.trim();
                const website = document.getElementById('register-website').value.trim() || '#';
                const email = document.getElementById('register-email').value.trim();
                const phone = document.getElementById('register-phone').value.trim();
                const desc = document.getElementById('register-desc').value.trim();
                const discount = document.getElementById('register-discount').value.trim();

                // Validation
                if (!name || !owner || !batch || !location || !email || !desc) {
                    alert('Please fill all required fields.');
                    return;
                }

                // Create a random gradient and initials for logo
                const initials = name.slice(0, 2).toUpperCase();
                const logoClasses = ['biz-logo-blue', 'biz-logo-orange', 'biz-logo-purple', 'biz-logo-green', 'biz-logo-red', 'biz-logo-cyan'];
                const randomLogoClass = logoClasses[Math.floor(Math.random() * logoClasses.length)];

                // Add new business object to list
                const newBiz = {
                    id: Date.now(),
                    name,
                    category,
                    owner,
                    branch,
                    batch,
                    logoClass: randomLogoClass,
                    logoText: initials,
                    desc,
                    location,
                    website,
                    email,
                    phone: phone || '+91 99999 88888',
                    linkedin: 'https://linkedin.com',
                    discount
                };

                // Add to start of businesses array
                businesses.unshift(newBiz);

                // Track registration in Google Analytics
                if (typeof gtag === 'function') {
                    gtag('event', 'register_business', {
                        'business_name': name,
                        'business_category': category
                    });
                }

                // Show success toast
                showToast(`Success! "${name}" has been registered.`);

                // Re-render and clear form
                renderBusinesses();
                bizForm.reset();

                // Scroll back up to the directory grid smoothly
                document.getElementById('directory-section').scrollIntoView({ behavior: 'smooth' });
            });
        }

        // First render on load
        renderBusinesses();
    }

    /* ==========================================
       ALUMNI EVENTS DIRECTORY CONTROLLER
       ========================================== */
    const eventsGrid = document.getElementById('events-grid');
    if (eventsGrid) {
        // Initial list of events
        let events = [];

        let activeEventCategory = 'all';
        let eventSearchQuery = '';

        const eventSearchInput = document.getElementById('event-search');
        const eventFilterPills = document.querySelectorAll('.events-controls-card .category-pill');
        const eventModal = document.getElementById('event-details-modal');
        const eventForm = document.getElementById('host-event-form');

        // Helper to format date
        function formatEventDate(dateTimeStr) {
            const dateObj = new Date(dateTimeStr);
            if (isNaN(dateObj.getTime())) return dateTimeStr;
            const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            return dateObj.toLocaleDateString('en-US', options);
        }

        // Render events
        function renderEvents() {
            eventsGrid.innerHTML = '';

            const filteredEvents = events.filter(evt => {
                const matchesCategory = activeEventCategory === 'all' || evt.category === activeEventCategory;
                const matchesSearch = evt.title.toLowerCase().includes(eventSearchQuery.toLowerCase()) ||
                    evt.host.toLowerCase().includes(eventSearchQuery.toLowerCase()) ||
                    evt.desc.toLowerCase().includes(eventSearchQuery.toLowerCase()) ||
                    evt.location.toLowerCase().includes(eventSearchQuery.toLowerCase());
                return matchesCategory && matchesSearch;
            });

            if (filteredEvents.length === 0) {
                eventsGrid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 40px; border: 1px dashed var(--border-color); border-radius: var(--border-radius-md); background: var(--bg-light);">
                        <i data-lucide="calendar-off" style="width: 48px; height: 48px; color: var(--text-muted); margin-bottom: 12px;"></i>
                        <h4 style="color: var(--text-dark); margin-bottom: 6px;">No UpComming events found</h4>
                        <p style="color: var(--text-muted); font-size: 0.95rem;">Be the first to host an event and connect with fellow Harcourtians!</p>
                    </div>
                `;
                lucide.createIcons();
                return;
            }

            filteredEvents.forEach(evt => {
                const dateObj = new Date(evt.dateTime);
                const day = !isNaN(dateObj.getTime()) ? dateObj.getDate() : '??';
                const month = !isNaN(dateObj.getTime()) ? dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase() : 'EVT';

                // Assign gradient classes based on category
                let gradClass = 'event-grad-blue';
                if (evt.category === 'reunion') gradClass = 'event-grad-orange';
                else if (evt.category === 'chapter_meet') gradClass = 'event-grad-purple';
                else if (evt.category === 'webinar') gradClass = 'event-grad-cyan';
                else if (evt.category === 'networking') gradClass = 'event-grad-green';

                const card = document.createElement('div');
                card.className = 'event-card';
                card.innerHTML = `
                    <div>
                        <div class="event-card-banner ${gradClass}">
                            <div class="event-date-badge">
                                <span class="badge-month">${month}</span>
                                <span class="badge-day">${day}</span>
                            </div>
                            <span class="event-category-tag">${evt.category.replace('_', ' ')}</span>
                        </div>
                        <div class="event-card-body">
                            <h3 class="event-title-text">${evt.title}</h3>
                            <div class="event-meta-line">
                                <i data-lucide="clock"></i>
                                <span>${formatEventDate(evt.dateTime)}</span>
                            </div>
                            <div class="event-meta-line">
                                <i data-lucide="map-pin"></i>
                                <span>${evt.location}</span>
                            </div>
                            <div class="event-meta-line">
                                <i data-lucide="users"></i>
                                <span>Host: <strong>${evt.host}</strong> (${evt.branch} '${evt.batch.slice(-2)})</span>
                            </div>
                            <p class="event-short-desc">${evt.desc.length > 120 ? evt.desc.slice(0, 120) + '...' : evt.desc}</p>
                        </div>
                    </div>
                    <div class="event-ctas">
                        <span class="event-rsvp-count">${evt.rsvps} attending</span>
                        <button class="btn btn-primary btn-view-event-details" data-id="${evt.id}">
                            <i data-lucide="calendar-check"></i>
                            <span>Details & RSVP</span>
                        </button>
                    </div>
                `;
                eventsGrid.appendChild(card);
            });

            lucide.createIcons();

            // Bind click events on Details buttons
            document.querySelectorAll('.btn-view-event-details').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = parseInt(btn.getAttribute('data-id'));
                    openEventDetailsModal(id);
                });
            });
        }

        // Open details modal
        function openEventDetailsModal(id) {
            const evt = events.find(e => e.id === id);
            if (!evt || !eventModal) return;

            // Track details view in Google Analytics
            if (typeof gtag === 'function') {
                gtag('event', 'view_event_details', {
                    'event_id': id,
                    'event_title': evt.title,
                    'event_category': evt.category
                });
            }

            const modalContent = eventModal.querySelector('.event-modal-content');

            // Generate details view
            const detailsHtml = `
                <button class="event-modal-close" id="event-modal-close-btn" aria-label="Close Modal">
                    <i data-lucide="x" style="width: 24px; height: 24px;"></i>
                </button>
                <div class="modal-header-event">
                    <h2 class="modal-event-title">${evt.title}</h2>
                    <span class="event-category-badge badge-${evt.category}">${evt.category.replace('_', ' ')}</span>
                </div>
                
                <div class="modal-details-list">
                    <div class="modal-detail-item">
                        <i data-lucide="calendar"></i>
                        <div>
                            <strong>Date & Time:</strong>
                            <span>${formatEventDate(evt.dateTime)}</span>
                        </div>
                    </div>
                    <div class="modal-detail-item">
                        <i data-lucide="map-pin"></i>
                        <div>
                            <strong>Location / Venue:</strong>
                            <span>${evt.location}</span>
                        </div>
                    </div>
                    <div class="modal-detail-item">
                        <i data-lucide="user"></i>
                        <div>
                            <strong>Organizer:</strong>
                            <span>${evt.host} (${evt.branch} | Batch of ${evt.batch})</span>
                        </div>
                    </div>
                    <div class="modal-detail-item">
                        <i data-lucide="mail"></i>
                        <div>
                            <strong>Contact Email:</strong>
                            <a href="mailto:${evt.email}">${evt.email}</a>
                        </div>
                    </div>
                    <div class="modal-detail-item">
                        <i data-lucide="users"></i>
                        <div>
                            <strong>Attendees:</strong>
                            <span>${evt.rsvps} verified alumni RSVP'd</span>
                        </div>
                    </div>
                </div>

                <div class="event-description-block">
                    <h3>About the Event</h3>
                    <p>${evt.desc}</p>
                </div>
                
                <div style="display: flex; gap: 12px; margin-top: 24px;">
                    <button class="btn btn-primary" id="btn-rsvp-action" style="flex:1;" data-id="${evt.id}">
                        <i data-lucide="check"></i>
                        <span>RSVP / Register</span>
                    </button>
                    ${evt.regLink ? `
                        <a href="${evt.regLink}" target="_blank" class="btn btn-secondary" style="flex:1;">
                            <i data-lucide="external-link"></i>
                            <span>External Link</span>
                        </a>
                    ` : ''}
                </div>
            `;

            modalContent.innerHTML = detailsHtml;
            eventModal.classList.add('open');
            lucide.createIcons();

            // Bind modal close button
            const closeBtn = document.getElementById('event-modal-close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', closeEventDetailsModal);
            }

            // Bind RSVP action
            const rsvpBtn = document.getElementById('btn-rsvp-action');
            if (rsvpBtn) {
                rsvpBtn.addEventListener('click', () => {
                    evt.rsvps += 1;
                    if (typeof showToast === 'function') {
                        showToast(`Awesome! You have successfully registered for "${evt.title}".`);
                    } else {
                        alert(`Successfully RSVP'd for ${evt.title}!`);
                    }
                    closeEventDetailsModal();
                    renderEvents();
                });
            }
        }

        // Close details modal
        function closeEventDetailsModal() {
            if (eventModal) {
                eventModal.classList.remove('open');
            }
        }

        // Close modal when clicking outside content
        if (eventModal) {
            eventModal.addEventListener('click', (e) => {
                if (e.target === eventModal) {
                    closeEventDetailsModal();
                }
            });
        }

        // Search Input listener
        if (eventSearchInput) {
            eventSearchInput.addEventListener('input', (e) => {
                eventSearchQuery = e.target.value;
                renderEvents();
            });
        }

        // Category Pills listener
        eventFilterPills.forEach(pill => {
            pill.addEventListener('click', () => {
                eventFilterPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                activeEventCategory = pill.getAttribute('data-category');
                renderEvents();
            });
        });

        // Form handler
        if (eventForm) {
            eventForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const title = document.getElementById('event-title').value.trim();
                const category = document.getElementById('event-category').value;
                const host = document.getElementById('event-host').value.trim();
                const branch = document.getElementById('event-branch').value;
                const batch = document.getElementById('event-batch').value.trim();
                const dateTime = document.getElementById('event-datetime').value;
                const location = document.getElementById('event-location').value.trim();
                const email = document.getElementById('event-email').value.trim();
                const regLink = document.getElementById('event-reg-link').value.trim();
                const desc = document.getElementById('event-desc').value.trim();

                if (!title || !host || !batch || !dateTime || !location || !email || !desc) {
                    alert('Please fill all required fields.');
                    return;
                }

                const newEvent = {
                    id: Date.now(),
                    title,
                    category,
                    host,
                    branch,
                    batch,
                    dateTime,
                    location,
                    email,
                    regLink,
                    desc,
                    rsvps: 1
                };

                events.unshift(newEvent);

                if (typeof gtag === 'function') {
                    gtag('event', 'create_event', {
                        'event_title': title,
                        'event_category': category
                    });
                }

                if (typeof showToast === 'function') {
                    showToast(`Success! "${title}" has been scheduled.`);
                } else {
                    alert(`Success! "${title}" has been scheduled.`);
                }

                renderEvents();
                eventForm.reset();

                document.getElementById('events-grid-section').scrollIntoView({ behavior: 'smooth' });
            });
        }

        // Render on page load
        renderEvents();
    }

    /* ==========================================
       ALUMNI BLOG DIRECTORY CONTROLLER
       ========================================== */
    const blogGrid = document.getElementById('blog-grid');
    if (blogGrid) {
        // Initial list of blog posts
        let blogPosts = [];

        let activeBlogCategory = 'all';
        let blogSearchQuery = '';

        const blogSearchInput = document.getElementById('blog-search');
        const blogFilterPills = document.querySelectorAll('.blog-controls-card .category-pill');
        const blogModal = document.getElementById('blog-details-modal');
        const blogForm = document.getElementById('write-story-form');

        // Helper to format date
        function formatBlogDate(dateStr) {
            const dateObj = new Date(dateStr);
            if (isNaN(dateObj.getTime())) return dateStr;
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return dateObj.toLocaleDateString('en-US', options);
        }

        // Render blog grid
        function renderBlog() {
            blogGrid.innerHTML = '';

            const filteredPosts = blogPosts.filter(post => {
                const matchesCategory = activeBlogCategory === 'all' || post.category === activeBlogCategory;
                const matchesSearch = post.title.toLowerCase().includes(blogSearchQuery.toLowerCase()) ||
                    post.author.toLowerCase().includes(blogSearchQuery.toLowerCase()) ||
                    post.summary.toLowerCase().includes(blogSearchQuery.toLowerCase()) ||
                    post.content.toLowerCase().includes(blogSearchQuery.toLowerCase());
                return matchesCategory && matchesSearch;
            });

            if (filteredPosts.length === 0) {
                blogGrid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 40px; border: 1px dashed var(--border-color); border-radius: var(--border-radius-md); background: var(--bg-light);">
                        <i data-lucide="book-open-check" style="width: 48px; height: 48px; color: var(--text-muted); margin-bottom: 12px;"></i>
                        <h4 style="color: var(--text-dark); margin-bottom: 6px;">No blog here</h4>
                        <p style="color: var(--text-muted); font-size: 0.95rem;">Be the first to share your story or experience with the community by filling out the form below!</p>
                    </div>
                `;
                lucide.createIcons();
                return;
            }

            filteredPosts.forEach(post => {
                let gradClass = 'blog-grad-blue';
                if (post.category === 'story') gradClass = 'blog-grad-orange';
                else if (post.category === 'news') gradClass = 'blog-grad-purple';
                else if (post.category === 'insights') gradClass = 'blog-grad-green';
                else if (post.category === 'placement') gradClass = 'blog-grad-cyan';

                const card = document.createElement('div');
                card.className = 'blog-card';
                card.innerHTML = `
                    <div>
                        <div class="blog-card-banner ${gradClass}">
                            <span class="blog-category-tag">${post.category.replace('_', ' ')}</span>
                            <div class="blog-read-badge">
                                <i data-lucide="clock"></i>
                                <span>${post.readTime} min read</span>
                            </div>
                        </div>
                        <div class="blog-card-body">
                            <span class="blog-date-text">${formatBlogDate(post.date)}</span>
                            <h3 class="blog-title-text">${post.title}</h3>
                            <p class="blog-short-summary">${post.summary}</p>
                            
                            <div class="blog-author-line">
                                <div class="blog-author-avatar">${post.author.slice(0, 2).toUpperCase()}</div>
                                <div class="blog-author-details">
                                    <span class="author-name">${post.author}</span>
                                    <span class="author-batch">${post.branch} '${post.batch.slice(-2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="blog-ctas">
                        <button class="btn btn-primary btn-view-blog-details" style="width: 100%;" data-id="${post.id}">
                            <i data-lucide="book-open"></i>
                            <span>Read Full Story</span>
                        </button>
                    </div>
                `;
                blogGrid.appendChild(card);
            });

            lucide.createIcons();

            // Bind click events on Details buttons
            document.querySelectorAll('.btn-view-blog-details').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = parseInt(btn.getAttribute('data-id'));
                    openBlogDetailsModal(id);
                });
            });
        }

        // Open blog details modal
        function openBlogDetailsModal(id) {
            const post = blogPosts.find(p => p.id === id);
            if (!post || !blogModal) return;

            // Track details view in Google Analytics
            if (typeof gtag === 'function') {
                gtag('event', 'view_blog_details', {
                    'post_id': id,
                    'post_title': post.title,
                    'post_category': post.category
                });
            }

            const modalContent = blogModal.querySelector('.blog-modal-content');

            // Generate paragraphs HTML
            const paragraphs = post.content.split('\n\n').map(p => `<p style="margin-bottom:16px;">${p.replace(/\n/g, '<br>')}</p>`).join('');

            // Generate details view
            const detailsHtml = `
                <button class="blog-modal-close" id="blog-modal-close-btn" aria-label="Close Modal">
                    <i data-lucide="x" style="width: 24px; height: 24px;"></i>
                </button>
                <div class="modal-header-blog">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
                        <span class="blog-category-badge badge-${post.category}">${post.category.replace('_', ' ')}</span>
                        <span style="font-size:0.85rem; color:var(--text-muted); display:flex; align-items:center; gap:4px;">
                            <i data-lucide="clock" style="width:14px; height:14px;"></i> ${post.readTime} min read
                        </span>
                    </div>
                    <h2 class="modal-blog-title">${post.title}</h2>
                    <span style="font-size:0.85rem; color:var(--text-muted);">${formatBlogDate(post.date)}</span>
                </div>
                
                <div class="modal-author-profile-box">
                    <div class="author-avatar-lg">${post.author.slice(0, 2).toUpperCase()}</div>
                    <div>
                        <div class="author-fullname">${post.author}</div>
                        <div class="author-subinfo">${post.branch} | Batch of ${post.batch}</div>
                        <div class="author-contact"><i data-lucide="mail"></i> <a href="mailto:${post.email}">${post.email}</a></div>
                    </div>
                </div>

                <div class="blog-main-content-text">
                    ${paragraphs}
                </div>
                
                <div style="display: flex; gap: 12px; margin-top: 30px; border-top: 1px solid var(--border-color); padding-top:20px;">
                    <a href="mailto:${post.email}?subject=Inquiry%20regarding%20blog%20post:%20${encodeURIComponent(post.title)}" class="btn btn-secondary" style="flex:1;">
                        <i data-lucide="mail"></i>
                        <span>Contact Author</span>
                    </a>
                    <button class="btn btn-primary" id="blog-modal-close-btn-footer" style="flex:1;">
                        <i data-lucide="check"></i>
                        <span>Done Reading</span>
                    </button>
                </div>
            `;

            modalContent.innerHTML = detailsHtml;
            blogModal.classList.add('open');
            lucide.createIcons();

            // Bind modal close buttons
            const closeBtn = document.getElementById('blog-modal-close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', closeBlogDetailsModal);
            }
            const doneBtn = document.getElementById('blog-modal-close-btn-footer');
            if (doneBtn) {
                doneBtn.addEventListener('click', closeBlogDetailsModal);
            }
        }

        // Close details modal
        function closeBlogDetailsModal() {
            if (blogModal) {
                blogModal.classList.remove('open');
            }
        }

        // Close modal when clicking outside content
        if (blogModal) {
            blogModal.addEventListener('click', (e) => {
                if (e.target === blogModal) {
                    closeBlogDetailsModal();
                }
            });
        }

        // Search Input listener
        if (blogSearchInput) {
            blogSearchInput.addEventListener('input', (e) => {
                blogSearchQuery = e.target.value;
                renderBlog();
            });
        }

        // Category Pills listener
        blogFilterPills.forEach(pill => {
            pill.addEventListener('click', () => {
                blogFilterPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                activeBlogCategory = pill.getAttribute('data-category');
                renderBlog();
            });
        });

        // Form handler
        if (blogForm) {
            blogForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const title = document.getElementById('story-title').value.trim();
                const category = document.getElementById('story-category').value;
                const author = document.getElementById('story-author').value.trim();
                const branch = document.getElementById('story-branch').value;
                const batch = document.getElementById('story-batch').value.trim();
                const readTime = parseInt(document.getElementById('story-readtime').value);
                const email = document.getElementById('story-email').value.trim();
                const summary = document.getElementById('story-summary').value.trim();
                const content = document.getElementById('story-content').value.trim();

                if (!title || !author || !batch || !readTime || !email || !summary || !content) {
                    alert('Please fill all required fields.');
                    return;
                }

                const today = new Date();
                const dateStr = today.toISOString().split('T')[0];

                const newPost = {
                    id: Date.now(),
                    title,
                    category,
                    author,
                    branch,
                    batch,
                    date: dateStr,
                    readTime,
                    email,
                    summary,
                    content
                };

                blogPosts.unshift(newPost);

                if (typeof gtag === 'function') {
                    gtag('event', 'create_story', {
                        'story_title': title,
                        'story_category': category
                    });
                }

                if (typeof showToast === 'function') {
                    showToast(`Success! "${title}" has been published.`);
                } else {
                    alert(`Success! "${title}" has been published.`);
                }

                renderBlog();
                blogForm.reset();

                document.getElementById('blog-grid-section').scrollIntoView({ behavior: 'smooth' });
            });
        }

        // Render on page load
        renderBlog();
    }

    /* ==========================================
       ALUMNI JOBS & REFERRALS CONTROLLER
       ========================================== */
    const jobsGrid = document.getElementById('jobs-grid');
    if (jobsGrid) {
        // Initial list of jobs
        let jobs = [
            {
                id: 1,
                title: 'Backend Engineer (Java)',
                company: 'Sanmit Technologies',
                category: 'fulltime',
                location: 'Noida, Sector 62 (In-Office)',
                referrer: 'Radhika Mathur',
                branch: 'CSE',
                batch: '2020',
                experience: '1–4 Years',
                salary: 'Competitive',
                skills: ['Java', 'Spring Boot', 'REST API', 'PostgreSQL', 'Microservices', 'Kafka', 'Docker', 'SQL', 'Git', 'DSA'],
                referral: 'no',
                email: 'radhika.mathur@sanmittechnologies.com',
                desc: `🚀 Job Opportunity | Backend Engineer (Java) | Noida (Sector 62)

Dear Alumni,

A great opportunity for professionals looking to grow their career in Java Backend Development.

📍 Position: Backend Engineer (Java)
🏢 Company: Sanmit Technologies
📍 Location: Noida, Sector 62 (In-Office)
💼 Experience: 1–4 Years

Mandatory Skills
✅ Core Java (Collections, Streams, OOP)
✅ Spring Boot
✅ REST API Development
✅ SQL & PostgreSQL
✅ Git
✅ Data Structures & Algorithms (DSA)
✅ Debugging & Problem Solving

Preferred Skills
- Microservices
- Apache Kafka
- Redis
- Elasticsearch
- Docker
- CI/CD
- OAuth2 / JWT / Keycloak
- Kubernetes Basics

Role Highlights
- Build scalable backend services using Java & Spring Boot
- Design and maintain REST APIs
- Work with PostgreSQL databases
- Participate in event-driven development using Kafka
- Write unit and integration tests

🎯 Ideal Candidate: 1–4 years of backend development experience with a strong learning mindset and good communication skills.

📧 Apply by sending your CV to: radhika.mathur@sanmittechnologies.com

If you're interested or know someone who fits this role, please share this opportunity within your network.`
            }
        ];

        let activeJobCategory = 'all';
        let jobSearchQuery = '';

        const jobSearchInput = document.getElementById('job-search');
        const jobFilterPills = document.querySelectorAll('.jobs-controls-card .category-pill');
        const jobModal = document.getElementById('job-details-modal');
        const jobForm = document.getElementById('post-job-form');

        // Render jobs
        function renderJobs() {
            jobsGrid.innerHTML = '';

            const filteredJobs = jobs.filter(job => {
                // Category pill filters
                let matchesCategory = activeJobCategory === 'all';
                if (!matchesCategory) {
                    if (activeJobCategory === 'referral') {
                        matchesCategory = job.referral === 'yes';
                    } else {
                        matchesCategory = job.category === activeJobCategory;
                    }
                }

                // Search query checks
                const matchesSearch = job.title.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
                    job.company.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
                    job.referrer.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
                    job.skills.some(skill => skill.toLowerCase().includes(jobSearchQuery.toLowerCase()));

                return matchesCategory && matchesSearch;
            });

            if (filteredJobs.length === 0) {
                jobsGrid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 40px; border: 1px dashed var(--border-color); border-radius: var(--border-radius-md); background: var(--bg-light);">
                        <i data-lucide="briefcase" style="width: 48px; height: 48px; color: var(--text-muted); margin-bottom: 12px;"></i>
                        <h4 style="color: var(--text-dark); margin-bottom: 6px;">No Job Openings Found</h4>
                        <p style="color: var(--text-muted); font-size: 0.95rem;">Try adjusting your keywords or category filters.</p>
                    </div>
                `;
                lucide.createIcons();
                return;
            }

            filteredJobs.forEach(job => {
                // Logo gradient background based on company initials
                const initials = job.company.slice(0, 2).toUpperCase();
                const logoColors = ['biz-logo-blue', 'biz-logo-orange', 'biz-logo-purple', 'biz-logo-green', 'biz-logo-red', 'biz-logo-cyan'];
                const colorIndex = Math.abs(job.company.charCodeAt(0) - 65) % logoColors.length;
                const logoClass = logoColors[colorIndex];

                const card = document.createElement('div');
                card.className = 'job-card';
                card.innerHTML = `
                    <div>
                        <div class="job-card-header">
                            <div class="job-company-logo ${logoClass}">${initials}</div>
                            <div>
                                <h3 class="job-card-title">${job.title}</h3>
                                <span class="job-company-name">${job.company}</span>
                            </div>
                        </div>
                        
                        <div class="job-badge-row">
                            <span class="job-pill-type badge-${job.category}">${job.category}</span>
                            <span class="job-pill-loc"><i data-lucide="map-pin"></i> ${job.location}</span>
                        </div>

                        <div class="job-details-brief">
                            <div class="brief-item">
                                <i data-lucide="calendar"></i>
                                <span>Exp: ${job.experience}</span>
                            </div>
                            <div class="brief-item">
                                <i data-lucide="indian-rupee"></i>
                                <span>${job.salary}</span>
                            </div>
                        </div>

                        <div class="job-skills-list">
                            ${job.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
                        </div>

                        ${job.referral === 'yes' ? `
                            <div class="job-referral-banner">
                                <i data-lucide="award"></i>
                                <span>Referral offered by ${job.referrer} (${job.branch} '${job.batch.slice(-2)})</span>
                            </div>
                        ` : `
                            <div class="job-direct-banner">
                                <i data-lucide="link"></i>
                                <span>Direct Application</span>
                            </div>
                        `}
                    </div>
                    
                    <div class="job-ctas">
                        <button class="btn btn-primary btn-view-job-details" style="width: 100%;" data-id="${job.id}">
                            <i data-lucide="eye"></i>
                            <span>Details & Apply</span>
                        </button>
                    </div>
                `;
                jobsGrid.appendChild(card);
            });

            lucide.createIcons();

            // Bind click events on Details buttons
            document.querySelectorAll('.btn-view-job-details').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = parseInt(btn.getAttribute('data-id'));
                    openJobDetailsModal(id);
                });
            });
        }

        // Open details modal
        function openJobDetailsModal(id) {
            const job = jobs.find(j => j.id === id);
            if (!job || !jobModal) return;

            // Track details view in Google Analytics
            if (typeof gtag === 'function') {
                gtag('event', 'view_job_details', {
                    'job_id': id,
                    'job_title': job.title,
                    'job_company': job.company
                });
            }

            const modalContent = jobModal.querySelector('.job-modal-content');

            // Generate details view
            const detailsHtml = `
                <button class="job-modal-close" id="job-modal-close-btn" aria-label="Close Modal">
                    <i data-lucide="x" style="width: 24px; height: 24px;"></i>
                </button>
                <div class="modal-header-job">
                    <h2 class="modal-job-title">${job.title}</h2>
                    <div style="font-size:1.1rem; font-weight:700; color:var(--text-dark); margin-bottom:8px;">${job.company}</div>
                    <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:12px;">
                        <span class="job-pill-type badge-${job.category}">${job.category}</span>
                        <span class="job-pill-loc" style="font-size:0.8rem; background:#f1f5f9; padding:4px 12px; border-radius:50px; color:#475569;">
                            <i data-lucide="map-pin" style="width:12px; height:12px; display:inline-block; vertical-align:middle; margin-right:4px;"></i>${job.location}
                        </span>
                    </div>
                </div>
                
                <div class="modal-details-list">
                    <div class="modal-detail-item">
                        <i data-lucide="briefcase"></i>
                        <div>
                            <strong>Experience Required:</strong>
                            <span>${job.experience}</span>
                        </div>
                    </div>
                    <div class="modal-detail-item">
                        <i data-lucide="indian-rupee"></i>
                        <div>
                            <strong>Salary Range:</strong>
                            <span>${job.salary}</span>
                        </div>
                    </div>
                    <div class="modal-detail-item">
                        <i data-lucide="user"></i>
                        <div>
                            <strong>Opportunity Poster:</strong>
                            <span>${job.referrer} (${job.branch} | Batch of ${job.batch})</span>
                        </div>
                    </div>
                    <div class="modal-detail-item">
                        <i data-lucide="mail"></i>
                        <div>
                            <strong>Resume Contact:</strong>
                            <a href="mailto:${job.email}">${job.email}</a>
                        </div>
                    </div>
                </div>

                <div class="job-description-block">
                    <h3>Role Description</h3>
                    <p style="font-size:0.95rem; color:var(--text-muted); line-height:1.6; margin-bottom:16px; white-space: pre-line;">${job.desc}</p>
                    
                    <h3 style="margin-top:20px;">Skills Required</h3>
                    <div class="job-skills-list" style="margin-bottom:20px;">
                        ${job.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
                    </div>
                </div>
                
                <div style="display: flex; gap: 12px; margin-top: 24px; border-top:1px solid var(--border-color); padding-top:20px;">
                    ${job.referral === 'yes' ? `
                        <button class="btn btn-primary" id="btn-request-referral" style="flex:1;" data-id="${job.id}">
                            <i data-lucide="award"></i>
                            <span>Request Alumni Referral</span>
                        </button>
                    ` : `
                        <a href="mailto:${job.email}?subject=Job%20Application%20-%20${encodeURIComponent(job.title)}" class="btn btn-primary" style="flex:1;">
                            <i data-lucide="mail"></i>
                            <span>Apply Directly</span>
                        </a>
                    `}
                    <a href="mailto:${job.email}?subject=Inquiry%20regarding%20job%20at%20${encodeURIComponent(job.company)}" class="btn btn-secondary" style="flex:1;">
                        <i data-lucide="info"></i>
                        <span>Inquire Details</span>
                    </a>
                </div>
            `;

            modalContent.innerHTML = detailsHtml;
            jobModal.classList.add('open');
            lucide.createIcons();

            // Bind modal close button
            const closeBtn = document.getElementById('job-modal-close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', closeJobDetailsModal);
            }

            // Bind Referral Request button
            const referralBtn = document.getElementById('btn-request-referral');
            if (referralBtn) {
                referralBtn.addEventListener('click', () => {
                    if (typeof showToast === 'function') {
                        showToast(`Referral request sent to ${job.referrer}. Check your email for further instructions!`);
                    } else {
                        alert(`Referral request sent to ${job.referrer}!`);
                    }
                    closeJobDetailsModal();
                });
            }
        }

        // Close details modal
        function closeJobDetailsModal() {
            if (jobModal) {
                jobModal.classList.remove('open');
            }
        }

        // Close modal when clicking outside content
        if (jobModal) {
            jobModal.addEventListener('click', (e) => {
                if (e.target === jobModal) {
                    closeJobDetailsModal();
                }
            });
        }

        // Search Input listener
        if (jobSearchInput) {
            jobSearchInput.addEventListener('input', (e) => {
                jobSearchQuery = e.target.value;
                renderJobs();
            });
        }

        // Category Pills listener
        jobFilterPills.forEach(pill => {
            pill.addEventListener('click', () => {
                jobFilterPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                activeJobCategory = pill.getAttribute('data-category');
                renderJobs();
            });
        });

        // Form handler
        if (jobForm) {
            jobForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const title = document.getElementById('job-title').value.trim();
                const company = document.getElementById('job-company').value.trim();
                const category = document.getElementById('job-category').value;
                const location = document.getElementById('job-location').value.trim();
                const referrer = document.getElementById('job-referrer').value.trim();
                const branch = document.getElementById('job-branch').value;
                const batch = document.getElementById('job-batch').value.trim();
                const experience = document.getElementById('job-experience').value.trim();
                const salary = document.getElementById('job-salary').value.trim() || 'Competitive';
                const email = document.getElementById('job-email').value.trim();
                const referralStatus = document.getElementById('job-referral-status').value;
                const skillsInput = document.getElementById('job-skills').value.trim();
                const desc = document.getElementById('job-desc').value.trim();

                if (!title || !company || !location || !referrer || !batch || !experience || !email || !skillsInput || !desc) {
                    alert('Please fill all required fields.');
                    return;
                }

                // Process comma separated skills
                const skills = skillsInput.split(',').map(s => s.trim()).filter(s => s.length > 0);

                const newJob = {
                    id: Date.now(),
                    title,
                    company,
                    category,
                    location,
                    referrer,
                    branch,
                    batch,
                    experience,
                    salary,
                    skills,
                    referral: referralStatus === 'yes' ? 'yes' : 'no',
                    email,
                    desc
                };

                jobs.unshift(newJob);

                if (typeof gtag === 'function') {
                    gtag('event', 'create_job', {
                        'job_title': title,
                        'job_company': company
                    });
                }

                if (typeof showToast === 'function') {
                    showToast(`Success! "${title}" job opportunity has been posted.`);
                } else {
                    alert(`Success! "${title}" job opportunity has been posted.`);
                }

                renderJobs();
                jobForm.reset();

                document.getElementById('jobs-grid-section').scrollIntoView({ behavior: 'smooth' });
            });
        }

        // Render on page load
        renderJobs();
    }

    /* ==========================================
       CONTACT US FORM CONTROLLER
       ========================================== */
    const contactForm = document.getElementById('contact-us-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const branch = document.getElementById('contact-branch').value;
            const batch = document.getElementById('contact-batch').value.trim();
            const subject = document.getElementById('contact-subject').value;
            const message = document.getElementById('contact-message').value.trim();

            if (!name || !email || !batch || !message) {
                alert('Please fill all required fields.');
                return;
            }

            if (typeof gtag === 'function') {
                gtag('event', 'submit_contact', {
                    'contact_subject': subject,
                    'contact_branch': branch,
                    'contact_batch': batch
                });
            }

            if (typeof showToast === 'function') {
                showToast('Thank you! Your message has been sent successfully. Volunteer admins will respond shortly.');
            } else {
                alert('Thank you! Your message has been sent successfully.');
            }

            contactForm.reset();
        });
    }

    /* ==========================================
       ALUMNI DIRECTORY CONTROLLER
       ========================================== */
    const alumniGrid = document.getElementById('alumni-grid');
    if (alumniGrid) {
        // Initial list of verified alumni
        let alumniList = [];

        let activeBranchFilter = 'all';
        let activeLocationFilter = 'all';
        let alumniSearchQuery = '';

        const alumniSearchInput = document.getElementById('alumni-search');
        const alumniBranchFilterDropdown = document.getElementById('alumni-branch-filter');
        const alumniLocationPills = document.querySelectorAll('.location-pills .location-pill');
        const alumniModal = document.getElementById('alumni-profile-modal');

        // Render Alumni
        function renderAlumni() {
            alumniGrid.innerHTML = '';

            const filteredAlumni = alumniList.filter(alumnus => {
                // Branch filter
                let matchesBranch = activeBranchFilter === 'all';
                if (!matchesBranch) {
                    matchesBranch = alumnus.branch === activeBranchFilter;
                }

                // Location filter
                let matchesLocation = activeLocationFilter === 'all';
                if (!matchesLocation) {
                    if (activeLocationFilter === 'Remote') {
                        matchesLocation = alumnus.location.toLowerCase().includes('remote');
                    } else if (activeLocationFilter === 'Delhi') {
                        matchesLocation = alumnus.location.toLowerCase().includes('delhi') || alumnus.location.toLowerCase().includes('noida') || alumnus.location.toLowerCase().includes('ncr');
                    } else {
                        matchesLocation = alumnus.location.toLowerCase().includes(activeLocationFilter.toLowerCase());
                    }
                }

                // Search query
                const matchesSearch = alumnus.name.toLowerCase().includes(alumniSearchQuery.toLowerCase()) ||
                    alumnus.company.toLowerCase().includes(alumniSearchQuery.toLowerCase()) ||
                    alumnus.role.toLowerCase().includes(alumniSearchQuery.toLowerCase()) ||
                    alumnus.location.toLowerCase().includes(alumniSearchQuery.toLowerCase()) ||
                    alumnus.skills.some(skill => skill.toLowerCase().includes(alumniSearchQuery.toLowerCase()));

                return matchesBranch && matchesLocation && matchesSearch;
            });

            if (filteredAlumni.length === 0) {
                alumniGrid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 40px; border: 1px dashed var(--border-color); border-radius: var(--border-radius-md); background: var(--bg-light);">
                        <i data-lucide="users" style="width: 48px; height: 48px; color: var(--text-muted); margin-bottom: 12px;"></i>
                        <h4 style="color: var(--text-dark); margin-bottom: 6px;">No alumni here</h4>
                        <p style="color: var(--text-muted); font-size: 0.95rem;">Be the first to join the directory and connect with fellow Harcourtians!</p>
                    </div>
                `;
                lucide.createIcons();
                return;
            }

            filteredAlumni.forEach(alumnus => {
                // Initial avatar placeholder
                const initials = alumnus.name.split(' ').map(n => n[0]).join('').toUpperCase();
                const colors = ['biz-logo-blue', 'biz-logo-orange', 'biz-logo-purple', 'biz-logo-green', 'biz-logo-red', 'biz-logo-cyan'];
                const colorIndex = Math.abs(alumnus.name.charCodeAt(0) - 65) % colors.length;
                const avatarColorClass = colors[colorIndex];

                const card = document.createElement('div');
                card.className = 'alumni-card';
                card.innerHTML = `
                    <div class="alumni-card-badge-verified">
                        <i data-lucide="shield-check"></i>
                        <span>Verified Alumnus</span>
                    </div>

                    <div class="alumni-card-main-info">
                        <div class="alumni-avatar-circle ${avatarColorClass}">${initials}</div>
                        <h3 class="alumni-card-name">${alumnus.name}</h3>
                        <p class="alumni-card-credentials">${alumnus.branch} | Class of ${alumnus.batch}</p>
                        <p class="alumni-card-role">
                            <strong>${alumnus.role}</strong>
                            <span>at ${alumnus.company}</span>
                        </p>
                        <p class="alumni-card-loc"><i data-lucide="map-pin"></i> ${alumnus.location}</p>
                    </div>

                    <div class="alumni-card-skills">
                        ${alumnus.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
                    </div>

                    <div class="alumni-card-actions">
                        <button class="btn btn-primary btn-view-alumni-profile" style="width: 100%;" data-id="${alumnus.id}">
                            <i data-lucide="user"></i>
                            <span>View Profile & Connect</span>
                        </button>
                    </div>
                `;
                alumniGrid.appendChild(card);
            });

            lucide.createIcons();

            // Bind click events
            document.querySelectorAll('.btn-view-alumni-profile').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = parseInt(btn.getAttribute('data-id'));
                    openAlumniProfileModal(id);
                });
            });
        }

        // Open profile modal
        function openAlumniProfileModal(id) {
            const alumnus = alumniList.find(a => a.id === id);
            if (!alumnus || !alumniModal) return;

            if (typeof gtag === 'function') {
                gtag('event', 'view_alumni_profile', {
                    'alumni_id': id,
                    'alumni_name': alumnus.name,
                    'alumni_company': alumnus.company
                });
            }

            const modalContent = alumniModal.querySelector('.alumni-modal-content');

            // Render modal structure
            const initials = alumnus.name.split(' ').map(n => n[0]).join('').toUpperCase();
            const colors = ['biz-logo-blue', 'biz-logo-orange', 'biz-logo-purple', 'biz-logo-green', 'biz-logo-red', 'biz-logo-cyan'];
            const colorIndex = Math.abs(alumnus.name.charCodeAt(0) - 65) % colors.length;
            const avatarColorClass = colors[colorIndex];

            const detailsHtml = `
                <button class="alumni-modal-close" id="alumni-modal-close-btn" aria-label="Close Profile">
                    <i data-lucide="x" style="width: 24px; height: 24px;"></i>
                </button>
                
                <div class="modal-profile-header">
                    <div class="alumni-avatar-circle ${avatarColorClass}" style="width:80px; height:80px; font-size:2rem; margin-bottom:16px;">${initials}</div>
                    <h2 style="font-size:1.8rem; font-family:var(--font-heading); color:var(--text-dark); margin-bottom:4px; display:flex; align-items:center; gap:8px;">
                        <span>${alumnus.name}</span>
                        <i data-lucide="shield-check" style="color:var(--accent-blue); width:24px; height:24px; fill:rgba(37,99,235,0.1);"></i>
                    </h2>
                    <p style="font-size:1.05rem; font-weight:600; color:var(--primary-color); margin-bottom:6px;">
                        ${alumnus.role} @ ${alumnus.company}
                    </p>
                    <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center; margin-bottom:20px;">
                        <span style="font-size:0.8rem; background:#eff6ff; border:1px solid #bfdbfe; color:#1e40af; padding:4px 12px; border-radius:50px; font-weight:600;">
                            ${alumnus.branch} | Class of ${alumnus.batch}
                        </span>
                        <span style="font-size:0.8rem; background:#f1f5f9; padding:4px 12px; border-radius:50px; color:#475569;">
                            <i data-lucide="map-pin" style="width:12px; height:12px; display:inline-block; vertical-align:middle; margin-right:4px;"></i>${alumnus.location}
                        </span>
                    </div>
                </div>

                <div class="modal-profile-body">
                    <h3 style="font-size:1.1rem; color:var(--text-dark); margin-bottom:10px; border-bottom:1px solid var(--border-color); padding-bottom:8px;">About</h3>
                    <p style="font-size:0.95rem; color:var(--text-muted); line-height:1.6; margin-bottom:24px;">${alumnus.bio}</p>

                    <h3 style="font-size:1.1rem; color:var(--text-dark); margin-bottom:10px; border-bottom:1px solid var(--border-color); padding-bottom:8px;">Expertise & Skills</h3>
                    <div class="alumni-card-skills" style="margin-bottom:24px;">
                        ${alumnus.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
                    </div>

                    <h3 style="font-size:1.1rem; color:var(--text-dark); margin-bottom:10px; border-bottom:1px solid var(--border-color); padding-bottom:8px;">Get in Touch</h3>
                    <div style="display:flex; flex-direction:column; gap:12px;">
                        <div style="display:flex; align-items:center; gap:12px; font-size:0.95rem; color:var(--text-muted);">
                            <i data-lucide="mail" style="color:var(--primary-color);"></i>
                            <span>Email: <a href="mailto:${alumnus.email}" style="color:var(--accent-blue); text-decoration:none;">${alumnus.email}</a></span>
                        </div>
                        <div style="display:flex; align-items:center; gap:12px; font-size:0.95rem; color:var(--text-muted);">
                            <i data-lucide="linkedin" style="color:var(--primary-color);"></i>
                            <span>LinkedIn: <a href="${alumnus.linkedin}" target="_blank" style="color:var(--accent-blue); text-decoration:none;">View Profile</a></span>
                        </div>
                    </div>
                </div>

                <div style="display: flex; gap: 12px; margin-top: 30px; border-top:1px solid var(--border-color); padding-top:20px;">
                    <button class="btn btn-primary" id="btn-alumni-msg" style="flex:1;">
                        <i data-lucide="message-square"></i>
                        <span>Send Message (via App)</span>
                    </button>
                    <a href="${alumnus.linkedin}" target="_blank" class="btn btn-secondary" style="flex:1; text-align:center;">
                        <i data-lucide="external-link"></i>
                        <span>LinkedIn</span>
                    </a>
                </div>
            `;

            modalContent.innerHTML = detailsHtml;
            alumniModal.classList.add('open');
            lucide.createIcons();

            // Bind closing actions
            const closeBtn = document.getElementById('alumni-modal-close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', closeAlumniProfileModal);
            }

            // Message click action
            const msgBtn = document.getElementById('btn-alumni-msg');
            if (msgBtn) {
                msgBtn.addEventListener('click', () => {
                    if (typeof showToast === 'function') {
                        showToast(`Messaging ${alumnus.name} requires profile verification. Please open Harcourtian Connect app!`);
                    } else {
                        alert(`Messaging requires profile verification.`);
                    }
                    closeAlumniProfileModal();
                });
            }
        }

        // Close profile modal
        function closeAlumniProfileModal() {
            if (alumniModal) {
                alumniModal.classList.remove('open');
            }
        }

        // Close modal when clicking outside content
        if (alumniModal) {
            alumniModal.addEventListener('click', (e) => {
                if (e.target === alumniModal) {
                    closeAlumniProfileModal();
                }
            });
        }

        // Search Input listener
        if (alumniSearchInput) {
            alumniSearchInput.addEventListener('input', (e) => {
                alumniSearchQuery = e.target.value;
                renderAlumni();
            });
        }

        // Branch filter listener
        if (alumniBranchFilterDropdown) {
            alumniBranchFilterDropdown.addEventListener('change', (e) => {
                activeBranchFilter = e.target.value;
                renderAlumni();
            });
        }

        // Location Pills filter listener
        alumniLocationPills.forEach(pill => {
            pill.addEventListener('click', () => {
                alumniLocationPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                activeLocationFilter = pill.getAttribute('data-location');
                renderAlumni();
            });
        });

        /* ==========================================
           NEARBY ALUMNI MAP VIEW CONTROLLER
           ========================================== */
        const tabGridView = document.getElementById('tab-grid-view');
        const tabMapView = document.getElementById('tab-map-view');
        const gridViewContent = document.getElementById('grid-view-content');
        const mapViewContent = document.getElementById('map-view-content');

        if (tabGridView && tabMapView && gridViewContent && mapViewContent) {
            tabGridView.addEventListener('click', () => {
                tabGridView.classList.add('active');
                tabMapView.classList.remove('active');
                gridViewContent.classList.add('active');
                mapViewContent.classList.remove('active');
            });

            tabMapView.addEventListener('click', () => {
                tabMapView.classList.add('active');
                tabGridView.classList.remove('active');
                mapViewContent.classList.add('active');
                gridViewContent.classList.remove('active');
                renderNearby();
            });
        }

        const radiusSlider = document.getElementById('radius-slider');
        const radiusValue = document.getElementById('radius-value');

        if (radiusSlider && radiusValue) {
            radiusSlider.addEventListener('input', (e) => {
                const radius = e.target.value;
                radiusValue.textContent = radius;
                renderNearby();
            });
        }

        function renderNearby() {
            const nearbyList = document.getElementById('nearby-list');
            const nearbyMapCanvas = document.getElementById('nearby-map-canvas');
            if (!nearbyList || !nearbyMapCanvas || !radiusSlider) return;

            const radius = parseInt(radiusSlider.value);

            // Filter alumni list by distance
            const nearbyAlumni = alumniList.filter(alumnus => alumnus.distance <= radius);

            // Clear pins except user center pin
            const existingPins = nearbyMapCanvas.querySelectorAll('.map-pulse-marker');
            existingPins.forEach(pin => pin.remove());

            nearbyList.innerHTML = '';

            if (nearbyAlumni.length === 0) {
                nearbyList.innerHTML = `
                    <div style="text-align: center; padding: 40px; border: 1px dashed var(--border-color); border-radius: var(--border-radius-sm); background: var(--bg-light); margin-top: 10px;">
                        <i data-lucide="users" style="width: 36px; height: 36px; color: var(--text-muted); margin-bottom: 8px; display:inline-block;"></i>
                        <h4 style="font-size:0.95rem; color: var(--text-dark); margin-bottom: 4px;">No Alumni in Radius</h4>
                        <p style="color: var(--text-muted); font-size: 0.85rem;">Try increasing the radius slider to expand the search range.</p>
                    </div>
                `;
                lucide.createIcons();
                return;
            }

            // Sort nearby alumni by proximity
            nearbyAlumni.sort((a, b) => a.distance - b.distance);

            nearbyAlumni.forEach(alumnus => {
                // Initial avatar
                const initials = alumnus.name.split(' ').map(n => n[0]).join('').toUpperCase();
                const colors = ['biz-logo-blue', 'biz-logo-orange', 'biz-logo-purple', 'biz-logo-green', 'biz-logo-red', 'biz-logo-cyan'];
                const colorIndex = Math.abs(alumnus.name.charCodeAt(0) - 65) % colors.length;
                const avatarColorClass = colors[colorIndex];

                // Append card to sidebar list
                const item = document.createElement('div');
                item.className = 'nearby-alumni-item';
                item.innerHTML = `
                    <div class="nearby-item-header">
                        <div class="nearby-item-avatar-circle ${avatarColorClass}">${initials}</div>
                        <div class="nearby-item-info">
                            <h4>${alumnus.name}</h4>
                            <p class="role">${alumnus.role} at ${alumnus.company}</p>
                            <p class="branch">${alumnus.branch} | Class of ${alumnus.batch}</p>
                        </div>
                        <div class="nearby-distance">
                            <i data-lucide="navigation" style="width:12px; height:12px; transform: rotate(45deg); display:inline-block; vertical-align:middle; margin-right:2px;"></i>
                            <span>${alumnus.distance} km</span>
                        </div>
                    </div>
                    <div class="nearby-item-actions">
                        <button class="btn btn-secondary btn-nearby-chat" data-name="${alumnus.name}">
                            <i data-lucide="message-square"></i>
                            <span>Chat</span>
                        </button>
                        <button class="btn btn-primary btn-view-nearby-profile" data-id="${alumnus.id}">
                            <i data-lucide="user"></i>
                            <span>View Profile</span>
                        </button>
                    </div>
                `;
                nearbyList.appendChild(item);

                // Add pin on mock map canvas
                const pin = document.createElement('div');
                pin.className = 'map-pulse-marker';
                pin.style.left = `${alumnus.mapX}%`;
                pin.style.top = `${alumnus.mapY}%`;
                pin.innerHTML = `
                    <div class="pin-pulse"></div>
                    <div class="pin-dot ${avatarColorClass}">${initials}</div>
                    <div class="pin-tooltip">
                        <strong>${alumnus.name}</strong>
                        <span>${alumnus.distance} km away</span>
                    </div>
                `;

                // Clicking pin opens profile modal
                pin.addEventListener('click', () => {
                    openAlumniProfileModal(alumnus.id);
                });

                nearbyMapCanvas.appendChild(pin);
            });

            lucide.createIcons();

            // Bind connect actions
            document.querySelectorAll('.btn-nearby-chat').forEach(btn => {
                btn.addEventListener('click', () => {
                    const name = btn.getAttribute('data-name');
                    if (typeof showToast === 'function') {
                        showToast(`Messaging ${name} requires profile verification. Please open Harcourtian Connect app!`);
                    } else {
                        alert(`Messaging requires profile verification.`);
                    }
                });
            });

            document.querySelectorAll('.btn-view-nearby-profile').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = parseInt(btn.getAttribute('data-id'));
                    openAlumniProfileModal(id);
                });
            });
        }

        // Render on page load
        renderAlumni();
    }

    /* ==========================================
       COMMUNITY GROWTH CHART CONTROLLER
       ========================================== */
    const chartCanvas = document.getElementById('growthChart');
    if (chartCanvas) {
        const metricData = {
            alumni: {
                title: 'Alumni Growth Timeline',
                labels: ['Mar 2026', 'Apr 2026', 'May 2026', 'Jun 2026', 'Jul 2026'],
                data: [705, 718, 730, 742, 750],
                label: 'Verified Alumni',
                borderColor: '#0b3b8c',
                backgroundColor: 'rgba(11, 59, 140, 0.8)'
            },
            jobs: {
                title: 'Job Referrals Shared',
                labels: ['Mar 2026', 'Apr 2026', 'May 2026', 'Jun 2026', 'Jul 2026'],
                data: [5, 6, 10, 12, 16],
                label: 'Job Opportunities',
                borderColor: '#2e7d32',
                backgroundColor: 'rgba(46, 125, 50, 0.8)'
            },
            companies: {
                title: 'Partner Companies & Startups',
                labels: ['Mar 2026', 'Apr 2026', 'May 2026', 'Jun 2026', 'Jul 2026'],
                data: [2, 3, 5, 7, 15],
                label: 'Companies',
                borderColor: '#ef6c00',
                backgroundColor: 'rgba(239, 108, 0, 0.8)'
            },
            placements: {
                title: 'Students Placed via Referrals',
                labels: ['Mar 2026', 'Apr 2026', 'May 2026', 'Jun 2026', 'Jul 2026'],
                data: [13, 14, 15, 16, 17],
                label: 'Students Placed',
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(79, 70, 229, 0.8)'
            },
            events: {
                title: 'Alumni Events & Meets Organized',
                labels: ['Mar 2026', 'Apr 2026', 'May 2026', 'Jun 2026', 'Jul 2026'],
                data: [6, 7, 7, 8, 9],
                label: 'Events Held',
                borderColor: '#d32f2f',
                backgroundColor: 'rgba(211, 47, 47, 0.8)'
            },
            countries: {
                title: 'Countries with Active Alumni',
                labels: ['Mar 2026', 'Apr 2026', 'May 2026', 'Jun 2026', 'Jul 2026'],
                data: [5, 5, 5, 6, 6],
                label: 'Countries Active',
                borderColor: '#f9a825',
                backgroundColor: 'rgba(249, 168, 37, 0.8)'
            }

        };

        let activeMetric = 'alumni';
        const ctx = chartCanvas.getContext('2d');
        let growthChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: metricData[activeMetric].labels,
                datasets: [{
                    label: metricData[activeMetric].label,
                    data: metricData[activeMetric].data,
                    borderColor: metricData[activeMetric].borderColor,
                    backgroundColor: metricData[activeMetric].backgroundColor,
                    borderWidth: 1.5,
                    borderRadius: 6,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        padding: 12,
                        backgroundColor: 'rgba(15, 23, 42, 0.9)',
                        titleFont: { family: 'Outfit', size: 13 },
                        bodyFont: { family: 'Inter', size: 12 },
                        cornerRadius: 8
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: { family: 'Inter', size: 12 }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            font: { family: 'Inter', size: 12 }
                        }
                    }
                }
            }
        });

        // Interactive card click handlers
        const cards = document.querySelectorAll('.metric-card');
        const chartTitle = document.getElementById('chart-title');

        cards.forEach(card => {
            card.addEventListener('click', () => {
                // Remove active class from all cards
                cards.forEach(c => c.classList.remove('active'));

                // Add active class to clicked card
                card.classList.add('active');

                const metric = card.getAttribute('data-metric');
                activeMetric = metric;

                // Update Chart Title
                chartTitle.textContent = metricData[metric].title;

                // Update Chart Data & Styling
                growthChart.data.labels = metricData[metric].labels;
                growthChart.data.datasets[0].label = metricData[metric].label;
                growthChart.data.datasets[0].data = metricData[metric].data;
                growthChart.data.datasets[0].borderColor = metricData[metric].borderColor;
                growthChart.data.datasets[0].backgroundColor = metricData[metric].backgroundColor;

                growthChart.update();
            });
        });
    }
});


