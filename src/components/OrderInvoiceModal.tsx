import React from 'react';
import { Order } from '../types';
import { X, Printer, CheckCircle2, MapPin, Phone, Calendar, Sparkles, PackageCheck } from 'lucide-react';

interface OrderInvoiceModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderInvoiceModal: React.FC<OrderInvoiceModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-BD', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto border border-emerald-100 print:shadow-none print:border-none print:rounded-none">
        
        {/* Header (Hidden when printing if needed, or styled clean) */}
        <div className="p-4 bg-[#0F5132] text-white flex items-center justify-between print:bg-white print:text-slate-900 print:border-b">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="font-serif font-bold text-lg">Order Billing Invoice</h2>
              <p className="text-xs text-emerald-200">Thank you for ordering with Food Index BD!</p>
            </div>
          </div>
          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs rounded-full flex items-center gap-1.5 shadow-xs transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-emerald-200 hover:text-white rounded-full hover:bg-emerald-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Paper Body */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-800 bg-white" id="printable-invoice">
          
          {/* Company & Order Meta Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0F5132] text-amber-400 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="font-bold text-xl font-serif text-[#0F5132]">Food Index BD</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                100% Pure Organic Raw Honey, Ghee, Nuts & Dates
              </p>
              <p className="text-[11px] text-slate-400">Dhaka, Bangladesh | Hotline: 01700-000000</p>
            </div>

            <div className="text-left sm:text-right">
              <span className="inline-block bg-emerald-100 text-[#0F5132] font-mono font-bold text-xs px-2.5 py-1 rounded-md mb-1">
                INVOICE: #{order.id}
              </span>
              <p className="text-xs text-slate-500 flex items-center sm:justify-end gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{formattedDate}</span>
              </p>
              <span className={`inline-block text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full mt-1.5 ${
                order.orderStatus === 'PENDING' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                order.orderStatus === 'CONFIRMED' ? 'bg-blue-100 text-blue-900 border border-blue-300' :
                order.orderStatus === 'SHIPPED' ? 'bg-purple-100 text-purple-900 border border-purple-300' :
                order.orderStatus === 'DELIVERED' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                'bg-rose-100 text-rose-900'
              }`}>
                Status: {order.orderStatus}
              </span>
            </div>
          </div>

          {/* Customer & Shipping Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div>
              <span className="font-bold text-slate-500 uppercase text-[10px] block mb-1">
                Billed & Shipped To:
              </span>
              <h4 className="font-bold text-slate-900 text-sm">{order.customerName}</h4>
              <p className="flex items-center gap-1 text-slate-700 mt-1 font-mono">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>{order.customerPhone}</span>
              </p>
              <p className="flex items-start gap-1 text-slate-600 mt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{order.deliveryAddress}</span>
              </p>
            </div>

            <div className="border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-4">
              <span className="font-bold text-slate-500 uppercase text-[10px] block mb-1">
                Delivery Logistics & Payment:
              </span>
              <p className="text-slate-700">
                Region: <strong>{order.deliveryArea === 'inside_dhaka' ? 'Inside Dhaka (৳60)' : 'Outside Dhaka (৳120)'}</strong>
              </p>
              <p className="text-slate-700 mt-1">
                Payment Method: <strong>{order.paymentMethod}</strong>
              </p>
              {order.paymentTransactionId && (
                <p className="text-slate-700 font-mono mt-1">
                  Transaction ID: <span className="bg-amber-100 px-1.5 py-0.5 rounded font-bold">{order.paymentTransactionId}</span>
                </p>
              )}
              {order.orderNotes && (
                <p className="text-slate-500 italic mt-1.5">
                  Notes: "{order.orderNotes}"
                </p>
              )}
            </div>
          </div>

          {/* Itemized Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-300 text-slate-500 uppercase text-[10px]">
                  <th className="py-2.5 px-2">Item Description</th>
                  <th className="py-2.5 px-2 text-center">Variant</th>
                  <th className="py-2.5 px-2 text-center">Qty</th>
                  <th className="py-2.5 px-2 text-right">Price</th>
                  <th className="py-2.5 px-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="text-slate-800">
                    <td className="py-3 px-2 font-medium max-w-[200px]">
                      {item.productTitle}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span className="bg-emerald-50 text-[#0F5132] px-2 py-0.5 rounded font-semibold text-[11px]">
                        {item.selectedWeight}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center font-mono">{item.quantity}</td>
                    <td className="py-3 px-2 text-right font-mono">৳{item.pricePerUnit}</td>
                    <td className="py-3 px-2 text-right font-bold font-mono">
                      ৳{item.pricePerUnit * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Summary */}
          <div className="border-t border-slate-300 pt-3 flex flex-col items-end text-xs space-y-1.5">
            <div className="flex justify-between w-48 text-slate-600">
              <span>Items Subtotal:</span>
              <span className="font-mono font-bold text-slate-900">
                ৳{order.totalAmount - order.shippingCost}
              </span>
            </div>
            <div className="flex justify-between w-48 text-slate-600">
              <span>Delivery Charge:</span>
              <span className="font-mono font-bold text-slate-900">৳{order.shippingCost}</span>
            </div>
            <div className="flex justify-between w-56 text-base font-black text-[#0F5132] border-t border-slate-300 pt-2">
              <span>Grand Total:</span>
              <span className="font-mono text-lg">৳{order.totalAmount}</span>
            </div>
          </div>

          {/* Footer Terms Note */}
          <div className="border-t border-slate-200 pt-4 text-center text-[10px] text-slate-500 space-y-1">
            <p className="flex items-center justify-center gap-1 font-semibold text-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Unadulterated Food Quality Guaranteed by Food Index BD</span>
            </p>
            <p>For order status inquiries, please call 01700-000000 with Invoice #{order.id}</p>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs rounded-full shadow-xs flex items-center gap-1.5 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print Invoice</span>
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#0F5132] hover:bg-emerald-800 text-white font-bold text-xs rounded-full shadow-md transition-all"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
