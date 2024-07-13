document.addEventListener('DOMContentLoaded', function () {
      setTimeout(function () {
        document.getElementById('loading-screen').style.opacity = 0;
        setTimeout(function () {
          document.getElementById('loading-screen').style.display = 'none';
          document.getElementById('main-content').classList.remove('hidden');
        }, 1000);
      }, 3000);
    });

    const imageUrls = [
            "Img/Murali1.png",
            "Img/Murali2.png",
            "Img/Murali3.jpg",
            "Img/Murali4.png",
            "Img/Murali5.png",
        ];
        const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
        document.getElementById("random-image").src = randomImageUrl;
  
    const profileText = document.getElementById('profile-text');
    const words = ['MURALI', 'Im Not A Pro Coder', '@itzNotCoder'];
    let currentWordIndex = 0;
    let currentCharacterIndex = 0;
    let isDeleting = false;
    

    function type() {
      const currentWord = words[currentWordIndex];
      if (isDeleting) {
        profileText.textContent = currentWord.substring(0, currentCharacterIndex - 1);
        currentCharacterIndex--;
        if (currentCharacterIndex === 0) {
          isDeleting = false;
          currentWordIndex = (currentWordIndex + 1) % words.length;
        }
      } else {
        profileText.textContent = currentWord.substring(0, currentCharacterIndex + 1);
        currentCharacterIndex++;
        if (currentCharacterIndex === currentWord.length) {
          isDeleting = true;
        }
      }
      setTimeout(type, isDeleting ? 100 : 250);
    }

    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(type, 3000);
    });

    const checkbox = document.getElementById('checkbox_toggle');
    checkbox.addEventListener('change', () => {
      document.body.classList.toggle('night-mode');
    });
   
  function createStar() {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.left = Math.random() * 100 + "vw";
      star.style.top = Math.random() * 100 + "vh";
      star.style.setProperty("--moveX1", Math.random() * 10 - 5);
      star.style.setProperty("--moveY1", Math.random() * 10 - 5);
      star.style.setProperty("--moveX2", Math.random() * 10 - 5);
      star.style.setProperty("--moveY2", Math.random() * 10 - 5);
      star.style.setProperty("--moveX3", Math.random() * 10 - 5);
      star.style.setProperty("--moveY3", Math.random() * 10 - 5);
      star.style.setProperty("--moveX4", Math.random() * 10 - 5);
      star.style.setProperty("--moveY4", Math.random() * 10 - 5);
      document.querySelector(".stars").appendChild(star);
    }

    for (let i = 0; i < 100; i++) {
      createStar();
    }


