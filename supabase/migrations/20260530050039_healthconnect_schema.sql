/*
  # HealthConnect Nepal Database Schema

  1. New Tables
    - `blood_donors` - Stores blood donor information
    - `hospitals` - Stores hospital information
    - `doctors` - Stores doctor profiles
    - `volunteers` - Stores volunteer registrations
    - `news` - Stores health news articles
    - `testimonials` - Stores user testimonials
    - `statistics` - Stores platform statistics

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (demo purposes)
    - Authenticated users can insert their own data
*/

-- Blood Donors Table
CREATE TABLE IF NOT EXISTS blood_donors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  blood_group text NOT NULL,
  location text NOT NULL,
  phone text NOT NULL,
  email text,
  is_available boolean DEFAULT true,
  last_donation date,
  avatar_url text DEFAULT 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  created_at timestamptz DEFAULT now()
);

-- Hospitals Table
CREATE TABLE IF NOT EXISTS hospitals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  phone text NOT NULL,
  emergency_services boolean DEFAULT true,
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  rating decimal(3, 2) DEFAULT 4.5,
  departments text[] DEFAULT '{}',
  logo_url text,
  created_at timestamptz DEFAULT now()
);

-- Doctors Table
CREATE TABLE IF NOT EXISTS doctors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  specialty text NOT NULL,
  experience_years integer DEFAULT 0,
  rating decimal(3, 2) DEFAULT 4.5,
  hospital_id uuid REFERENCES hospitals(id),
  phone text,
  email text,
  avatar_url text DEFAULT 'https://images.pexels.com/photos/545229/pexels-photo-545229.jpeg?auto=compress&cs=tinysrgb&w=150',
  availability text DEFAULT 'Mon-Fri, 9AM-5PM',
  consultation_fee decimal(10, 2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Volunteers Table
CREATE TABLE IF NOT EXISTS volunteers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  location text NOT NULL,
  skills text[] DEFAULT '{}',
  availability text,
  message text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- News Table
CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  summary text NOT NULL,
  content text,
  category text NOT NULL,
  image_url text,
  author text,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  content text NOT NULL,
  avatar_url text DEFAULT 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  rating integer DEFAULT 5,
  created_at timestamptz DEFAULT now()
);

-- Statistics Table
CREATE TABLE IF NOT EXISTS statistics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stat_type text NOT NULL UNIQUE,
  value integer DEFAULT 0,
  label text NOT NULL,
  icon text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE blood_donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE statistics ENABLE ROW LEVEL SECURITY;

-- Public read policies (for demo purposes)
CREATE POLICY "Public can view blood donors"
  ON blood_donors FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view hospitals"
  ON hospitals FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view doctors"
  ON doctors FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view news"
  ON news FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view testimonials"
  ON testimonials FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view statistics"
  ON statistics FOR SELECT
  TO public
  USING (true);

-- Insert policies for authenticated users
CREATE POLICY "Anyone can register as volunteer"
  ON volunteers FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can register as blood donor"
  ON blood_donors FOR INSERT
  TO public
  WITH CHECK (true);

-- Insert seed data for blood donors
INSERT INTO blood_donors (name, blood_group, location, phone, email, is_available, last_donation) VALUES
('Ram Sharma', 'A+', 'Kathmandu', '+977-9841234567', 'ram@example.com', true, '2026-03-15'),
('Sita Gurung', 'B+', 'Pokhara', '+977-9852345678', 'sita@example.com', true, '2026-02-20'),
('Hari Thapa', 'O+', 'Lalitpur', '+977-9863456789', 'hari@example.com', true, '2026-04-01'),
('Maya Shrestha', 'AB+', 'Bhaktapur', '+977-9874567890', 'maya@example.com', false, '2026-05-10'),
('Krishna Rai', 'A-', 'Kathmandu', '+977-9885678901', 'krishna@example.com', true, '2026-01-25'),
('Gita Mahato', 'B-', 'Biratnagar', '+977-9896789012', 'gita@example.com', true, '2026-03-30'),
('Bikash Limbu', 'O-', 'Dharan', '+977-9807890123', 'bikash@example.com', true, '2026-04-15'),
('Sarita KC', 'AB-', 'Chitwan', '+977-9818901234', 'sarita@example.com', true, '2026-05-01');

