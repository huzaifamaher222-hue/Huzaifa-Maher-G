import React, { useState, useEffect } from 'react';
import { X, Database, Trash2, Sliders, RefreshCw, PhoneCall, MapPin } from 'lucide-react';
import { collection, getDocs, deleteDoc, updateDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Order } from '../types';

interface MerchantAdminProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MerchantAdmin: React.FC<MerchantAdminProps> = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [cityFilter, setCityFilter] = useState<string>('All');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'orders'));
      const fbOrders: Order[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fbOrders.push({
          id: data.id,
          name: data.name,
          phone: data.phone,
          city: data.city,
          address: data.address,
          quantity: data.quantity || 1,
          totalPrice: data.totalPrice,
          status: data.status,
          createdAt: data.createdAt,
          isWhatsApp: data.isWhatsApp,
          gpsLink: data.gpsLink
        });
      });

      // Sort by date/time (newest first)
      fbOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      if (fbOrders.length > 0) {
        setOrders(fbOrders);
        localStorage.setItem('starshines_orders', JSON.stringify(fbOrders));
      } else {
        // Fallback to local storage if Firestore is empty
        const stored = localStorage.getItem('starshines_orders');
        if (stored) {
          const parsed = JSON.parse(stored);
          setOrders(parsed);
          // Sync existing localStorage orders to Firestore
          for (const order of parsed) {
            try {
              await setDoc(doc(db, 'orders', order.id), {
                id: order.id,
                name: order.name,
                phone: order.phone,
                productName: 'Mini Ceramic Hair Straightener',
                totalPrice: order.totalPrice,
                address: order.address,
                city: order.city,
                gpsLink: order.gpsLink || '',
                status: order.status,
                createdAt: order.createdAt,
                isWhatsApp: !!order.isWhatsApp
              });
            } catch (e) {
              console.error("Error syncing local order to firestore:", e);
            }
          }
        } else {
          // Seed default orders if both are empty to make the dashboard look gorgeous
          const seedOrders: Order[] = [
            {
              id: 'SSW-412855',
              name: 'Zainab Fatima',
              phone: '03214569871',
              city: 'Lahore',
              address: 'House 42, Block H-3, Johar Town, near Emporium Mall',
              quantity: 2,
              totalPrice: 2798,
              status: 'Delivered',
              createdAt: new Date(Date.now() - 48 * 3600000).toLocaleString()
            },
            {
              id: 'SSW-963524',
              name: 'Sumbul Raza',
              phone: '03004128552',
              city: 'Karachi',
              address: 'Flat A-102, Sumya Heights, Block 13-D, Gulshan-e-Iqbal',
              quantity: 1,
              totalPrice: 1399,
              status: 'Shipped',
              createdAt: new Date(Date.now() - 24 * 3600000).toLocaleString()
            }
          ];
          localStorage.setItem('starshines_orders', JSON.stringify(seedOrders));
          setOrders(seedOrders);
          
          // Save seed orders to Firestore
          for (const order of seedOrders) {
            try {
              await setDoc(doc(db, 'orders', order.id), {
                id: order.id,
                name: order.name,
                phone: order.phone,
                productName: 'Mini Ceramic Hair Straightener',
                totalPrice: order.totalPrice,
                address: order.address,
                city: order.city,
                gpsLink: order.gpsLink || '',
                status: order.status,
                createdAt: order.createdAt,
                isWhatsApp: !!order.isWhatsApp
              });
            } catch (e) {
              console.error("Error saving seed order:", e);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error loading from Firestore, falling back to local storage:", error);
      const stored = localStorage.getItem('starshines_orders');
      if (stored) {
        setOrders(JSON.parse(stored));
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadOrders();
    }
  }, [isOpen]);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'orders', id));
    } catch (error) {
      console.error("Error deleting from Firestore:", error);
    }
    const updated = orders.filter(o => o.id !== id);
    localStorage.setItem('starshines_orders', JSON.stringify(updated));
    setOrders(updated);
  };

  const handleUpdateStatus = async (id: string, newStatus: Order['status']) => {
    try {
      await updateDoc(doc(db, 'orders', id), { status: newStatus });
    } catch (error) {
      console.error("Error updating status in Firestore:", error);
    }
    const updated = orders.map(o => o.id === id ? { ...o, status: newStatus } : o);
    localStorage.setItem('starshines_orders', JSON.stringify(updated));
    setOrders(updated);
  };

  const handleClearAll = async () => {
    if (window.confirm('Are you sure you want to clear all orders?')) {
      for (const order of orders) {
        try {
          await deleteDoc(doc(db, 'orders', order.id));
        } catch (e) {
          console.error("Error clearing order from Firestore:", e);
        }
      }
      localStorage.removeItem('starshines_orders');
      setOrders([]);
    }
  };

  if (!isOpen) return null;

  // Filter lists
  const filteredOrders = orders.filter(o => {
    const matchStatus = statusFilter === 'All' || o.status === statusFilter;
    const matchCity = cityFilter === 'All' || o.city.toLowerCase() === cityFilter.toLowerCase();
    return matchStatus && matchCity;
  });

  // Extract unique cities from orders for filter list
  const uniqueCities = Array.from(new Set(orders.map(o => o.city)));

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#131316] rounded-3xl w-full max-w-5xl border border-neutral-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#0B0B0C] border-b border-neutral-800 text-white px-6 py-5 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-brand-pink">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold tracking-wide uppercase">
                Merchant Operations Dashboard
              </h2>
              <span className="text-[10px] text-neutral-400 font-sans tracking-widest uppercase block">
                Manage received orders & shipping statuses
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters Panel */}
        <div className="p-4 bg-[#18181C] border-b border-neutral-800/80 flex flex-wrap gap-4 items-center justify-between shrink-0">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-sans">
                Status:
              </span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-neutral-950 border border-neutral-800 text-xs py-1.5 px-3 rounded-lg text-white font-sans focus:outline-none focus:ring-1 focus:ring-brand-pink cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* City Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-sans">
                City:
              </span>
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="bg-neutral-950 border border-neutral-800 text-xs py-1.5 px-3 rounded-lg text-white font-sans focus:outline-none focus:ring-1 focus:ring-brand-pink cursor-pointer"
              >
                <option value="All">All Cities</option>
                {uniqueCities.map((city, idx) => (
                  <option key={idx} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={loadOrders}
              className="p-1.5 rounded-lg bg-neutral-950 border border-neutral-800 hover:bg-neutral-900 text-neutral-300 cursor-pointer flex items-center gap-1 text-xs font-semibold"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sync</span>
            </button>
            <button
              onClick={handleClearAll}
              className="p-1.5 rounded-lg bg-red-950/20 hover:bg-red-950/40 text-red-400 border border-red-900/40 cursor-pointer flex items-center gap-1 text-xs font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          </div>
        </div>

        {/* Orders Table Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#131316] relative min-h-[250px]">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#131316]/90 backdrop-blur-sm z-10 gap-3">
              <div className="w-8 h-8 border-2 border-brand-pink border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-neutral-400 font-sans tracking-widest uppercase">Fetching Orders from Firestore...</span>
            </div>
          )}
          {filteredOrders.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-neutral-800">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-neutral-950 text-neutral-200 font-serif uppercase tracking-wider text-[10px]">
                    <th className="p-4 border-b border-neutral-800">Order ID</th>
                    <th className="p-4 border-b border-neutral-800">Customer Info</th>
                    <th className="p-4 border-b border-neutral-800">Address Details</th>
                    <th className="p-4 border-b border-neutral-800 text-center">Qty / Price</th>
                    <th className="p-4 border-b border-neutral-800">Shipping Status</th>
                    <th className="p-4 border-b border-neutral-800 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-neutral-900/30 transition-colors">
                      {/* ID & Date */}
                      <td className="p-4 align-top">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-mono font-bold text-white text-sm block">
                            {order.id}
                          </span>
                          {order.isWhatsApp && (
                            <span className="bg-emerald-950/60 text-emerald-400 font-sans text-[8px] font-black px-1.5 py-0.5 rounded border border-emerald-900/40 uppercase tracking-widest flex items-center gap-0.5 shrink-0">
                              💬 WA
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-neutral-500 block mt-1 font-sans font-medium">
                          {order.createdAt}
                        </span>
                      </td>

                      {/* Customer contact card */}
                      <td className="p-4 align-top max-w-[180px]">
                        <span className="font-bold text-white block text-sm font-serif">
                          {order.name}
                        </span>
                        <a
                          href={`https://wa.me/${order.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-400 hover:underline font-bold font-sans flex items-center gap-1 mt-1 text-[11px]"
                        >
                          <PhoneCall className="w-3 h-3 shrink-0" />
                          {order.phone}
                        </a>
                      </td>

                      {/* City and full street route address */}
                      <td className="p-4 align-top max-w-[280px]">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-gold/10 text-brand-gold text-[10px] font-bold mb-1.5 uppercase tracking-wider font-sans border border-brand-gold/25">
                          <MapPin className="w-2.5 h-2.5" />
                          {order.city}
                        </span>
                        <p className="text-neutral-400 font-sans leading-relaxed break-words text-xs">
                          {order.address}
                        </p>
                      </td>

                      {/* Quantity & calculated price summary */}
                      <td className="p-4 align-top text-center">
                        <span className="font-bold text-white text-sm block">
                          {order.quantity}x
                        </span>
                        <span className="text-brand-pink font-sans font-bold block mt-1 text-[11px]">
                          Rs. {order.totalPrice.toLocaleString()}
                        </span>
                      </td>

                      {/* Shipping status inline drop menu */}
                      <td className="p-4 align-top">
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateStatus(order.id, e.target.value as Order['status'])}
                          className={`text-[10px] font-extrabold uppercase tracking-widest py-1 px-2.5 rounded-full border focus:outline-none cursor-pointer ${
                            order.status === 'Pending'
                              ? 'bg-amber-950/40 text-amber-400 border-amber-900/30'
                              : order.status === 'Shipped'
                              ? 'bg-blue-950/40 text-blue-400 border-blue-900/30'
                              : order.status === 'Delivered'
                              ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/30'
                              : 'bg-neutral-900 text-neutral-500 border-neutral-800'
                          }`}
                        >
                          <option value="Pending">⏳ Pending</option>
                          <option value="Shipped">🚚 Shipped</option>
                          <option value="Delivered">✅ Delivered</option>
                          <option value="Cancelled">❌ Cancelled</option>
                        </select>
                      </td>

                      {/* Individual delete block */}
                      <td className="p-4 align-top text-center">
                        <button
                          onClick={() => handleDelete(order.id)}
                          className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-950/20 transition-all duration-300 cursor-pointer"
                          title="Delete Order"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <Database className="w-12 h-12 text-neutral-800 mx-auto mb-3" />
              <p className="text-sm font-medium text-neutral-500 font-sans italic">
                No orders match your filter criteria. Let's make some test submissions!
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#0D0D0F] px-6 py-4 flex justify-between items-center border-t border-neutral-800 shrink-0 text-xs text-neutral-500">
          <span className="font-sans">
            Total active records: <strong>{orders.length} orders</strong>
          </span>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-brand-pink-dark to-[#b81d5f] hover:brightness-110 text-white text-xs font-bold uppercase tracking-wider py-2 px-6 rounded-lg cursor-pointer transition-all duration-300"
          >
            Close Board
          </button>
        </div>

      </div>
    </div>
  );
};
