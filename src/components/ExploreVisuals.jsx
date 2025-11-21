import React from 'react';
import exteriorImg from '../assets/explore_exterior.png';
import livingRoomImg from '../assets/explore_living_room.png';
import kitchenImg from '../assets/explore_kitchen.png';
import bathroomImg from '../assets/explore_bathroom.png';

const ImageContainer = ({ src, children }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%', maxWidth: '800px', margin: '0 auto' }}>
    <img src={src} alt="Scene" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
    {children}
  </div>
);

const Hitbox = ({ top, left, width, height, onClick, label }) => (
  <div 
    onClick={onClick}
    style={{
      position: 'absolute',
      top: `${top}%`,
      left: `${left}%`,
      width: `${width}%`,
      height: `${height}%`,
      cursor: 'pointer',
      border: '1px solid rgba(255, 0, 0, 0.5)', // Debugging border enabled
      backgroundColor: 'rgba(255, 255, 255, 0.1)' // Slight background for visibility
    }}
    title={label}
  />
);

export const ExploreVisuals = {
  exterior: ({ onInteract, onEnter }) => (
    <ImageContainer src={exteriorImg}>
      {/* Sky (Top) */}
      <Hitbox top={0} left={0} width={100} height={35} onClick={() => onInteract('sky')} label="Sky" />

      {/* Roof (Top Middle) */}
      <Hitbox top={10} left={20} width={60} height={30} onClick={() => onInteract('roof')} label="Roof" />
      
      {/* Chimney (Top Right of Roof) */}
      <Hitbox top={5} left={65} width={5} height={10} onClick={() => onInteract('chimney')} label="Chimney" />

      {/* Tree (Right) */}
      <Hitbox top={25} left={80} width={20} height={55} onClick={() => onInteract('tree')} label="Tree" />

      {/* Garage (Left) */}
      <Hitbox top={40} left={0} width={30} height={40} onClick={() => onInteract('garage')} label="Garage" />
      
      {/* Garage Door (Inside Garage area) */}
      <Hitbox top={55} left={5} width={20} height={20} onClick={() => onInteract('garage_door')} label="Garage Door" />

      {/* Car (Driveway - Left/Bottom) */}
      <Hitbox top={75} left={5} width={30} height={15} onClick={() => onInteract('car')} label="Car" />
      
      {/* Driveway (Bottom Left) */}
      <Hitbox top={90} left={0} width={40} height={10} onClick={() => onInteract('driveway')} label="Driveway" />

      {/* Porch/Door (Center) */}
      <Hitbox top={45} left={40} width={20} height={35} onClick={onEnter} label="Enter House" />
      
      {/* Window (Right) */}
      <Hitbox top={45} left={65} width={10} height={15} onClick={() => onInteract('window')} label="Window" />
      
      {/* Curtains (Inside Window) */}
      <Hitbox top={45} left={66} width={8} height={15} onClick={() => onInteract('curtains')} label="Curtains" />

      {/* Garden/Grass (Bottom) */}
      <Hitbox top={80} left={40} width={60} height={20} onClick={() => onInteract('grass')} label="Grass" />
      
      {/* Path (Bottom Center) */}
      <Hitbox top={80} left={45} width={10} height={20} onClick={() => onInteract('path')} label="Path" />
    </ImageContainer>
  ),

  living_room: ({ onInteract, onNavigate }) => (
    <ImageContainer src={livingRoomImg}>
      {/* Ceiling (Top) */}
      <Hitbox top={0} left={0} width={100} height={15} onClick={() => onInteract('ceiling')} label="Ceiling" />

      {/* Wall (Background) */}
      <Hitbox top={15} left={0} width={100} height={65} onClick={() => onInteract('wall')} label="Wall" />

      {/* Floor (Bottom) */}
      <Hitbox top={80} left={0} width={100} height={20} onClick={() => onInteract('floor')} label="Floor" />
      
      {/* Rug (Bottom Center) */}
      <Hitbox top={85} left={30} width={40} height={10} onClick={() => onInteract('rug')} label="Rug" />

      {/* Sofa (Left) */}
      <Hitbox top={50} left={0} width={40} height={30} onClick={() => onInteract('sofa')} label="Sofa" />
      
      {/* Cushion (On Sofa) */}
      <Hitbox top={55} left={5} width={10} height={10} onClick={() => onInteract('cushion')} label="Cushion" />
      
      {/* TV (Right) */}
      <Hitbox top={40} left={70} width={30} height={30} onClick={() => onInteract('tv')} label="TV" />
      
      {/* Lamp (Corner/Back) */}
      <Hitbox top={30} left={5} width={15} height={50} onClick={() => onInteract('lamp')} label="Lamp" />
      
      {/* Window (Back) */}
      <Hitbox top={20} left={30} width={20} height={20} onClick={() => onInteract('window')} label="Window" />
      
      {/* Picture (Wall) */}
      <Hitbox top={20} left={60} width={10} height={15} onClick={() => onInteract('picture')} label="Picture" />
      
      {/* Kitchen Door (Right/Back) */}
      <Hitbox top={30} left={85} width={15} height={40} onClick={() => onNavigate('kitchen')} label="To Kitchen" />
      
      {/* Bathroom Door (Left/Back - approximated) */}
      <Hitbox top={30} left={20} width={10} height={40} onClick={() => onNavigate('bathroom')} label="To Bathroom" />

      {/* Exit (Top Left) */}
      <Hitbox top={2} left={2} width={10} height={8} onClick={() => onNavigate('exterior')} label="Exit" />
    </ImageContainer>
  ),

  kitchen: ({ onInteract, onNavigate }) => (
    <ImageContainer src={kitchenImg}>
      {/* Ceiling (Top) */}
      <Hitbox top={0} left={0} width={100} height={10} onClick={() => onInteract('ceiling')} label="Ceiling" />

      {/* Wall (Background) */}
      <Hitbox top={10} left={0} width={100} height={70} onClick={() => onInteract('wall')} label="Wall" />

      {/* Floor (Bottom) */}
      <Hitbox top={80} left={0} width={100} height={20} onClick={() => onInteract('floor')} label="Floor" />

      {/* Fridge (Left) */}
      <Hitbox top={20} left={0} width={25} height={60} onClick={() => onInteract('fridge')} label="Fridge" />
      
      {/* Freezer (Top of Fridge) */}
      <Hitbox top={20} left={0} width={25} height={20} onClick={() => onInteract('freezer')} label="Freezer" />
      
      {/* Stove (Center) */}
      <Hitbox top={40} left={30} width={20} height={40} onClick={() => onInteract('stove')} label="Stove" />
      
      {/* Burner (Top of Stove) */}
      <Hitbox top={40} left={30} width={20} height={10} onClick={() => onInteract('burner')} label="Burner" />
      
      {/* Oven (Bottom of Stove) */}
      <Hitbox top={50} left={30} width={20} height={30} onClick={() => onInteract('oven')} label="Oven" />

      {/* Table (Front) */}
      <Hitbox top={60} left={30} width={40} height={30} onClick={() => onInteract('table')} label="Table" />
      
      {/* Chair (Near Table) */}
      <Hitbox top={65} left={20} width={10} height={20} onClick={() => onInteract('chair')} label="Chair" />
      
      {/* Cupboard (Top/Right) */}
      <Hitbox top={10} left={55} width={40} height={30} onClick={() => onInteract('cupboard')} label="Cupboard" />
      
      {/* Counter (Right) */}
      <Hitbox top={50} left={55} width={40} height={10} onClick={() => onInteract('counter')} label="Counter" />

      {/* Back (Top Left) */}
      <Hitbox top={2} left={2} width={10} height={8} onClick={() => onNavigate('living_room')} label="Back" />
    </ImageContainer>
  ),

  bathroom: ({ onInteract, onNavigate }) => (
    <ImageContainer src={bathroomImg}>
      {/* Ceiling (Top) */}
      <Hitbox top={0} left={0} width={100} height={10} onClick={() => onInteract('ceiling')} label="Ceiling" />

      {/* Wall (Background) */}
      <Hitbox top={10} left={0} width={100} height={70} onClick={() => onInteract('wall')} label="Wall" />
      
      {/* Tiles (Wall Detail) */}
      <Hitbox top={40} left={0} width={100} height={40} onClick={() => onInteract('tiles')} label="Tiles" />

      {/* Floor (Bottom) */}
      <Hitbox top={80} left={0} width={100} height={20} onClick={() => onInteract('floor')} label="Floor" />

      {/* Shower (Left) */}
      <Hitbox top={20} left={0} width={35} height={70} onClick={() => onInteract('shower')} label="Shower" />
      
      {/* Toilet (Center) */}
      <Hitbox top={50} left={40} width={20} height={30} onClick={() => onInteract('toilet')} label="Toilet" />
      
      {/* Sink (Right) */}
      <Hitbox top={45} left={65} width={30} height={35} onClick={() => onInteract('sink')} label="Sink" />
      
      {/* Tap (On Sink) */}
      <Hitbox top={40} left={75} width={10} height={10} onClick={() => onInteract('tap')} label="Tap" />
      
      {/* Mirror (Above Sink) */}
      <Hitbox top={15} left={70} width={20} height={25} onClick={() => onInteract('mirror')} label="Mirror" />
      
      {/* Towel (Hanging) */}
      <Hitbox top={30} left={90} width={10} height={20} onClick={() => onInteract('towel')} label="Towel" />

      {/* Back (Top Left) */}
      <Hitbox top={2} left={2} width={10} height={8} onClick={() => onNavigate('living_room')} label="Back" />
    </ImageContainer>
  )
};
