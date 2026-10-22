import React, { useState } from 'react';
import { CartItem, DeliveryArea, PaymentMethod, Order } from '../types';
import { X, ShieldCheck, Phone, MapPin, Truck, CreditCard, CheckCircle2, AlertCircle, ShoppingBag } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryArea, setDeliveryArea] = useState<DeliveryArea>('inside_dhaka');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('COD');
  const [transactionId, setTransactionId] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const itemsSubtotal = cartItems.reduce((sum, item) => sum + item.pricePerUnit * item.quantity, 0);
  const shippingCost = deliveryArea === 'inside_dhaka' ? 60 : 120;
  const totalAmount = itemsSubtotal + shippingCost;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Bangladeshi phone validation
    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (cleanPhone.length < 11 || !cleanPhone.startsWith('01')) {
      setErrorMessage('Please enter a valid 11-digit Bangladeshi mobile number starting with 01...');
      return;
    }
    if (!deliveryAddress.trim()) {
      setErrorMessage('Please provide your complete delivery street address.');
      return;
    }

    if ((paymentMethod === 'BKASH' || paymentMethod === 'NAGAD') && !transactionId.trim()) {
      setErrorMessage(`Please enter your ${paymentMethod} transaction ID.`);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        customerName: customerName.trim(),
        customerPhone: cleanPhone,
        deliveryAddress: deliveryAddress.trim(),
        deliveryArea,
        paymentMethod,
        paymentTransactionId: transactionId.trim() || undefined,
        orderNotes: orderNotes.trim() || undefined,
        items: cartItems.map(item => ({
          productId: item.product.id,
          productTitle: item.product.title,
          productImage: item.product.imageUrls[0],
          quantity: item.quantity,
          selectedWeight: item.selectedWeight,
          pricePerUnit: item.pricePerUnit
        }))
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const resData = await response.json();

      if (resData.success && resData.data) {
        onOrderSuccess(resData.data);
      } else {
        setErrorMessage(resData.message || 'Failed to place order. Please try again.');
      }
    } catch (err: any) {
      console.error('Order Submission Error:', err);
      setErrorMessage('Network or server error while placing order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto border border-emerald-100 max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#0F5132] text-white flex items-center justify-between border-b border-emerald-800">
          <div>
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block">
              High-Speed BD Checkout
            </span>
            <h2 className="text-xl font-bold font-serif">Complete Your Pure Food Order</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white rounded-full hover:bg-emerald-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Customer Input Fields (7 Columns) */}
          <form onSubmit={handleSubmitOrder} id="checkout-form" className="lg:col-span-7 space-y-5">
            
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Step 1: Customer Info */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <Phone className="w-4 h-4 text-[#0F5132]" />
                <span>1. Customer & Contact Information</span>
              </h3>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanvir Ahmed"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F5132] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Bangladeshi Mobile Phone Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    maxLength={11}
                    placeholder="01712345678"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F5132] focus:bg-white"
                  />
                  <span className="absolute right-3 top-2.5 text-[11px] text-slate-400 font-mono">
                    11 Digits
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  Our logistics team will call this phone number to confirm parcel delivery.
                </p>
              </div>
            </div>

            {/* Step 2: Shipping Location */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <MapPin className="w-4 h-4 text-[#0F5132]" />
                <span>2. Delivery Address & District</span>
              </h3>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Full Street Address (House, Road, Area, City) <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="e.g. House 42, Road 11, Block D, Banani, Dhaka"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F5132] focus:bg-white resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Delivery Region Area <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label
                    className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between text-xs font-bold transition-all ${
                      deliveryArea === 'inside_dhaka'
                        ? 'bg-emerald-50 border-[#0F5132] text-[#0F5132] ring-2 ring-[#0F5132]/20'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="deliveryArea"
                        checked={deliveryArea === 'inside_dhaka'}
                        onChange={() => setDeliveryArea('inside_dhaka')}
                        className="text-[#0F5132] focus:ring-[#0F5132]"
                      />
                      <div>
                        <span>Inside Dhaka</span>
                        <span className="block text-[10px] text-slate-500 font-normal">24-48 Hours</span>
                      </div>
                    </div>
                    <span className="bg-[#0F5132] text-white px-2 py-0.5 rounded-md text-[10px]">
                      ৳60
                    </span>
                  </label>

                  <label
                    className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between text-xs font-bold transition-all ${
                      deliveryArea === 'outside_dhaka'
                        ? 'bg-emerald-50 border-[#0F5132] text-[#0F5132] ring-2 ring-[#0F5132]/20'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="deliveryArea"
                        checked={deliveryArea === 'outside_dhaka'}
                        onChange={() => setDeliveryArea('outside_dhaka')}
                        className="text-[#0F5132] focus:ring-[#0F5132]"
                      />
                      <div>
                        <span>Outside Dhaka</span>
                        <span className="block text-[10px] text-slate-500 font-normal">2-3 Days</span>
                      </div>
                    </div>
                    <span className="bg-[#0F5132] text-white px-2 py-0.5 rounded-md text-[10px]">
                      ৳120
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Order Notes / Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Please call before arriving or deliver after 5 PM"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F5132]"
                />
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <CreditCard className="w-4 h-4 text-[#0F5132]" />
                <span>3. Choose Payment Method</span>
              </h3>

              <div className="space-y-2">
                {/* Cash on Delivery */}
                <label
                  className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    paymentMethod === 'COD'
                      ? 'bg-emerald-50 border-[#0F5132] ring-2 ring-[#0F5132]/20'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="text-[#0F5132] focus:ring-[#0F5132]"
                    />
                    <div>
                      <span className="font-bold text-xs text-slate-900 block">
                        Cash on Delivery (ক্যাশ অন ডেলিভারি)
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Pay cash directly to courier after inspecting parcel quality.
                      </span>
                    </div>
                  </div>
                  <span className="bg-amber-400 text-emerald-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                    Recommended
                  </span>
                </label>

                {/* bKash */}
                <label
                  className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'BKASH'
                      ? 'bg-pink-50 border-pink-500 ring-2 ring-pink-500/20'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'BKASH'}
                      onChange={() => setPaymentMethod('BKASH')}
                      className="text-pink-600 focus:ring-pink-500"
                    />
                    <div>
                      <span className="font-bold text-xs text-slate-900 block">
                        bKash Personal / Merchant Payment
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Send ৳{totalAmount} to bKash Number: <strong>01700-112233</strong>
                      </span>
                    </div>
                  </div>

                  {paymentMethod === 'BKASH' && (
                    <div className="mt-3 pt-3 border-t border-pink-200">
                      <label className="text-[11px] font-bold text-pink-900 block mb-1">
                        Enter bKash Transaction ID (TrxID):
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. TRX88219491"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full bg-white border border-pink-300 rounded-xl p-2 text-xs font-mono uppercase text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                  )}
                </label>

                {/* Nagad */}
                <label
                  className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'NAGAD'
                      ? 'bg-orange-50 border-orange-500 ring-2 ring-orange-500/20'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'NAGAD'}
                      onChange={() => setPaymentMethod('NAGAD')}
                      className="text-orange-600 focus:ring-orange-500"
                    />
                    <div>
                      <span className="font-bold text-xs text-slate-900 block">
                        Nagad Merchant Payment
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Send ৳{totalAmount} to Nagad Number: <strong>01800-112233</strong>
                      </span>
                    </div>
                  </div>

                  {paymentMethod === 'NAGAD' && (
                    <div className="mt-3 pt-3 border-t border-orange-200">
                      <label className="text-[11px] font-bold text-orange-900 block mb-1">
                        Enter Nagad Transaction ID:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. NGD99218274"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full bg-white border border-orange-300 rounded-xl p-2 text-xs font-mono uppercase text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  )}
                </label>
              </div>
            </div>

          </form>

          {/* Order Summary Sidebar (5 Columns) */}
          <div className="lg:col-span-5 bg-slate-50 p-4 sm:p-5 rounded-3xl border border-slate-200 flex flex-col justify-between space-y-4">
            
            <div>
              <h3 className="font-serif font-bold text-slate-900 text-sm border-b border-slate-200 pb-2 mb-3 flex items-center justify-between">
                <span>Order Summary</span>
                <span className="text-xs font-mono font-normal text-slate-500">
                  {cartItems.length} items
                </span>
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                {cartItems.map((item, i) => (
                  <div key={i} className="flex gap-2.5 items-center text-xs">
                    <img
                      src={item.product.imageUrls[0]}
                      alt=""
                      className="w-10 h-10 object-cover rounded-lg border border-slate-200 bg-white"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 truncate">{item.product.title}</h4>
                      <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded font-semibold">
                        {item.selectedWeight} x {item.quantity}
                      </span>
                    </div>
                    <span className="font-bold text-slate-900 font-mono">
                      ৳{item.pricePerUnit * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Calculations */}
              <div className="mt-4 pt-3 border-t border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Items Subtotal</span>
                  <span className="font-bold font-mono text-slate-900">৳{itemsSubtotal}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping ({deliveryArea === 'inside_dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'})</span>
                  <span className="font-bold font-mono text-slate-900">৳{shippingCost}</span>
                </div>
                <div className="flex justify-between text-base font-black text-[#0F5132] border-t border-slate-300 pt-2">
                  <span>Total Payable</span>
                  <span className="font-mono text-xl">৳{totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Final Submit Action */}
            <div className="space-y-2">
              <button
                type="submit"
                form="checkout-form"
                disabled={loading}
                className="w-full py-4 px-4 bg-gradient-to-r from-[#0F5132] to-emerald-800 hover:from-emerald-800 hover:to-[#0F5132] text-white font-bold text-sm sm:text-base rounded-2xl shadow-xl transition-all active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-amber-400" />
                    <span>Confirm Order (৳{totalAmount})</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>By clicking confirm, you agree to receive order confirmation calls.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
