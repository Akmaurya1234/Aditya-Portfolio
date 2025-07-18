// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
}

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      // active navbar links
      navLinks.forEach(links => {
        links.classList.remove('active');
        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
      });
      // active sections for animation on scroll
      sec.classList.add('show-animate');
    }
    // if want to animation that repeats on scroll use this
    else {
      sec.classList.remove('show-animate');
    }
  });

  // sticky navbar
  let header = document.querySelector('header');

  header.classList.toggle('sticky', window.scrollY > 100);

  // remove toggle icon and navbar when click navbar links (scroll)
  //menuIcon.classList.remove('bx-x');
//  navbar.classList.remove('active');

  // animation footer on scroll
  let footer = document.querySelector('footer');

  footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
}

document.addEventListener('DOMContentLoaded', () => {
  const toggleIcon = document.querySelector('.toggle-details-icon');
  const extraDetails = document.querySelector('.extra-details');

  if (toggleIcon && extraDetails) {
    toggleIcon.addEventListener('click', () => {
      const isVisible = extraDetails.style.display === 'block';

      // Toggle visibility
      extraDetails.style.display = isVisible ? 'none' : 'block';

      // Toggle icon class
      toggleIcon.classList.toggle('bx-chevron-down', isVisible);
      toggleIcon.classList.toggle('bx-chevron-up', !isVisible);
    });
  }
});


// stars

const starContainer = document.getElementById('stars');

for (let i = 0; i < 300; i++) {
  const star = document.createElement('div');
  star.classList.add('star');

  // Random position
  star.style.top = Math.random() * 100 + '%';
  star.style.left = Math.random() * 100 + '%';

  // Random delay and duration
  star.style.animationDuration = (Math.random() * 3 + 1) + 's';
  star.style.animationDelay = Math.random() * 5 + 's';

  starContainer.appendChild(star);
}


/* dark mode script

let darkModeIcon = document.querySelector('#darkMode-Icon');

darkModeIcon.onclick = () => {
  darkModeIcon.classList.toggle('bx-sun');
  document.body.classList.toggle('dark-mode');
}
*/

const themeToggle = document.getElementById('themeToggle');
const themeMenu = document.getElementById('themeMenu');
const themeItems = document.querySelectorAll('#themeMenu li');
const dotContainer = document.getElementById('dotContainer');

// By default, mark one theme as active on load
window.addEventListener('DOMContentLoaded', () => {
    // Check if any theme is saved (e.g. from localStorage if you wish)
    // Else default to first theme (light)
    const activeTheme = document.body.className || "theme-default";
    
    themeItems.forEach(item => {
        if (item.getAttribute('data-theme') === activeTheme) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});

themeToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = themeMenu.classList.toggle('show');
    dotContainer.classList.toggle('dots-expanded', isOpen);
});

document.addEventListener('click', () => {
    themeMenu.classList.remove('show');
    dotContainer.classList.remove('dots-expanded');
});

themeItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active from all items
        themeItems.forEach(li => li.classList.remove('active'));
        
        // Add active to the clicked item
        item.classList.add('active');

        // Change theme
        const selectedTheme = item.getAttribute('data-theme');
        document.body.className = selectedTheme;

        // Optionally save selected theme to localStorage:
        // localStorage.setItem("selectedTheme", selectedTheme);

        // Close dropdown
        themeMenu.classList.remove('show');
        dotContainer.classList.remove('dots-expanded');
    });
});


// + icon script

let isOpen = false;
const circle = document.getElementById("circle");
const iconss = circle.querySelectorAll(".icons");
const toggleIcon = document.getElementById("toggleIcon");

function toggleCircle() {
  if (!isOpen) {
    toggleIcon.classList.replace("bx-plus", "bx-x");
    circle.style.display = "block";

    iconss.forEach((icon, i) => {
      setTimeout(() => {
        icon.classList.add("show");
        if (i === iconss.length - 1) {
          setTimeout(() => {
            circle.classList.add("spin");
          }, 400);
        }
      }, i * 250);
    });

    isOpen = true;
  } else {
    toggleIcon.classList.replace("bx-x", "bx-plus");
    iconss.forEach(icon => icon.classList.remove("show"));
    circle.classList.remove("spin");
    setTimeout(() => {
      circle.style.display = "none";
    }, 500);
    isOpen = false;
  }
}

