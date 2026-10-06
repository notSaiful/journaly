import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Lightbulb, 
  Plus, 
  Trash2, 
  Edit3, 
  Database, 
  Globe, 
  GitBranch, 
  Search, 
  Filter, 
  ArrowRight, 
  ExternalLink, 
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  ShoppingBag
} from 'lucide-react';
import { 
  fetchOrders, 
  updateOrderTracking, 
  fetchIdeas, 
  saveIdea, 
  deleteIdea, 
  isSupabaseConnected 
} from '../utils/supabase';

export default function AdminPortalPage() {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'ideas' | 'integrations'
  const [orders, setOrders] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isSupabaseLive, setIsSupabaseLive] = useState(false);

  // Tracking edit modal state
  const [editingOrder, setEditingOrder] = useState(null);
  const [courierInput, setCourierInput] = useState('');
  const [trackingNumberInput, setTrackingNumberInput] = useState('');
  const [fulfillmentStatusInput, setFulfillmentStatusInput] = useState('Processing');
  const [isSavingTracking, setIsSavingTracking] = useState(false);

  // New Idea form state
  const [isAddingIdea, setIsAddingIdea] = useState(false);
  const [ideaTitle, setIdeaTitle] = useState('');
  const [ideaCategory, setIdeaCategory] = useState('Habit Innovation');
  const [ideaDescription, setIdeaDescription] = useState('');
  const [ideaStatus, setIdeaStatus] = useState('Idea');

  // Copy feedback
  const [copiedKey, setCopiedKey] = useState(null);
  const [actionNotice, setActionNotice] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setIsSupabaseLive(isSupabaseConnected());
    const [fetchedOrders, fetchedIdeas] = await Promise.all([
      fetchOrders(),
      fetchIdeas()
    ]);
    setOrders(fetchedOrders);
    setIdeas(fetchedIdeas);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const showNotice = (msg) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3000);
  };

  // Tracking modal opener
  const handleOpenTrackingModal = (order) => {
    setEditingOrder(order);
    setCourierInput(order.courier || 'BlueDart Express');
    setTrackingNumberInput(order.tracking_number || '');
    setFulfillmentStatusInput(order.fulfillment_status || 'Processing');
  };

  // Save tracking info
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
    showNotice(`Updated tracking for Order #${editingOrder.id}`);
  };

  // Add new idea
  const handleCreateIdea = async (e) => {
    e.preventDefault();
    if (!ideaTitle.trim()) return;

    const newIdea = await saveIdea({
      title: ideaTitle.trim(),
      category: ideaCategory,
      description: ideaDescription.trim(),
      status: ideaStatus
    });

    setIdeas([newIdea, ...ideas]);
    setIdeaTitle('');
    setIdeaDescription('');
    setIsAddingIdea(false);
    showNotice(`Idea "${newIdea.title}" added to roadmap`);
  };

  // Delete idea
  const handleDeleteIdea = async (id) => {
    const updated = await deleteIdea(id);
    setIdeas(updated);
    showNotice('Idea removed from backlog');
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
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
        
        {/* Top Header & Supabase/Domain Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5DDCF] mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E5A93C] animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8C6D46] font-semibold">
                Journaly Management Portal
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-medium text-[#1E1B18] tracking-tight">
              Atelier Operations & Order Tracking
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
            {/* Domain Status */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E5DDCF] shadow-2xs">
              <Globe className="w-3.5 h-3.5 text-[#345941]" />
              <span className="text-[#1E1B18] font-semibold">journaly.in</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>

            {/* Supabase Status */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border shadow-2xs ${
              isSupabaseLive 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                : 'bg-[#F4EFE6] border-[#E5DDCF] text-[#6A6054]'
            }`}>
              <Database className="w-3.5 h-3.5" />
              <span>{isSupabaseLive ? 'Supabase Live' : 'Offline / Local Sync'}</span>
            </div>

            {/* Refresh */}
            <button
              onClick={loadData}
              className="p-2 rounded-full bg-white border border-[#E5DDCF] hover:bg-[#F4EFE6] transition-colors cursor-pointer text-[#6A6054]"
              title="Refresh Data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Global Action Notice */}
        {actionNotice && (
          <div className="mb-6 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-fade-in">
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

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#E5DDCF] mb-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-4 text-xs font-mono uppercase tracking-wider font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'border-[#1E1B18] text-[#1E1B18]'
                : 'border-transparent text-[#8C7E72] hover:text-[#1E1B18]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Orders & Fulfillment ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('ideas')}
            className={`pb-3 px-4 text-xs font-mono uppercase tracking-wider font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'ideas'
                ? 'border-[#1E1B18] text-[#1E1B18]'
                : 'border-transparent text-[#8C7E72] hover:text-[#1E1B18]'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span>Habit & Product Ideas ({ideas.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('integrations')}
            className={`pb-3 px-4 text-xs font-mono uppercase tracking-wider font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'integrations'
                ? 'border-[#1E1B18] text-[#1E1B18]'
                : 'border-transparent text-[#8C7E72] hover:text-[#1E1B18]'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Supabase + GitHub + Domain</span>
          </button>
        </div>

        {/* TAB 1: ORDERS & TRACKING MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            
            {/* Search & Filter Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E5DDCF]">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#8C7E72] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by Order ID, customer name, email, or payment ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-xs text-[#1E1B18] focus:outline-none focus:border-[#E5A93C]"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-[#8C7E72]" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-xs font-mono text-[#1E1B18] cursor-pointer focus:outline-none"
                >
                  <option value="all">All Statuses</option>
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
                                {order.payment_id || 'pay_online'}
                              </span>
                            </td>

                            {/* Customer Info */}
                            <td className="py-4 px-4">
                              <span className="font-medium text-[#1E1B18] block">{order.customer_name}</span>
                              <span className="text-[#6A6054] block">{order.customer_email}</span>
                              <span className="text-[10px] font-mono text-[#8C7E72]">{order.customer_phone}</span>
                            </td>

                            {/* Shipping Address */}
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

                            {/* Fulfillment Status & Tracking Number */}
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

                            {/* Action Button */}
                            <td className="py-4 px-4 text-right">
                              <button
                                onClick={() => handleOpenTrackingModal(order)}
                                className="px-3 py-1.5 rounded-full bg-[#1E1B18] text-[#FAF7F2] hover:bg-[#332C26] transition-all text-[11px] font-mono uppercase tracking-wider cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
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

          </div>
        )}

        {/* TAB 2: IDEAS & ROADMAP BACKLOG */}
        {activeTab === 'ideas' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E5DDCF]">
              <div>
                <h3 className="font-serif text-xl font-medium text-[#1E1B18]">
                  Product & Habit Innovation Backlog
                </h3>
                <p className="text-xs text-[#6A6054] mt-1 font-light">
                  Track new editions, IntelligentLab prompt expansions, habit companions, and customer ideas.
                </p>
              </div>

              <button
                onClick={() => setIsAddingIdea(!isAddingIdea)}
                className="px-5 py-2.5 rounded-full bg-[#1E1B18] text-[#FAF7F2] hover:bg-[#332C26] transition-all text-xs font-mono uppercase tracking-wider cursor-pointer inline-flex items-center gap-2 shadow-xs"
              >
                <Plus className="w-4 h-4 text-[#E5A93C]" />
                <span>{isAddingIdea ? 'Cancel' : 'Add New Idea'}</span>
              </button>
            </div>

            {/* Add Idea Collapsible Form */}
            {isAddingIdea && (
              <form onSubmit={handleCreateIdea} className="p-6 bg-white rounded-2xl border border-[#E5A93C] shadow-md space-y-4 animate-fade-in">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5A93C] font-semibold block">
                  New Product / Prompt Concept
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#6A6054] block mb-1">
                      Concept Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Midnight Sleep Reflection Edition"
                      value={ideaTitle}
                      onChange={(e) => setIdeaTitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-xs text-[#1E1B18] focus:outline-none focus:border-[#E5A93C]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-[#6A6054] block mb-1">
                        Category
                      </label>
                      <select
                        value={ideaCategory}
                        onChange={(e) => setIdeaCategory(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-xs font-mono text-[#1E1B18] focus:outline-none"
                      >
                        <option value="New Edition">New Edition</option>
                        <option value="Habit Innovation">Habit Innovation</option>
                        <option value="Digital Companion">Digital Companion</option>
                        <option value="Accessory">Accessory</option>
                        <option value="Packaging">Packaging</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-[#6A6054] block mb-1">
                        Status
                      </label>
                      <select
                        value={ideaStatus}
                        onChange={(e) => setIdeaStatus(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-xs font-mono text-[#1E1B18] focus:outline-none"
                      >
                        <option value="Idea">Idea</option>
                        <option value="Planned">Planned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Launched">Launched</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#6A6054] block mb-1">
                    Description & Habit Rationale
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe how this helps people build habits or record their real life..."
                    value={ideaDescription}
                    onChange={(e) => setIdeaDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-xs text-[#1E1B18] focus:outline-none focus:border-[#E5A93C]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingIdea(false)}
                    className="px-4 py-2 rounded-full border border-[#E5DDCF] text-xs font-mono text-[#6A6054] hover:bg-[#FAF7F2] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-full bg-[#1E1B18] text-[#FAF7F2] hover:bg-[#332C26] text-xs font-mono uppercase tracking-wider cursor-pointer shadow-2xs"
                  >
                    Save Concept
                  </button>
                </div>
              </form>
            )}

            {/* Ideas Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ideas.map((idea) => {
                const statusStyles = {
                  Idea: 'bg-stone-100 text-stone-700 border-stone-300',
                  Planned: 'bg-amber-50 text-amber-800 border-amber-200',
                  'In Progress': 'bg-blue-50 text-blue-800 border-blue-200',
                  Launched: 'bg-emerald-50 text-emerald-800 border-emerald-200'
                };

                return (
                  <div
                    key={idea.id}
                    className="p-6 rounded-2xl bg-white border border-[#E5DDCF] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[#8C6D46] border border-[#E5DDCF]">
                          {idea.category}
                        </span>
                        <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${statusStyles[idea.status] || statusStyles.Idea}`}>
                          {idea.status}
                        </span>
                      </div>

                      <h4 className="font-serif text-lg font-medium text-[#1E1B18] mb-2">
                        {idea.title}
                      </h4>

                      <p className="text-xs text-[#6A6054] font-light leading-relaxed mb-4">
                        {idea.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E5DDCF]/60 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#8C7E72]">
                        {new Date(idea.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                      </span>

                      <button
                        onClick={() => handleDeleteIdea(idea.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Delete Idea"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* TAB 3: INTEGRATIONS GUIDE (SUPABASE + GITHUB + DOMAIN) */}
        {activeTab === 'integrations' && (
          <div className="space-y-6 max-w-4xl">
            
            {/* Domain status banner */}
            <div className="p-6 rounded-2xl bg-white border border-[#E5DDCF] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-medium text-[#1E1B18]">
                      Custom Domain: journaly.in
                    </h3>
                    <p className="text-xs text-[#6A6054]">
                      Configured in <code className="font-mono bg-[#FAF7F2] px-1 py-0.5 rounded">public/CNAME</code>, <code className="font-mono bg-[#FAF7F2] px-1 py-0.5 rounded">robots.txt</code>, and <code className="font-mono bg-[#FAF7F2] px-1 py-0.5 rounded">sitemap.xml</code>.
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-semibold">
                  DNS Configured
                </span>
              </div>
            </div>

            {/* Supabase Schema Box */}
            <div className="p-6 rounded-2xl bg-white border border-[#E5DDCF] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#E5A93C]/15 text-[#8C6D46] border border-[#E5DDCF]">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-medium text-[#1E1B18]">
                      Supabase Cloud Database Schema
                    </h3>
                    <p className="text-xs text-[#6A6054]">
                      Run this SQL in your Supabase SQL Editor to initialize the tables for orders and ideas:
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(`
-- Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  shipping_address TEXT,
  city TEXT,
  postal_code TEXT,
  items JSONB,
  amount NUMERIC,
  currency TEXT DEFAULT 'INR',
  payment_id TEXT,
  payment_status TEXT DEFAULT 'PAID',
  fulfillment_status TEXT DEFAULT 'Processing',
  courier TEXT DEFAULT '',
  tracking_number TEXT DEFAULT ''
);

-- Ideas Backlog Table
CREATE TABLE IF NOT EXISTS public.ideas (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  category TEXT,
  description TEXT,
  status TEXT DEFAULT 'Idea'
);

-- Public Read & Insert Policies for storefront
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ideas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert and read orders" ON public.orders FOR ALL USING (true);
CREATE POLICY "Allow public manage ideas" ON public.ideas FOR ALL USING (true);
                  `, 'sql')}
                  className="px-3 py-1.5 rounded-full border border-[#E5DDCF] bg-[#FAF7F2] hover:bg-[#F4EFE6] text-xs font-mono text-[#1E1B18] cursor-pointer inline-flex items-center gap-1.5"
                >
                  {copiedKey === 'sql' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'sql' ? 'Copied SQL!' : 'Copy SQL'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-[#2B2520] text-stone-200 text-[11px] font-mono overflow-x-auto leading-relaxed">
{`-- Orders Table for journaly.in
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  shipping_address TEXT,
  city TEXT,
  postal_code TEXT,
  items JSONB,
  amount NUMERIC,
  currency TEXT DEFAULT 'INR',
  payment_id TEXT,
  payment_status TEXT DEFAULT 'PAID',
  fulfillment_status TEXT DEFAULT 'Processing',
  courier TEXT DEFAULT '',
  tracking_number TEXT DEFAULT ''
);

-- Ideas Roadmap Table
CREATE TABLE IF NOT EXISTS public.ideas (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  category TEXT,
  description TEXT,
  status TEXT DEFAULT 'Idea'
);`}
              </pre>
            </div>

            {/* GitHub Push Instructions */}
            <div className="p-6 rounded-2xl bg-white border border-[#E5DDCF] shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#FAF7F2] text-[#1E1B18] border border-[#E5DDCF]">
                  <GitBranch className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-[#1E1B18]">
                    GitHub Deployment Commands
                  </h3>
                  <p className="text-xs text-[#6A6054]">
                    Repository is initialized. To push to your GitHub account:
                  </p>
                </div>
              </div>

              <pre className="p-4 rounded-xl bg-[#2B2520] text-stone-200 text-[11px] font-mono overflow-x-auto leading-relaxed">
{`git add .
git commit -m "feat: Habit journaling launch, IntelligentLab questions, admin portal & Razorpay"
git branch -M main
git remote add origin https://github.com/<your-username>/journaly-in.git
git push -u origin main`}
              </pre>
            </div>

          </div>
        )}

        {/* MODAL: EDIT TRACKING DETAILS */}
        {editingOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-fade-in">
            <div className="w-full max-w-lg bg-white rounded-3xl border border-[#E5DDCF] shadow-2xl p-6 sm:p-8 relative">
              <div className="border-b border-[#E5DDCF] pb-4 mb-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5A93C] font-semibold block mb-1">
                  Dispatch & Tracking
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
                    Courier Partner
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
                    placeholder="e.g. BLD849204918IN"
                    value={trackingNumberInput}
                    onChange={(e) => setTrackingNumberInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-xs font-mono text-[#1E1B18] focus:outline-none focus:border-[#E5A93C]"
                  />
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
                            ? 'bg-[#1E1B18] text-[#FAF7F2] border-[#1E1B18] font-semibold'
                            : 'bg-[#FAF7F2] border-[#E5DDCF] text-[#6A6054]'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

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
                    className="px-6 py-2.5 rounded-full bg-[#1E1B18] hover:bg-[#332C26] text-[#FAF7F2] text-xs font-mono uppercase tracking-wider cursor-pointer shadow-xs"
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
