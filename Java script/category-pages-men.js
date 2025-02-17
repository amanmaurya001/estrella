window.addEventListener("scroll", function () {
  let navbar = document.getElementById("navbar");
  if (window.scrollY > 50) { // Change 50 to adjust when it sticks
      navbar.classList.add("sticky");
  } else {
      navbar.classList.remove("sticky");
  }
});

// Function to load the navbar content from navbar-supply.html
function insertNavbar() {
  fetch('../women-html/navbar-supply.html') // Fetch the navbar content
    .then(response => response.text()) // Get the response as text
    .then(data => {
      // Create a temporary container to hold the HTML content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = data; // Insert the fetched HTML into the temporary div

      // Find the navbar by ID in the loaded content
      const navbar = tempDiv.querySelector('#navbar');
      
      // If the navbar exists, insert it after the <div id="heading">
      if (navbar) {
        const headingDiv = document.getElementById('heading');
        if (headingDiv) {
          headingDiv.insertAdjacentElement('afterend', navbar);
        } else {
          console.warn('Element with ID "heading" not found. Navbar not inserted.');
        }
      }
    })
    .catch(error => {
      console.error('Error fetching navbar:', error); // Log any errors
    });
}

// Insert navbar when the page loads
window.onload = insertNavbar;






// Function to load #main-block-left-1 and #main-block-left from midi-dress.html 
// and insert them in the correct order into html2.html
function insertMainBlocks() {
  fetch('../women-html/navbar-supply.html') // Fetch the content of midi-dress.html
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text(); // Convert response to text
    })
    .then(data => {
      // Create a temporary container to hold the fetched HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = data;

      // Find the #main-block-left-1 and #main-block-left elements in the loaded content
      const mainBlockLeft1 = tempDiv.querySelector('#main-block-left-1');
      const mainBlockLeft = tempDiv.querySelector('#main-block-left');

      // Find #hashtags in the current page
      const hashtagsDiv = document.querySelector('#hashtags');

      // If #hashtags and #main-block-left-1 exist, insert #main-block-left-1 after #hashtags
      if (hashtagsDiv && mainBlockLeft1) {
        hashtagsDiv.insertAdjacentElement('afterend', mainBlockLeft1);

        // If #main-block-left exists, insert it after #main-block-left-1
        if (mainBlockLeft) {
          mainBlockLeft1.insertAdjacentElement('afterend', mainBlockLeft);
        } else {
          console.warn('Element #main-block-left not found in midi-dress.html');
        }
      } else {
        console.warn('Element not found:', !mainBlockLeft1 ? '#main-block-left-1' : '#hashtags');
      }
    })
    .catch(error => {
      console.error('Error fetching main blocks:', error);
    });
}

// Insert main blocks when the page loads
window.addEventListener('DOMContentLoaded', insertMainBlocks);

































// filter for size 
document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.filter-checkbox');
    const productItems = document.querySelectorAll('.product-item');

    function filterProducts() {
        const selectedCategories = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.getAttribute('data-size'));

        productItems.forEach(item => {
            const itemCategory = item.getAttribute('data-size');
            if (selectedCategories.length === 0 || selectedCategories.includes(itemCategory)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    // Initial filter application
    filterProducts();
});

 // filter for pattern
document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('.filter-checkbox1');
  const productItems = document.querySelectorAll('.product-item');

  function filterProducts() {
      const selectedCategories = Array.from(checkboxes)
          .filter(checkbox => checkbox.checked)
          .map(checkbox => checkbox.getAttribute('data-pattern'));

      productItems.forEach(item => {
          const itemCategory = item.getAttribute('data-pattern');
          if (selectedCategories.length === 0 || selectedCategories.includes(itemCategory)) {
              item.classList.remove('hidden');
          } else {
              item.classList.add('hidden');
          }
      });
  }

  checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', filterProducts);
  });

  // Initial filter application
  filterProducts();
});

// filter for sleeves
document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('.filter-checkbox2');
  const productItems = document.querySelectorAll('.product-item');

  function filterProducts() {
      const selectedCategories = Array.from(checkboxes)
          .filter(checkbox => checkbox.checked)
          .map(checkbox => checkbox.getAttribute('data-Sleeves'));

      productItems.forEach(item => {
          const itemCategory = item.getAttribute('data-Sleeves');
          if (selectedCategories.length === 0 || selectedCategories.includes(itemCategory)) {
              item.classList.remove('hidden');
          } else {
              item.classList.add('hidden');
          }
      });
  }

  checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', filterProducts);
  });

  // Initial filter application
  filterProducts();
});