// Pause spin when hovering any icon
iconss.forEach(icons => {
  icons.addEventListener("mouseenter", () => {
    circle.style.animationPlayState = "paused";
  });
  icons.addEventListener("mouseleave", () => {
    circle.style.animationPlayState = "running";
  });
});


// project script

document.addEventListener("DOMContentLoaded", () => {
  const scrollArea = document.getElementById("scrollArea");
  const dots = document.querySelectorAll(".dot");
  const leftBtn = document.querySelector(".scroll-btn.left");
  const rightBtn = document.querySelector(".scroll-btn.right");
  const tiles = scrollArea.querySelectorAll(".project-tile");

  let currentIndex = 0;
  let autoScrollInterval;

  function updateDots(index) {
    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[index]) dots[index].classList.add("active");
  }

  function scrollToIndex(index) {
    const tile = scrollArea.querySelector(".project-tile");
    if (!tile) return;
    const tileWidth = tile.offsetWidth + 20;
    scrollArea.scrollTo({
      left: index * tileWidth,
      behavior: "smooth"
    });
    updateDots(index);
  }

  function startAutoScroll() {
    if (window.innerWidth <= 768) {
      clearInterval(autoScrollInterval);
      autoScrollInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % tiles.length;
        scrollToIndex(currentIndex);
      }, 4000);
    }
  }

  leftBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + tiles.length) % tiles.length;
    scrollToIndex(currentIndex);
    restartAutoScroll();
  });

  rightBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % tiles.length;
    scrollToIndex(currentIndex);
    restartAutoScroll();
  });

  scrollArea.addEventListener("scroll", () => {
    const tile = scrollArea.querySelector(".project-tile");
    if (!tile) return;
    const tileWidth = tile.offsetWidth + 20;
    const newIndex = Math.round(scrollArea.scrollLeft / tileWidth);
    if (newIndex !== currentIndex) {
      currentIndex = newIndex;
      updateDots(currentIndex);
    }
  });

  function restartAutoScroll() {
    clearInterval(autoScrollInterval);
    startAutoScroll();
  }

  // tilt effect
  tiles.forEach(tile => {
    tile.addEventListener('mousemove', (e) => {
      const rect = tile.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * 10;

      tile.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });

    tile.addEventListener('mouseleave', () => {
      tile.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  });

  startAutoScroll();
});


// Slill Awards script

document.addEventListener("DOMContentLoaded", () => {
  const certificateSection = document.querySelector(".certificate");
  if (!certificateSection) return;

  const scrollArea = certificateSection.querySelector("#scrlArea");
  const dots = certificateSection.querySelectorAll(".cer-dot");
  const leftBtn = certificateSection.querySelector(".scrl-btn.left");
  const rightBtn = certificateSection.querySelector(".scrl-btn.right");
  const tiles = scrollArea.querySelectorAll(".cer-tile");

  let currentIndex = 0;
  let autoScrollInterval;

  function updateDots(index) {
    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[index]) dots[index].classList.add("active");
  }

  function scrollToIndex(index) {
    const tile = scrollArea.querySelector(".cer-tile");
    if (!tile) return;
    const tileWidth = tile.offsetWidth + 20;
    scrollArea.scrollTo({
      left: index * tileWidth,
      behavior: "smooth"
    });
    updateDots(index);
  }

  function startAutoScroll() {
    if (window.innerWidth <= 768) {
      clearInterval(autoScrollInterval);
      autoScrollInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % tiles.length;
        scrollToIndex(currentIndex);
      }, 4000);
    }
  }

  leftBtn?.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + tiles.length) % tiles.length;
    scrollToIndex(currentIndex);
    restartAutoScroll();
  });

  rightBtn?.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % tiles.length;
    scrollToIndex(currentIndex);
    restartAutoScroll();
  });

  scrollArea?.addEventListener("scroll", () => {
    const tile = scrollArea.querySelector(".cer-tile");
    if (!tile) return;
    const tileWidth = tile.offsetWidth + 20;
    const newIndex = Math.round(scrollArea.scrollLeft / tileWidth);
    if (newIndex !== currentIndex) {
      currentIndex = newIndex;
      updateDots(currentIndex);
    }
  });

  function restartAutoScroll() {
    clearInterval(autoScrollInterval);
    startAutoScroll();
  }

  // tilt effect
  tiles.forEach(tile => {
    tile.addEventListener('mousemove', (e) => {
      const rect = tile.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * 10;

      tile.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });

    tile.addEventListener('mouseleave', () => {
      tile.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  });

  startAutoScroll();
});





