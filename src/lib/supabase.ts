import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type BloodDonor = {
  id: string;
  name: string;
  blood_group: string;
  location: string;
  phone: string;
  email: string | null;
  is_available: boolean;
  last_donation: string | null;
  avatar_url: string;
  created_at: string;
};

export type Hospital = {
  id: string;
  name: string;
  address: string;
  phone: string;
  emergency_services: boolean;
  latitude: number | null;
  longitude: number | null;
  rating: number;
  departments: string[];
  logo_url: string | null;
  created_at: string;
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  experience_years: number;
  rating: number;
  hospital_id: string | null;
  phone: string | null;
  email: string | null;
  avatar_url: string;
  availability: string;
  consultation_fee: number;
  created_at: string;
};

export type Volunteer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  skills: string[];
  availability: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

export type News = {
  id: string;
  title: string;
  summary: string;
  content: string | null;
  category: string;
  image_url: string | null;
  author: string | null;
  published_at: string;
  created_at: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar_url: string;
  rating: number;
  created_at: string;
};

export type Statistic = {
  id: string;
  stat_type: string;
  value: number;
  label: string;
  icon: string | null;
  created_at: string;
};
