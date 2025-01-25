// Function to load the navbar content from t-shirts-women.html inside women-html folder
function insertNavbar() {
  fetch('../women-html/navbar-supply.html') // Use relative path to go up one level and then into women-html folder
    .then(response => response.text()) // Get the response as text
    .then(data => {
      // Create a temporary container to hold the HTML content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = data; // Insert the fetched HTML into the temporary div

      // Find the navbar by ID in the loaded content
      const navbar = tempDiv.querySelector('#navbar');
      
      // If the navbar exists, prepend it to the body of the current page
      if (navbar) {
        document.body.prepend(navbar);
      }
    })
    .catch(error => {
      console.error('Error fetching navbar:', error); // Log any errors
    });
}

// Insert navbar when the page loads
window.onload = insertNavbar;



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
  