// filter for material
document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('.filter-checkbox3');
  const productItems = document.querySelectorAll('.product-item');

  function filterProducts() {
      const selectedCategories = Array.from(checkboxes)
          .filter(checkbox => checkbox.checked)
          .map(checkbox => checkbox.getAttribute('data-material'));

      productItems.forEach(item => {
          const itemCategory = item.getAttribute('data-material');
          if (selectedCategories.length === 0 || selectedCategories.includes(itemCategory)) {
              item.classList.remove('hidden');
          } else {
              item.classList.add('hidden');
          }
      });
  }

  checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', filterProducts);
  });

  // Initial filter application
  filterProducts();
});



// filter for colour
document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('.filter-checkbox4');
  const productItems = document.querySelectorAll('.product-item');

  function filterProducts() {
      const selectedCategories = Array.from(checkboxes)
          .filter(checkbox => checkbox.checked)
          .map(checkbox => checkbox.getAttribute('data-colour'));

      productItems.forEach(item => {
          const itemCategory = item.getAttribute('data-colour');
          if (selectedCategories.length === 0 || selectedCategories.includes(itemCategory)) {
              item.classList.remove('hidden');
          } else {
              item.classList.add('hidden');
          }
      });
  }

  checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', filterProducts);
  });

  // Initial filter application
  filterProducts();
});

document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.filter-checkbox5');
    const productItems = document.querySelectorAll('.product-item');
    const mainBlockRight = document.getElementById('main-block-right');

    function sortAndFilterProducts() {
        // Gather selected price ranges
        const selectedPrices = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.getAttribute('data-Price'));

        // Convert NodeList to an array for processing
        const productsArray = Array.from(productItems);

        // Filter products based on selected price ranges
        const filteredProducts = productsArray.filter(item => {
            const itemPrice = parseInt(item.getAttribute('data-Price'), 10);
            return selectedPrices.length === 0 || selectedPrices.some(priceRange => {
                switch (priceRange) {
                    case 'Price-Below-499':
                        return itemPrice <= 499;
                    case '500-999':
                        return itemPrice >= 500 && itemPrice < 1000;
                    case '1000-1499':
                        return itemPrice >= 1000 && itemPrice < 1500;
                    case '1500-1999':
                        return itemPrice >= 1500 && itemPrice < 2000;
                    case 'Above-2000':
                        return itemPrice >= 2000;
                    case 'Price-Low-to-High':
                        return true; // Allow all for low-to-high sort
                    case 'Price-High-to-Low':
                        return true; // Allow all for high-to-low sort
                    default:
                        return false;
                }
            });
        });

        // Sort filtered products based on selected sorting criteria
        if (selectedPrices.includes('Price-Low-to-High')) {
            filteredProducts.sort((a, b) => {
                return parseInt(a.getAttribute('data-Price')) - parseInt(b.getAttribute('data-Price'));
            });
        } else if (selectedPrices.includes('Price-High-to-Low')) {
            filteredProducts.sort((a, b) => {
                return parseInt(b.getAttribute('data-Price')) - parseInt(a.getAttribute('data-Price'));
            });
        }

        // Clear current product display
        productItems.forEach(item => item.classList.add('hidden'));

        // Display the filtered and sorted products
        filteredProducts.forEach(item => {
            item.classList.remove('hidden');
            mainBlockRight.appendChild(item); // Reorder items in the DOM
        });
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', sortAndFilterProducts);
    });

    // Initial sort and filter application
    sortAndFilterProducts();
});


  // sort finction
  
  // sort finction
  //sort finction








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
  function toggleContent21() {
  var content = document.getElementById("toggleContent21");
  var arrow = content.previousElementSibling.querySelector(".arrow");
  var parent = content.parentElement;
  parent.classList.toggle("show");
}

function toggleContent22() {
  var content = document.getElementById("toggleContent22");
  var arrow = content.previousElementSibling.querySelector(".arrow");
  var parent = content.parentElement;
  parent.classList.toggle("show");
}

function toggleContent23() {
  var content = document.getElementById("toggleContent23");
  var arrow = content.previousElementSibling.querySelector(".arrow");
  var parent = content.parentElement;
  parent.classList.toggle("show");
}

function toggleContent24() {
  var content = document.getElementById("toggleContent24");
  var arrow = content.previousElementSibling.querySelector(".arrow");
  var parent = content.parentElement;
  parent.classList.toggle("show");
}

function toggleContent25() {
  var content = document.getElementById("toggleContent25");
  var arrow = content.previousElementSibling.querySelector(".arrow");
  var parent = content.parentElement;
  parent.classList.toggle("show");
}
function toggleContent26() {
  var content = document.getElementById("toggleContent26");
  var arrow = content.previousElementSibling.querySelector(".arrow");
  var parent = content.parentElement;
  parent.classList.toggle("show");
}
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