//skills animation

const animationIntervals = new Map();
function getPositions() {
  const width = window.innerWidth;

  if (width <= 480) {
    return [
      { left: '10%', top: '4%' },
      { left: '55%', top: '4%' },
      { left: '55%', top: '54%' },
      { left: '10%', top: '54%' },
      { left: '32%', top: '28%' }
    ];
  } else if (width <= 768) {
    return [
      { left: '12%', top: '5%' },
      { left: '62%', top: '5%' },
      { left: '62%', top: '55%' },
      { left: '12%', top: '55%' },
      { left: '37%', top: '30%' }
    ];
  } else {
    return [
      { left: '12%', top: '8%' },
      { left: '62%', top: '8%' },
      { left: '62%', top: '58%' },
      { left: '12%', top: '58%' },
      { left: '37%', top: '33%' }
    ];
  }
}

function applyAnimation(column) {
  const cards = column.querySelectorAll('.skill-card');
  const positions = getPositions();

  cards.forEach((card, i) => {
    card.style.left = positions[i].left;
    card.style.top = positions[i].top;
    card.style.position = 'absolute';
    card.style.transition = 'left .7s ease, top .7s ease';
  });

  if (animationIntervals.has(column)) {
    clearInterval(animationIntervals.get(column));
  }

  const interval = setInterval(() => {
    const current = Array.from(cards).map(card => ({
      left: card.style.left,
      top: card.style.top
    }));

    cards.forEach((card, i) => {
      const next = (i + 1) % cards.length;
      card.style.left = current[next].left;
      card.style.top = current[next].top;
    });
  }, 3000);

  animationIntervals.set(column, interval);
}

// Apply on load
document.querySelectorAll('.skills-content').forEach(applyAnimation);

// Reapply on resize
window.addEventListener('resize', () => {
  document.querySelectorAll('.skills-content').forEach(applyAnimation);
});

document.querySelectorAll('.skills-content').forEach((column) => {
  const cards = column.querySelectorAll('.skill-card');

  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      // Pause the animation
      if (animationIntervals.has(column)) {
        clearInterval(animationIntervals.get(column));
      }
    });

    card.addEventListener('mouseleave', () => {
      // Resume the animation
      applyAnimation(column);
    });
  });
});


//thank you popup script
//Minimal JavaScript to handle submission 
const form = document.getElementById('contactForm');
const popup = document.getElementById('thankYouPopup');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const recaptchaResponse = grecaptcha.getResponse();
  if (recaptchaResponse === "") {
    alert("Please complete the reCAPTCHA.");
    return;
  }

  const formData = new FormData(form);

  // Do not include the reCAPTCHA token in the email
  formData.delete("g-recaptcha-response");

  fetch("https://formsubmit.co/ajax/adityamaurya4963@gmail.com", {
    method: "POST",
    body: formData
  })
    .then(response => {
      if (response.ok) {
        form.reset();
        grecaptcha.reset();
        popup.style.display = "flex";
      } else {
        alert("Message failed to send. Please try again.");
      }
    })
    .catch(error => {
      alert("Error: " + error.message);
    });
});




