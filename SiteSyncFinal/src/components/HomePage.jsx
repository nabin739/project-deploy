import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';

const brandLogos = [
  { src: '/src/aladdin.png', alt: 'Brand 1' },
  { src: '/src/bottle.jpg', alt: 'Brand 2' },
  { src: '/src/Hungry-1.png', alt: 'Brand 3' },
  { src: '/src/dish.jpg', alt: 'Brand 4' },
  { src: '/src/carevening.png', alt: 'Brand 5' },
  { src: '/src/girl-11.jpg', alt: 'Brand 6' },
  { src: '/src/Agilisium.png', alt: 'Brand 7' },
];

const BrandsAutoCarousel = () => {
  const controls = useAnimation();
  const carouselRef = useRef(null);

  useEffect(() => {
    const scrollWidth = carouselRef.current.scrollWidth;
    const containerWidth = carouselRef.current.offsetWidth;

    const animateScroll = async () => {
      while (true) {
        await controls.start({
          x: [-0, -(scrollWidth - containerWidth)],
          transition: { duration: 20, ease: 'linear' },
        });
        await controls.start({ x: 0, transition: { duration: 0 } });
      }
    };

    animateScroll();
  }, [controls]);

  return (
    <section className="bg-[#0E1117] py-10 px-4">
      <h2 className="text-4xl font-bold text-center text-white mb-8">
        Brands we nurtured into <span className="italic">inspiring narratives</span>
      </h2>

      <div className="overflow-hidden">
        <motion.div
          ref={carouselRef}
          className="flex space-x-8"
          animate={controls}
        >
          {brandLogos.map((logo, index) => (
            <motion.div key={index} className="min-w-[150px] flex justify-center items-center">
              <img src={logo.src} alt={logo.alt} className="h-20 object-contain" />
            </motion.div>
          ))}
          {brandLogos.map((logo, index) => (
            <motion.div key={index + brandLogos.length} className="min-w-[150px] flex justify-center items-center">
              <img src={logo.src} alt={logo.alt} className="h-20 object-contain" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Carousel = ({ items = [], type = 'image' }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (type === 'image' || type === 'mixed') {
      const interval = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [type]);

  return (
    <div className="relative px-10 py-5">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 scrollbar-hide scroll-smooth"
      >
        {items.map((item, idx) => (
          item.type === 'video' ? (
            <video
              key={idx}
              src={item.url}
              autoPlay
              muted
              loop
              playsInline
              className="w-80 h-52 object-cover rounded-2xl shadow-lg flex-shrink-0"
            />
          ) : (
            <img
              key={idx}
              src={item.url}
              alt={item.title || `Slide ${idx}`}
              className="w-[300px] h-[400px] object-contain object-center shrink-0"
            />
          )
        ))}
      </div>
    </div>
  );
};

const MarketingGrid = ({ categories }) => {
  return (
    <div className="bg-[#0E1117] text-white py-10 px-4 sm:px-6 lg:px-8">
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-medium text-center leading-snug text-white max-w-4xl mx-auto mt-10 px-4"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: {} }}
      >
        <motion.span
         
          className="font-bold text-white block"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          A marketing agency that understands the pulse 
        </motion.span>
        
        <motion.span
          className="font-bold text-white block"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, color: '#fff' }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          & impactfully caters to the
        </motion.span>
        <br />
        <motion.span
          className="inline-block bg-orange-500 text-white font-extrabold px-4 py-2 mt-4 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, color: '#fff' }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.8 }}
        >
          ever-evolving market
        </motion.span>
      </motion.h1>

      <div className="flex flex-col items-center justify-start px-4 mt-14 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mt-12">
          {categories.map((item, index) => (
            <motion.div
              key={index}
              initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="w-full border border-white rounded-2xl px-4 py-4 text-center text-base sm:text-lg italic font-semibold hover:bg-white hover:text-black transition-all duration-300"
            >
              {item.title}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [verticals, setVerticals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVerticals = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/verticals`);
        if (response.data.success) {
          setVerticals(response.data.data);
        } else {
          setError('Failed to fetch verticals');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch verticals');
      } finally {
        setLoading(false);
      }
    };

    fetchVerticals();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0E1117] flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0E1117] flex items-center justify-center">
        <div className="text-red-500 text-2xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-[#0E1117] min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 py-20 lg:px-16 gap-12">
        <motion.div
          className="lg:w-1/2 text-center lg:text-left"
          initial={{ x: '-100vw', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 50, duration: 1 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Not Just a Marketing Agency.{' '}
            <motion.span className="text-red-600" whileHover={{ scale: 1.1, color: '#fff' }}>
              Your Fractional CMO.
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 mb-10 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Plug in a powerful marketing brain without hiring full-time. 10Heads Marketing is your growth partner.
          </motion.p>
          <Link
            to="/fractional-cmo"
            className="rounded-full bg-red-600 px-6 py-3 text-lg font-semibold text-white hover:bg-red-700 transition"
          >
            Meet Your Fractional CMO →
          </Link>
        </motion.div>

        <motion.div
          className="lg:w-1/2 relative w-full max-w-lg h-[500px] flex items-center justify-center"
          initial={{ x: '100vw', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 50, duration: 1 }}
        >
          {/* Animated Images */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="w-[190px] h-[190px] rounded-[100px_100px_0_0] overflow-hidden bg-orange-500 z-10 shadow-xl cursor-pointer"
          >
            <img src="/src/bottle.jpg" alt="center-main" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, y: -40 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute top-0 right-0 w-[190px] h-[190px] rounded-full overflow-hidden bg-purple-600 border-4 border-[#0E1117] shadow-lg cursor-pointer"
          >
            <img src="/src/girl-11.jpg" alt="girl" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -40, y: 40 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute bottom-0 left-0 w-[170px] h-[170px] rounded-full overflow-hidden bg-teal-400 border-4 border-[#0E1117] shadow-lg cursor-pointer"
          >
            <img src="/src/Hungry-1.png" alt="harbhajan" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, y: 40 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute bottom-0 right-4 w-[150px] h-[150px] rounded-[0_0_100px_100px] overflow-hidden bg-yellow-300 border-4 border-[#0E1117] shadow-lg cursor-pointer"
          >
            <img src="/src/Kay-11.jpg" alt="sid" className="w-full h-full object-cover" />
          </motion.div>
        </motion.div>
      </div>

      {/* Marketing Categories */}
      <MarketingGrid categories={verticals} />

      {/* Carousel Section */}
      <div className="w-screen overflow-hidden space-y-10 bg-[#0E1117] text-white">
        <header className="text-center py-6">
          <h1 className="text-5xl font-bold transition duration-300 hover:text-red-600 hover:scale-105">
            Our Marketing Verticals
          </h1>
          <p className="text-gray-400 mt-1 transition duration-300 hover:text-red hover:tracking-wide">
            Explore our campaigns by brand
          </p>
        </header>

        {verticals.map((vertical) => (
          <section key={vertical.id} className="px-0 py-10 mt-2">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
              <motion.h1
                className="text-3xl font-bold ml-10"
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                {vertical.title}
              </motion.h1>

              <motion.p
                className="text-lg text-gray-300 md:text-right max-w-xl mr-40"
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              >
                {/* <h1 className="text-2xl font-bold">{vertical.description}</h1> */}
                {
                  vertical.title ==="Brand Strategy" ? <p>A great product sells itself</p> :  vertical.title === "Creative & Design" ? <p>Make every detail perfect.</p> : vertical.title === "Analytics & Growth Ops" ? <p>If you're not embarrassed by the first version of your product.</p> : vertical.title === "Product Marketing" ? <p>People don’t buy products.</p> : vertical.title === "SEO & Organic Growth" ? <p>Your most unhappy customers are your greatest.</p> : ""
                }
             
              </motion.p>
            </div>

            <Carousel
              key={vertical.id}
              items={vertical.mediaItems.reduce((acc, item) => [...acc, ...item.media], [])}
              type="mixed"
            />
          </section>
        ))}
      </div>

      {/* Brands Auto Carousel */}
      <BrandsAutoCarousel />
    </div>
  );
}
