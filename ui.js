import { formatPrice } from './helpers.js';

const totalPriceElement = document.querySelector('.priceTotal');
const cartElement = document.querySelector('.cart');
const emptyMessage = document.querySelector('.empty-message');
const tableToggle = document.querySelector('.tableToggle');

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

function reverseTable() {
  tableToggle.style.display = "none";
  emptyMessage.style.display = "block";
}

function deleteLineFromCart(event) {
  event.preventDefault();
  const lineToDelete = event.target.closest('tr');
  lineToDelete.parentElement.removeChild(lineToDelete);
  updateTotalPrice();
  
}

export function createCartLine(product, quantity) {
  const cartLineElement = document.createElement('tr');
  cartLineElement.dataset.quantity = quantity.toString();
  cartLineElement.dataset.price = product.price.toString();
  cartLineElement.dataset.productId = product.id.toString();

  const titleElement = document.createElement('td');
  titleElement.textContent = product.title;
  cartLineElement.appendChild(titleElement);

  const quantityElement = document.createElement('td');
  quantityElement.textContent = quantity.toString();
  
  cartLineElement.appendChild(quantityElement);

  const priceElement = document.createElement('td');
  priceElement.classList = "price";
  priceElement.textContent = formatPrice(product.price);
  cartLineElement.appendChild(priceElement);

  const totalElement = document.createElement('td');
  totalElement.textContent = formatPrice(product.price * quantity);
  totalElement.classList.add('itemTotalPrice');
  cartLineElement.appendChild(totalElement);

  const formTdElement = document.createElement('td');
  const formElement = document.createElement('form');
  formElement.addEventListener('submit', deleteLineFromCart);

  const buttonElement = document.createElement('button');
  buttonElement.textContent = 'Eyða';

  formElement.appendChild(buttonElement);
  formTdElement.appendChild(formElement);
  cartLineElement.appendChild(formTdElement);

  return cartLineElement;
}



export function showCartContent(show = true) {
  const tableToggle = document.querySelector('.tableToggle');
  const emptyMessage = document.querySelector('.empty-message');

  if (show) {
    tableToggle.style.display = 'table'; // Assuming you want to display it as a table
    emptyMessage.style.display = 'none';
  } else {
    tableToggle.style.display = 'none';
    emptyMessage.style.display = 'block';
  }
}