-- Insert seed data for hospitals
INSERT INTO hospitals (name, address, phone, emergency_services, latitude, longitude, rating, departments, logo_url) VALUES
('Tribhuvan University Teaching Hospital', 'Maharajgunj, Kathmandu', '+977-1-4412303', true, 27.7369, 85.3192, 4.7, ARRAY['Emergency', 'Surgery', 'Cardiology', 'Neurology', 'Pediatrics'], 'https://images.pexels.com/photos/2364930/pexels-photo-2364930.jpeg?auto=compress&cs=tinysrgb&w=200'),
('Patan Hospital', 'Lagankhel, Lalitpur', '+977-1-5521195', true, 27.6588, 85.3247, 4.5, ARRAY['Emergency', 'Orthopedics', 'Gynecology', 'ENT'], 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=200'),
('Bir Hospital', 'Kanti Path, Kathmandu', '+977-1-4221999', true, 27.7036, 85.3109, 4.3, ARRAY['Emergency', 'General Surgery', 'Medicine'], 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=200'),
('Grande International Hospital', 'Balaju, Kathmandu', '+977-1-4381700', true, 27.7300, 85.2900, 4.8, ARRAY['Emergency', 'Cardiology', 'Neurology', 'Oncology', 'Transplant'], 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=200'),
('Narayani Hospital', 'Bharatpur, Chitwan', '+977-56-520755', true, 27.6804, 84.4331, 4.2, ARRAY['Emergency', 'General Medicine', 'Surgery'], 'https://images.pexels.com/photos/263419/pexels-photo-263419.jpeg?auto=compress&cs=tinysrgb&w=200');

-- Insert seed data for doctors
INSERT INTO doctors (name, specialty, experience_years, rating, hospital_id, phone, email, availability, consultation_fee) VALUES
('Dr. Anil Karki', 'Cardiologist', 15, 4.9, (SELECT id FROM hospitals WHERE name LIKE '%Tribhuvan%'), '+977-9841000001', 'anil@healthconnect.com', 'Mon-Sat, 10AM-4PM', 1500),
('Dr. Priya Singh', 'Neurologist', 12, 4.8, (SELECT id FROM hospitals WHERE name LIKE '%Grande%'), '+977-9851000002', 'priya@healthconnect.com', 'Mon-Fri, 9AM-3PM', 1800),
('Dr. Bikram Adhikari', 'General Surgeon', 20, 4.7, (SELECT id FROM hospitals WHERE name LIKE '%Patan%'), '+977-9861000003', 'bikram@healthconnect.com', 'Mon-Sat, 11AM-5PM', 1200),
('Dr. Shanti Tamang', 'Pediatrician', 8, 4.9, (SELECT id FROM hospitals WHERE name LIKE '%Bir%'), '+977-9871000004', 'shanti@healthconnect.com', 'Mon-Fri, 10AM-2PM', 1000),
('Dr. Ramesh Gupta', 'Orthopedic Surgeon', 18, 4.6, (SELECT id FROM hospitals WHERE name LIKE '%Tribhuvan%'), '+977-9881000005', 'ramesh@healthconnect.com', 'Tue-Sat, 2PM-6PM', 1600),
('Dr. Laxmi Sharma', 'Dermatologist', 10, 4.8, (SELECT id FROM hospitals WHERE name LIKE '%Grande%'), '+977-9891000006', 'laxmi@healthconnect.com', 'Mon-Fri, 11AM-4PM', 1200);

-- Insert seed data for news
INSERT INTO news (title, summary, category, image_url, author) VALUES
('Nepal Health Ministry Launches New Vaccination Campaign', 'The Ministry of Health and Population has announced a nationwide vaccination campaign targeting preventable diseases.', 'Public Health', 'https://images.pexels.com/photos/4389463/pexels-photo-4389463.jpeg?auto=compress&cs=tinysrgb&w=400', 'Health Desk'),
('Breakthrough in Cardiac Treatment at TUTH', 'Tribhuvan University Teaching Hospital successfully performs complex heart surgery using new technique.', 'Medical Innovation', 'https://images.pexels.com/photos/236936/pexels-photo-236936.jpeg?auto=compress&cs=tinysrgb&w=400', 'Medical Team'),
('Blood Donation Drive Collects 500 Units', 'HealthConnect Nepal organizes successful blood donation camp with overwhelming participation.', 'Blood Donation', 'https://images.pexels.com/photos/24278900/pexels-photo-24278900.jpeg?auto=compress&cs=tinysrgb&w=400', 'Community'),
('Telemedicine Services Expand to Rural Areas', 'Government partners with private hospitals to bring telemedicine to remote regions.', 'Healthcare Access', 'https://images.pexels.com/photos/1576091160550-2173dba999ef?auto=compress&cs=tinysrgb&w=400', 'Technology Desk'),
('Free Health Camp in Bhaktapur', 'Over 1000 residents benefited from free health screening camp organized last weekend.', 'Community Health', 'https://images.pexels.com/photos/5455238/pexels-photo-5455238.jpeg?auto=compress&cs=tinysrgb&w=400', 'Health Reporter');

-- Insert seed data for testimonials
INSERT INTO testimonials (name, role, content, rating) VALUES
('Saroj Bhandari', 'Patient', 'HealthConnect Nepal helped me find a blood donor within minutes during an emergency. Truly life-saving!', 5),
('Anjali Basnet', 'Healthcare Worker', 'The platform has revolutionized how we connect donors with patients. A much-needed initiative.', 5),
('Dr. Megh Raj Pokhrel', 'Senior Physician', 'This platform bridges the gap between healthcare providers and the community effectively.', 5),
('Kamala Thapa', 'Blood Recipient Family', 'Forever grateful. Found compatible donor quickly when my father needed urgent transfusion.', 5);

-- Insert seed data for statistics
INSERT INTO statistics (stat_type, value, label, icon) VALUES
('blood_donors', 2547, 'Registered Blood Donors', 'droplet'),
('hospitals', 156, 'Partner Hospitals', 'building-2'),
('volunteers', 892, 'Active Volunteers', 'heart-handshake'),
('lives_saved', 3250, 'Lives Saved', 'heart-pulse');

-- Create indexes for frequently queried columns
CREATE INDEX IF NOT EXISTS idx_blood_donors_blood_group ON blood_donors(blood_group);
CREATE INDEX IF NOT EXISTS idx_blood_donors_location ON blood_donors(location);
CREATE INDEX IF NOT EXISTS idx_blood_donors_availability ON blood_donors(is_available);
CREATE INDEX IF NOT EXISTS idx_doctors_specialty ON doctors(specialty);
CREATE INDEX IF NOT EXISTS idx_hospitals_emergency ON hospitals(emergency_services);