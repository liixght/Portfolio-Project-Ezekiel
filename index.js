document.addEventListener('DOMContentLoaded', function() {
    const titleElement = document.getElementById('animatedHeaderTitle');
    const headerText = document.querySelector('.header-text');

    if (headerText) {
        headerText.style.opacity = '0';
        headerText.style.transform = 'translateY(40px)';
        headerText.style.transition = 'opacity 0.6s, transform 0.6s';
    }

    if (titleElement) {
        const originalText = titleElement.textContent.trim();
        titleElement.textContent = '';

        // Create a container for the animated text
        const animatedContainer = document.createElement('span');
        animatedContainer.style.display = 'inline-block';
        animatedContainer.style.position = 'relative';
        animatedContainer.style.opacity = '0'; // Hide initially
        titleElement.appendChild(animatedContainer);

        // Create a span for each letter, all hidden initially
        const letterSpans = [];
        for (let i = 0; i < originalText.length; i++) {
            const span = document.createElement('span');
            span.textContent = originalText[i] === ' ' ? '\u00A0' : originalText[i];
            span.style.opacity = '0';
            span.style.transition = 'opacity 0.3s';
            animatedContainer.appendChild(span);
            letterSpans.push(span);
        }
        // Animates each letter fading in one by one, including the first
        let i = 0;
        const speed = 150;
        function fadeInLetter() {
            if (i < letterSpans.length) {
                letterSpans[i].style.opacity = '1';
                i++;
                setTimeout(fadeInLetter, speed);
            }
        }
        // Make the container visible after 0.1s, then start animation
        setTimeout(function() {
            animatedContainer.style.opacity = '1';
            fadeInLetter();
            // After the header intro animation, fade in the header-text from below
            if (headerText) {
                setTimeout(function() {
                    headerText.style.opacity = '1';
                    headerText.style.transform = 'translateY(0)';
                }, speed * letterSpans.length + 200);
            }
        }, 100);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const aboutDiv = document.getElementById('about');
    const qualificationsDiv = document.getElementById('qualifications');

    function handleMouseMove(event, element) {
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        // Adjust sensitivity by changing the divisor
        const rotateY = (x / (rect.width / 2)) * 10; // Max rotation 10 degrees
        const rotateX = (y / (rect.height / 2)) * -10; // Max rotation 10 degrees, inverted for natural feel

        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    }

    function resetTransform(element) {
        if (!element) return;
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }

    if (aboutDiv) {
        document.addEventListener('mousemove', (event) => {
            if (aboutDiv.matches(':hover')) {
                handleMouseMove(event, aboutDiv);
            } else {
                resetTransform(aboutDiv);
            }
        });
    }

    if (qualificationsDiv) {
        document.addEventListener('mousemove', (event) => {
            if (qualificationsDiv.matches(':hover')) {
                handleMouseMove(event, qualificationsDiv);
            } else {
                resetTransform(qualificationsDiv);
            }
        });
    }
});