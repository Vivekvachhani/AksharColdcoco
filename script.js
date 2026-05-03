document.querySelector('.menu-toggle')?.addEventListener('click', () => {
  document.querySelector('.nav-links')?.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => document.querySelector('.nav-links')?.classList.remove('open'));
});

function sendWholesale(e){
  e.preventDefault();
  const shop = encodeURIComponent(document.getElementById('shopName').value);
  const loc = encodeURIComponent(document.getElementById('location').value);
  const phone = encodeURIComponent(document.getElementById('phone').value);
  const qty = encodeURIComponent(document.getElementById('quantity').value);
  const msg = `Hi Akshar's Cold Coco, I want wholesale supply.%0A%0AShop Name: ${shop}%0ALocation: ${loc}%0APhone: ${phone}%0AQuantity Needed: ${qty}`;
  window.open(`https://wa.me/447570761611?text=${msg}`, '_blank');
}


// App style order popup
const orderModal = document.getElementById('orderModal');
const orderQty = document.getElementById('orderQty');
const orderTotal = document.getElementById('orderTotal');
const orderSmall = document.querySelector('.order-small');
const PRODUCT_PRICE = 7;
const MIN_QTY = 1;

function updateOrderTotal(){
  if(!orderQty || !orderTotal) return;
  let qty = parseInt(orderQty.value || String(MIN_QTY), 10);
  if(isNaN(qty) || qty < MIN_QTY) qty = MIN_QTY;
  orderQty.value = qty;
  orderTotal.textContent = `£${(qty * PRODUCT_PRICE).toFixed(2)}`;
  if(orderSmall) orderSmall.textContent = 'No payment taken on website. We confirm availability and delivery on WhatsApp.';
}
function openOrderModal(){
  orderModal?.classList.add('open');
  orderModal?.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('customerName')?.focus(), 80);
  updateOrderTotal();
}
function closeOrderModal(){
  orderModal?.classList.remove('open');
  orderModal?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
function showOrderError(field, message){
  alert(message);
  field?.focus();
}

document.querySelectorAll('.order-trigger').forEach(btn => btn.addEventListener('click', openOrderModal));
document.querySelectorAll('[data-close-order]').forEach(el => el.addEventListener('click', closeOrderModal));
document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeOrderModal(); });
document.getElementById('qtyMinus')?.addEventListener('click', () => {
  orderQty.value = Math.max(MIN_QTY, parseInt(orderQty.value || String(MIN_QTY), 10) - 1);
  updateOrderTotal();
});
document.getElementById('qtyPlus')?.addEventListener('click', () => {
  orderQty.value = parseInt(orderQty.value || String(MIN_QTY), 10) + 1;
  updateOrderTotal();
});
orderQty?.addEventListener('input', updateOrderTotal);

document.getElementById('orderForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  updateOrderTotal();

  const nameField = document.getElementById('customerName');
  const phoneField = document.getElementById('customerPhone');
  const addressField = document.getElementById('customerAddress');

  const name = nameField.value.trim();
  const phone = phoneField.value.trim();
  const address = addressField.value.trim();
  const deliveryType = document.getElementById('deliveryType').value;
  const preferredTime = document.getElementById('preferredTime').value;
  const qty = parseInt(orderQty.value || '0', 10);
  const notes = document.getElementById('orderNotes').value.trim();
  const total = orderTotal.textContent;

  if(!name) return showOrderError(nameField, 'Please enter your name.');
  if(!phone) return showOrderError(phoneField, 'Please enter your phone number.');
  if(!address) return showOrderError(addressField, 'Please enter your delivery address / postcode.');
  if(qty < MIN_QTY) return showOrderError(orderQty, 'Minimum order is 1 bottle.');

  const message = `Hi Akshar's Cold Coco, I want to place an order.%0A%0AProduct: Plain Cold Coco 1 Litre Bottle%0AQuantity: ${encodeURIComponent(qty + ' bottle(s)')}%0AEstimated Total: ${encodeURIComponent(total)}%0ADelivery/Collection: ${encodeURIComponent(deliveryType)}%0APreferred Time: ${encodeURIComponent(preferredTime)}%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AAddress: ${encodeURIComponent(address)}%0ANotes: ${encodeURIComponent(notes || '-')}`;
  window.open(`https://wa.me/447570761611?text=${message}`, '_blank');
  closeOrderModal();
});