import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://axsfwyhrzbkvzudgyasy.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4c2Z3eWhyemJrdnp1ZGd5YXN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwODEwMTcsImV4cCI6MjA4NjY1NzAxN30.JD5VOmuuLuDvAhpZ4TFCC2KSPAngildtkK6de3jEHFM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Generate unique slug
export const generateSlug = () => {
  return 'll-' + Math.random().toString(36).substring(2, 10);
};

// User operations
export const upsertUser = async (email: string) => {
  // Try to find existing user
  const { data: existing } = await supabase
    .from('users')
    .select('*')
    .eq('email', email.toLowerCase().trim())
    .single();

  if (existing) return existing;

  // Create new user
  const { data, error } = await supabase
    .from('users')
    .insert({ email: email.toLowerCase().trim() })
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Get user's valentines
export const getUserValentines = async (userId: string) => {
  const { data, error } = await supabase
    .from('valentines')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

// Create valentine
export const createValentine = async (valentineData: {
  slug: string;
  user_id: string;
  sender_name: string;
  receiver_name: string;
  partner_title: string;
  custom_title?: string;
  tone: string;
  sender_note: string;
  bouquet: any;
  selected_cards: string[];
  plans: any;
  music_url?: string;
  pin?: string;
  expiry: string;
  open_date?: string;
  status?: string;
  card_questions?: Record<string, string[]>;
}) => {
  // Calculate expires_at based on expiry
  let expires_at = null;
  if (valentineData.expiry === '7 days') {
    expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  } else if (valentineData.expiry === '30 days') {
    expires_at = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  }

  const { data, error } = await supabase
    .from('valentines')
    .insert({
      ...valentineData,
      status: 'sent',
      expires_at,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Get valentine by slug (for receiver view)
export const getValentineBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('valentines')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) return null;
  return data;
};

// Increment view count
export const incrementViewCount = async (slug: string) => {
  const { data: current } = await supabase
    .from('valentines')
    .select('view_count')
    .eq('slug', slug)
    .single();

  if (current) {
    await supabase
      .from('valentines')
      .update({ view_count: (current.view_count || 0) + 1 })
      .eq('slug', slug);
  }
};

// Get random questions from question_bank for a card type
export const getRandomQuestions = async (cardType: string, count: number = 5): Promise<string[]> => {
  // Fetch all questions for this card type, then pick random ones client-side
  const { data, error } = await supabase
    .from('question_bank')
    .select('question')
    .eq('card_type', cardType);

  if (error || !data || data.length === 0) return [];

  // Shuffle and pick `count` random questions
  const shuffled = data.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(q => q.question);
};

// Get a random love note prompt
export const getRandomLovePrompt = async (category: string): Promise<string | null> => {
  const { data, error } = await supabase
    .from('love_note_prompts')
    .select('prompt_text')
    .eq('category', category);

  if (error || !data || data.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex].prompt_text;
};

// Save card answers from receiver
export const saveCardAnswers = async (slug: string, answers: Record<string, Record<string, string>>) => {
  const { error } = await supabase
    .from('valentines')
    .update({ card_answers: answers })
    .eq('slug', slug);

  if (error) throw error;
};

