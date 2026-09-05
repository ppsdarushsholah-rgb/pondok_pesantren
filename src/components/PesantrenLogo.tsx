import React, { useState, useEffect } from 'react';

interface PesantrenLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textDark?: boolean;
  logoUrl?: string;
  namaPesantren?: string;
  subTitle?: string;
}

export const PesantrenLogo: React.FC<PesantrenLogoProps> = ({
  className = '',
  size = 'md',
  showText = false,
  textDark = true,
  logoUrl = '/logo.jpg',
  namaPesantren,
  subTitle,
}) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [logoUrl]);

  // Dimension mapping for emblem
  const sizeMap = {
    sm: { container: 'w-10 h-10', svg: 'w-10 h-10', textTitle: 'text-sm', textSub: 'text-[10px]' },
    md: { container: 'w-12 h-12 sm:w-14 sm:h-14', svg: 'w-12 h-12 sm:w-14 sm:h-14', textTitle: 'text-base sm:text-lg', textSub: 'text-xs' },
    lg: { container: 'w-16 h-16 sm:w-20 sm:h-20', svg: 'w-16 h-16 sm:w-20 sm:h-20', textTitle: 'text-xl sm:text-2xl', textSub: 'text-sm' },
    xl: { container: 'w-24 h-24 sm:w-32 sm:h-32', svg: 'w-24 h-24 sm:w-32 sm:h-32', textTitle: 'text-2xl sm:text-3xl', textSub: 'text-base' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  // Standalone vector SVG of the official emblem matching the uploaded photo
  const renderVectorEmblem = () => (
    <svg
      viewBox="0 0 200 210"
      className={`${currentSize.svg} drop-shadow-md`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id="greenBgGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#047857" />
          <stop offset="60%" stopColor="#065f46" />
          <stop offset="100%" stopColor="#064e3b" />
        </linearGradient>
        <linearGradient id="roseGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="50%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#9f1239" />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Main Outer Green Triangle */}
      <polygon
        points="100,8 194,166 6,166"
        fill="url(#greenBgGrad)"
        stroke="url(#goldGrad)"
        strokeWidth="6"
        strokeLinejoin="round"
        filter="url(#shadow)"
      />

      {/* Inner Gold Inset Triangle Line */}
      <polygon
        points="100,24 180,158 20,158"
        fill="none"
        stroke="#fef08a"
        strokeWidth="2.5"
        strokeLinejoin="round"
        opacity="0.9"
      />

      {/* 5 Golden Stars at Apex (Center star largest) */}
      <g fill="url(#goldGrad)" stroke="#b45309" strokeWidth="0.5">
        {/* Star 1 (Far Left) */}
        <path d="M72,66 L74,70 L78,71 L75,74 L76,78 L72,76 L68,78 L69,74 L66,71 L70,70 Z" transform="scale(0.85) translate(14, 2)" />
        {/* Star 2 (Mid Left) */}
        <path d="M84,54 L86,58 L90,59 L87,62 L88,66 L84,64 L80,66 L81,62 L78,59 L82,58 Z" transform="scale(0.9) translate(9, -2)" />
        {/* Star 3 (Center Apex - Largest) */}
        <path d="M100,42 L103,48 L109,49 L105,53 L106,59 L100,56 L94,59 L95,53 L91,49 L97,48 Z" />
        {/* Star 4 (Mid Right) */}
        <path d="M116,54 L118,58 L122,59 L119,62 L120,66 L116,64 L112,66 L113,62 L110,59 L114,58 Z" transform="scale(0.9) translate(13, -2)" />
        {/* Star 5 (Far Right) */}
        <path d="M128,66 L130,70 L134,71 L131,74 L132,78 L128,76 L124,78 L125,74 L122,71 L126,70 Z" transform="scale(0.85) translate(22, 2)" />
      </g>

      {/* Rosary / Tasbih Ring of 20 Golden Beads */}
      <g>
        {[
          [100, 72], [112, 74], [123, 79], [131, 87], [136, 98], [137, 109],
          [134, 120], [127, 129], [118, 136], [108, 140],
          [100, 142], // bottom center bead
          [92, 140], [82, 136], [73, 129], [66, 120], [63, 109],
          [64, 98], [69, 87], [77, 79], [88, 74]
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={i === 10 ? '4.5' : '3.8'}
            fill="url(#goldGrad)"
            stroke="#78350f"
            strokeWidth="0.8"
          />
        ))}
      </g>

      {/* Mihrab / Arch Inner Frame */}
      <path
        d="M82,128 C82,96 86,86 100,86 C114,86 118,96 118,128 Z"
        fill="#047857"
        stroke="url(#goldGrad)"
        strokeWidth="2"
      />

      {/* Red Rose on Green Stem */}
      <g>
        {/* Stem */}
        <path d="M100,108 Q101,118 99,126" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
        <path d="M100,117 Q94,115 93,111" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M100,121 Q105,119 107,115" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* Rose Flower Petals */}
        <circle cx="100" cy="103" r="7" fill="url(#roseGrad)" />
        <path d="M96,101 C97,97 103,97 104,101 C105,105 95,106 96,101 Z" fill="#fda4af" opacity="0.8" />
        <path d="M98,99 C99,96 101,96 102,99 Z" fill="#fff" opacity="0.9" />
      </g>

      {/* Tasbih Tassel at Bottom */}
      <g fill="url(#goldGrad)" stroke="#78350f" strokeWidth="0.8">
        {/* Knots */}
        <rect x="97" y="145" width="6" height="4" rx="1.5" />
        {/* Dangling Tassel Fringes */}
        <path d="M96,149 L94,162 L97,163 L99,150 Z" />
        <path d="M99,150 L98,164 L102,164 L101,150 Z" />
        <path d="M101,150 L103,163 L106,162 L104,149 Z" />
      </g>

      {/* Text TQN (Left) */}
      <text
        x="64"
        y="152"
        fill="url(#goldGrad)"
        fontSize="17"
        fontWeight="900"
        fontFamily="sans-serif"
        textAnchor="middle"
        stroke="#78350f"
        strokeWidth="0.5"
      >
        TQN
      </text>

      {/* Text 165 (Right) */}
      <text
        x="136"
        y="152"
        fill="url(#goldGrad)"
        fontSize="17"
        fontWeight="900"
        fontFamily="sans-serif"
        textAnchor="middle"
        stroke="#78350f"
        strokeWidth="0.5"
      >
        165
      </text>

      {/* Text Below: PONDOK PESANTREN SALAFIYAH */}
      <text
        x="100"
        y="182"
        fill="url(#goldGrad)"
        fontSize="8.5"
        fontWeight="bold"
        fontFamily="sans-serif"
        textAnchor="middle"
        letterSpacing="0.8"
      >
        PONDOK PESANTREN SALAFIYAH
      </text>

      {/* Text Below: DARUSH SHOLAH */}
      <text
        x="100"
        y="200"
        fill="url(#goldGrad)"
        fontSize="14"
        fontWeight="900"
        fontFamily="sans-serif"
        textAnchor="middle"
        letterSpacing="0.5"
        stroke="#78350f"
        strokeWidth="0.4"
      >
        DARUSH SHOLAH
      </text>
    </svg>
  );

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Emblem Frame */}
      <div
        className={`${currentSize.container} relative shrink-0 rounded-2xl overflow-hidden bg-black border-2 border-amber-400/80 shadow-md flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform`}
      >
        {!imgError && logoUrl ? (
          <img
            src={logoUrl}
            alt="Logo Resmi Pondok Pesantren Salafiyah Darush Sholah TQN 165"
            className="w-full h-full object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          renderVectorEmblem()
        )}
      </div>

      {/* Typography Description (if showText = true) */}
      {showText && (
        <div className="flex flex-col text-left">
          <span
            className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
              textDark ? 'text-emerald-800' : 'text-emerald-300'
            }`}
          >
            Pondok Pesantren Salafiyah
          </span>
          <span
            className={`${currentSize.textTitle} font-extrabold tracking-tight leading-tight ${
              textDark ? 'text-emerald-950' : 'text-white'
            }`}
          >
            {namaPesantren ? namaPesantren.replace(/^Pondok Pesantren (Salafiyah )?/i, '') : 'DARUSH SHOLAH'}
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-400/20 text-amber-600 border border-amber-400/30">
              TQN 165
            </span>
            <span
              className={`text-[11px] font-medium hidden sm:inline ${
                textDark ? 'text-emerald-700' : 'text-emerald-200'
              }`}
            >
              {subTitle || 'Salaf & Modern Terpadu'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
