document.addEventListener('DOMContentLoaded', function() {
    var menuIcon = document.getElementById('menu-icon');
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('overlay');

    menuIcon.addEventListener('click', function() {
        if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        } else {
            sidebar.classList.add('active');
            overlay.classList.add('active');
        }
    });

    overlay.addEventListener('click', function() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
});

const texts = ['Welcome To My PortFolio', 'My name is Murali', 'I\'m Not A Pro Coder'];
let currentTextIndex = 0;
let currentCharIndex = 0;
const typingSpeed = 100; 
const erasingSpeed = 50; 
const delayBetweenTexts = 1000; 
const typingTextElement = document.getElementById('typingText');


function typeText() {
    const currentText = texts[currentTextIndex];

    
    typingTextElement.innerHTML += currentText[currentCharIndex];
    currentCharIndex++;

    
    if (currentCharIndex === currentText.length) {
        setTimeout(eraseText, delayBetweenTexts); 
    } else {
        setTimeout(typeText, typingSpeed); 
    }
}


function eraseText() {
    const currentText = texts[currentTextIndex];

    
    typingTextElement.innerHTML = currentText.substring(0, currentCharIndex - 1);
    currentCharIndex--;

    
    if (currentCharIndex === 0) {
        currentTextIndex = (currentTextIndex + 1) % texts.length;
        setTimeout(typeText, delayBetweenTexts); 
    } else {
        setTimeout(eraseText, erasingSpeed); 
    }
}


typeText();

        
function updateGreeting() {
    var kolkataOffset = 5.5 * 60;
    var currentTime = new Date();
    var utcTime = currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;
    var kolkataTime = new Date(utcTime + kolkataOffset * 60000);
    var hours = kolkataTime.getHours();

    var greetingMessage = "Hello, ";
    if (hours >= 5 && hours < 12) {
        greetingMessage += "Good Morning! ";
    } else if (hours >= 12 && hours < 16) {
        greetingMessage += "Good Afternoon! ";
    } else if (hours >= 16 && hours < 19) {
        greetingMessage += "Good Evening ! ";
    } else if (hours >= 20 && hours < 23) {
        greetingMessage += "I Hope Your Evening Was Wonderful !";
    } else if (hours >= 23 && hours < 5) {
        greetingMessage += "Glad To See You at this midnight !";
    } else {
        greetingMessage = "";
    }
    
    document.getElementById('greeting-text').textContent = greetingMessage;
}

updateGreeting();


const imageUrls = [
            
            "img/Neonboy1.png",
            "img/Neonboy2.png",
            "img/Neinboy3.png",
            "img/Neonboy4.png",
            "img/Neonboy5.png",
            "img/Murali2.png",
            "img/Murali3.png",
            "img/Murali4.png",
            
        ];
        const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
        document.getElementById("random-image").src = randomImageUrl;
