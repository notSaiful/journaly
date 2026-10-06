import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isConfigured = 
  Boolean(supabaseUrl) && 
  Boolean(supabaseAnonKey) && 
  !supabaseUrl.includes('xyzcompany') && 
  !supabaseUrl.includes('your-project-id');

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export function isSupabaseConnected() {
  return isConfigured && Boolean(supabase);
}

// Default initial mock orders so the admin portal and tracking page are immediately interactive
const INITIAL_ORDERS = [
  {
    id: 'JRN-94821',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    customer_name: 'Pooja Sharma',
    customer_email: 'pooja.s@gmail.com',
    customer_phone: '+91 98201 44321',
    shipping_address: 'Flat 302, Palm Meadows, Whitefield',
    city: 'Bengaluru',
    postal_code: '560066',
    items: [
      { name: '5 Minutes Guided Journal — Daisy Meadow', quantity: 1, price: 599 }
    ],
    amount: 599,
    currency: 'INR',
    payment_id: 'pay_P8tLQ9lL001',
    payment_status: 'PAID',
    fulfillment_status: 'Processing',
    courier: 'BlueDart Express',
    tracking_number: 'BLD-BLR-84920'
  },
  {
    id: 'JRN-94819',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    customer_name: 'Arjun Mehta',
    customer_email: 'arjun.mehta@outlook.com',
    customer_phone: '+91 98112 55432',
    shipping_address: 'B-14, Defence Colony',
    city: 'New Delhi',
    postal_code: '110024',
    items: [
      { name: '5 Minutes Gratitude Journal — Watercolour Blossom', quantity: 2, price: 349 }
    ],
    amount: 698,
    currency: 'INR',
    payment_id: 'pay_P8tLQ9lL002',
    payment_status: 'PAID',
    fulfillment_status: 'Dispatched',
    courier: 'Delhivery Surface',
    tracking_number: 'DLV-DEL-55419'
  },
  {
    id: 'JRN-94815',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    customer_name: 'Kavita Nair',
    customer_email: 'kavita.nair@icloud.com',
    customer_phone: '+91 97401 22987',
    shipping_address: '12-A, Marine Drive Promenade',
    city: 'Mumbai',
    postal_code: '400020',
    items: [
      { name: '5 Minutes Manifestation Journal — Coral Daisy', quantity: 1, price: 499 }
    ],
    amount: 499,
    currency: 'INR',
    payment_id: 'pay_P8tLQ9lL003',
    payment_status: 'PAID',
    fulfillment_status: 'Delivered',
    courier: 'BlueDart Express',
    tracking_number: 'BLD-MUM-99281'
  }
];

// Initial Ideas / Product Roadmap Backlog
const INITIAL_IDEAS = [
  {
    id: 'idea-1',
    title: 'Daily Habit WhatsApp / Email Prompt Bot',
    category: 'Digital Companion',
    description: 'Send users a daily 8:00 AM prompt notification to remind them to take 5 minutes with their Journaly book.',
    status: 'In Progress',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString()
  },
  {
    id: 'idea-2',
    title: 'Evening Reflection Edition — Dark Indigo Cover',
    category: 'New Edition',
    description: 'A focused night-time journal featuring IntelligentLab questions for releasing anxiety, mental unburdening, and sleep clarity.',
    status: 'Planned',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString()
  },
  {
    id: 'idea-3',
    title: 'Custom Journaly Wooden Desk Stand',
    category: 'Accessory',
    description: 'A minimalist oak/walnut stand that keeps the open journal visible on the desk to trigger the daily habit cue.',
    status: 'Idea',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString()
  }
];

// --- Order Operations ---

