document.addEventListener('DOMContentLoaded', () => {
  let allProducts = [];

  
  fetch('/api/products')
    .then(response => response.json())
    .then(products => {
      allProducts = products; 
      displayProducts(allProducts); 
    });

  const productList = document.getElementById('product-list');
  const searchBar = document.getElementById('search-bar');

  // Function to display products
  function displayProducts(products) {
    console.log(products)
    productList.innerHTML = ''; 
    products.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('product-card');
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>$${product.price}</p>
        <br/>
        <button data-id="${product.id}">View Details</button>
      `;
      productList.appendChild(card);
    });

    // Add click event to buttons
    document.querySelectorAll('.product-card button').forEach(button => {
      button.addEventListener('click', (e) => {
        const productID = e.target.getAttribute('data-id');
        fetch(`/api/products/${productID}`)
          .then(response => response.json())
          .then(product => {
            openModal(product);
          });
      });
    });
  }

  // Search functionality
  searchBar.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = allProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
  });

  const modal = document.getElementById('product-modal');
  const closeModalBtn = document.querySelector('.close');

  function openModal(product) {
    document.getElementById('modal-product-name').innerText = product.name;
    document.getElementById('modal-product-image').src = product.image;
    document.getElementById('modal-product-desc').innerText = product.desc;
    document.getElementById('modal-product-price').innerText = product.price;
    modal.style.display = 'flex';
  }

  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});