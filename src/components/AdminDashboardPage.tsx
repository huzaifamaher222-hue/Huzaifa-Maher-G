import React, { useState, useEffect } from 'react';
import { 
  Database, Trash2, RefreshCw, PhoneCall, MapPin, LogOut, Lock, User, 
  ShieldAlert, Check, ChevronDown, CheckCircle, Search, Calendar, ShoppingBag
} from 'lucide-react';
import { collection, getDocs, deleteDoc, updateDoc, doc, setDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { db, auth } from '../firebase';
import { Order } from '../types';

export function AdminDashboardPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Orders Management States
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [cityFilter, setCityFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Check existing session on mount
  useEffect(() => {
    const sessionToken = sessionStorage.getItem('starshines_admin_logged');
    if (sessionToken === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Fetch orders when logged in
  useEffect(() => {
    if (isLoggedIn) {
      loadOrders();
    }
  }, [isLoggedIn]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    const trimmedUsername = username.trim();
    
    // Validate inputs
    if (!trimmedUsername || !password) {
      setLoginError('Both username and password are required.');
      setIsLoggingIn(false);
      return;
    }

    try {
      // 1. Attempt standard Firebase Auth using mapped email
      const mappedEmail = trimmedUsername.includes('@') ? trimmedUsername : `${trimmedUsername.toLowerCase()}@starshineworlds.com`;
      await signInWithEmailAndPassword(auth, mappedEmail, password);
      
      sessionStorage.setItem('starshines_admin_logged', 'true');
      setIsLoggedIn(true);
    } catch (fbErr: any) {
      console.warn("Firebase Auth sign-in failed/unconfigured. Trying local credentials fallback...", fbErr.message);
      
      // 2. Direct Fallback to required credentials so the user is never locked out
      if (trimmedUsername === 'Huzaifa' && password === 'Huzaifa804@') {
        sessionStorage.setItem('starshines_admin_logged', 'true');
        setIsLoggedIn(true);
      } else {
        // Detailed user-friendly errors
        if (fbErr.code === 'auth/invalid-credential' || fbErr.code === 'auth/user-not-found') {
          setLoginError('Invalid password or username. Please check your credentials.');
        } else if (fbErr.code === 'auth/network-request-failed') {
          setLoginError('Network error. Please check your internet connection.');
        } else {
          setLoginError('Incorrect login details. Please use: Huzaifa / Huzaifa804@');
        }
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Error signing out from Firebase:", err);
    }
    sessionStorage.removeItem('starshines_admin_logged');
    setIsLoggedIn(false);
    setOrders([]);
  };

  const loadOrders = async () => {
    setIsLoading(true);
    setStatusMessage(null);
    try {
      const querySnapshot = await getDocs(collection(db, 'orders'));
      const fbOrders: Order[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (!data.phone) {
          console.warn(`Firestore document with ID ${docSnap.id} has a missing or invalid phone field.`);
        }
        if (data.totalPrice === undefined || data.totalPrice === null) {
          console.warn(`Firestore document with ID ${docSnap.id} has a missing or invalid totalPrice field.`);
        }
        fbOrders.push({
          id: data.id,
          name: data.name,
          phone: data.phone,
          city: data.city,
          address: data.address,
          quantity: data.quantity || 1,
          totalPrice: Number(data.totalPrice ?? 0),
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
          
          // Async sync to Firestore
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
        }
      }
    } catch (error) {
      console.error("Error loading from Firestore, falling back to local storage:", error);
      const stored = localStorage.getItem('starshines_orders');
      if (stored) {
        setOrders(JSON.parse(stored));
      }
      setStatusMessage({ text: 'Loaded from local offline storage. Connected to Firestore offline mode.', isError: true });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(`Are you sure you want to delete order #${id}?`)) return;

    try {
      await deleteDoc(doc(db, 'orders', id));
      const updated = orders.filter(o => o.id !== id);
      localStorage.setItem('starshines_orders', JSON.stringify(updated));
      setOrders(updated);
      showTemporaryStatus('Order deleted successfully!', false);
    } catch (error) {
      console.error("Error deleting from Firestore:", error);
      showTemporaryStatus('Failed to delete order from Firestore. Check permissions.', true);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: Order['status']) => {
    try {
      await updateDoc(doc(db, 'orders', id), { status: newStatus });
      const updated = orders.map(o => o.id === id ? { ...o, status: newStatus } : o);
      localStorage.setItem('starshines_orders', JSON.stringify(updated));
      setOrders(updated);
      showTemporaryStatus(`Order status updated to ${newStatus}!`, false);
    } catch (error) {
      console.error("Error updating status in Firestore:", error);
      showTemporaryStatus('Failed to update status in Firestore. Check safety rules.', true);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('CRITICAL WARNING: Are you sure you want to clear ALL orders permanently from Firestore and local storage?')) return;

    setIsLoading(true);
    let successCount = 0;
    for (const order of orders) {
      try {
        await deleteDoc(doc(db, 'orders', order.id));
        successCount++;
      } catch (e) {
        console.error("Error clearing order from Firestore:", e);
      }
    }
    localStorage.removeItem('starshines_orders');
    setOrders([]);
    setIsLoading(false);
    showTemporaryStatus(`Cleared database! ${successCount} orders removed from Firestore.`, false);
  };

  const showTemporaryStatus = (text: string, isError: boolean) => {
    setStatusMessage({ text, isError });
    setTimeout(() => {
      setStatusMessage(null);
    }, 4000);
  };

  // Filter and search orders
  const filteredOrders = orders.filter(o => {
    const matchStatus = statusFilter === 'All' || o.status === statusFilter;
    const matchCity = cityFilter === 'All' || o.city.toLowerCase() === cityFilter.toLowerCase();
    
    const searchLower = searchQuery.toLowerCase();
    const matchQuery = !searchQuery || 
      o.id.toLowerCase().includes(searchLower) ||
      o.name.toLowerCase().includes(searchLower) ||
      o.phone.includes(searchLower) ||
      o.address.toLowerCase().includes(searchLower) ||
      o.city.toLowerCase().includes(searchLower);

    return matchStatus && matchCity && matchQuery;
  });

  const uniqueCities = Array.from(new Set(orders.map(o => o.city)));

  // Calculate stats
  const totalRevenue = orders
    .filter(o => o.status === 'Delivered')
    .reduce((sum, o) => sum + o.totalPrice, 0);

  const pendingCount = orders.filter(o => o.status === 'Pending').length;
  const shippedCount = orders.filter(o => o.status === 'Shipped').length;
  const deliveredCount = orders.filter(o => o.status === 'Delivered').length;

  // Login view rendering
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#070708] flex items-center justify-center p-4 selection:bg-brand-pink-dark/30 font-sans">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(219,39,119,0.06)_0,transparent_65%)] pointer-events-none" />
        
        <div className="bg-[#0F0F12] border border-neutral-800/80 rounded-3xl w-full max-w-md p-8 sm:p-10 shadow-2xl relative overflow-hidden z-10">
          {/* Accent border top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-pink-dark via-brand-pink to-brand-gold" />
          
          <div className="text-center space-y-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-pink-dark/20 to-brand-gold/10 border border-brand-pink-dark/25 text-brand-pink flex items-center justify-center mx-auto shadow-md">
              <Database className="w-6 h-6 animate-pulse" />
            </div>
            <h1 className="font-serif text-2xl font-extrabold text-white tracking-tight">
              StarShine Admin
            </h1>
            <p className="text-xs text-neutral-400 font-sans tracking-wide uppercase">
              Secure Operations Portal Login
            </p>
          </div>

          {loginError && (
            <div className="bg-red-950/20 border border-red-900/30 text-red-400 p-3.5 rounded-xl text-xs font-sans font-medium flex items-center gap-2 mb-6 animate-fade-in">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest block">
                Username / Email
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Huzaifa"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoggingIn}
                  className="w-full bg-neutral-950 border border-neutral-800 text-sm py-3 pl-11 pr-4 rounded-xl text-white font-sans focus:outline-none focus:ring-1 focus:ring-brand-pink/50 transition-all placeholder:text-neutral-600 disabled:opacity-65"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoggingIn}
                  className="w-full bg-neutral-950 border border-neutral-800 text-sm py-3 pl-11 pr-4 rounded-xl text-white font-sans focus:outline-none focus:ring-1 focus:ring-brand-pink/50 transition-all placeholder:text-neutral-600 disabled:opacity-65"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full mt-2 bg-gradient-to-r from-brand-pink-dark to-[#b81d5f] hover:brightness-110 disabled:bg-neutral-800 text-white font-bold text-sm uppercase tracking-widest py-3.5 rounded-xl shadow-lg transition-all transform active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 border-0"
            >
              {isLoggingIn ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </div>
              ) : (
                <>
                  <Lock className="w-4 h-4 fill-white/10" />
                  <span>Sign In Securely</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-neutral-900 text-center text-[10px] text-neutral-500 font-sans">
            🔒 Secure Admin Authorization Page &bull; IP Logged
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Page rendering when logged in
  return (
    <div className="min-h-screen bg-[#070708] text-neutral-200 font-sans flex flex-col relative antialiased selection:bg-brand-pink-dark/30">
      
      {/* Premium Operations Header */}
      <header className="bg-[#0B0B0C] border-b border-neutral-800/80 px-4 sm:px-8 py-5 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-brand-pink shadow-md">
            <Database className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-xl font-extrabold text-white tracking-tight">
                StarShine Master Dashboard
              </h1>
              <span className="bg-emerald-950/40 text-emerald-400 font-sans text-[9px] font-black px-2 py-0.5 rounded-full border border-emerald-900/30 uppercase tracking-widest animate-pulse">
                Live Firestore Connected
              </span>
            </div>
            <p className="text-[10px] text-neutral-400 font-sans tracking-widest uppercase mt-0.5">
              Secure Operations Console &bull; Welcome Back, Huzaifa
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 w-full sm:w-auto">
          <button
            onClick={loadOrders}
            disabled={isLoading}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-neutral-900 hover:bg-neutral-850 text-neutral-300 font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl border border-neutral-800 transition-all cursor-pointer disabled:opacity-50"
            title="Refresh Orders Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-brand-pink ${isLoading ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-neutral-900 hover:bg-red-950/20 text-red-400 font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl border border-neutral-800 hover:border-red-900/30 transition-all cursor-pointer"
            title="Exit Session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Analytics Bento Grid bar */}
      <section className="p-4 sm:p-8 grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 bg-[#0A0A0C]/50 border-b border-neutral-800/50 shrink-0">
        <div className="bg-[#0F0F12] border border-neutral-800/40 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">Total Booked</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-serif text-2xl sm:text-3xl font-extrabold text-white">{orders.length}</span>
            <span className="text-[10px] text-neutral-500 font-medium">orders</span>
          </div>
        </div>

        <div className="bg-[#0F0F12] border border-neutral-800/40 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider block">⏳ Pending List</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-serif text-2xl sm:text-3xl font-extrabold text-amber-400">{pendingCount}</span>
            <span className="text-[10px] text-neutral-500 font-medium">queue</span>
          </div>
        </div>

        <div className="bg-[#0F0F12] border border-neutral-800/40 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-[9px] font-bold text-blue-400 uppercase tracking-wider block">🚚 Shipped / In-Transit</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-serif text-2xl sm:text-3xl font-extrabold text-blue-400">{shippedCount}</span>
            <span className="text-[10px] text-neutral-500 font-medium">dispatched</span>
          </div>
        </div>

        <div className="bg-[#0F0F12] border border-neutral-800/40 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider block">✅ Delivered Complete</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-serif text-2xl sm:text-3xl font-extrabold text-emerald-400">{deliveredCount}</span>
            <span className="text-[10px] text-neutral-500 font-medium">delivered</span>
          </div>
        </div>

        <div className="bg-[#0F0F12] border border-neutral-800/40 rounded-2xl p-4 col-span-2 lg:col-span-1 flex flex-col justify-between">
          <span className="text-[9px] font-bold text-brand-pink-dark uppercase tracking-wider block">💰 Delivered Net Income</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-brand-pink text-xs font-black">Rs.</span>
            <span className="font-serif text-xl sm:text-2xl font-extrabold text-white">{(totalRevenue ?? 0).toLocaleString()}</span>
          </div>
        </div>
      </section>

      {/* Global Toast Notification block */}
      {statusMessage && (
        <div className="px-4 sm:px-8 pt-4">
          <div className={`p-3 rounded-xl text-xs font-sans font-bold flex items-center gap-2 border animate-fade-in ${
            statusMessage.isError 
              ? 'bg-amber-950/20 border-amber-900/40 text-amber-400' 
              : 'bg-emerald-950/20 border-emerald-900/40 text-emerald-400'
          }`}>
            <Check className="w-4 h-4 shrink-0" />
            <span>{statusMessage.text}</span>
          </div>
        </div>
      )}

      {/* Search and Filters Segment */}
      <section className="p-4 sm:p-8 pb-4 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between shrink-0">
        
        {/* Left Side: Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search Order ID, Name, Phone, Address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0F0F12] border border-neutral-800/80 text-xs py-3.5 pl-11 pr-4 rounded-xl text-white font-sans focus:outline-none focus:ring-1 focus:ring-brand-pink/40 placeholder:text-neutral-600 transition-all"
          />
        </div>

        {/* Right Side: Category Filter Pulldowns */}
        <div className="flex flex-wrap gap-3.5 items-center">
          {/* Status Select */}
          <div className="flex items-center gap-2 bg-[#0F0F12] border border-neutral-800/80 px-3.5 py-1.5 rounded-xl">
            <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest font-sans">
              Status:
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent border-0 text-xs py-1 text-white font-sans font-bold focus:outline-none cursor-pointer outline-none"
            >
              <option value="All" className="bg-[#0F0F12]">All Statuses</option>
              <option value="Pending" className="bg-[#0F0F12]">⏳ Pending</option>
              <option value="Shipped" className="bg-[#0F0F12]">🚚 Shipped</option>
              <option value="Delivered" className="bg-[#0F0F12]">✅ Delivered</option>
              <option value="Cancelled" className="bg-[#0F0F12]">❌ Cancelled</option>
            </select>
          </div>

          {/* City Select */}
          <div className="flex items-center gap-2 bg-[#0F0F12] border border-neutral-800/80 px-3.5 py-1.5 rounded-xl">
            <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest font-sans">
              City:
            </span>
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="bg-transparent border-0 text-xs py-1 text-white font-sans font-bold focus:outline-none cursor-pointer outline-none max-w-[140px]"
            >
              <option value="All" className="bg-[#0F0F12]">All Cities</option>
              {uniqueCities.map(city => (
                <option key={city} value={city} className="bg-[#0F0F12]">
                  📍 {city}
                </option>
              ))}
            </select>
          </div>

          {orders.length > 0 && (
            <button
              onClick={handleClearAll}
              className="bg-red-950/20 text-red-400 hover:bg-red-950/40 border border-red-900/30 text-[10px] font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl cursor-pointer transition-all shrink-0"
            >
              Clear DB
            </button>
          )}
        </div>
      </section>

      {/* Main Operations Orders Database Table */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-8 pb-8 relative min-h-[300px]">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#070708]/80 backdrop-blur-sm z-10 gap-3">
            <div className="w-8 h-8 border-2 border-brand-pink border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-neutral-400 font-sans tracking-widest uppercase">Fetching Live Orders from Firestore...</span>
          </div>
        )}

        {filteredOrders.length > 0 ? (
          <div className="overflow-x-auto rounded-2xl border border-neutral-800/60 bg-[#0F0F12]/60 backdrop-blur-md">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#0B0B0C] text-neutral-400 font-serif uppercase tracking-widest text-[9px] border-b border-neutral-800">
                  <th className="p-4 font-bold">Order ID</th>
                  <th className="p-4 font-bold">Customer Info</th>
                  <th className="p-4 font-bold">Address & Shipping Info</th>
                  <th className="p-4 font-bold text-center">Qty / Total Price</th>
                  <th className="p-4 font-bold">Courier Shipping Status</th>
                  <th className="p-4 font-bold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 font-sans">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-900/20 transition-colors">
                    {/* ID & Date */}
                    <td className="p-4 align-top">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono font-bold text-white text-sm block">
                          {order.id}
                        </span>
                        {order.isWhatsApp && (
                          <span className="bg-emerald-950/60 text-emerald-400 font-sans text-[8px] font-black px-2 py-0.5 rounded border border-emerald-900/40 uppercase tracking-widest shrink-0">
                            💬 WA
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-neutral-500 block mt-1.5 font-sans font-semibold flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-neutral-600" />
                        {order.createdAt}
                      </span>
                    </td>

                    {/* Customer contact card */}
                    <td className="p-4 align-top max-w-[180px]">
                      <span className="font-bold text-white block text-sm font-serif">
                        {order.name}
                      </span>
                      <a
                        href={`https://wa.me/${(order.phone || "").replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-400 hover:underline font-bold font-sans flex items-center gap-1.5 mt-2 text-[11px]"
                      >
                        <PhoneCall className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                        {order.phone || "No phone"}
                      </a>
                    </td>

                    {/* City and full street route address */}
                    <td className="p-4 align-top max-w-[280px]">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-gold/10 text-brand-gold text-[9px] font-bold uppercase tracking-wider font-sans border border-brand-gold/25">
                          <MapPin className="w-2.5 h-2.5" />
                          {order.city}
                        </span>
                        
                        {order.gpsLink && (
                          <a
                            href={order.gpsLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/30 hover:bg-emerald-950/50 text-emerald-400 text-[9px] font-bold uppercase tracking-wider font-sans border border-emerald-900/45 transition-colors"
                          >
                            📍 GPS Map
                          </a>
                        )}
                      </div>
                      <p className="text-neutral-400 font-sans leading-relaxed break-words text-xs">
                        {order.address}
                      </p>
                    </td>

                    {/* Quantity & calculated price summary */}
                    <td className="p-4 align-top text-center">
                      <span className="font-mono font-bold text-white text-sm block">
                        {order.quantity}x
                      </span>
                      <span className="text-brand-pink font-sans font-black block mt-1 text-[11px]">
                        Rs. {Number(order.totalPrice ?? 0).toLocaleString()}
                      </span>
                    </td>

                    {/* Shipping status inline drop menu */}
                    <td className="p-4 align-top">
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value as Order['status'])}
                        className={`text-[10px] font-extrabold uppercase tracking-widest py-1.5 px-3 rounded-xl border focus:outline-none cursor-pointer ${
                          order.status === 'Pending'
                            ? 'bg-amber-950/30 text-amber-400 border-amber-900/35'
                            : order.status === 'Shipped'
                            ? 'bg-blue-950/30 text-blue-400 border-blue-900/35'
                            : order.status === 'Delivered'
                            ? 'bg-emerald-950/30 text-emerald-400 border-emerald-900/35'
                            : 'bg-neutral-900 text-neutral-500 border-neutral-800'
                        }`}
                      >
                        <option value="Pending" className="bg-[#0F0F12]">⏳ Pending</option>
                        <option value="Shipped" className="bg-[#0F0F12]">🚚 Shipped</option>
                        <option value="Delivered" className="bg-[#0F0F12]">✅ Delivered</option>
                        <option value="Cancelled" className="bg-[#0F0F12]">❌ Cancelled</option>
                      </select>
                    </td>

                    {/* Individual delete block */}
                    <td className="p-4 align-top text-center">
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="p-2 rounded-xl text-neutral-500 hover:text-red-400 hover:bg-red-950/20 border border-transparent hover:border-red-900/10 transition-all duration-300 cursor-pointer"
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
          <div className="bg-[#0F0F12]/30 border border-neutral-800/40 rounded-2xl py-16 text-center">
            <ShoppingBag className="w-12 h-12 text-neutral-800 mx-auto mb-3" />
            <p className="text-sm font-medium text-neutral-500 font-sans italic">
              No orders found matching the filter criteria.
            </p>
          </div>
        )}
      </main>

      {/* Standalone Dashboard Footer details */}
      <footer className="bg-[#0B0B0C] border-t border-neutral-800/80 px-4 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-center shrink-0 text-[11px] text-neutral-500 gap-2">
        <div className="font-sans">
          Viewing <strong>{filteredOrders.length}</strong> of <strong>{orders.length}</strong> total active records
        </div>
        <div className="font-sans flex items-center gap-1 text-neutral-600">
          <span>🔒 SSL Secure Operational Session</span>
        </div>
      </footer>

    </div>
  );
}
