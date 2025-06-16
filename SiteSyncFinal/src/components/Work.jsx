// FilteredGallery.jsx
import React, { use, useState } from 'react';
import './FilteredGallery.css';
import { div, title } from 'framer-motion/client';
import { useEffect } from 'react';

const filters = ['All', 'Social Media', 'Website', 'OOH', 'Branding','print','photo shoot','SEO','PR'];

const data = [
  {
    title: 'Curapod',
    image: 'src/Curapod-11.jpg',
    tags: ['Social Media', 'Website','print'],
  },
  {
    title: 'MJ Naidu',
    image: 'src/MJ-Naidu-11.png',
    tags: ['Social Media', 'OOH','PR'],
  },
  {
    title: 'Truzon',
    image: 'src/Wheeliyo-11.jpg',
    tags: ['Branding', 'Social Media ','photo shoot'],
  },
  {
    title: 'Example 4',
    image: 'src/UTT-11.jpg',
    tags: ['OOH', 'Branding', 'SEO','print'],
  },
  {
    title: 'Example 5',
    image: 'src/truzon-11.jpg',
    tags: ['Social Media', 'Website', 'Branding', 'photo shoot', 'SEO'],
  },
  {
    title: 'Example 6',
    image: 'src/Trishul-11.png',
    tags: ['Branding', 'OOH'],
  },
  {
    title: 'Example 7',
    image: 'src/Hungry-11.png',
    tags: ['Social Media', 'Branding', 'photo shoot'],
  },
  {
    title: 'Example 8',
    image: 'src/aladdin-11.png',
    tags: ['Website', 'OOH', 'SEO'],
  },
  {
    title: 'Example 9',
    image: 'src/Agilisium-11.png',
    tags: ['Social Media', 'Branding', 'photo shoot'],
  },
  {
    title: 'Example 10',
    image: 'src/Omni-Health-11.jpg',
    tags: ['Website', 'OOH', 'SEO', 'PR'],
  },
  {
    title: 'Example 11',
    image: 'src/Kay-11.jpg',
    tags: ['Social Media', 'Branding', 'photo shoot','PR'],
  },
  {
    title: 'Example 12',
    image: 'src/girl-11.jpg',
    tags: ['Website', 'OOH', 'SEO','print'],
  }

  
];

const FilteredGallery = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [ Sliding,setSliding] =  useState(0);

  const filteredData = activeFilter === 'All'
    ? data
    : data.filter(item => item.tags.includes(activeFilter));

    useEffect(() => {
      const interval = setInterval(() => {
        setSliding(prev => (prev + 1) % filteredData.length);
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(interval);
    }, [filteredData.length]);

  return (
    <div>
       <div className="intro-wrapper">
          <img className="intro-image" src={data[Sliding].image} alt={data[Sliding].title} />
        <div className="intro-caption">
          <h2>{data[Sliding].title}</h2>
          <p>Tags: {data[Sliding].tags.join(', ')}</p>
        </div>
      </div>
        
    
    <div className="gallery-wrapper">
      <nav className="filters">
        {filters.map(filter => (
          <button
            key={filter}
            className={ `filter-tab {filter === activeFilter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </nav>
      <div className="grid">
        {filteredData.map((item, idx) => (
          <div key={idx} className="card">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>Tags: <span className='tag'>{item.tags.join(', ')}</span></p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default FilteredGallery;
