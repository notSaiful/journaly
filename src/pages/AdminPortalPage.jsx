import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Edit3, 
  Globe, 
  Search, 
  Filter, 
  RefreshCw,
  ShoppingBag,
  MapPin,
  Check
} from 'lucide-react';
import { 
  fetchOrders, 
  updateOrderTracking, 
  isSupabaseConnected 
} from '../utils/supabase';

export default function AdminPortalPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isSupabaseLive, setIsSupabaseLive] = useState(false);

  // Tracking edit modal state
  const [editingOrder, setEditingOrder] = useState(null);
  const [courierInput, setCourierInput] = useState('BlueDart Express');
  const [trackingNumberInput, setTrackingNumberInput] = useState('');
  const [fulfillmentStatusInput, setFulfillmentStatusInput] = useState('Processing');
  const [isSavingTracking, setIsSavingTracking] = useState(false);

  // Notice feedback
  const [actionNotice, setActionNotice] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setIsSupabaseLive(isSupabaseConnected());
    try {
      const fetchedOrders = await fetchOrders();
      setOrders(fetchedOrders);
    } catch (err) {
      console.warn('Failed to load orders in admin portal:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const showNotice = (msg) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3000);
  };

  // Open tracking modal
  const handleOpenTrackingModal = (order) => {
    setEditingOrder(order);
    setCourierInput(order.courier || 'BlueDart Express');
    setTrackingNumberInput(order.tracking_number || '');
    setFulfillmentStatusInput(order.fulfillment_status || 'Processing');
  };

  // Save tracking details
  const handleSaveTracking = async (e) => {
    e.preventDefault();
    if (!editingOrder) return;

    setIsSavingTracking(true);
    const updated = await updateOrderTracking(editingOrder.id, {
      courier: courierInput,
      tracking_number: trackingNumberInput,
      fulfillment_status: fulfillmentStatusInput
    });

    setOrders(updated);
    setIsSavingTracking(false);
    setEditingOrder(null);
    showNotice(`Updated tracking & AWB for Order #${editingOrder.id}`);
  };

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch = 
      (o.id && o.id.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (o.customer_name && o.customer_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (o.customer_email && o.customer_email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (o.payment_id && o.payment_id.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || o.fulfillment_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Analytics Metrics
  const totalRevenue = orders.reduce((acc, o) => acc + (Number(o.amount) || 0), 0);
  const totalOrdersCount = orders.length;
  const processingCount = orders.filter((o) => o.fulfillment_status === 'Processing').length;
  const dispatchedCount = orders.filter((o) => o.fulfillment_status === 'Dispatched').length;
  const deliveredCount = orders.filter((o) => o.fulfillment_status === 'Delivered').length;

  return (
    <div className="bg-[#FAF7F2] text-[#1E1B18] font-sans min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5DDCF] mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E5A93C] animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8C6D46] font-semibold">
                Journaly Operations
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-medium text-[#1E1B18] tracking-tight">
              Order Fulfillment & Courier Tracking
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
            {/* Domain Status */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E5DDCF] shadow-2xs">
              <Globe className="w-3.5 h-3.5 text-[#345941]" />
              <span className="text-[#1E1B18] font-semibold">journaly.in</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>

            {/* Refresh Button (White Button) */}
            <button
              onClick={loadData}
              className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#F4EFE6] text-[#1E1B18] border border-[#E5DDCF] font-mono transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
              title="Refresh Orders"
            >
              <RefreshCw className="w-3 h-3 text-[#8C6D46]" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Action Notice */}
        {actionNotice && (
          <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-fade-in shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Metrics Overview Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 mb-8">
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5DDCF] shadow-2xs">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C7E72] block mb-1">
              Total Revenue
            </span>
            <span className="font-serif text-xl sm:text-2xl font-bold text-[#1E1B18]">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5DDCF] shadow-2xs">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C7E72] block mb-1">
              Total Orders
            </span>
            <span className="font-serif text-xl sm:text-2xl font-bold text-[#1E1B18]">
              {totalOrdersCount}
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5DDCF] shadow-2xs">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-700 block mb-1">
              Processing
            </span>
            <span className="font-serif text-xl sm:text-2xl font-bold text-amber-900">
              {processingCount}
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5DDCF] shadow-2xs">
            <span className="text-[10px] font-mono uppercase tracking-wider text-blue-700 block mb-1">
              Dispatched
            </span>
            <span className="font-serif text-xl sm:text-2xl font-bold text-blue-900">
              {dispatchedCount}
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1 p-4 sm:p-5 rounded-2xl bg-white border border-[#E5DDCF] shadow-2xs">
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 block mb-1">
              Delivered
            </span>
            <span className="font-serif text-xl sm:text-2xl font-bold text-emerald-900">
              {deliveredCount}
            </span>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-[#8C6D46]" />
            <h2 className="font-serif text-xl font-medium text-[#1E1B18]">
              Customer Orders & Tracking ({filteredOrders.length})
            </h2>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E5DDCF] mb-6 shadow-2xs">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8C7E72] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Order ID, customer name, email, or payment ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-xs text-[#1E1B18] focus:outline-none focus:border-[#E5A93C]"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-[#8C7E72]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-xs font-mono text-[#1E1B18] cursor-pointer focus:outline-none"
            >
              <option value="all">All Fulfillment Statuses</option>
              <option value="Processing">Processing</option>
              <option value="Dispatched">Dispatched</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-[#E5DDCF] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] border-b border-[#E5DDCF] text-[#8C7E72] font-mono uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Order ID & Date</th>
                  <th className="py-3.5 px-4">Customer & Contact</th>
                  <th className="py-3.5 px-4">Shipping Destination</th>
                  <th className="py-3.5 px-4">Items Ordered</th>
                  <th className="py-3.5 px-4">Amount</th>
                  <th className="py-3.5 px-4">Fulfillment & Tracking</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DDCF]/60">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-[#8C7E72] font-mono">
                      No orders found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => {
                    const dateFormatted = new Date(order.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    });

                    const statusColors = {
                      Processing: 'bg-amber-50 text-amber-800 border-amber-200',
                      Dispatched: 'bg-blue-50 text-blue-800 border-blue-200',
                      Delivered: 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    };

                    return (
                      <tr key={order.id} className="hover:bg-[#FAF7F2]/50 transition-colors">
                        {/* Order ID & Date */}
                        <td className="py-4 px-4 font-mono">
                          <span className="font-semibold text-[#1E1B18] block">{order.id}</span>
                          <span className="text-[10px] text-[#8C7E72]">{dateFormatted}</span>
                          <span className="text-[9px] text-[#8C7E72] block mt-0.5 truncate max-w-[110px]" title={order.payment_id}>
                            {order.payment_id || 'pay_verified'}
                          </span>
                        </td>

                        {/* Customer Info */}
                        <td className="py-4 px-4">
                          <span className="font-medium text-[#1E1B18] block">{order.customer_name}</span>
                          <span className="text-[#6A6054] block">{order.customer_email}</span>
                          <span className="text-[10px] font-mono text-[#8C7E72]">{order.customer_phone}</span>
                        </td>

                        {/* Shipping Destination */}
                        <td className="py-4 px-4 max-w-[180px]">
                          <p className="text-[#6A6054] truncate" title={order.shipping_address}>
                            {order.shipping_address}
                          </p>
                          <span className="text-[10px] font-mono text-[#8C7E72]">
                            {order.city}, PIN {order.postal_code}
                          </span>
                        </td>

                        {/* Items */}
                        <td className="py-4 px-4">
                          {order.items?.map((it, idx) => (
                            <div key={idx} className="leading-snug">
                              <span className="font-medium text-[#1E1B18]">{it.quantity}x</span>{' '}
                              <span className="text-[#6A6054]">{it.name}</span>
                            </div>
                          ))}
                        </td>

                        {/* Amount */}
                        <td className="py-4 px-4 font-mono font-semibold text-[#1E1B18]">
                          ₹{Number(order.amount).toLocaleString('en-IN')}
                        </td>

                        {/* Fulfillment Status & Tracking */}
                        <td className="py-4 px-4">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border font-medium mb-1.5 ${statusColors[order.fulfillment_status] || statusColors.Processing}`}>
                            {order.fulfillment_status || 'Processing'}
                          </span>
                          {order.tracking_number ? (
                            <div className="text-[11px] font-mono text-[#4A4138]">
                              <span className="text-[10px] text-[#8C7E72] block">{order.courier || 'Courier'}:</span>
                              <span className="font-semibold text-blue-900">{order.tracking_number}</span>
                            </div>
                          ) : (
                            <span className="text-[10px] font-mono text-amber-700 block italic">
                              Awaiting Tracking AWB
                            </span>
                          )}
                        </td>

                        {/* Action: White Button */}
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => handleOpenTrackingModal(order)}
                            className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#F4EFE6] text-[#1E1B18] border-2 border-[#1E1B18] transition-all text-[11px] font-mono uppercase tracking-wider cursor-pointer inline-flex items-center gap-1.5 shadow-2xs active:scale-95 font-semibold"
                          >
                            <Edit3 className="w-3 h-3 text-[#E5A93C]" />
                            <span>Manage</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL: EDIT TRACKING DETAILS */}
        {editingOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-fade-in">
            <div className="w-full max-w-lg bg-white rounded-3xl border border-[#E5DDCF] shadow-2xl p-6 sm:p-8 relative">
              <div className="border-b border-[#E5DDCF] pb-4 mb-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5A93C] font-semibold block mb-1">
                  Dispatch & Courier Milestone
                </span>
                <h3 className="font-serif text-xl font-medium text-[#1E1B18]">
                  Manage Order #{editingOrder.id}
                </h3>
                <p className="text-xs text-[#6A6054] mt-1">
                  Customer: <span className="font-medium text-[#1E1B18]">{editingOrder.customer_name}</span> ({editingOrder.city})
                </p>
              </div>

              <form onSubmit={handleSaveTracking} className="space-y-4">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#6A6054] block mb-1">
                    Courier Partner (India)
                  </label>
                  <select
                    value={courierInput}
                    onChange={(e) => setCourierInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-xs font-mono text-[#1E1B18] focus:outline-none focus:border-[#E5A93C]"
                  >
                    <option value="BlueDart Express">BlueDart Express</option>
                    <option value="Delhivery Surface">Delhivery Surface</option>
                    <option value="DTDC Express">DTDC Express</option>
                    <option value="India Post SpeedPost">India Post SpeedPost</option>
                    <option value="Shadowfax">Shadowfax</option>
                    <option value="Xpressbees">Xpressbees</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#6A6054] block mb-1">
                    AWB / Consignment Tracking Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BLD-BLR-84920"
                    value={trackingNumberInput}
                    onChange={(e) => setTrackingNumberInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-xs font-mono text-[#1E1B18] focus:outline-none focus:border-[#E5A93C]"
                  >
                  </input>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#6A6054] block mb-1">
                    Fulfillment Status
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Processing', 'Dispatched', 'Delivered'].map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setFulfillmentStatusInput(st)}
                        className={`py-2 px-3 rounded-xl border text-xs font-mono cursor-pointer transition-all ${
                          fulfillmentStatusInput === st
                            ? 'bg-white text-[#1E1B18] border-2 border-[#1E1B18] font-bold shadow-xs'
                            : 'bg-[#FAF7F2] border-[#E5DDCF] text-[#6A6054] hover:border-[#1E1B18]'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* White Buttons for Modal Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-[#E5DDCF]">
                  <button
                    type="button"
                    onClick={() => setEditingOrder(null)}
                    className="px-5 py-2.5 rounded-full border border-[#E5DDCF] text-xs font-mono text-[#6A6054] hover:bg-[#FAF7F2] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingTracking}
                    className="px-6 py-2.5 rounded-full bg-white hover:bg-[#F4EFE6] text-[#1E1B18] border-2 border-[#1E1B18] text-xs font-mono uppercase tracking-wider font-semibold cursor-pointer shadow-xs active:scale-95"
                  >
                    {isSavingTracking ? 'Saving...' : 'Save Tracking Info'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
