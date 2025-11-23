import React from 'react';
import exteriorImg from '../assets/explore_exterior.png';
import livingRoomImg from '../assets/explore_living_room.png';
import kitchenImg from '../assets/explore_kitchen.png';
import bathroomImg from '../assets/explore_bathroom.png';

const ImageContainer = ({ src, children }) => {
  const [lastCoords, setLastCoords] = React.useState(null);

  const handleBackgroundClick = (e) => {
    // Calculate percentage coordinates
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const left = Math.round((x / rect.width) * 100);
    const top = Math.round((y / rect.height) * 100);
    
    const coords = { top, left };
    setLastCoords(coords);
    
    console.log(`Clicked at: top=${top}, left=${left}`);
  };

  return (
    <div 
      onClick={handleBackgroundClick}
      style={{ 
        position: 'relative', 
        width: '100%', 
        maxWidth: '800px', 
        aspectRatio: '1 / 1', // Enforce square aspect ratio to match images
        margin: '0 auto', 
        cursor: 'crosshair' 
      }}
    >
      <img src={src} alt="Scene" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
      {children}
      
      {/* Calibration Overlay */}
      {lastCoords && (
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: '#00FF00',
          padding: '10px',
          borderRadius: '5px',
          fontFamily: 'monospace',
          zIndex: 1000,
          pointerEvents: 'none'
        }}>
          Last Click: Top: {lastCoords.top}%, Left: {lastCoords.left}%
        </div>
      )}
    </div>
  );
};

const Hitbox = ({ top, left, width, height, onClick, label, type = 'interaction' }) => (
  <div 
    onClick={(e) => { e.stopPropagation(); onClick(); }}
    style={{
      position: 'absolute',
      top: `${top}%`,
      left: `${left}%`,
      width: `${width}%`,
      height: `${height}%`,
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10
    }}
    title={label}
  >
    {type === 'interaction' && (
      <div style={{
        width: '12px',
        height: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '50%',
        boxShadow: '0 0 5px rgba(0,0,0,0.5), 0 0 10px rgba(255,255,255,0.5)',
        border: '2px solid rgba(0,0,0,0.2)'
      }} />
    )}
  </div>
);

