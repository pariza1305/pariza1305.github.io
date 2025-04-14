document.addEventListener("DOMContentLoaded", function () {
    // Theme toggle functionality
    const toggle = document.getElementById("theme-toggle");
    const body = document.body;
    
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        toggle.querySelector("i").classList.replace("fa-moon", "fa-sun");
    }
    
    toggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        const icon = toggle.querySelector("i");

        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            icon.classList.replace("fa-moon", "fa-sun");
            document.body.style.letterSpacing = "2pt"; 
        } else {
            localStorage.setItem("theme", "light");
            icon.classList.replace("fa-sun", "fa-moon");
            document.body.style.letterSpacing = "normal";
            
            // Force refresh of styles
            setTimeout(() => {
                document.body.style.transition = "background 0.3s ease";
            }, 50);
        }
    });
    
    // Typing animation
    const textElement = document.getElementById("typing-text");
    const texts = ["Front End Developer", "Web Designer"];
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        let currentText = texts[index];
        textElement.innerHTML = currentText.substring(0, charIndex) + "<span class='cursor'>|</span>";
        
        if (!isDeleting && charIndex < currentText.length) {
            charIndex++;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(type, 50);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) index = (index + 1) % texts.length;
            setTimeout(type, 1000);
        }
    }
    
    type();  
    
    // Improved navigation functionality
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            
            // Scroll to section with precise positioning
            const targetElement = document.getElementById(targetId);
            const headerHeight = document.querySelector('header').offsetHeight;
            
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight,
                behavior: 'auto' // Use 'auto' for instant scrolling
            });
            
            // Update active navigation item
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Set active section on page load and scroll
    function setActiveSection() {
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('header').offsetHeight;
        
        // Find which section is currently in view
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 5;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const id = section.getAttribute('id');
                
                // Update active navigation item
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                    if (navLink.getAttribute('href') === '#' + id) {
                        navLink.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Initial check for active section
    setActiveSection();
    
    // Update active section on scroll
    window.addEventListener('scroll', setActiveSection);
    
    // Skills hover effect
    const skills = document.querySelectorAll(".skill-circle");
    skills.forEach(skill => {
        skill.addEventListener("mouseenter", () => {
            skill.style.background = "#ff69b4";
        });
        skill.addEventListener("mouseleave", () => {
            skill.style.background = "";
        });
    });
    
    // Skill progress initialization
    document.querySelectorAll(".skill-circle").forEach((circle) => {
        let progress = circle.getAttribute("data-progress");
        let progressBar = circle.querySelector(".progress-fill");
        setTimeout(() => {
            progressBar.style.width = progress + "%";
        }, 500);
    });
    
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
    
    // Text analyzer functionality
    window.analyzeText = function() {
        const inputText = document.getElementById("inputText").value;
        const output = document.getElementById("output");
        
        if (!inputText) {
            output.textContent = "Please enter some text to analyze.";
            return;
        }
        
        const wordCount = inputText.split(/\s+/).filter(word => word.length > 0).length;
        const charCount = inputText.length;
        const charCountNoSpaces = inputText.replace(/\s+/g, "").length;
        const sentences = inputText.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
        const paragraphs = inputText.split(/\n+/).filter(para => para.trim().length > 0).length;
        
        let result = `Word Count: ${wordCount}\n`;
        result += `Character Count (with spaces): ${charCount}\n`;
        result += `Character Count (without spaces): ${charCountNoSpaces}\n`;
        result += `Sentence Count: ${sentences}\n`;
        result += `Paragraph Count: ${paragraphs}\n`;
        
        if (wordCount > 0) {
            const avgWordLength = charCountNoSpaces / wordCount;
            result += `Average Word Length: ${avgWordLength.toFixed(2)} characters\n`;
        }
        
        output.textContent = result;
    };
});