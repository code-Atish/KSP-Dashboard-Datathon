import React from 'react';

import investigationImg from '../assets/pic1.jpg';
import lawAndOrderImg from '../assets/pic2.jpg';
import stationManagementImg from '../assets/pic3.jpg';
import crimePreventionImg from '../assets/pic4.jpg';
import courtInterfaceImg from '../assets/pic5.jpg';

const CardSection = () => {
  const cards = [
    {
      title: 'Investigation',
      description: 'Detailed analysis and tracking of investigative processes.',
      image: investigationImg,
    },
    {
      title: 'Law and Order',
      description: 'Monitoring and managing public safety and security.',
      image: lawAndOrderImg,
    },
    {
      title: 'Station Management',
      description: 'Efficient management of police station operations.',
      image: stationManagementImg,
    },
    {
      title: 'Crime Prevention and Detection',
      description: 'Strategies and tools for preventing and detecting crimes.',
      image: crimePreventionImg,
    },
    {
      title: 'Court Interface',
      description: 'Seamless integration with the judicial system.',
      image: courtInterfaceImg,
    },
  ];

  return (
    <div className="card-section container">
      <h1>Operational Analytics</h1>
      <div className="cards-container">
        {cards.map((card, index) => (
          <div className="card" key={index}>
            <img src={card.image} alt={card.title} className="card-image" />
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            <button onClick={() => window.location.href = '/login'}>Learn More</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardSection;
