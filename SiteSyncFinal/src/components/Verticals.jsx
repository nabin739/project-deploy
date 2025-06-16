import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { fetchVerticals, fetchMediaByVertical } from '../utils/api';
import { toast } from 'react-toastify';


const VerticalCard = ({ vertical, isSelected, onClick }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px 0px',
  });

  return (
    <div
      ref={ref}
      className={`
        relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-[1.02]
        ${isSelected ? 'ring-2 ring-red-600 scale-[1.02] shadow-lg' : 'hover:shadow-lg'}
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}
      `}
      onClick={onClick}
    >
      <div className="relative h-64">
        {vertical.mediaItems?.[0]?.media?.[0]?.url ? (
          <img 
            src={vertical.mediaItems[0].media[0].url}
            alt={vertical.title}
            className="w-full h-full object-cover filter brightness-75 transition-opacity duration-700 ease-in animate-fadeIn"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <span className="text-4xl text-gray-600">📸</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-2xl font-bold text-white mb-2">{vertical.title}</h3>
          <p className="text-gray-300">{vertical.description}</p>
        </div>
      </div>
    </div>
  );
};

export default function Verticals() {
  const [verticals, setVerticals] = useState([]);
  const [selectedVertical, setSelectedVertical] = useState(null);
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadVerticals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchVerticals();
      if (response.success && Array.isArray(response.data)) {
        setVerticals(response.data);
        if (!selectedVertical && response.data.length > 0) {
          setSelectedVertical(response.data[0].id);
        }
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      setError(error.message || 'Failed to load verticals');
      toast.error(error.message || 'Failed to load verticals');
      setVerticals([]);
    } finally {
      setLoading(false);
    }
  }, [selectedVertical]);

  const fetchMediaForVertical = useCallback(async (verticalId) => {
    if (!verticalId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetchMediaByVertical(verticalId);
      if (response.success && Array.isArray(response.data)) {
        setMediaItems(response.data);
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      setError(error.message || 'Failed to fetch media items');
      toast.error(error.message || 'Failed to fetch media items');
      setMediaItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVerticals();
  }, [loadVerticals]);

  useEffect(() => {
    if (selectedVertical) {
      fetchMediaForVertical(selectedVertical);
    }
  }, [selectedVertical, fetchMediaForVertical]);

  const handleVerticalClick = useCallback((verticalId) => {
    setSelectedVertical(verticalId);
    setTimeout(() => {
      const section = document.getElementById('vertical-details');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  if (loading && verticals.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error && verticals.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-white mb-4">Error Loading Content</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            The <span className="text-red-600">10 Heads</span> You Need to Scale
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive marketing expertise across all critical verticals to drive your growth.
          </p>
        </div>
      </section>

      {/* Verticals Grid */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {verticals.map((vertical) => (
              <VerticalCard
                key={vertical.id}
                vertical={vertical}
                isSelected={selectedVertical === vertical.id}
                onClick={() => handleVerticalClick(vertical.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Vertical Details */}
      {selectedVertical && (
        <section id="vertical-details" className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4">
            {verticals.filter(v => v.id === selectedVertical).map(vertical => (
              <div key={vertical.id} className="mb-16">
                <h2 className="text-3xl font-bold mb-6">{vertical.title} Portfolio</h2>
                {loading ? (
                  <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
                  </div>
                ) : mediaItems.length > 0 ? (
              //  new...............................................................
 // ...existing code...
<div className="relative overflow-x-auto whitespace-nowrap">
  {/* Left Scroll Button */}
  <button
    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black text-white rounded-full p-2 shadow-lg"
    style={{ transform: 'translateY(-50%)' }}
    onClick={() => {
      document.getElementById('media-scroll').scrollBy({ left: -400, behavior: 'smooth' });
    }}
    aria-label="Scroll Left"
  >
    &#8592;
  </button>
  {/* Scrollable Media Items */}
  <div
    id="media-scroll"
    className="inline-block animate-scroll-x overflow-x-auto whitespace-nowrap scroll-smooth"
    style={{ scrollBehavior: 'smooth', padding: '0 48px' }} // padding for button space
  >
    {mediaItems.map((item) => (
      <span key={item.id} className="inline-block align-top mx-2">
        {item.media[0]?.type === 'image' ? (
          <img
            src={item.media[0].url}
            alt={item.title}
            className="h-64 w-80 object-cover rounded-lg bg-gray-900"
          />
        ) : (
          <video
            src={item.media[0].url}
            autoPlay
            loop
            muted
            className="h-64 w-80 object-cover rounded-lg bg-gray-900"
            poster={item.media[0].thumbnail || undefined}
          />
        )}
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
          <p className="text-gray-400">{item.description}</p>
        </div>
      </span>
    ))}
  </div>
  {/* Right Scroll Button */}
  <button
    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black text-white rounded-full p-2 shadow-lg"
    style={{ transform: 'translateY(-50%)' }}
    onClick={() => {
      document.getElementById('media-scroll').scrollBy({ left: 400, behavior: 'smooth' });
    }}
    aria-label="Scroll Right"
  >
    &#8594;
  </button>
</div>
// ...existing code...

                ) : (
                  <div className="text-center py-20 bg-gray-900 rounded-lg">
                    <p className="text-xl text-gray-300 mb-6">No portfolio items available for this vertical yet.</p>
                    <Link
                      to="/enquiry"
                      className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors duration-200"
                    >
                      Enquire About This Service <span className="ml-2">→</span>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Revolutionize Your Marketing?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Get expert guidance across all marketing verticals with our Fractional CMO service.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/fractional-cmo" className="px-8 py-3 border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white">
              Learn About Fractional CMO
            </Link>
            <Link to="/enquiry" className="px-8 py-3 bg-red-600 text-white rounded-md hover:bg-red-700">
              Enquire Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