export const ExploreVisuals = {
  exterior: ({ onInteract }) => (
    <ImageContainer src={exteriorImg}>
      {/* Sky & Nature */}
      <Hitbox top={5} left={90} width={10} height={10} onClick={() => onInteract('sun')} label="Sun" />
      <Hitbox top={10} left={15} width={15} height={10} onClick={() => onInteract('cloud')} label="Cloud" />
      <Hitbox top={40} left={15} width={25} height={40} onClick={() => onInteract('tree')} label="Tree" />
      
      {/* House Structure */}
      <Hitbox top={20} left={50} width={40} height={20} onClick={() => onInteract('roof')} label="Roof" />
      <Hitbox top={15} left={32} width={5} height={15} onClick={() => onInteract('chimney')} label="Chimney" />
      <Hitbox top={60} left={50} width={10} height={15} onClick={() => onInteract('door')} label="Door" />
      <Hitbox top={25} left={50} width={8} height={8} onClick={() => onInteract('window')} label="Attic Window" />
      <Hitbox top={40} left={35} width={8} height={10} onClick={() => onInteract('window')} label="Window" />
      <Hitbox top={40} left={65} width={8} height={10} onClick={() => onInteract('window')} label="Window" />
      
      {/* Porch & Garage */}
      <Hitbox top={65} left={35} width={10} height={15} onClick={() => onInteract('chair')} label="Rocking Chair" />
      <Hitbox top={50} left={80} width={20} height={20} onClick={() => onInteract('garage')} label="Garage" />

      {/* Yard Items - Left */}
      <Hitbox top={70} left={25} width={12} height={12} onClick={() => onInteract('dog_house')} label="Dog House" />
      <Hitbox top={75} left={25} width={8} height={8} onClick={() => onInteract('dog')} label="Dog" />
      <Hitbox top={85} left={15} width={15} height={12} onClick={() => onInteract('bicycle')} label="Bicycle" />
      <Hitbox top={88} left={25} width={5} height={5} onClick={() => onInteract('ball')} label="Ball" />
      <Hitbox top={85} left={35} width={10} height={10} onClick={() => onInteract('flowers')} label="Flowers" />
      <Hitbox top={80} left={30} width={8} height={8} onClick={() => onInteract('watering_can')} label="Watering Can" />
      
      {/* Yard Items - Center */}
      <Hitbox top={70} left={42} width={5} height={10} onClick={() => onInteract('mailbox')} label="Mailbox" />
      <Hitbox top={80} left={50} width={15} height={20} onClick={() => onInteract('path')} label="Path" />
      <Hitbox top={88} left={55} width={8} height={5} onClick={() => onInteract('cat')} label="Cat" />

      {/* Yard Items - Right */}
      <Hitbox top={75} left={80} width={20} height={15} onClick={() => onInteract('picnic_table')} label="Picnic Table" />
      <Hitbox top={65} left={88} width={10} height={15} onClick={() => onInteract('grill')} label="Grill" />
      <Hitbox top={85} left={75} width={15} height={12} onClick={() => onInteract('wagon')} label="Wagon" />
    </ImageContainer>
  ),

  living_room: ({ onInteract }) => (
    <ImageContainer src={livingRoomImg}>
      {/* Structure */}
      <Hitbox top={35} left={50} width={15} height={15} onClick={() => onInteract('fireplace')} label="Fireplace" />
      <Hitbox top={25} left={50} width={20} height={12} onClick={() => onInteract('tv')} label="TV" />
      <Hitbox top={40} left={10} width={15} height={30} onClick={() => onInteract('window')} label="Window" />
      <Hitbox top={30} left={85} width={10} height={12} onClick={() => onInteract('picture')} label="Picture" />
      
      {/* Furniture */}
      <Hitbox top={60} left={20} width={25} height={20} onClick={() => onInteract('sofa')} label="Sofa Left" />
      <Hitbox top={60} left={80} width={25} height={20} onClick={() => onInteract('sofa')} label="Sofa Right" />
      <Hitbox top={75} left={15} width={20} height={20} onClick={() => onInteract('armchair')} label="Armchair" />
      <Hitbox top={65} left={50} width={20} height={10} onClick={() => onInteract('coffee_table')} label="Coffee Table" />
      <Hitbox top={35} left={30} width={10} height={30} onClick={() => onInteract('bookshelf')} label="Bookshelf" />
      <Hitbox top={35} left={70} width={10} height={30} onClick={() => onInteract('bookshelf')} label="Bookshelf" />

      {/* Items */}
      <Hitbox top={70} left={18} width={8} height={8} onClick={() => onInteract('cat')} label="Cat" />
      <Hitbox top={75} left={65} width={12} height={10} onClick={() => onInteract('dog')} label="Dog" />
      <Hitbox top={55} left={90} width={15} height={30} onClick={() => onInteract('plant')} label="Plant" />
      <Hitbox top={80} left={50} width={40} height={20} onClick={() => onInteract('rug')} label="Rug" />
      <Hitbox top={62} left={55} width={3} height={3} onClick={() => onInteract('cup')} label="Cup" />
    </ImageContainer>
  ),

  kitchen: ({ onInteract }) => (
    <ImageContainer src={kitchenImg}>
      {/* Appliances */}
      <Hitbox top={50} left={10} width={15} height={40} onClick={() => onInteract('fridge')} label="Fridge" />
      <Hitbox top={55} left={85} width={15} height={20} onClick={() => onInteract('oven')} label="Oven" />
      <Hitbox top={30} left={85} width={15} height={10} onClick={() => onInteract('microwave')} label="Microwave" />
      <Hitbox top={55} left={60} width={15} height={15} onClick={() => onInteract('dishwasher')} label="Dishwasher" />
      
      {/* Fixtures */}
      <Hitbox top={50} left={45} width={15} height={10} onClick={() => onInteract('sink')} label="Sink" />
      <Hitbox top={30} left={45} width={15} height={15} onClick={() => onInteract('window')} label="Window" />
      <Hitbox top={20} left={75} width={20} height={15} onClick={() => onInteract('cupboard')} label="Cupboard" />
      <Hitbox top={20} left={15} width={20} height={15} onClick={() => onInteract('cupboard')} label="Cupboard" />

      {/* Furniture & Items */}
      <Hitbox top={70} left={65} width={20} height={20} onClick={() => onInteract('table')} label="Table" />
      <Hitbox top={70} left={50} width={10} height={15} onClick={() => onInteract('chair')} label="Chair" />
      <Hitbox top={70} left={80} width={10} height={15} onClick={() => onInteract('chair')} label="Chair" />
      <Hitbox top={45} left={30} width={10} height={5} onClick={() => onInteract('fruit')} label="Fruit" />
      <Hitbox top={45} left={20} width={5} height={5} onClick={() => onInteract('toaster')} label="Toaster" />
      <Hitbox top={80} left={35} width={20} height={10} onClick={() => onInteract('rug')} label="Rug" />
    </ImageContainer>
  ),

  bathroom: ({ onInteract }) => (
    <ImageContainer src={bathroomImg}>
      {/* Fixtures */}
      <Hitbox top={75} left={15} width={25} height={20} onClick={() => onInteract('bathtub')} label="Bathtub" />
      <Hitbox top={40} left={25} width={10} height={30} onClick={() => onInteract('shower')} label="Shower" />
      <Hitbox top={55} left={48} width={15} height={10} onClick={() => onInteract('sink')} label="Sink" />
      <Hitbox top={70} left={72} width={12} height={15} onClick={() => onInteract('toilet')} label="Toilet" />
      <Hitbox top={35} left={48} width={15} height={20} onClick={() => onInteract('mirror')} label="Mirror" />
      <Hitbox top={30} left={70} width={15} height={20} onClick={() => onInteract('window')} label="Window" />
      
      {/* Items */}
      <Hitbox top={60} left={90} width={10} height={30} onClick={() => onInteract('ladder')} label="Ladder Shelf" />
      <Hitbox top={50} left={90} width={8} height={10} onClick={() => onInteract('towel')} label="Towel" />
      <Hitbox top={85} left={50} width={30} height={10} onClick={() => onInteract('rug')} label="Rug" />
      <Hitbox top={58} left={82} width={5} height={5} onClick={() => onInteract('toilet_paper')} label="Toilet Paper" />
      <Hitbox top={52} left={58} width={3} height={5} onClick={() => onInteract('soap')} label="Soap" />
      <Hitbox top={52} left={40} width={3} height={5} onClick={() => onInteract('toothbrush')} label="Toothbrush" />
    </ImageContainer>
  )
};
