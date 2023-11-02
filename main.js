import { createCartLine, showCartContent } from './lib/ui.js';
import { formatPrice } from './lib/helpers.js';

const products = [
  {
    id: 1,
    title: 'HTML húfa',
    description:
      'Húfa sem heldur hausnum heitum og hvíslar hugsanlega að þér hvaða element væri best að nota.',
    price: 5_000,
  },
  {
    id: 2,
    title: 'CSS sokkar',
    description: 'Sokkar sem skalast vel með hvaða fótum sem er.',
    price: 3_000,
  },
  {
    id: 3,
    title: 'JavaScript jakki',
    description: 'Mjög töff jakki fyrir öll sem skrifa JavaScript reglulega.',
    price: 20_000,
  },
];

const totalPriceElement = document.querySelector('.priceTotal');
const cartTableBodyElement = document.querySelector('.cart table tbody');
const tableToggle = document.querySelector('.tableToggle');
const emptyMessage = document.querySelector('.empty-message');

function addProductToCart(product, quantity) {
  const existingLine = cartTableBodyElement.querySelector(`tr[data-product-id="${product.id}"]`);
  
  if (existingLine) {
    const currentQuantity = parseInt(existingLine.dataset.quantity, 10);
    existingLine.dataset.quantity = currentQuantity + quantity;
    
    const itemTotalPriceElement = existingLine.querySelector('.itemTotalPrice');
    if (quantityElement) {
      quantityElement.textContent = existingLine.dataset.quantity;
      itemTotalPriceElement.textContent = formatPrice(existingLine.dataset.quantity * parseFloat(existingLine.dataset.price));
    }
    updateTotalPrice();
  } else {
    const cartLine = createCartLine(product, quantity);
    cartTableBodyElement.appendChild(cartLine);
  }
  
  showCartContent(true);
  updateTotalPrice();
}

function submitHandler(event) {
  event.preventDefault();
  const parent = event.target.closest('tr');
  const productId = Number.parseInt(parent.dataset.productId);
  const product = products.find((item) => item.id === productId);
  
  if (!product) {
    return;
  }
  
  const quantityInputElement = parent.querySelector('input');
  const quantity = Number.parseInt(quantityInputElement.value);
  
  addProductToCart(product, quantity);
  
  element.textContent = parseInt(element.textContent) + quantity;
  updateTotalPrice();
  tableToggle.style.display = "block";
  emptyMessage.style.display = "none";
}

const addToCartForms = document.querySelectorAll('.add');

for (const form of Array.from(addToCartForms)) {
  form.addEventListener('submit', submitHandler);
}

document.addEventListener("DOMContentLoaded", function() {
  let state = 'form';
  const toggleButton = document.getElementById("toggleButton");
  const formFields = document.querySelectorAll('.form-field');
  const receiptSection = document.querySelector('.receipt');
  
  toggleButton.addEventListener("click", function(event) {
    event.preventDefault();
    if (state === 'form') {
      formFields.forEach(function(field) {
        field.style.display = "block";
      });
      state = 'receipt';
    } else if (state === 'receipt') {
      receiptSection.style.display = "block";
      toggleButton.style.display = "none";
      formFields.forEach(function(field) {
        field.style.display = "none";
      });
    }
  });
});

function updateTotalPrice() {
  const rows = document.querySelectorAll('.cart tbody tr');
  let total = 0;
  
  rows.forEach((row) => {
    const price = parseFloat(row.dataset.price);
    const quantity = parseInt(row.dataset.quantity, 10);
    total += price * quantity;
  });
  
  totalPriceElement.textContent = `${formatPrice(total)} kr.-`;
}

updateTotalPrice();