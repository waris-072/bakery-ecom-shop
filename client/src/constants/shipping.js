export const SHIPPING = {

  FREE_SHIPPING_THRESHOLD: 3000,
  
  
  STANDARD_SHIPPING_FEE: 250,
  
 
  calculateShipping: (subtotal) => {
    return subtotal >= 3000 ? 0 : 250;
  },
  

  getFreeShippingMessage: (subtotal) => {
    const remaining = 3000 - subtotal;
    if (remaining <= 0) return "🎉 Free Shipping Applied!";
    return `Add Rs. ${remaining.toLocaleString()} more for free shipping!`;
  },
  

  getRemainingForFreeShipping: (subtotal) => {
    return Math.max(0, 3000 - subtotal);
  }
};