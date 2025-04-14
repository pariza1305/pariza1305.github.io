document.addEventListener("DOMContentLoaded", function () {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    // Check if user has a theme preference stored
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the theme
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Update icon
        if (body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Typing animation
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const texts = ['Front-End Developer', 'Web Designer', 'Computer Science Student', 'Programmer'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;
        
        function typeText() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                // Remove a character
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                // Add a character
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }
            
            // If word is complete
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typeSpeed = 1000; // Pause at end
            }
            
            // If deletion is complete
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500; // Pause before typing next word
            }
            
            setTimeout(typeText, typeSpeed);
        }
        
        // Start the typing animation
        setTimeout(typeText, 1000);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Update active link
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Update active menu item on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Animate skill bars on scroll
    const skillCircles = document.querySelectorAll('.skill-circle');
    
    function animateSkills() {
        skillCircles.forEach(circle => {
            const progress = circle.getAttribute('data-progress');
            const progressBar = circle.querySelector('.progress-fill');
            
            if (isElementInViewport(circle) && !progressBar.style.width) {
                progressBar.style.width = `${progress}%`;
            }
        });
    }
    
    // Check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Run animation on scroll
    window.addEventListener('scroll', animateSkills);
    
    // Initial call to animate skills that are already visible
    animateSkills();
    
    // Contact form handling
    const contactForm = document.querySelector("#contact .contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            
            const formElements = this.elements;
            const name = formElements[0].value.trim();
            const email = formElements[1].value.trim();
            const subject = formElements[2].value.trim();
            const message = formElements[3].value.trim();
            
            if (name && email && subject && message) {
                alert(`Thanks for reaching out, ${name}! Your message has been sent.`);
                this.reset();
            } else {
                alert("Please fill out all fields.");
            }
        });
    }
});