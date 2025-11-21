import React from 'react';

const SvgContainer = ({ children }) => (
  <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ maxWidth: '150px', maxHeight: '150px' }}>
    {children}
  </svg>
);

const Clock = ({ hour }) => (
  <SvgContainer>
    <circle cx="50" cy="50" r="45" fill="white" stroke="#333" strokeWidth="4" />
    <circle cx="50" cy="50" r="2" fill="#333" />
    {/* Hour marks */}
    {[...Array(12)].map((_, i) => {
      const angle = (i + 1) * 30 * (Math.PI / 180);
      const x = 50 + 35 * Math.sin(angle);
      const y = 50 - 35 * Math.cos(angle);
      return <circle key={i} cx={x} cy={y} r="2" fill="#666" />;
    })}
    {/* Hour Hand */}
    <line 
      x1="50" y1="50" 
      x2={50 + 25 * Math.sin(hour * 30 * (Math.PI / 180))} 
      y2={50 - 25 * Math.cos(hour * 30 * (Math.PI / 180))} 
      stroke="#333" strokeWidth="4" strokeLinecap="round" 
    />
    {/* Minute Hand (always at 12) */}
    <line x1="50" y1="50" x2="50" y2="15" stroke="#333" strokeWidth="3" strokeLinecap="round" />
  </SvgContainer>
);

const ArrowDefs = () => (
  <defs>
    <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
      <polygon points="0 0, 6 2, 0 4" fill="#FFD700" />
    </marker>
  </defs>
);

