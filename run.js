var gradientColorsArray = new Array(
    "#081b29",
    "#081b29",
    "#0c3c24",
    "#3c0a4d",
    "#003300",
    "#081b29",
    "#3a1f5e", 
    "#2f4f4f",
    "#081b29",
    "#000080",
    "#081b29",
    "#4b0082",
    "#081b29",
);

// Finnally Fixed Colour Changing Background animation 

var gradientTransitionStep = 0;


var gradientColorIndices = [0, 1, 2, 3];


var gradientTransitionSpeed = 0.004;

function updateGradientBackground() {
    if (typeof jQuery === 'undefined') return; 

    
    var currentLeftColorIndex = gradientColorIndices[0];
    var nextLeftColorIndex = gradientColorIndices[1];
    var currentRightColorIndex = gradientColorIndices[2];
    var nextRightColorIndex = gradientColorIndices[3];

    var currentLeftColorHex = gradientColorsArray[currentLeftColorIndex];
    var nextLeftColorHex = gradientColorsArray[nextLeftColorIndex];
    var currentRightColorHex = gradientColorsArray[currentRightColorIndex];
    var nextRightColorHex = gradientColorsArray[nextRightColorIndex];

    var inverseGradientStep = 1 - gradientTransitionStep;

    function hexToRgb(hex) {
        var r = parseInt(hex.slice(1, 3), 16);
        var g = parseInt(hex.slice(3, 5), 16);
        var b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b];
    }

    var [rLeftStart, gLeftStart, bLeftStart] = hexToRgb(currentLeftColorHex);
    var [rLeftEnd, gLeftEnd, bLeftEnd] = hexToRgb(nextLeftColorHex);
    var [rRightStart, gRightStart, bRightStart] = hexToRgb(currentRightColorHex);
    var [rRightEnd, gRightEnd, bRightEnd] = hexToRgb(nextRightColorHex);

    var redLeft = Math.round(inverseGradientStep * rLeftStart + gradientTransitionStep * rLeftEnd);
    var greenLeft = Math.round(inverseGradientStep * gLeftStart + gradientTransitionStep * gLeftEnd);
    var blueLeft = Math.round(inverseGradientStep * bLeftStart + gradientTransitionStep * bLeftEnd);
    var leftGradientColor = "rgb(" + redLeft + "," + greenLeft + "," + blueLeft + ")";

    var redRight = Math.round(inverseGradientStep * rRightStart + gradientTransitionStep * rRightEnd);
    var greenRight = Math.round(inverseGradientStep * gRightStart + gradientTransitionStep * gRightEnd);
    var blueRight = Math.round(inverseGradientStep * bRightStart + gradientTransitionStep * bRightEnd);
    var rightGradientColor = "rgb(" + redRight + "," + greenRight + "," + blueRight + ")";

    
    $('#gradient').css({
        background: "-webkit-gradient(linear, left top, right top, from(" + leftGradientColor + "), to(" + rightGradientColor + "))"
    }).css({
        background: "-moz-linear-gradient(left, " + leftGradientColor + " 0%, " + rightGradientColor + " 100%)"
    });

    gradientTransitionStep += gradientTransitionSpeed;
    if (gradientTransitionStep >= 1) {
        gradientTransitionStep %= 1;
        gradientColorIndices[0] = gradientColorIndices[1];
        gradientColorIndices[2] = gradientColorIndices[3];

        gradientColorIndices[1] = (gradientColorIndices[1] + Math.floor(1 + Math.random() * (gradientColorsArray.length - 1))) % gradientColorsArray.length;
        gradientColorIndices[3] = (gradientColorIndices[3] + Math.floor(1 + Math.random() * (gradientColorsArray.length - 1))) % gradientColorsArray.length;
    }
}


setInterval(updateGradientBackground, 10); // It Means 10 milliseconds 


var typed = new Typed('#element', {
    strings: ['Murali'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

var typed = new Typed('#elementTwo', {
    strings: ['Im A Simple Python Bot Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

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
            "Img/Murali1.png",
            "Img/Murali2.png",
            "Img/Murali3.png",
            "Img/Murali4.png",
            
        ];
        const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
        document.getElementById("random-image").src = randomImageUrl;
