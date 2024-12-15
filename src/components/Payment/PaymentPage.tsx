import { CartItem } from '../../types';

interface PaymentPageProps {
  items: CartItem[];
  onPaymentComplete: () => void;
}

export function PaymentPage({ items, onPaymentComplete }: PaymentPageProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Payment Instructions</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium text-gray-800 mb-2">M-Pesa Payment Details:</p>
              <ul className="space-y-2 text-gray-600">
                <li><span className="font-semibold">Till Number:</span> 4603764</li>
                <li><span className="font-semibold">Amount:</span> ${total.toFixed(2)}</li>
                <li><span className="font-semibold">Customer Support:</span> 0702162058</li>
              </ul>
              <p className="mt-4 text-sm text-gray-500">
                Please make the payment using the till number above and keep your transaction reference number.
              </p>
            </div>
          </div>

          <button
            onClick={onPaymentComplete}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
}