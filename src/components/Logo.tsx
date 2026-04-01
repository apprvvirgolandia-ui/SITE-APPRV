import React from 'react';

interface LogoProps {
  className?: string;
  src?: string | null; // Fonte da imagem opcional para futuras alterações
}

/**
 * Componente de Logo APPRV
 * Redesenhado para ser vibrante, nítido e não ficar cortado.
 * Suporta o uso de uma imagem externa (src) ou o SVG vetorial padrão.
 */
export default function Logo({ className = "", src }: LogoProps) {
  // Se uma URL de imagem for fornecida, renderiza a imagem.
  if (src) {
    return (
      <img 
        src={src} 
        alt="Logo APPRV" 
        className={`${className} object-contain`} 
        referrerPolicy="no-referrer" 
      />
    );
  }

  // Caso contrário, renderiza o SVG vetorial (nítido em qualquer tamanho)
  return (
    <svg 
      viewBox="0 0 520 520" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Definições de Gradientes e Filtros */}
      <defs>
        <radialGradient id="sunGradient" cx="260" cy="220" r="130" fx="260" fy="220">
          <stop offset="0%" stopColor="#FFEA00" />
          <stop offset="60%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FF8C00" />
        </radialGradient>
        <linearGradient id="fieldGradient" x1="260" y1="320" x2="260" y2="440">
          <stop offset="0%" stopColor="#065f46" />
          <stop offset="100%" stopColor="#064e3b" />
        </linearGradient>
        <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
          <feOffset dx="0" dy="4" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.2" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Fundo Sólido (Círculo Branco) para evitar fundo vazado */}
      <circle cx="260" cy="260" r="250" fill="white" />
      <circle cx="260" cy="260" r="245" stroke="#f5f5f4" strokeWidth="2" />
      
      {/* Raios de Sol Vibrantes */}
      <path 
        d="M260 80 L285 140 L335 110 L320 165 L380 160 L340 200 L400 240 L335 250 L360 305 L295 265 L260 325 L225 265 L160 305 L185 250 L120 240 L180 200 L140 160 L200 165 L185 110 L235 140 Z" 
        fill="#FFD700" 
        stroke="#FF8C00"
        strokeWidth="2"
      />
      
      {/* Núcleo do Sol */}
      <circle cx="260" cy="220" r="85" fill="url(#sunGradient)" />

      {/* Campo Verde com Perspectiva */}
      <path d="M60 370 Q260 310 460 370 L490 440 Q260 390 30 440 Z" fill="url(#fieldGradient)" />
      <g stroke="#10b981" strokeWidth="14" strokeLinecap="round" opacity="0.8">
        <line x1="120" y1="385" x2="90" y2="435" />
        <line x1="190" y1="365" x2="180" y2="435" />
        <line x1="260" y1="355" x2="260" y2="435" />
        <line x1="330" y1="365" x2="340" y2="435" />
        <line x1="400" y1="385" x2="430" y2="435" />
      </g>

      {/* Texto APPRV */}
      <text 
        x="260" 
        y="315" 
        textAnchor="middle" 
        fill="white" 
        stroke="#065f46" 
        strokeWidth="12" 
        paintOrder="stroke"
        style={{ 
          font: 'italic 900 125px sans-serif', 
          letterSpacing: '-0.02em'
        }}
      >
        APPRV
      </text>

      {/* Barra de Nome da Associação */}
      <rect x="50" y="330" width="420" height="40" rx="8" fill="#065f46" />
      <text 
        x="260" 
        y="358" 
        textAnchor="middle" 
        fill="white" 
        style={{ font: 'bold 14px sans-serif', letterSpacing: '0.02em' }}
      >
        ASSOCIAÇÃO DOS PEQUENOS PRODUTORES RURAIS DE VIRGOLÂNDIA
      </text>

      {/* Barra Amarela do Lema */}
      <rect x="20" y="390" width="480" height="60" rx="10" fill="#FFFF00" />
      <text 
        x="260" 
        y="432" 
        textAnchor="middle" 
        fill="#1a1a1a" 
        style={{ font: 'italic 900 36px sans-serif' }}
      >
        NO CAMPO TEMOS A FORÇA!
      </text>
    </svg>
  );
}
