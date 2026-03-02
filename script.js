// ==========================================================================
// The Capital Pools - Main Javascript
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    /* --- Navbar Scroll Effect --- */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* --- Mobile Menu Toggle --- */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (mobileMenuBtn.querySelector('i')) {
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    /* --- Intersection Observer for Scroll Animations --- */
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .slide-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Unobserve after animating once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => animateOnScroll.observe(el));


    /* --- Testimonial Carousel --- */
    const testimonials = [
        {
            text: "The Capital Pools transformed our backyard into a luxury resort. The infinity pool seamlessly blends with the Kerala backwaters. Incredible craftsmanship.",
            author: "Rajesh Menon, Kochi"
        },
        {
            text: "Opted for their nature-friendly bio-pool. It’s absolutely stunning and chemical-free. The maintenance team is also very punctual and professional.",
            author: "Anitha Varghese, Alappuzha"
        },
        {
            text: "Highly recommend for any commercial pool projects. We installed durable fiberglass pools in our resort and the finish is flawless.",
            author: "Kerala Palm Resorts"
        }
    ];

    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;

    // Render testimonials
    function renderTestimonials() {
        track.innerHTML = '';
        testimonials.forEach(t => {
            const card = document.createElement('div');
            card.className = 'testimonial-card';
            card.innerHTML = `
                <div class="t-quote">"${t.text}"</div>
                <div class="t-author">- ${t.author}</div>
            `;
            track.appendChild(card);
        });
    }

    function updateCarousel() {
        const width = track.clientWidth;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    if (track) {
        renderTestimonials();

        // Handle window resize
        window.addEventListener('resize', updateCarousel);

        nextBtn.addEventListener('click', () => {
            if (currentIndex < testimonials.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0; // Loop back
            }
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = testimonials.length - 1; // Loop end
            }
            updateCarousel();
        });

        // Auto play (optional)
        setInterval(() => {
            if (currentIndex < testimonials.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        }, 6000);
    }

    /* --- Review Modal Logic --- */
    const modal = document.getElementById("reviewModal");
    const openBtn = document.getElementById("openReviewModal");
    const closeBtn = document.querySelector(".close-btn");
    const submitReviewBtn = document.getElementById("submitReview");

    if (openBtn && modal) {
        openBtn.onclick = function () {
            modal.style.display = "block";
        }
        closeBtn.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        submitReviewBtn.onclick = function () {
            const name = document.getElementById("reviewName").value;
            const text = document.getElementById("reviewText").value;
            if (name && text) {
                alert("Thank you for your review!");
                modal.style.display = "none";
                document.getElementById("reviewForm").reset();
            } else {
                alert("Please fill in all fields.");
            }
        }
    }


    /* --- WhatsApp Contact Form Integration --- */
    const whatsappForm = document.getElementById('whatsappForm');

    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get values
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const notes = document.getElementById('notes').value.trim();

            // The Company WhatsApp Number
            const whatsappNumber = "918589030606";

            // Format Message
            const message = `Hello The Capital Pools,\n\nI would like to inquire regarding a pool project.\n\n*Name:* ${name}\n*Contact:* ${phone}\n*Email:* ${email || 'N/A'}\n*Additional Notes:* ${notes}\n\nPlease get back to me.`;

            // Encode URI Component
            const encodedMessage = encodeURIComponent(message);

            // Redirect to WhatsApp
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
        });
    }

});
