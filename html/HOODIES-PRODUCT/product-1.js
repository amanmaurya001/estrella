function insertNavbar() {
  fetch('../../../html/women-html/navbar-supply.html') // Adjusted relative path
    .then(response => response.text()) // Get the response as text
    .then(data => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = data; 

      const navbar = tempDiv.querySelector('#navbar');
      
      if (navbar) {
        document.body.insertAdjacentElement('afterbegin', navbar);
      } else {
        console.warn('Navbar with ID "navbar" not found. Navbar not inserted.');
      }
    })
    .catch(error => {
      console.error('Error fetching navbar:', error);
    });
}

// Insert navbar when the page loads
window.onload = insertNavbar;

































var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4.5,
   loop:true,
    spaceBetween: 5,
    grabCursor: true,
    autoplay: {
        delay: 1200,
        disableOnInteraction: false,
      },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  var swiper = new Swiper(".mySwiper3", {
    cssMode: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
    mousewheel: true,
    keyboard: true,
  });




 function setupGsapAnimation() {
    // Check if screen width is less than 600px
    if (window.matchMedia("(max-width: 600px)").matches) {
        console.log("Animation disabled for screen width less than 600px");
        return; // Exit the function if the condition is met
    }

    const scrollableDiv = document.querySelector("#scrollableDiv");
    const productPics = scrollableDiv.querySelectorAll(".product-pics");
    const productCount = productPics.length;

    // Clean up previous ScrollTrigger instances
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Apply GSAP animation based on product count
    if (productCount === 5 || productCount === 6) {
        gsap.to("#scrollableDiv", {
            y: -1410,
            scrollTrigger: {
                trigger: "#block-main",
                scroller: "body",
                start: "top 6%",
                end: "top -70%",
                scrub: true,
                pin: true,
            }
        });
    } else if (productCount === 3 || productCount === 4) {
        gsap.to("#scrollableDiv", {
            y: -710,
            scrollTrigger: {
                trigger: "#block-main",
                scroller: "body",
                start: "top 6%",
                end: "top -70%",
                scrub: true,
                pin: true,
            }
        });
    } else {
        console.warn("Unsupported product count for animation:", productCount);
    }
}

// Call the function to initialize GSAP animation
setupGsapAnimation();

// Reapply GSAP animation if content dynamically changes
const observer = new MutationObserver(() => {
    setupGsapAnimation();
});
observer.observe(document.querySelector("#scrollableDiv"), { childList: true });

// Recheck animation setup on window resize
window.addEventListener("resize", setupGsapAnimation);




  
  let selectedSize = '';

  function updateSize(button, size) {
     

      // Remove 'selected' class from all buttons
      const buttons = document.querySelectorAll('.size-button');
      buttons.forEach(btn => btn.classList.remove('selected'));
  
      // Add 'selected' class to the clicked button
      button.classList.add('selected');
      
      // Update the displayed text and set selected size
    
      selectedSize = size;
  }




  function showCustomAlert(message) {
    // Check if an alert already exists, if not create one
    let alertBox = document.getElementById('customAlert');
    if (!alertBox) {
      alertBox = document.createElement('div');
      alertBox.id = 'customAlert';
      alertBox.style.position = 'fixed';
      alertBox.style.display = 'flex';
      alertBox.style.alignItems = 'center';
      alertBox.style.zIndex = '1000';
      alertBox.style.height = 'auto';
      alertBox.style.width = '300px';
      alertBox.style.left = '50%';
      alertBox.style.top = '12%';
      alertBox.style.transform = 'translate(-50%, 0)';
      alertBox.style.backgroundColor = 'black'; // Green background
      alertBox.style.borderRadius = '8px';
      alertBox.style.border = '1px solid silver'; // Darker green border
      alertBox.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
      alertBox.style.padding = '20px';
      alertBox.style.fontFamily = 'Arial, sans-serif';
      alertBox.style.color = '#ffffff'; // White text
      alertBox.style.textAlign = 'center';
      alertBox.style.fontSize = '16px';
      alertBox.style.display = 'none'; // Start hidden
      document.body.appendChild(alertBox);
  }


    // Set the message and show the alert
    alertBox.innerText = message;
    alertBox.style.display = 'flex';
    alertBox.style.opacity = '1';


    // Auto-hide after a few seconds
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000);
}

function addToCart(name, size, img, price, productCode) {
    // Check if size is selected
    if (!size) {
        showCustomAlert("Please select a size before adding to cart.");
        return; // Prevent adding to cart if no size is selected
    }

    // Create an item object including product code
    const item = { name, size, img, price, productCode };
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    showCustomAlert(`${name} added to cart!`);
}


function toggleContent() {
  const content = document.getElementById('toggleContent');
  
  // Toggle the "show" class
  content.classList.toggle('show');
}


function toggleContent1() {
  const content = document.getElementById('toggleContent1');
  
  // Toggle the "show" class
  content.classList.toggle('show');
}


function toggleContent2() {
  const content = document.getElementById('toggleContent2');
  
  // Toggle the "show" class
  content.classList.toggle('show');
}
function toggleContent4() {
  const content = document.getElementById('toggleContent4');
  
  // Toggle the "show" class
  content.classList.toggle('show');
}
function toggleContent5() {
  const content = document.getElementById('toggleContent5');
  
  // Toggle the "show" class
  content.classList.toggle('show');
}
function toggleContent6() {
  const content = document.getElementById('toggleContent6');
  
  // Toggle the "show" class
  content.classList.toggle('show');
}
function toggleContent7() {
  const content = document.getElementById('toggleContent7');
  
  // Toggle the "show" class
  content.classList.toggle('show');
}
function toggleContent8() {
  const content = document.getElementById('toggleContent8');
  
  // Toggle the "show" class
  content.classList.toggle('show');
}
function toggleContent9() {
  const content = document.getElementById('toggleContent9');
  
  // Toggle the "show" class
  content.classList.toggle('show');
}
function toggleContent10() {
  const content = document.getElementById('toggleContent10');
  
  // Toggle the "show" class
  content.classList.toggle('show');
}

let lastWidth = window.innerWidth;

window.addEventListener('resize', () => {
    const currentWidth = window.innerWidth;

    // Check if width crosses 600px
    if ((lastWidth <= 600 && currentWidth > 600) || (lastWidth > 600 && currentWidth <= 600)) {
        location.reload(); // Refresh the page
    }

    lastWidth = currentWidth; // Update lastWidth
});
