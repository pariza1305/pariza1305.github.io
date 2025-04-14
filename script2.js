//ques2
document.addEventListener("DOMContentLoaded", function () {
    // Track all click events
    document.addEventListener('click', function(e) {
        const target = e.target;
        const tagName = target.tagName.toLowerCase();
        const className = target.className;
        const timestamp = new Date().toISOString();
        
        // Identify the type of element clicked
        let objectType = tagName;
        if (className) {
            objectType += ` (class: ${className})`;
        }
        if (target.id) {
            objectType += ` (id: ${target.id})`;
        }
        
        console.log(`${timestamp}, click, ${objectType}`);
    });
    
    // Track page view on load
    const timestamp = new Date().toISOString();
    console.log(`${timestamp}, view, page load`);
    
    // Track element views using Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const tagName = target.tagName.toLowerCase();
                const timestamp = new Date().toISOString();
                let objectType = tagName;
                
                if (target.className) {
                    objectType += ` (class: ${target.className})`;
                }
                if (target.id) {
                    objectType += ` (id: ${target.id})`;
                }
                
                console.log(`${timestamp}, view, ${objectType}`);
            }
        });
    });
    
    // Observe section elements and other important elements
    document.querySelectorAll('section, header, footer, .profile-img, .about-img, .skill-circle, .card, .timeline-item').forEach(el => {
        observer.observe(el);
    });
});