export async function fetchOrders() {
  if (isSupabaseConnected()) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (err) {
      console.warn('Supabase fetchOrders error, falling back to local storage:', err);
    }
  }

  // Fallback to localStorage
  try {
    const local = localStorage.getItem('journaly_admin_orders');
    if (local) {
      return JSON.parse(local);
    }
    localStorage.setItem('journaly_admin_orders', JSON.stringify(INITIAL_ORDERS));
    return INITIAL_ORDERS;
  } catch {
    return INITIAL_ORDERS;
  }
}

export async function saveOrder(order) {
  const newOrder = {
    ...order,
    id: order.id || `JRN-${Math.floor(100000 + Math.random() * 900000)}`,
    created_at: order.created_at || new Date().toISOString(),
    fulfillment_status: order.fulfillment_status || 'Processing',
    courier: order.courier || '',
    tracking_number: order.tracking_number || ''
  };

  if (isSupabaseConnected()) {
    try {
      await supabase.from('orders').insert([newOrder]);
    } catch (err) {
      console.warn('Supabase saveOrder error:', err);
    }
  }

  // Always sync to local storage
  try {
    const existing = await fetchOrders();
    const updated = [newOrder, ...existing.filter((o) => o.id !== newOrder.id)];
    localStorage.setItem('journaly_admin_orders', JSON.stringify(updated));
  } catch (err) {
    console.error('LocalStorage save error:', err);
  }

  return newOrder;
}

export async function updateOrderTracking(orderId, { courier, tracking_number, fulfillment_status }) {
  if (isSupabaseConnected()) {
    try {
      await supabase
        .from('orders')
        .update({ courier, tracking_number, fulfillment_status })
        .eq('id', orderId);
    } catch (err) {
      console.warn('Supabase updateOrderTracking error:', err);
    }
  }

  // Update local storage
  try {
    const existing = await fetchOrders();
    const updated = existing.map((o) => {
      if (o.id === orderId) {
        return {
          ...o,
          courier: courier !== undefined ? courier : o.courier,
          tracking_number: tracking_number !== undefined ? tracking_number : o.tracking_number,
          fulfillment_status: fulfillment_status !== undefined ? fulfillment_status : o.fulfillment_status
        };
      }
      return o;
    });
    localStorage.setItem('journaly_admin_orders', JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('LocalStorage update error:', err);
    return [];
  }
}

// --- Ideas Backlog Operations ---

export async function fetchIdeas() {
  if (isSupabaseConnected()) {
    try {
      const { data, error } = await supabase
        .from('ideas')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (err) {
      console.warn('Supabase fetchIdeas error, falling back:', err);
    }
  }

  try {
    const local = localStorage.getItem('journaly_admin_ideas');
    if (local) {
      return JSON.parse(local);
    }
    localStorage.setItem('journaly_admin_ideas', JSON.stringify(INITIAL_IDEAS));
    return INITIAL_IDEAS;
  } catch {
    return INITIAL_IDEAS;
  }
}

export async function saveIdea(idea) {
  const newIdea = {
    ...idea,
    id: idea.id || `idea-${Date.now()}`,
    created_at: idea.created_at || new Date().toISOString()
  };

  if (isSupabaseConnected()) {
    try {
      await supabase.from('ideas').insert([newIdea]);
    } catch (err) {
      console.warn('Supabase saveIdea error:', err);
    }
  }

  try {
    const existing = await fetchIdeas();
    const updated = [newIdea, ...existing.filter((i) => i.id !== newIdea.id)];
    localStorage.setItem('journaly_admin_ideas', JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('LocalStorage saveIdea error:', err);
    return [];
  }
}

export async function deleteIdea(ideaId) {
  if (isSupabaseConnected()) {
    try {
      await supabase.from('ideas').delete().eq('id', ideaId);
    } catch (err) {
      console.warn('Supabase deleteIdea error:', err);
    }
  }

  try {
    const existing = await fetchIdeas();
    const updated = existing.filter((i) => i.id !== ideaId);
    localStorage.setItem('journaly_admin_ideas', JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('LocalStorage deleteIdea error:', err);
    return [];
  }
}
