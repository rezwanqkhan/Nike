import { useState, useRef } from 'react';

const ImageZoom = ({ 
  src, 
  alt, 
  className = '', 
  zoomScale = 2.5, 
  containerClassName = '',
  ...props 
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden cursor-zoom-in ${containerClassName}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Original Image */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={`transition-transform duration-300 ease-out ${
          isZoomed ? 'scale-110' : 'scale-100'
        } ${className}`}
        {...props}
      />

      {/* Zoom Overlay */}
      {isZoomed && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: `${zoomScale * 100}%`,
            backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
            backgroundRepeat: 'no-repeat',
            opacity: 0.8,
          }}
        />
      )}

      {/* Zoom Indicator */}
      {isZoomed && (
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs font-medium">
          <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Zoom
        </div>
      )}
    </div>
  );
};

// Enhanced version with magnifying glass effect
export const ImageZoomMagnifier = ({ 
  src, 
  alt, 
  className = '', 
  magnifierSize = 150,
  zoomLevel = 2.5,
  containerClassName = '',
  ...props 
}) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
  const imgRef = useRef(null);

  const handleMouseEnter = (e) => {
    const img = imgRef.current;
    if (img) {
      const { width, height } = img.getBoundingClientRect();
      setImgSize({ width, height });
      setShowMagnifier(true);
    }
  };

  const handleMouseMove = (e) => {
    const img = imgRef.current;
    if (!img) return;

    const { top, left } = img.getBoundingClientRect();
    const x = e.pageX - left - window.pageXOffset;
    const y = e.pageY - top - window.pageYOffset;
    
    setMagnifierPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };

  return (
    <div className={`relative ${containerClassName}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`transition-transform duration-200 hover:scale-105 ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      />

      {/* Magnifying Glass */}
      {showMagnifier && (
        <div
          className="absolute border-2 border-white shadow-lg rounded-full pointer-events-none z-10"
          style={{
            height: `${magnifierSize}px`,
            width: `${magnifierSize}px`,
            top: `${magnifierPosition.y - magnifierSize / 2}px`,
            left: `${magnifierPosition.x - magnifierSize / 2}px`,
            backgroundImage: `url('${src}')`,
            backgroundSize: `${imgSize.width * zoomLevel}px ${imgSize.height * zoomLevel}px`,
            backgroundPositionX: `${-magnifierPosition.x * zoomLevel + magnifierSize / 2}px`,
            backgroundPositionY: `${-magnifierPosition.y * zoomLevel + magnifierSize / 2}px`,
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}
    </div>
  );
};

export default ImageZoom;