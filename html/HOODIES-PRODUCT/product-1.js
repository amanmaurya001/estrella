// Function to check and refresh JWT if needed (run on page load)
function checkAndRefreshJWT() {
  try {
    // Check if token exists in localStorage
    const token = localStorage.getItem('jwt_token');
    const tokenExpiry = localStorage.getItem('jwt_expiry');
    const currentTime = new Date().getTime();
    
    // If no token exists or token is expired, request a new one
    if (!token || !tokenExpiry || currentTime >= parseInt(tokenExpiry)) {
      console.log("Token missing or expired, requesting new token");
      
      // Request new token from server
      return fetch('https://backend-test-5iqp.onrender.com/api/get-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        if (!response.ok) throw new Error('Failed to get token');
        return response.json();
      })
      .then(data => {
        if (data.success && data.token) {
          // Store new token with expiry
          const expiryTime = new Date().getTime() + (10 * 60 * 1000); // Match server's 10m expiry
          localStorage.setItem('jwt_token', data.token);
          localStorage.setItem('jwt_expiry', expiryTime.toString());
          console.log("New token obtained and stored");
          return true;
        } else {
          throw new Error('Invalid token response');
        }
      });
    } else {
      console.log("Token is valid");
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error("JWT check/refresh error:", error);
    return Promise.reject(error);
  }
}

// Your original addToCart function with token verification added
function addToCart(productName, selectedSize) {
  // Optional: show a loading state or disable button
  console.log("Sending to backend:", productName, "Size:", selectedSize);
  
  // First check and refresh token if needed
  checkAndRefreshJWT()
    .then(() => {
      // Get the refreshed token from localStorage
      const token = localStorage.getItem('jwt_token');
      if (!token) {
        throw new Error("No JWT token found in localStorage");
      }
      
      return fetch('https://backend-test-5iqp.onrender.com/api/add-to-collection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Add the token here
        },
        body: JSON.stringify({ productName: productName, size: selectedSize })
      });
    })
    .then(response => {
      if (!response.ok) {
        // If unauthorized or forbidden (token issue), try one more refresh
        if (response.status === 401 || response.status === 403) {
          console.log("Token rejected by server, requesting new token");
          
          // Clear existing token
          localStorage.removeItem('jwt_token');
          localStorage.removeItem('jwt_expiry');
          
          // Alert user and suggest refresh
          alert("Your session has expired. Please refresh the page and try again.");
          throw new Error('Session expired');
        }
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      
      // Store data in localStorage if successful
      if (data.success && data.product) {
        // Format the product to match your cart structure
        const cartItem = {
          name: data.product.product_name || "Product Name",
          size: selectedSize || "Default", // Use selectedSize here
          price: data.product.product_price || 0,
          productCode: data.product.product_code || productName,
          img: data.product.product_imageurl || "default-image.jpg"
        };
        
        // Get existing cart
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Add new item to cart
        cart.push(cartItem);
        
        // Save updated cart
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count
        updateCartCount();
        
        // Optional: show confirmation to user
        console.log('Product added to cart');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Optional: show error message to user
    });
}

// Check for token validity when page loads
document.addEventListener('DOMContentLoaded', function() {
  checkAndRefreshJWT()
    .then(() => {
      console.log("Token check/refresh completed successfully");
    })
    .catch(error => {
      console.error("Failed to initialize token:", error);
      alert("There was a problem connecting to the server. Please refresh the page.");
    });
    
  // Rest of your DOMContentLoaded code...
});
























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

function toggleContent() {
  const content = document.getElementById('toggleContent1');
  
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