export const Visuals = {
  // Directions - Street Theme
  'dir_left': () => (
    <SvgContainer>
      <ArrowDefs />
      <rect x="0" y="0" width="100" height="100" fill="#e0e0e0" />
      <rect x="35" y="0" width="30" height="100" fill="#555" />
      <rect x="0" y="35" width="100" height="30" fill="#555" />
      <line x1="50" y1="0" x2="50" y2="35" stroke="#fff" strokeWidth="2" strokeDasharray="5,5" />
      <line x1="50" y1="65" x2="50" y2="100" stroke="#fff" strokeWidth="2" strokeDasharray="5,5" />
      <line x1="0" y1="50" x2="35" y2="50" stroke="#fff" strokeWidth="2" strokeDasharray="5,5" />
      <line x1="65" y1="50" x2="100" y2="50" stroke="#fff" strokeWidth="2" strokeDasharray="5,5" />
      <path d="M50 80 L50 50 Q50 30 30 50 L10 50" fill="none" stroke="#FFD700" strokeWidth="8" markerEnd="url(#arrowhead)" />
    </SvgContainer>
  ),
  'dir_right': () => (
    <SvgContainer>
      <ArrowDefs />
      <rect x="0" y="0" width="100" height="100" fill="#e0e0e0" />
      <rect x="35" y="0" width="30" height="100" fill="#555" />
      <rect x="0" y="35" width="100" height="30" fill="#555" />
      <line x1="50" y1="0" x2="50" y2="35" stroke="#fff" strokeWidth="2" strokeDasharray="5,5" />
      <line x1="50" y1="65" x2="50" y2="100" stroke="#fff" strokeWidth="2" strokeDasharray="5,5" />
      <line x1="0" y1="50" x2="35" y2="50" stroke="#fff" strokeWidth="2" strokeDasharray="5,5" />
      <line x1="65" y1="50" x2="100" y2="50" stroke="#fff" strokeWidth="2" strokeDasharray="5,5" />
      <path d="M50 80 L50 50 Q50 30 70 50 L90 50" fill="none" stroke="#FFD700" strokeWidth="8" markerEnd="url(#arrowhead)" />
    </SvgContainer>
  ),
  'dir_oben': () => (
    <SvgContainer>
      <ArrowDefs />
      <rect x="20" y="60" width="60" height="30" fill="#795548" /> {/* Box */}
      <circle cx="50" cy="35" r="15" fill="#2196F3" /> {/* Ball on top */}
      <path d="M20 35 L30 35" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" /> {/* Arrow pointing to ball */}
    </SvgContainer>
  ),
  'dir_unten': () => (
    <SvgContainer>
      <ArrowDefs />
      <rect x="20" y="30" width="60" height="10" fill="#795548" /> {/* Table Top */}
      <rect x="25" y="40" width="5" height="40" fill="#795548" /> {/* Leg */}
      <rect x="70" y="40" width="5" height="40" fill="#795548" /> {/* Leg */}
      <circle cx="50" cy="70" r="12" fill="#2196F3" /> {/* Ball below */}
      <path d="M20 70 L35 70" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
    </SvgContainer>
  ),
  'dir_hoch': () => (
    <SvgContainer>
      <ArrowDefs />
      <rect x="20" y="10" width="60" height="80" fill="#e0e0e0" stroke="#333" strokeWidth="2" /> {/* Shaft */}
      <rect x="25" y="40" width="50" height="40" fill="#2196F3" stroke="#333" strokeWidth="1" /> {/* Lift Car */}
      <line x1="50" y1="40" x2="50" y2="10" stroke="#333" strokeWidth="1" /> {/* Cable */}
      <line x1="85" y1="30" x2="85" y2="70" stroke="#999" strokeWidth="2" /> {/* Guide rail */}
      <line x1="85" y1="80" x2="85" y2="20" stroke="#FFD700" strokeWidth="6" markerEnd="url(#arrowhead)" /> {/* Up Arrow */}
    </SvgContainer>
  ),
  'dir_runter': () => (
    <SvgContainer>
      <ArrowDefs />
      <rect x="20" y="10" width="60" height="80" fill="#e0e0e0" stroke="#333" strokeWidth="2" /> {/* Shaft */}
      <rect x="25" y="20" width="50" height="40" fill="#2196F3" stroke="#333" strokeWidth="1" /> {/* Lift Car */}
      <line x1="50" y1="20" x2="50" y2="10" stroke="#333" strokeWidth="1" /> {/* Cable */}
      <line x1="85" y1="30" x2="85" y2="70" stroke="#999" strokeWidth="2" /> {/* Guide rail */}
      <line x1="85" y1="20" x2="85" y2="80" stroke="#FFD700" strokeWidth="6" markerEnd="url(#arrowhead)" /> {/* Down Arrow */}
    </SvgContainer>
  ),
  'dir_straight': () => (
    <SvgContainer>
      <ArrowDefs />
      <rect x="0" y="0" width="100" height="100" fill="#e0e0e0" />
      <rect x="35" y="0" width="30" height="100" fill="#555" />
      <rect x="0" y="35" width="100" height="30" fill="#555" />
      <line x1="50" y1="0" x2="50" y2="100" stroke="#fff" strokeWidth="2" strokeDasharray="5,5" />
      <line x1="0" y1="50" x2="100" y2="50" stroke="#fff" strokeWidth="2" strokeDasharray="5,5" />
      <line x1="50" y1="90" x2="50" y2="10" stroke="#FFD700" strokeWidth="8" markerEnd="url(#arrowhead)" />
    </SvgContainer>
  ),
  'dir_corner': () => (
    <SvgContainer>
      <ArrowDefs />
      <rect x="0" y="0" width="100" height="100" fill="#e0e0e0" />
      <path d="M35 100 L35 50 Q35 35 50 35 L100 35 L100 65 L65 65 Q65 65 65 65 L65 100 Z" fill="#555" />
      <path d="M50 100 L50 65 Q50 50 65 50 L100 50" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="5,5" />
      <path d="M45 90 L45 60 Q45 45 60 45 L90 45" fill="none" stroke="#FFD700" strokeWidth="6" markerEnd="url(#arrowhead)" />
    </SvgContainer>
  ),
  'dir_behind': () => (
    <SvgContainer>
      <ArrowDefs />
      <rect x="0" y="0" width="100" height="100" fill="#e0e0e0" />
      <rect x="35" y="0" width="30" height="100" fill="#555" />
      <line x1="50" y1="0" x2="50" y2="100" stroke="#fff" strokeWidth="2" strokeDasharray="5,5" />
      <rect x="40" y="20" width="20" height="30" rx="5" fill="#999" />
      <rect x="40" y="60" width="20" height="30" rx="5" fill="#FFD700" stroke="#333" strokeWidth="2" />
      <path d="M25 75 L35 75" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
    </SvgContainer>
  ),
  'dir_front': () => (
    <SvgContainer>
      <ArrowDefs />
      <rect x="0" y="0" width="100" height="100" fill="#e0e0e0" />
      <rect x="35" y="0" width="30" height="100" fill="#555" />
      <line x1="50" y1="0" x2="50" y2="100" stroke="#fff" strokeWidth="2" strokeDasharray="5,5" />
      <rect x="40" y="20" width="20" height="30" rx="5" fill="#FFD700" stroke="#333" strokeWidth="2" />
      <rect x="40" y="60" width="20" height="30" rx="5" fill="#999" />
      <path d="M25 35 L35 35" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
    </SvgContainer>
  ),
  'dir_next_to': () => (
    <SvgContainer>
      <ArrowDefs />
      <rect x="0" y="0" width="100" height="100" fill="#e0e0e0" />
      <rect x="0" y="35" width="100" height="50" fill="#555" />
      <line x1="50" y1="35" x2="50" y2="85" stroke="#fff" strokeWidth="2" />
      <rect x="15" y="45" width="30" height="20" rx="5" fill="#2196F3" />
      <rect x="55" y="45" width="30" height="20" rx="5" fill="#FFD700" stroke="#333" strokeWidth="2" />
      <path d="M48 40 L52 40" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
      <path d="M52 40 L48 40" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
    </SvgContainer>
  ),
  'dir_between': () => (
    <SvgContainer>
      <ArrowDefs />
      <rect x="0" y="0" width="100" height="100" fill="#e0e0e0" />
      <rect x="0" y="35" width="100" height="50" fill="#555" />
      <line x1="33" y1="35" x2="33" y2="85" stroke="#fff" strokeWidth="2" />
      <line x1="66" y1="35" x2="66" y2="85" stroke="#fff" strokeWidth="2" />
      <rect x="5" y="45" width="25" height="20" rx="5" fill="#2196F3" />
      <rect x="37" y="45" width="25" height="20" rx="5" fill="#FFD700" stroke="#333" strokeWidth="2" />
      <rect x="70" y="45" width="25" height="20" rx="5" fill="#2196F3" />
      <path d="M37 30 L63 30" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" markerStart="url(#arrowhead)" />
    </SvgContainer>
  ),
  
  // Basics
  'table': () => (
    <SvgContainer>
      <rect x="10" y="40" width="80" height="10" fill="#8D6E63" /> {/* Top */}
      <rect x="15" y="50" width="10" height="40" fill="#5D4037" /> {/* Leg 1 */}
      <rect x="75" y="50" width="10" height="40" fill="#5D4037" /> {/* Leg 2 */}
      <path d="M10 40 L20 30 L90 30 L80 40 Z" fill="#A1887F" /> {/* 3D Top Surface */}
    </SvgContainer>
  ),
  'chair': () => (
    <SvgContainer>
      <rect x="25" y="50" width="50" height="10" fill="#8D6E63" /> {/* Seat */}
      <rect x="25" y="60" width="10" height="30" fill="#5D4037" /> {/* Front Leg 1 */}
      <rect x="65" y="60" width="10" height="30" fill="#5D4037" /> {/* Front Leg 2 */}
      <rect x="25" y="20" width="10" height="70" fill="#5D4037" /> {/* Back Leg 1 */}
      <rect x="65" y="20" width="10" height="70" fill="#5D4037" /> {/* Back Leg 2 */}
      <rect x="25" y="20" width="50" height="30" fill="#8D6E63" rx="5" /> {/* Backrest */}
    </SvgContainer>
  ),
  'lamp': () => (
    <SvgContainer>
      <path d="M30 80 L70 80 L60 30 L40 30 Z" fill="#FFEB3B" opacity="0.8" /> {/* Shade */}
      <rect x="48" y="30" width="4" height="60" fill="#555" /> {/* Stand */}
      <rect x="35" y="90" width="30" height="5" fill="#333" /> {/* Base */}
      <circle cx="50" cy="40" r="10" fill="#FFF" opacity="0.9" /> {/* Bulb glow */}
    </SvgContainer>
  ),
  'sofa': () => (
    <SvgContainer>
      <rect x="10" y="50" width="80" height="30" rx="5" fill="#3F51B5" /> {/* Base */}
      <rect x="10" y="30" width="80" height="40" rx="5" fill="#303F9F" /> {/* Backrest */}
      <rect x="10" y="50" width="15" height="30" rx="5" fill="#283593" /> {/* Armrest L */}
      <rect x="75" y="50" width="15" height="30" rx="5" fill="#283593" /> {/* Armrest R */}
      <rect x="30" y="50" width="40" height="25" rx="2" fill="#5C6BC0" /> {/* Cushion */}
    </SvgContainer>
  ),
  'shelf': () => (
    <SvgContainer>
      <rect x="20" y="10" width="60" height="80" fill="#795548" /> {/* Frame */}
      <rect x="25" y="30" width="50" height="5" fill="#5D4037" /> {/* Shelf 1 */}
      <rect x="25" y="55" width="50" height="5" fill="#5D4037" /> {/* Shelf 2 */}
      <rect x="25" y="80" width="50" height="5" fill="#5D4037" /> {/* Shelf 3 */}
      {/* Books */}
      <rect x="30" y="15" width="5" height="15" fill="#F44336" />
      <rect x="36" y="12" width="5" height="18" fill="#2196F3" />
      <rect x="42" y="18" width="5" height="12" fill="#4CAF50" />
      <rect x="30" y="40" width="5" height="15" fill="#FFEB3B" />
      <rect x="50" y="40" width="20" height="15" fill="#9C27B0" />
    </SvgContainer>
  ),
  'cupboard': () => (
    <SvgContainer>
      <rect x="20" y="10" width="60" height="80" fill="#8D6E63" /> {/* Body */}
      <rect x="25" y="15" width="22" height="70" fill="#A1887F" /> {/* Door L */}
      <rect x="53" y="15" width="22" height="70" fill="#A1887F" /> {/* Door R */}
      <circle cx="43" cy="50" r="2" fill="#333" /> {/* Handle L */}
      <circle cx="57" cy="50" r="2" fill="#333" /> {/* Handle R */}
    </SvgContainer>
  ),
  'bed': () => (
    <SvgContainer>
      <rect x="10" y="40" width="80" height="40" rx="5" fill="#90CAF9" /> {/* Mattress */}
      <rect x="10" y="30" width="10" height="50" fill="#5D4037" /> {/* Headboard */}
      <rect x="80" y="50" width="10" height="30" fill="#5D4037" /> {/* Footboard */}
      <rect x="20" y="45" width="20" height="15" rx="5" fill="#FFF" /> {/* Pillow */}
      <path d="M10 60 L90 60 L90 80 L10 80 Z" fill="#1E88E5" opacity="0.5" /> {/* Blanket */}
    </SvgContainer>
  ),
  'door': () => (
    <SvgContainer>
      <rect x="30" y="10" width="40" height="80" fill="#8D6E63" stroke="#5D4037" strokeWidth="2" /> {/* Door Frame */}
      <rect x="35" y="15" width="30" height="70" fill="#A1887F" /> {/* Door Panel */}
      <circle cx="60" cy="50" r="3" fill="#FFD700" /> {/* Handle */}
    </SvgContainer>
  ),
  'window': () => (
    <SvgContainer>
      <rect x="20" y="20" width="60" height="60" fill="#E3F2FD" stroke="#333" strokeWidth="3" /> {/* Frame */}
      <line x1="50" y1="20" x2="50" y2="80" stroke="#333" strokeWidth="2" /> {/* Vertical Bar */}
      <line x1="20" y1="50" x2="80" y2="50" stroke="#333" strokeWidth="2" /> {/* Horizontal Bar */}
      <path d="M25 25 L45 45" stroke="#FFF" strokeWidth="2" opacity="0.5" /> {/* Reflection */}
    </SvgContainer>
  ),
  
  // Seasons
  'season_spring': () => (
    <SvgContainer>
      <circle cx="80" cy="20" r="15" fill="#FFD700" />
      <path d="M50 90 L50 50" stroke="#4CAF50" strokeWidth="4" />
      <circle cx="50" cy="50" r="10" fill="#FFEB3B" />
      <circle cx="50" cy="35" r="10" fill="#FF4081" />
      <circle cx="65" cy="50" r="10" fill="#FF4081" />
      <circle cx="35" cy="50" r="10" fill="#FF4081" />
      <circle cx="50" cy="65" r="10" fill="#FF4081" />
    </SvgContainer>
  ),
  'season_summer': () => (
    <SvgContainer>
      <circle cx="50" cy="50" r="25" fill="#FFD700" />
      {[...Array(8)].map((_, i) => (
        <line key={i} x1="50" y1="50" x2={50 + 45 * Math.cos(i * 45 * Math.PI/180)} y2={50 + 45 * Math.sin(i * 45 * Math.PI/180)} stroke="#FFD700" strokeWidth="5" />
      ))}
      <path d="M0 80 Q25 70 50 80 T100 80 V100 H0 Z" fill="#2196F3" />
    </SvgContainer>
  ),
  'season_autumn': () => (
    <SvgContainer>
      <path d="M50 20 Q70 5 90 20 T80 50 Q60 60 50 50 Q40 60 20 50 T10 20 Q30 5 50 20" fill="#FF5722" />
      <path d="M50 50 L50 80" stroke="#795548" strokeWidth="3" />
      <path d="M20 70 Q30 60 40 70" stroke="#9E9E9E" strokeWidth="2" fill="none" /> {/* Wind */}
    </SvgContainer>
  ),
  'season_winter': () => (
    <SvgContainer>
      <circle cx="50" cy="75" r="20" fill="white" stroke="#ccc" />
      <circle cx="50" cy="45" r="15" fill="white" stroke="#ccc" />
      <circle cx="50" cy="25" r="10" fill="white" stroke="#ccc" />
      <circle cx="45" cy="20" r="2" fill="black" />
      <circle cx="55" cy="20" r="2" fill="black" />
      <polygon points="50 25, 50 28, 60 26" fill="orange" />
      <line x1="35" y1="45" x2="15" y2="35" stroke="#795548" strokeWidth="2" />
      <line x1="65" y1="45" x2="85" y2="35" stroke="#795548" strokeWidth="2" />
    </SvgContainer>
  ),

  // Days (Text-based Icons)
  'day_monday': () => (
    <SvgContainer>
      <circle cx="50" cy="50" r="45" fill="#E3F2FD" stroke="#2196F3" strokeWidth="2" />
      <text x="50" y="65" fontSize="40" fontWeight="bold" fill="#1565C0" textAnchor="middle">Mo</text>
    </SvgContainer>
  ),
  'day_tuesday': () => (
    <SvgContainer>
      <circle cx="50" cy="50" r="45" fill="#E8F5E9" stroke="#4CAF50" strokeWidth="2" />
      <text x="50" y="65" fontSize="40" fontWeight="bold" fill="#2E7D32" textAnchor="middle">Di</text>
    </SvgContainer>
  ),
  'day_wednesday': () => (
    <SvgContainer>
      <circle cx="50" cy="50" r="45" fill="#FFF3E0" stroke="#FF9800" strokeWidth="2" />
      <text x="50" y="65" fontSize="40" fontWeight="bold" fill="#EF6C00" textAnchor="middle">Mi</text>
    </SvgContainer>
  ),
  'day_thursday': () => (
    <SvgContainer>
      <circle cx="50" cy="50" r="45" fill="#F3E5F5" stroke="#9C27B0" strokeWidth="2" />
      <text x="50" y="65" fontSize="40" fontWeight="bold" fill="#7B1FA2" textAnchor="middle">Do</text>
    </SvgContainer>
  ),
  'day_friday': () => (
    <SvgContainer>
      <circle cx="50" cy="50" r="45" fill="#FFEBEE" stroke="#F44336" strokeWidth="2" />
      <text x="50" y="65" fontSize="40" fontWeight="bold" fill="#C62828" textAnchor="middle">Fr</text>
    </SvgContainer>
  ),
  'day_saturday': () => (
    <SvgContainer>
      <circle cx="50" cy="50" r="45" fill="#E0F7FA" stroke="#00BCD4" strokeWidth="2" />
      <text x="50" y="65" fontSize="40" fontWeight="bold" fill="#00838F" textAnchor="middle">Sa</text>
    </SvgContainer>
  ),
  'day_sunday': () => (
    <SvgContainer>
      <circle cx="50" cy="50" r="45" fill="#FFFDE7" stroke="#FFEB3B" strokeWidth="2" />
      <text x="50" y="65" fontSize="40" fontWeight="bold" fill="#F9A825" textAnchor="middle">So</text>
    </SvgContainer>
  ),
};

export const getVisual = (id) => {
  if (id && id.startsWith('time_')) {
    const hour = parseInt(id.split('_')[1]);
    return <Clock hour={hour} />;
  }
  const VisualComponent = Visuals[id];
  return VisualComponent ? <VisualComponent /> : null;
};
