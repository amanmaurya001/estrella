// Function to load the navbar content from t-shirts-women.html
function insertNavbar() {
  fetch('navbar-supply.html') // Fetch the navbar content from t-shirts-women.html
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





// Filter for size (supporting multiple sizes per product)
document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.filter-checkbox');
    const productItems = document.querySelectorAll('.product-item');

    function filterSize() {
        const selectedCategories = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.getAttribute('data-size'));

        productItems.forEach(item => {
            const itemSizes = item.getAttribute('data-size').split(','); // Now the size is stored as a comma-separated list of sizes
            const hasSelectedSize = selectedCategories.some(size => itemSizes.includes(size)); // Check if the product has any of the selected sizes

            if (selectedCategories.length === 0 || hasSelectedSize) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterSize);
    });

    // Initial filter application
    filterSize();
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


document.addEventListener('DOMContentLoaded', () => {
    function createSections() {
        const sections = [
            { heading: 'Tops', items: ['Shirt', 'T-Shirt', 'Tank Top', 'Crop Top', 'Body Suit', 'Kurti'], paths: [
                '../../product/women/women-shirt/1.html', 
                '../../product/women/women-t-shirt/1.html', 
                '../../product/women/women-tank-top/1.html', 
                '../../product/women/women-crop-top/1.html', 
                '../../product/women/women-body-suit/1.html', 
                '../../product/women/women-kurti/1.html'
            ]},
            { heading: 'Bottoms', items: ['Pants', 'Denim jeans', 'Trousers', 'Shorts', 'Pajamas', 'Skirt', 'Leggings'], paths: [
                '../../product/women/women-pants/1.html', 
                '../../product/women/women-denim-jeans/1.html', 
                '../../product/women/women-trousers/1.html', 
                '../../product/women/women-shorts/1.html', 
                '../../product/women/women-pajamas/1.html', 
                '../../product/women/women-skirt/1.html', 
                '../../product/women/women-leggings/1.html'
            ]},
            { heading: 'Full Set', items: ['Suit', 'CO-Sets'], paths: [
                '../../product/women/women-suit/1.html', 
                '../../product/women/women-co-sets/1.html'
            ]},
            { heading: 'Dresses', items: ['Mini Dress', 'Midi Dress', 'Maxi Dress', 'Floral Dress', 'Petite Dress'], paths: [
                '../../product/women/women-mini-dress/1.html', 
                '../../product/women/women-midi-dress/1.html', 
                '../../product/women/women-maxi-dress/1.html', 
                '../../product/women/women-floral-dress/1.html', 
                '../../product/women/women-petite-dress/1.html'
            ]},
            { heading: 'Winters', items: ['Coats', 'Hoodies', 'Jackets', 'Sweaters', 'High Neck', 'Caps'], paths: [
                '../../product/women/women-coats/1.html', 
                '../../product/women/women-hoodies/1.html', 
                '../../product/women/women-jackets/1.html', 
                '../../product/women/women-sweaters/1.html', 
                '../../product/women/women-high-neck/1.html', 
                '../../product/women/women-caps/1.html'
            ]},
            { heading: 'Accessories', items: ['Hand bags', 'Sunglasses', 'Belts'], paths: [
                '../../product/women/women-hand-bags/1.html', 
                '../../product/women/women-sunglasses/1.html', 
                '../../product/women/women-belts/1.html'
            ]}
        ];

        // Step 1: Get the content of the <h1> tag in the 'heading-1' div
        const headingTextElement = document.querySelector('#heading-1 h1');
        const headingText = headingTextElement ? headingTextElement.innerText.trim() : '';
        console.log('Heading Text:', headingText);  // Debugging: Check the heading text

        // Check if the headingText is properly being fetched
        if (!headingText) {
            console.error("No text found in <h1>");
            return;
        }

        // Clear existing content in the #hashtags div
        const hashtagDiv = document.querySelector('#hashtags');
        hashtagDiv.innerHTML = '';

        // Add the "women's > " text first before the items, inside an <h1> tag
        const firstText = document.createElement('h1');  // Create an <h1> tag for the "women's > "
        firstText.innerText = "Women's > ";
        firstText.style.color = 'black';  // Ensure it's black
        hashtagDiv.appendChild(firstText);

        let itemsInserted = false;  // Track if we inserted items
        let hasInserted = false;  // Ensure items are inserted only once

        // Step 2: Loop through the sections to find matching items
        sections.forEach(section => {
            // Step 3: Loop through each item in the section and check if the heading text matches any item
            section.items.forEach((item, index) => {
                console.log(`Comparing "${headingText.toLowerCase()}" with item "${item.toLowerCase()}"`); // Debugging log

                // Case insensitive comparison: Check if the <h1> text matches the current item
                if (headingText.toLowerCase().includes(item.toLowerCase()) && !hasInserted) {
                    console.log(`Matched Item: ${item}`);  // Debugging: If a match is found, log it

                    // Insert all items from the matched section as <a> tags
                    section.items.forEach((insertItem, insertIndex) => {
                        const link = document.createElement('a');
                        link.innerText = insertItem;
                        link.href = section.paths[insertIndex];  // Set href from the 'paths' array directly
                        link.style.color = 'black';  // Ensure the font color is black
                        hashtagDiv.appendChild(link);
                        hashtagDiv.appendChild(document.createElement('br')); // Add line break after each link
                    });

                    itemsInserted = true;  // Mark that we've inserted at least one item
                    hasInserted = true;    // Prevent further insertions after the first match
                }
            });
        });

        // Debugging: Check if any items were inserted
        if (!itemsInserted) {
            console.error('No matching items were inserted.');
        } else {
            console.log('Items successfully inserted');
        }
    }

    // Call the function to create the inserted items in the #hashtags div
    createSections();
});

