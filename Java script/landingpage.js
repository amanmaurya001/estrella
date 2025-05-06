///////////////////////////////////////////////////////////////////////////////////
//                             AUTHENTICATION SETUP                              //
///////////////////////////////////////////////////////////////////////////////////

// Get JWT token from localStorage or fetch a new one
async function getJWTToken() {
  try {
    const storedToken = localStorage.getItem('jwt_token');
    const tokenExpiry = localStorage.getItem('jwt_expiry');

    if (storedToken && tokenExpiry && new Date().getTime() < parseInt(tokenExpiry)) {
      return storedToken;
    }

    const response = await fetch('https://backend-test-5iqp.onrender.com/api/get-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();

    if (response.ok && data.success) {
      const expiryTime = new Date().getTime() + (60 * 60 * 1000); // 1 hour
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

// Authenticated fetch wrapper
async function authenticatedFetch(url, options = {}) {
  try {
    let token = await getJWTToken();
    if (!token) throw new Error('Failed to obtain authentication token');

    const authOptions = {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`
      }
    };

    const response = await fetch(url, authOptions);

    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After') || '60';
      const waitTime = parseInt(retryAfter);
      throw new Error(`Rate limit reached. Try again in ${Math.ceil(waitTime / 60)} minute(s).`);
    }

    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('jwt_expiry');
      token = await getJWTToken();
      if (token) {
        authOptions.headers['Authorization'] = `Bearer ${token}`;
        return fetch(url, authOptions);
      }
    }

    return response;
  } catch (error) {
    console.error('Authenticated fetch error:', error);
    throw error;
  }
}

// Initialize JWT on page load
document.addEventListener('DOMContentLoaded', () => {
  getJWTToken()
    .then(token => {
      if (token) console.log('Authentication initialized');
      else console.error('Token initialization failed');
    });
});

///////////////////////////////////////////////////////////////////////////////////
//                          NEWSLETTER SUBSCRIPTION FORM                         //
///////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const emailInput = document.querySelector('input[type="email"]');
  const submitButton = document.querySelector('button');

  let messageElement = document.getElementById('message');
  if (!messageElement) {
    messageElement = document.createElement('p');
    messageElement.id = 'message';
    form.parentNode.insertBefore(messageElement, form.nextSibling);
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    if (!email) {
      messageElement.textContent = 'Please enter an email address';
      messageElement.style.color = 'red';
      return;
    }

    submitButton.disabled = true;
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';

    try {
      const response = await authenticatedFetch('https://backend-test-5iqp.onrender.com/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        messageElement.textContent = data.message || 'Successfully subscribed!';
        messageElement.style.color = 'green';
        emailInput.value = '';
      } else {
        messageElement.textContent = data.error || 'An error occurred';
        messageElement.style.color = 'red';
      }
    } catch (error) {
      messageElement.textContent = error.message || 'Server error. Please try again later.';
      messageElement.style.color = 'red';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
});

///////////////////////////////////////////////////////////////////////////////////
//                              NAVBAR SCROLL STICKY                             //
///////////////////////////////////////////////////////////////////////////////////

window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  navbar.classList.toggle("sticky", window.scrollY > 0);
});

///////////////////////////////////////////////////////////////////////////////////
//                              CART COUNT DISPLAY                               //
///////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  const cartCountSpan = document.getElementById("cart-count");
  const cartCount = localStorage.getItem("cartCount") || 0;
  cartCountSpan.textContent = cartCount;
});
///////////////////////////////////////////////////////////////////////////////////
//                            SWIPER CAROUSEL SETUP                              //
///////////////////////////////////////////////////////////////////////////////////

new Swiper("#xxxx", {
  slidesPerView: 2,
  spaceBetween: 30,
  loop: true,
  autoplay: { delay: 2000, disableOnInteraction: false },
  breakpoints: {
    320: { slidesPerView: 1, spaceBetween: 20 },
    451: { slidesPerView: 2, spaceBetween: 30 }
  }
});

new Swiper(".mySwiper", {
  slidesPerView: 4.5,
  spaceBetween: 5,
  grabCursor: true,
  autoplay: { delay: 6500, disableOnInteraction: false },
  pagination: { el: ".swiper-pagination", clickable: true }
});

new Swiper(".mySwiper1", {
  slidesPerView: 2.5,
  spaceBetween: 5,
  grabCursor: true,
  autoplay: { delay: 6500, disableOnInteraction: false },
  pagination: { el: ".swiper-pagination", clickable: true }
});

new Swiper(".swiper1", {
  spaceBetween: 0,
  centeredSlides: true,
  autoplay: { delay: 2500, disableOnInteraction: false }
});

new Swiper(".swiper2", {
  spaceBetween: 0,
  centeredSlides: true,
  autoplay: { delay: 32222222222500, disableOnInteraction: false }
});

new Swiper(".swiper3", {
  spaceBetween: 0,
  centeredSlides: true,
  autoplay: { delay: 4500, disableOnInteraction: false }
});


///////////////////////////////////////////////////////////////////////////////////
//                            MOBILE MENU TOGGLE                                 //
///////////////////////////////////////////////////////////////////////////////////



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
//                                GSAP ANIMATIONS                                //
///////////////////////////////////////////////////////////////////////////////////

gsap.fromTo("#block10-up h3", 
  { opacity: 0, y: 50 },
  {
    opacity: 1, y: 0, duration: 1,
    scrollTrigger: {
      trigger: "#block10-up",
      scroller: "body",
      start: "top 95%",
      once: true
    }
  }
);

gsap.fromTo("#block10-mid-product-img img",
  { scale: 1.1 },
  {
    scale: 1, duration: 2,
    scrollTrigger: {
      trigger: "#block10-up",
      scroller: "body",
      start: "top 70%",
      once: true
    }
  }
);

// Mobile-specific animations
if (window.matchMedia("(max-width: 360px)").matches) {
  gsap.fromTo("#block10-mid-product-img img", { scale: 1.1 }, {
    scale: 1, duration: 2,
    scrollTrigger: {
      trigger: "#block10-up",
      scroller: "body",
      start: "top 70%",
      once: true
    }
  });

  gsap.fromTo("#block10-up h3", { opacity: 0, y: 50 }, {
    opacity: 1, y: 0, duration: 1,
    scrollTrigger: {
      trigger: "#block10-up",
      scroller: "body",
      start: "top 95%",
      once: true
    }
  });
}
