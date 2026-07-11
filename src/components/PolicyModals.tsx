import React from 'react';
import { X, ShieldCheck, Truck, RotateCcw, AlertTriangle, PhoneCall } from 'lucide-react';

interface PolicyModalsProps {
  isOpen: boolean;
  type: 'privacy' | 'shipping' | 'refund' | 'terms' | 'contact' | null;
  onClose: () => void;
}

export const PolicyModals: React.FC<PolicyModalsProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen || !type) return null;

  const renderContent = () => {
    switch (type) {
      case 'shipping':
        return (
          <>
            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-5 h-5 text-brand-pink" />
              <h3 className="font-serif text-xl font-bold text-white">Shipping & Delivery Policy</h3>
            </div>
            <div className="space-y-3.5 text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
              <p>
                At <strong>StarShineWorld</strong>, we offer <strong>FREE shipping</strong> on all orders across Pakistan. There are absolutely no hidden delivery costs or handling fees.
              </p>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mt-4">1. Delivery Timeline</h4>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li><strong>Major Cities:</strong> (Karachi, Lahore, Islamabad, Rawalpindi) &mdash; Delivered within 2 to 3 working days.</li>
                <li><strong>Other Cities & Towns:</strong> Delivered within 3 to 5 working days.</li>
              </ul>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mt-4">2. Order Tracking</h4>
              <p>
                Once your order is verified on phone call/WhatsApp, it is dispatched via premium shipping partners (TCS, Leopards, or M&P). You will receive a tracking ID via SMS to monitor the real-time movement of your package.
              </p>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mt-4">3. Cash on Delivery (COD)</h4>
              <p>
                We operate strictly on Cash on Delivery (COD). You do not need to pay anything in advance. Please pay the rider only when they deliver the product securely packaged to your physical address.
              </p>
            </div>
          </>
        );

      case 'refund':
        return (
          <>
            <div className="flex items-center gap-2 mb-4">
              <RotateCcw className="w-5 h-5 text-brand-pink" />
              <h3 className="font-serif text-xl font-bold text-white">Refund & Exchange Policy</h3>
            </div>
            <div className="space-y-3.5 text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
              <p>
                Your satisfaction is our absolute priority. We offer a hassle-free <strong>7-Day Replacement & Refund Warranty</strong> on manufacturing defects or courier damages.
              </p>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mt-4">1. Eligible Scenarios</h4>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Received a physically damaged or broken straightener.</li>
                <li>Product heating issues or mechanical failure on arrival.</li>
                <li>Incorrect product variant received.</li>
              </ul>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mt-4">2. Quick Claim Process</h4>
              <p>
                No need to mail packages back to us through difficult channels. Simply send us a short video proof of the defect on our support WhatsApp number (<strong>+92 309 4118552</strong>) along with your Order ID.
              </p>
              <p>
                Once verified, our support team will instantly dispatch a brand-new, fresh replacement item to your address with zero additional delivery costs.
              </p>
            </div>
          </>
        );

      case 'privacy':
        return (
          <>
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-brand-pink" />
              <h3 className="font-serif text-xl font-bold text-white">Privacy Policy</h3>
            </div>
            <div className="space-y-3.5 text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
              <p>
                StarShineWorld respects your digital privacy rights. This section outlines how we securely process customer data.
              </p>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mt-4">1. Data Collected</h4>
              <p>
                When checkout is initiated, we strictly collect only the necessary details to ship the physical package: Your Name, Contact Phone Number, City, and Delivery Address.
              </p>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mt-4">2. Data Security</h4>
              <p>
                Your information is stored inside secure, encrypted local containers. We do not sell, rent, or lease our customer registers to any third-party marketing companies. Contact data is used exclusively to dispatch orders and answer support queries.
              </p>
            </div>
          </>
        );

      case 'terms':
        return (
          <>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-brand-pink" />
              <h3 className="font-serif text-xl font-bold text-white">Terms & Conditions</h3>
            </div>
            <div className="space-y-3.5 text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
              <p>
                Welcome to StarShineWorld! By browsing or initiating checkout, you accept these operational terms.
              </p>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mt-4">1. Cash On Delivery Commitments</h4>
              <p>
                By completing checkout, you commit to accepting the parcel from the TCS/Leopard rider upon delivery. Please ensure correct funds are ready when they contact you.
              </p>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mt-4">2. Accurate Contact Data</h4>
              <p>
                Please verify your phone number during checkout. If our verification agents fail to reach you on phone/WhatsApp within 48 hours to confirm the order, the shipment will be automatically cancelled.
              </p>
            </div>
          </>
        );

      case 'contact':
        return (
          <>
            <div className="flex items-center gap-2 mb-4">
              <PhoneCall className="w-5 h-5 text-brand-pink" />
              <h3 className="font-serif text-xl font-bold text-white">Contact Us</h3>
            </div>
            <div className="space-y-4 text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
              <p>
                Need help with your order, tracking, or have styling questions? Reach out to our customer care team. We speak Urdu and English fluently!
              </p>
              <div className="p-4 bg-brand-pink-dark/10 border border-brand-pink-dark/20 rounded-2xl space-y-2">
                <p><strong>WhatsApp Support:</strong> <a href="https://wa.me/923094118552" target="_blank" rel="noreferrer" className="text-brand-pink underline font-bold">+92 309 4118552</a></p>
                <p><strong>Support Email:</strong> support@starshineworld.com</p>
                <p><strong>Boutique Address:</strong> StarShineWorld HQ, Suite 4B, Gulberg Heights, Gulberg III, Lahore, Pakistan.</p>
              </div>
              <p className="text-xs text-neutral-500">
                Support Hours: Monday to Saturday (10:00 AM &mdash; 8:00 PM). Sunday chats are handled within 2 hours.
              </p>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#131316] rounded-3xl max-w-xl w-full border border-neutral-850 shadow-2xl relative overflow-hidden flex flex-col max-h-[85vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-800 text-neutral-500 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal content block */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {renderContent()}
        </div>

        {/* Close confirmation strip */}
        <div className="bg-[#0D0D0F] px-6 py-4 flex justify-end border-t border-neutral-800">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-brand-pink-dark to-[#b81d5f] hover:brightness-110 text-white text-xs font-bold uppercase tracking-wider py-2 px-6 rounded-lg cursor-pointer transition-all duration-300"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
