import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Phone, Mail, MapPin, Clock, Star, Heart, Droplet, Building, Stethoscope, Users, Newspaper, Activity, MessageCircle, ChevronRight, Send, Search, Filter, Check, AlertTriangle, Ambulance } from 'lucide-react';
import { supabase, type BloodDonor, type Hospital, type Doctor, type News, type Testimonial, type Statistic } from './lib/supabase';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <Hero />
      <EmergencyServices />
      <BloodDonorSearch />
      <HospitalLocator />
      <FeaturedDoctors />
      <AIHealthAssistant />
      <VolunteerProgram />
      <HealthNews />
      <ImpactStatistics />
      <Testimonials />
      <Footer />
    </div>
  );
}

function Navbar({ darkMode, setDarkMode, mobileMenuOpen, setMobileMenuOpen }: { darkMode: boolean; setDarkMode: (v: boolean) => void; mobileMenuOpen: boolean; setMobileMenuOpen: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Blood Donors', href: '#donors' },
    { name: 'Hospitals', href: '#hospitals' },
    { name: 'Doctors', href: '#doctors' },
    { name: 'Volunteer', href: '#volunteer' },
    { name: 'News', href: '#news' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.a
            href="#home"
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              HealthConnect <span className="text-primary-500">Nepal</span>
            </span>
          </motion.a>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            <motion.a
              href="tel:102"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center space-x-2 bg-red-600 text-white font-bold px-4 py-2 rounded-xl shadow-lg animate-pulse"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>SOS</span>
            </motion.a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-gray-100 dark:bg-gray-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/20 dark:border-gray-700/30"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 rounded-xl font-medium"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="tel:102"
                className="flex items-center justify-center space-x-2 bg-red-600 text-white font-bold px-4 py-3 rounded-xl mt-4"
              >
                <AlertTriangle className="w-5 h-5" />
                <span>Emergency SOS</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-cyan-500/10" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium text-sm mb-6">
              Trusted Healthcare Platform in Nepal
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Healthcare Assistance{' '}
              <span className="text-gradient">When You Need It Most</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
              Find blood donors, locate hospitals, connect with doctors, and access emergency services instantly. Your health companion for life.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#donors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center space-x-2"
              >
                <Droplet className="w-5 h-5" />
                <span>Find Blood Donor</span>
              </motion.a>
              <motion.a
                href="#hospitals"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary flex items-center space-x-2"
              >
                <Building className="w-5 h-5" />
                <span>Nearby Hospitals</span>
              </motion.a>
            </div>

            <div className="flex items-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">2500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Blood Donors</div>
              </div>
              <div className="w-px h-12 bg-gray-200 dark:bg-gray-700" />
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">150+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Hospitals</div>
              </div>
              <div className="w-px h-12 bg-gray-200 dark:bg-gray-700" />
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Doctors</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Healthcare"
                className="rounded-3xl shadow-2xl"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -left-6 glass-card p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">24/7 Available</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Emergency Support</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="absolute -top-6 -right-6 glass-card p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">3200+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Lives Saved</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function EmergencyServices() {
  const services = [
    {
      icon: Droplet,
      title: 'Blood Emergency',
      description: 'Urgent blood requirement? Find compatible donors within minutes.',
      action: 'Find Donor',
      color: 'red',
      href: '#donors',
    },
    {
      icon: Building,
      title: 'Nearby Hospitals',
      description: 'Locate hospitals with emergency services near you.',
      action: 'Find Hospital',
      color: 'blue',
      href: '#hospitals',
    },
    {
      icon: Ambulance,
      title: 'Ambulance Service',
      description: 'Quick access to ambulance services in your area.',
      action: 'Call 102',
      color: 'green',
      href: 'tel:102',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-medium text-sm mb-4">
            Emergency Services
          </span>
          <h2 className="section-title">Quick Access to Help</h2>
          <p className="section-subtitle">
            In emergencies, every second counts. Get immediate assistance.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.a
              key={service.title}
              href={service.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`glass-card p-8 card-hover cursor-pointer border-2 ${
                service.color === 'red'
                  ? 'border-red-200 dark:border-red-900/50 hover:border-red-400'
                  : service.color === 'blue'
                  ? 'border-blue-200 dark:border-blue-900/50 hover:border-blue-400'
                  : 'border-green-200 dark:border-green-900/50 hover:border-green-400'
              }`}
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  service.color === 'red'
                    ? 'bg-red-100 dark:bg-red-900/30'
                    : service.color === 'blue'
                    ? 'bg-blue-100 dark:bg-blue-900/30'
                    : 'bg-green-100 dark:bg-green-900/30'
                }`}
              >
                <service.icon
                  className={`w-8 h-8 ${
                    service.color === 'red'
                      ? 'text-red-600'
                      : service.color === 'blue'
                      ? 'text-blue-600'
                      : 'text-green-600'
                  }`}
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{service.description}</p>
              <div className="flex items-center font-semibold text-primary-600 dark:text-primary-400">
                <span>{service.action}</span>
                <ChevronRight className="w-5 h-5 ml-2" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function BloodDonorSearch() {
  const [bloodGroup, setBloodGroup] = useState('');
  const [location, setLocation] = useState('');
  const [donors, setDonors] = useState<BloodDonor[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const searchDonors = async () => {
    setLoading(true);
    setSearched(true);
    try {
      let query = supabase.from('blood_donors').select('*');
      if (bloodGroup) {
        query = query.eq('blood_group', bloodGroup);
      }
      if (location) {
        query = query.ilike('location', `%${location}%`);
      }
      const { data, error } = await query;
      if (error) throw error;
      setDonors(data || []);
    } catch {
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="donors" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-medium text-sm mb-4">
            <Droplet className="w-4 h-4 inline mr-2" />
            Blood Donor Search
          </span>
          <h2 className="section-title">Find Blood Donors</h2>
          <p className="section-subtitle">
            Search for compatible blood donors in your area and save lives.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 mb-12"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Blood Group
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="input-field"
              >
                <option value="">All Blood Groups</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location..."
                className="input-field"
              />
            </div>
            <div className="flex items-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={searchDonors}
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                {loading ? 'Searching...' : 'Search Donors'}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {searched && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {donors.length > 0 ? (
              donors.map((donor, index) => (
                <motion.div
                  key={donor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 card-hover"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={donor.avatar_url}
                      alt={donor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                        {donor.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-bold rounded-full text-sm">
                          {donor.blood_group}
                        </span>
                        {donor.is_available ? (
                          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded-full">
                            Available
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 text-xs rounded-full">
                            Unavailable
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary-500" />
                      <span>{donor.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary-500" />
                      <span>{donor.phone}</span>
                    </div>
                    {donor.last_donation && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary-500" />
                        <span>Last donation: {new Date(donor.last_donation).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  <motion.a
                    href={`tel:${donor.phone}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Contact Donor
                  </motion.a>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Droplet className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Donors Found</h3>
                <p className="text-gray-600 dark:text-gray-400">Try adjusting your search criteria.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}

function HospitalLocator() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const { data, error } = await supabase.from('hospitals').select('*').limit(6);
        if (error) throw error;
        setHospitals(data || []);
      } catch {
        setHospitals([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHospitals();
  }, []);

  return (
    <section id="hospitals" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium text-sm mb-4">
            <Building className="w-4 h-4 inline mr-2" />
            Hospital Locator
          </span>
          <h2 className="section-title">Nearby Hospitals</h2>
          <p className="section-subtitle">
            Find hospitals with emergency services in your area.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card p-6 animate-pulse">
                <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4" />
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hospitals.map((hospital, index) => (
              <motion.div
                key={hospital.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card overflow-hidden card-hover"
              >
                <div className="relative h-40 bg-gradient-to-br from-primary-400 to-cyan-500">
                  <img
                    src={hospital.logo_url || 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400'}
                    alt={hospital.name}
                    className="w-full h-full object-cover opacity-80"
                  />
                  {hospital.emergency_services && (
                    <span className="absolute top-4 right-4 px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full animate-pulse">
                      24/7 Emergency
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {hospital.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(hospital.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                      {hospital.rating}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary-500" />
                      <span>{hospital.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary-500" />
                      <span>{hospital.phone}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hospital.departments?.slice(0, 3).map((dept) => (
                      <span
                        key={dept}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-lg"
                      >
                        {dept}
                      </span>
                    ))}
                  </div>
                  <motion.a
                    href={`tel:${hospital.phone}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Contact Hospital
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 glass-card p-6"
        >
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">Interactive map coming soon</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data, error } = await supabase.from('doctors').select('*').limit(6);
        if (error) throw error;
        setDoctors(data || []);
      } catch {
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <section id="doctors" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 font-medium text-sm mb-4">
            <Stethoscope className="w-4 h-4 inline mr-2" />
            Featured Doctors
          </span>
          <h2 className="section-title">Consult Expert Doctors</h2>
          <p className="section-subtitle">
            Connect with qualified healthcare professionals for your medical needs.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card p-6 animate-pulse">
                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4" />
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 text-center card-hover"
              >
                <div className="relative inline-block mb-4">
                  <img
                    src={doctor.avatar_url}
                    alt={doctor.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-primary-100 dark:border-primary-900"
                  />
                  <div className="absolute -bottom-2 right-0 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                    {doctor.experience_years} yrs
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {doctor.name}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                  {doctor.specialty}
                </p>
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(doctor.rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                    {doctor.rating}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <Clock className="w-4 h-4" />
                  <span>{doctor.availability}</span>
                </div>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    Rs. {doctor.consultation_fee}
                  </span>
                  <span className="text-sm text-gray-500">per visit</span>
                </div>
                <motion.a
                  href={`tel:${doctor.phone}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Book Appointment
                </motion.a>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function AIHealthAssistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your AI Health Assistant. How can I help you today? You can ask me about symptoms, general health advice, or finding healthcare services.' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "Based on your symptoms, I recommend consulting with a general physician. Would you like me to help you find nearby doctors?",
        "It's important to stay hydrated and get plenty of rest. If symptoms persist for more than 3 days, please consult a healthcare professional.",
        "For general wellness, I recommend regular exercise, a balanced diet, and at least 7-8 hours of sleep daily.",
        "Would you like me to connect you with a specialist? I can help you find doctors based on your specific needs.",
      ];
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: responses[Math.floor(Math.random() * responses.length)] },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-cyan-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/20 text-white font-medium text-sm mb-4">
            <Activity className="w-4 h-4 inline mr-2" />
            AI Powered
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI Health Assistant
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Get instant health guidance powered by artificial intelligence.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card overflow-hidden"
          >
            <div className="h-80 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-primary-600 text-white rounded-br-none'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-none">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about health symptoms..."
                  className="flex-1 input-field"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl transition-colors"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function VolunteerProgram() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from('volunteers').insert([formData]);
      if (error) throw error;
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', location: '', message: '' });
    } catch {
      alert('Error submitting form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="volunteer" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-medium text-sm mb-4">
              <Users className="w-4 h-4 inline mr-2" />
              Join Our Mission
            </span>
            <h2 className="section-title">Become a Volunteer</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Join our community of dedicated volunteers and help save lives. Whether you're a blood donor, healthcare professional, or community advocate, your contribution matters.
            </p>
            <div className="space-y-4">
              {[
                'Organize blood donation camps',
                'Spread health awareness',
                'Assist in emergency response',
                'Support community health initiatives',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {submitted ? (
              <div className="glass-card p-8 text-center">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your volunteer registration has been submitted. We'll contact you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Register as Volunteer
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="input-field"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="input-field"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="input-field"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                    className="input-field"
                  />
                  <textarea
                    placeholder="Why do you want to volunteer?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="input-field resize-none"
                  />
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    {submitting ? 'Submitting...' : 'Submit Registration'}
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HealthNews() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data, error } = await supabase.from('news').select('*').limit(5);
        if (error) throw error;
        setNews(data || []);
      } catch {
        setNews([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const categoryColors: Record<string, string> = {
    'Public Health': 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    'Medical Innovation': 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    'Blood Donation': 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    'Healthcare Access': 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    'Community Health': 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  };

  return (
    <section id="news" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 font-medium text-sm mb-4">
            <Newspaper className="w-4 h-4 inline mr-2" />
            Health News
          </span>
          <h2 className="section-title">Latest Health Updates</h2>
          <p className="section-subtitle">
            Stay informed about healthcare news, medical breakthroughs, and community initiatives.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="glass-card overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700" />
                <div className="p-6">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4" />
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card overflow-hidden card-hover"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                  {article.image_url && (
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  <span
                    className={`absolute top-4 left-4 px-3 py-1 text-xs font-medium rounded-full ${
                      categoryColors[article.category] || 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {article.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(article.published_at).toLocaleDateString()}</span>
                    {article.author && (
                      <>
                        <span className="mx-1">•</span>
                        <span>{article.author}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                    {article.summary}
                  </p>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="mt-4 flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium"
                  >
                    Read More <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ImpactStatistics() {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase.from('statistics').select('*');
        if (error) throw error;
        setStatistics(data || []);
      } catch {
        setStatistics([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const iconMap: Record<string, React.ElementType> = {
    droplet: Droplet,
    'building-2': Building,
    'heart-handshake': Users,
    'heart-pulse': Heart,
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-primary-900 to-cyan-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-white/80 font-medium text-sm mb-4">
            <Activity className="w-4 h-4 inline mr-2" />
            Our Impact
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Making a Difference
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Together with our community, we've achieved these milestones.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass-card p-8 text-center animate-pulse">
                <div className="h-16 bg-white/20 rounded mx-auto mb-4" />
                <div className="h-12 bg-white/20 rounded mb-2" />
                <div className="h-6 bg-white/20 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-4 gap-6">
            {statistics.map((stat, index) => {
              const IconComponent = iconMap[stat.icon || ''] || Heart;
              return (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass bg-white/10 backdrop-blur-xl rounded-2xl p-8 text-center border border-white/20"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-white mb-2"
                  >
                    <Counter value={stat.value} />
                  </motion.div>
                  <p className="text-white/70 text-sm">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <>{count.toLocaleString()}</>;
}

function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase.from('testimonials').select('*');
        if (error) throw error;
        setTestimonials(data || []);
      } catch {
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 font-medium text-sm mb-4">
            <MessageCircle className="w-4 h-4 inline mr-2" />
            Testimonials
          </span>
          <h2 className="section-title">What People Say</h2>
          <p className="section-subtitle">
            Real stories from our community members who have benefited from HealthConnect Nepal.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass-card p-6 animate-pulse">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
                  <div>
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                  </div>
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={testimonial.avatar_url}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary-100 dark:border-primary-900"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-300 italic">
                  "{testimonial.content}"
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Footer() {
  const footerLinks = {
    Services: ['Blood Donor Search', 'Hospital Finder', 'Doctor Consultation', 'Emergency Services', 'AI Health Assistant'],
    Company: ['About Us', 'Our Team', 'Careers', 'Contact', 'Partners'],
    Resources: ['Health Blog', 'FAQs', 'Blood Donation Guide', 'First Aid Tips', 'Health Calculator'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer'],
  };

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">
                HealthConnect <span className="text-primary-400">Nepal</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Connecting healthcare seekers with donors, hospitals, and doctors. Building a healthier Nepal together.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-primary-400" />
                <span>Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-primary-400" />
                <span>+977-1-4123456</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-primary-400" />
                <span>contact@healthconnectnepal.org</span>
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-bold text-lg mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              2026 HealthConnect Nepal. All rights reserved.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295l.213-3.053 5.56-5.022c.242-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.658-.644.136-.953l11.566-4.458c.537-.194 1.006.128.847.939z" />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
