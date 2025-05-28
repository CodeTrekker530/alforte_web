// server.js
import { supabase } from './supabaseClient.js';

export async function fetchProductAndServices() {
  // Fetch from ProductandServices
  const { data: products, error: productError } = await supabase
    .from('ProductandServices')
    .select('PnS_id, name, category');

  if (productError) {
    console.error('Supabase Product fetch error:', productError.message);
  }

  // Fetch from Stall
  const { data: stalls, error: stallError } = await supabase
    .from('Stall')
    .select('stall_id, stall_name, stall_category');

  if (stallError) {
    console.error('Supabase Stall fetch error:', stallError.message);
  }

  // Map product results
  const productResults = (products || []).map(item => ({
    id: item.PnS_id.toString(),
    type: 'Product',
    name: item.name,
    category: item.category,
    price: '--',
    image: 'image.png',
  }));

  // Map stall results
  const stallResults = (stalls || []).map(item => ({
    id: item.stall_id.toString(),
    type: 'Stall',
    name: item.stall_name,
    category: item.stall_category,
    price: '--',
    image: 'image.png',
  }));

  // Combine and limit to 20
  const combinedResults = [...productResults, ...stallResults].slice(0, 20);

  return combinedResults;
}
