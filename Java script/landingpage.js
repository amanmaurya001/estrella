// Add this to your frontend JavaScript (e.g., in landingpage.js or create a new auth.js file)

// Function to get JWT token (should be called when page loads)
async function getJWTToken() {
  try {
    // Check if we already have a valid token in localStorage
    const storedToken = localStorage.getItem('jwt_token');
    const tokenExpiry = localStorage.getItem('jwt_expiry');
    
    // If token exists and is not expired, use it
    if (storedToken && tokenExpiry && new Date().getTime() < parseInt(tokenExpiry)) {
      return storedToken;
    }
    
    // If no token or expired, request a new one
    const response = await fetch('https://backend-test-5iqp.onrender.com/api/get-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    const data = await response.json();
    
    if (response.ok && data.success) {
      // Store token and set expiry (1 hour from now)
      const expiryTime = new Date().getTime() + (60 * 60 * 1000); // 1 hour in milliseconds
      localStorage.setItem('jwt_token', data.token);
      localStorage.setItem('jwt_expiry', expiryTime.toString());
      return data.token;
    } else {
      console.error('Failed to get token:', data.message);
      return null;
    }
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
}

// Fetch wrapper with JWT authentication
async function authenticatedFetch(url, options = {}) {
  try {
    const token = await getJWTToken();
    
    if (!token) {
      throw new Error('Failed to obtain authentication token');
    }
    
    // Merge the Authorization header with existing options
    const authOptions = {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`
      }
    };
    
    const response = await fetch(url, authOptions);
    
    // Handle rate limit (429 Too Many Requests)
    if (response.status === 429) {
      // Get retry time from header if available
      const retryAfter = response.headers.get('Retry-After') || '60';
      const waitTime = parseInt(retryAfter) || 60;
      const minutes = Math.ceil(waitTime / 60);
      
      throw new Error(`Rate limit reached. Please try again in ${minutes} minute${minutes > 1 ? 's' : ''}.`);
    }
    
    // If the response status is 401 or 403, the token might be invalid
    // We could implement token refresh logic here
    if (response.status === 401 || response.status === 403) {
      // Clear stored token
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('jwt_expiry');
      
      // Try to get a new token and retry the request once
      const newToken = await getJWTToken();
      if (newToken) {
        authOptions.headers['Authorization'] = `Bearer ${newToken}`;
        return fetch(url, authOptions);
      }
    }
    
    return response;
  } catch (error) {
    console.error('Authenticated fetch error:', error);
    throw error;
  }
}

// Initialize JWT when page loads
document.addEventListener('DOMContentLoaded', function() {
  getJWTToken()
    .then(token => {
      if (token) {
        console.log('Authentication initialized successfully');
      } else {
        console.error('Failed to initialize authentication');
      }
    })
    .catch(err => console.error('Authentication initialization error:', err));
    
  // Rest of your DOMContentLoaded code...
});

// Modified newsletter subscription code using the authenticated fetch
document.addEventListener('DOMContentLoaded', function() {
  // Get the form element (looking for the first form on the page)
  const form = document.querySelector('form');
  
  // Get the input element (looking for email input)
  const emailInput = document.querySelector('input[type="email"]');
  
  // Get or create message element
  let messageElement = document.getElementById('message');
  if (!messageElement) {
      // If message element doesn't exist, create one
      messageElement = document.createElement('p');
      messageElement.id = 'message';
      // Insert after the form
      form.parentNode.insertBefore(messageElement, form.nextSibling);
  }
  
  // Get the submit button
  const submitButton = document.querySelector('button');
  
  // Add submit event listener to the form
  form.addEventListener('submit', async function(e) {
      // Prevent the default form submission
      e.preventDefault();
      
      // Validate email
      const email = emailInput.value.trim();
      if (!email) {
          messageElement.textContent = 'Please enter an email address';
          messageElement.style.color = 'red';
          return;
      }
      
      // Disable button and show loading state
      submitButton.disabled = true;
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = 'Submitting...';
      
      try {
          // Send the data to your backend using the authenticated fetch
          const response = await authenticatedFetch('https://backend-test-5iqp.onrender.com/api/subscribe', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email }),
          });
          
          // Parse the JSON response
          const data = await response.json();
          
          // Handle the response
          if (response.ok) {
              messageElement.textContent = data.message || 'Successfully subscribed!';
              messageElement.style.color = 'green';
              emailInput.value = ''; // Clear the input field
          } else {
              messageElement.textContent = data.error || 'An error occurred';
              messageElement.style.color = 'red';
          }
      } catch (error) {
          // This will now handle network errors AND rate limit errors
          messageElement.textContent = error.message || 'Server error. Please try again later.';
          messageElement.style.color = 'red';
      } finally {
          // Reset button state
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
      }
  });
});




































window.addEventListener("scroll", function () {
  let navbar = document.getElementById("navbar");
  if (window.scrollY > 0) { // Change 50 to adjust when it sticks
      navbar.classList.add("sticky");
  } else {
      navbar.classList.remove("sticky");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const cartCountSpan = document.getElementById("cart-count");
  const cartCount = localStorage.getItem("cartCount") || 0;
  cartCountSpan.textContent = cartCount;
});





var swiper = new Swiper("#xxxx", {
  slidesPerView: 2,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
 
  breakpoints: {
    320: {
      slidesPerView: 1, // Change to 1 slide when screen width is between 320px and 450px
      spaceBetween: 20,
    },
    451: {
      slidesPerView: 2, // Default setting when above 450px
      spaceBetween: 30,
    },
  },
});





var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4.5,
   
    spaceBetween: 5,
    grabCursor: true,
    autoplay: {
      delay: 6500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  var swiper = new Swiper(".mySwiper1", {
    slidesPerView: 2.5,
   
    spaceBetween: 5,
    grabCursor: true,
    autoplay: {
      delay: 6500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });


  var swiper = new Swiper(".swiper1", {
    spaceBetween: 0,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  
  });
  
  var swiper = new Swiper(".swiper2", {
    spaceBetween: 0,
    centeredSlides: true,
    autoplay: {
      delay: 32222222222500,
      disableOnInteraction: false,
    },
  
  });
  var swiper = new Swiper(".swiper3", {
    spaceBetween: 0,
    centeredSlides: true,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },
  
  });
  function toggleContent4() {
    const content = document.getElementById('toggleContent4');
    
    // Toggle the "show" class
    content.classList.toggle('show');
  }
  // Close the menu when clicking outside of the toggle content or the hamburger menu
document.addEventListener('click', function(event) {
  const content = document.getElementById('toggleContent4');
  const menuButton = document.getElementById('mobile-navbar-img');
  
  // If the click is outside the menu or the hamburger icon, hide the menu
  if (!menuButton.contains(event.target) && !content.contains(event.target)) {
      content.classList.remove('show');
  }
});
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





  


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//////////////////     G S A P SECTION      ///////////////////////////////////////




gsap.fromTo("#block10-up h3", 
  {
    opacity: 0, // Start as invisible
    y: 50, // Start 50px below its original position
  }, 
  {
    opacity: 1, // Fade in to full opacity
    y: 0, // Move to its original position (0px offset)
    duration: 1, // Animation duration (time in seconds, adjust as needed)
    scrollTrigger: {
      trigger: "#block10-up", // Element that triggers the animation
      scroller: "body", // The scroll container (body)
      start: "top 95%", // Trigger when the top of the element reaches 95% of the viewport height
     
      once: true, // Ensure the animation happens once when the trigger point is passed
    }
  }
);
gsap.fromTo("#block10-mid-product-img img", 
  {
    scale: 1.1, // Initial zoomed-in state (slightly zoomed in)
  }, 
  {
    scale: 1, // Final state (original size)
    duration: 2, // Animation duration (time in seconds, adjust as needed)
    scrollTrigger: {
      trigger: "#block10-up", // Element that triggers the animation
      scroller: "body", // The scroll container (body)
      start: "top 70%", // Trigger when the top of the element reaches 20% of the viewport height
     
      once: true, // Ensure the animation happens once when the trigger point is passed
    }
  }
);





// Check if the screen width is 360px or smaller
if (window.matchMedia("(max-width: 360px)").matches) {
  // Animation for #block10-mid-product-img img
  gsap.fromTo("#block10-mid-product-img img", 
    {
      scale: 1.1, // Initial zoomed-in state (slightly zoomed in)
    }, 
    {
      scale: 1, // Final state (original size)
      duration: 2, // Animation duration (time in seconds, adjust as needed)
      scrollTrigger: {
        trigger: "#block10-up", // Element that triggers the animation
        scroller: "body", // The scroll container (body)
        start: "top 70%", // Trigger when the top of the element reaches 20% of the viewport height
       // Show markers for debugging
        once: true, // Ensure the animation happens once when the trigger point is passed
      }
    }
  );

 

 
  // Animation for #block10-up h3
  gsap.fromTo("#block10-up h3", 
    {
      opacity: 0, // Start as invisible
      y: 50, // Start 50px below its original position
    }, 
    {
      opacity: 1, // Fade in to full opacity
      y: 0, // Move to its original position (0px offset)
      duration: 1, // Animation duration (time in seconds, adjust as needed)
      scrollTrigger: {
        trigger: "#block10-up", // Element that triggers the animation
        scroller: "body", // The scroll container (body)
        start: "top 95%", // Trigger when the top of the element reaches 95% of the viewport height
    // Show markers for debugging
        once: true, // Ensure the animation happens once when the trigger point is passed
      }
    }
  );

  
}
