function AvatarBadge() {
  return (
    <div className="avatar-badge">
      <div className="avatar-badge__frame">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="avatar-badge__svg">
          <rect width="120" height="120" rx="20" fill="#111111"/>
          {/* Tech/AI Stylized Graphic */}
          <circle cx="60" cy="45" r="24" fill="#FF451A" opacity="0.9"/>
          <path d="M60 21C46.7452 21 36 31.7452 36 45C36 53.4862 40.4143 60.9416 47.0703 65.1719C34.7397 70.8242 26 83.1362 26 97.5C26 98.8807 27.1193 100 28.5 100H91.5C92.8807 100 94 98.8807 94 97.5C94 83.1362 85.2603 70.8242 72.9297 65.1719C79.5857 60.9416 84 53.4862 84 45C84 31.7452 73.2548 21 60 21Z" fill="#F3F2ED"/>
          {/* Glitch/Code overlay lines */}
          <line x1="20" y1="35" x2="100" y2="35" stroke="#FF451A" strokeWidth="2" opacity="0.6" strokeDasharray="4 4"/>
          <line x1="15" y1="75" x2="105" y2="75" stroke="#FF451A" strokeWidth="2" opacity="0.6" strokeDasharray="6 3"/>
          <rect x="52" y="38" width="16" height="4" rx="2" fill="#111111"/>
          {/* Matrix code dots */}
          <circle cx="28" cy="24" r="2" fill="#FF451A"/>
          <circle cx="92" cy="24" r="2" fill="#FF451A"/>
        </svg>
      </div>
    </div>
  )
}

export default AvatarBadge
