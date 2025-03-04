// SCREEN LOADER

document.addEventListener("DOMContentLoaded", () => {
  const loadingElement = document.getElementById("loading");
  loadingElement.style.opacity = "0"; // Smooth fade-out

  setTimeout(() => {
    loadingElement.style.display = "none";
  }, 1000); // 1-second delay for fade-out
});


//////////////////////////////////
// MAKE NAVBAR STICK TO TOP

window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 0) { // Change 50 to adjust when it sticks
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});

//////////////////////////////////
// INSERT NAVBAR, FOOTER, AND MAIN BLOCKS
//////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
  // Function to load content from navbar-supply.html
  fetch('../navbar-supply.html')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(insertPageContent)
    .catch(error => {
      console.error('Error fetching navbar-supply.html:', error);
    });
});

function insertPageContent(data) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = data;

  // Insert Navbar
  const navbar = tempDiv.querySelector('#navbar');
  const headingDiv = document.getElementById('heading');
  if (headingDiv && navbar) {
    headingDiv.insertAdjacentElement('afterend', navbar);
  } else {
    console.warn('Element with ID "heading" not found. Navbar not inserted.');
  }

  // Insert Footer
  const footer = tempDiv.querySelector('#footer');
  if (footer) {
    document.body.appendChild(footer);
  } else {
    console.warn('Footer with ID "footer" not found. Footer not inserted.');
  }

  // Insert Main Blocks
  const mainBlockLeft = tempDiv.querySelector('#main-block-left');
  const hashtagsDiv = document.querySelector('#hashtags');
  if (hashtagsDiv && mainBlockLeft) {
    hashtagsDiv.insertAdjacentElement('afterend', mainBlockLeft);
    initializeFilters();  // Initialize filters independently
    initializeSorting();  // Initialize sorting independently
  } else {
    console.warn('Element not found:', !mainBlockLeft ? '#main-block-left' : '#hashtags');
  }
}

// Initialize filters after main content is inserted
function initializeFilters() {
  const checkboxes = document.querySelectorAll('.filter-checkbox, .filter-checkbox1, .filter-checkbox2, .filter-checkbox3, .filter-checkbox4, .filter-checkbox5');
  const productItems = document.querySelectorAll('.product-item');

  // Get selected filter values
  const getSelectedValues = (elements, attribute) =>
    Array.from(elements)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.getAttribute(attribute));

  // Apply filters
  function applyFilters() {
    const selectedCategories = [
      ...getSelectedValues(checkboxes, 'data-size'),
      ...getSelectedValues(checkboxes, 'data-pattern'),
      ...getSelectedValues(checkboxes, 'data-Sleeves'),
      ...getSelectedValues(checkboxes, 'data-material'),
      ...getSelectedValues(checkboxes, 'data-colour'),
      ...getSelectedValues(checkboxes, 'data-Price')
    ];

    productItems.forEach(item => {
      const itemCategories = [
        item.getAttribute('data-size'),
        item.getAttribute('data-pattern'),
        item.getAttribute('data-Sleeves'),
        item.getAttribute('data-material'),
        item.getAttribute('data-colour'),
        item.getAttribute('data-Price')
      ].filter(Boolean);

      const isVisible = selectedCategories.length === 0 || selectedCategories.some(cat => itemCategories.includes(cat));
      item.classList.toggle('hidden', !isVisible);
    });
  }

  // Apply filters initially
  applyFilters();
  // Attach event listeners for filtering
  checkboxes.forEach(checkbox => checkbox.addEventListener('change', applyFilters));
}

// Initialize sorting after main content is inserted
function initializeSorting() {
  const sortCheckboxes = document.querySelectorAll('.filter-checkbox5');
  const productItems = document.querySelectorAll('.product-item');
  const mainBlockRight = document.getElementById('main-block-right');

  // Get selected sorting criteria
  const getSelectedSorting = () =>
    Array.from(sortCheckboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.getAttribute('data-Price'));

  // Apply sorting
  function applySorting() {
    const selectedPrices = getSelectedSorting();
    const filteredProducts = Array.from(productItems).filter(item => {
      const itemPrice = parseInt(item.getAttribute('data-Price'), 10);
      return selectedPrices.length === 0 || selectedPrices.some(priceRange => {
        switch (priceRange) {
          case 'Price-Below-499': return itemPrice <= 499;
          case '500-999': return itemPrice >= 500 && itemPrice < 1000;
          case '1000-1499': return itemPrice >= 1000 && itemPrice < 1500;
          case '1500-1999': return itemPrice >= 1500 && itemPrice < 2000;
          case 'Above-2000': return itemPrice >= 2000;
          case 'Price-Low-to-High': return true;
          case 'Price-High-to-Low': return true;
          default: return false;
        }
      });
    });

    // Sorting by price
    if (selectedPrices.includes('Price-Low-to-High')) {
      filteredProducts.sort((a, b) => parseInt(a.getAttribute('data-Price')) - parseInt(b.getAttribute('data-Price')));
    } else if (selectedPrices.includes('Price-High-to-Low')) {
      filteredProducts.sort((a, b) => parseInt(b.getAttribute('data-Price')) - parseInt(a.getAttribute('data-Price')));
    }

    // Show sorted products
    productItems.forEach(item => item.classList.add('hidden'));
    filteredProducts.forEach(item => {
      item.classList.remove('hidden');
      mainBlockRight.appendChild(item);
    });
  }

  // Apply sorting initially
  applySorting();
  // Attach event listeners for sorting
  sortCheckboxes.forEach(checkbox => checkbox.addEventListener('change', applySorting));
}




 



//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
// SWIPERS


var swiper = new Swiper(".mySwiper", {
    slidesPerView: 9,
   
    spaceBetween: 5,
    loop:true,
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
  var swiper = new Swiper(".mySwiper1", {
    slidesPerView: 4.5,
   
    spaceBetween: 5,
    loop:true,
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




//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
// DROP DOWN


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
  function toggleContent11() {
    const content = document.getElementById('toggleContent11');
    
    // Toggle the "show" class
    content.classList.toggle('show');
  }
  function toggleContent12() {
    const content = document.getElementById('toggleContent12');
    
    // Toggle the "show" class
    content.classList.toggle('show');
  }
  //////////////////////////////////
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
// FILTERS DROP DOWN 

//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
// LITTLE BAR ON TOP
const messages = [
  "Free delivery over 1599",
  "Flat 300 discount over 2599",
  "10% discount over 4999"
];

let currentIndex = 0;
const messageElement = document.getElementById("message");

setInterval(() => {
  currentIndex = (currentIndex + 1) % messages.length;
  messageElement.textContent = messages[currentIndex];
}, 12000); // Change text every 4 seconds



