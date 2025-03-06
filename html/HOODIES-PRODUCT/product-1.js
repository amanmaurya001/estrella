window.addEventListener("scroll", function () {
  let navbar = document.getElementById("navbar");
  if (window.scrollY > 0) { // Change 50 to adjust when it sticks
      navbar.classList.add("sticky");
  } else {
      navbar.classList.remove("sticky");
  }
});
// Elegant page transition with fade-out effect
// SCREEN LOADER

document.addEventListener("DOMContentLoaded", () => {
  const loadingElement = document.getElementById("loading");
  loadingElement.style.opacity = "0"; // Smooth fade-out

  setTimeout(() => {
    loadingElement.style.display = "none";
  }, 1000); // 1-second delay for fade-out
});


async function fetchHtmlComponent(filePath) {
  try {
      const response = await fetch(filePath);
      const data = await response.text();
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = data;
      return tempDiv;
  } catch (error) {
      console.error(`Error fetching ${filePath}:`, error);
      return null;
  }
}

async function insertNavbarAndFooter() {
  const filePath = 'navbar-supply-product.html';
  const tempDiv = await fetchHtmlComponent(filePath);

  if (tempDiv) {
      const navbar = tempDiv.querySelector('#navbar');
      const footer = tempDiv.querySelector('#footer');

      if (navbar) {
          document.body.insertAdjacentElement('afterbegin', navbar);
          updateCartCount(); // Update the cart count after inserting the navbar
      } else {
          console.warn('Navbar with ID "navbar" not found. Navbar not inserted.');
      }

      if (footer) {
          document.body.insertAdjacentElement('beforeend', footer);
      } else {
          console.warn('Footer with ID "footer" not found. Footer not inserted.');
      }
  }
}

window.onload = insertNavbarAndFooter;

function updateCartCount() {
  const cartCountSpan = document.getElementById("cart-count");
  const cartCount = localStorage.getItem("cartCount") || 0;
  cartCountSpan.textContent = cartCount;
}



























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
  if (!size) {
      showCustomAlert("Please select a size before adding to cart.");
      return;
  }

  const item = { name, size, img, price, productCode };
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  showCustomAlert(`${name} added to cart!`);

  // Update the cart count in local storage
  const cartCount = cart.length;
  localStorage.setItem("cartCount", cartCount);

  // Update the cart count element on the page
  const cartCountSpan = document.getElementById("cart-count");
  if (cartCountSpan) {
      cartCountSpan.textContent = cartCount;
  }
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
