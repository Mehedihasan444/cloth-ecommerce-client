import React from 'react';

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal, shipping, tax }) => {
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>${shipping}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax}</span>
        </div>
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CartSummary;