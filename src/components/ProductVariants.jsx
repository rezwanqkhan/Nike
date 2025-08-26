import { useState } from 'react';

const ProductVariants = ({ 
  colors = [], 
  sizes = [], 
  onVariantChange,
  selectedColor = null,
  selectedSize = null,
  className = ''
}) => {
  const [activeColor, setActiveColor] = useState(selectedColor || (colors.length > 0 ? colors[0] : null));
  const [activeSize, setActiveSize] = useState(selectedSize || (sizes.length > 0 ? sizes[0] : null));

  const handleColorChange = (color) => {
    setActiveColor(color);
    if (onVariantChange) {
      onVariantChange({ color, size: activeSize });
    }
  };

  const handleSizeChange = (size) => {
    setActiveSize(size);
    if (onVariantChange) {
      onVariantChange({ color: activeColor, size });
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Color Selection */}
      {colors.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-slate-gray mb-3">
            Color: {activeColor?.name || 'Select Color'}
          </h4>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color.id || color.name}
                onClick={() => handleColorChange(color)}
                className={`relative w-12 h-12 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                  activeColor?.id === color.id || activeColor?.name === color.name
                    ? 'border-coral-red shadow-lg scale-110'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ backgroundColor: color.hex || color.value }}
                title={color.name}
              >
                {/* Checkmark for selected color */}
                {(activeColor?.id === color.id || activeColor?.name === color.name) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {sizes.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-slate-gray mb-3">
            Size: {activeSize?.name || activeSize || 'Select Size'}
          </h4>
          <div className="grid grid-cols-4 gap-2 max-w-xs">
            {sizes.map((size) => {
              const sizeValue = typeof size === 'string' ? size : size.value;
              const sizeName = typeof size === 'string' ? size : size.name;
              const isAvailable = typeof size === 'string' ? true : size.available !== false;
              const isSelected = activeSize === size || activeSize?.value === sizeValue;
              
              return (
                <button
                  key={sizeValue}
                  onClick={() => handleSizeChange(size)}
                  disabled={!isAvailable}
                  className={`py-3 px-2 text-sm font-medium rounded-lg border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-coral-red bg-coral-red text-white'
                      : isAvailable
                      ? 'border-gray-300 text-slate-gray hover:border-coral-red hover:text-coral-red'
                      : 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50'
                  }`}
                  title={isAvailable ? `Size ${sizeName}` : `Size ${sizeName} - Out of Stock`}
                >
                  {sizeName}
                  {!isAvailable && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-0.5 bg-gray-400 transform rotate-45"></div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Variant Summary */}
      {(activeColor || activeSize) && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <h5 className="font-medium text-slate-gray mb-2">Selected Options:</h5>
          <div className="flex flex-wrap gap-2 text-sm">
            {activeColor && (
              <span className="px-3 py-1 bg-white rounded-full border border-gray-200">
                Color: {activeColor.name}
              </span>
            )}
            {activeSize && (
              <span className="px-3 py-1 bg-white rounded-full border border-gray-200">
                Size: {typeof activeSize === 'string' ? activeSize : activeSize.name}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Compact version for product cards
export const ProductVariantsCompact = ({ 
  colors = [], 
  sizes = [], 
  onVariantChange,
  selectedColor = null,
  selectedSize = null,
  className = ''
}) => {
  const [activeColor, setActiveColor] = useState(selectedColor || (colors.length > 0 ? colors[0] : null));
  const [activeSize, setActiveSize] = useState(selectedSize || (sizes.length > 0 ? sizes[0] : null));

  const handleColorChange = (color) => {
    setActiveColor(color);
    if (onVariantChange) {
      onVariantChange({ color, size: activeSize });
    }
  };

  const handleSizeChange = (size) => {
    setActiveSize(size);
    if (onVariantChange) {
      onVariantChange({ color: activeColor, size });
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Compact Color Selection */}
      {colors.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-gray">Colors:</span>
          <div className="flex gap-1">
            {colors.slice(0, 4).map((color) => (
              <button
                key={color.id || color.name}
                onClick={() => handleColorChange(color)}
                className={`w-6 h-6 rounded-full border transition-all duration-200 ${
                  activeColor?.id === color.id || activeColor?.name === color.name
                    ? 'border-coral-red border-2 scale-110'
                    : 'border-gray-300'
                }`}
                style={{ backgroundColor: color.hex || color.value }}
                title={color.name}
              />
            ))}
            {colors.length > 4 && (
              <span className="text-xs text-gray-500 self-center">+{colors.length - 4}</span>
            )}
          </div>
        </div>
      )}

      {/* Compact Size Selection */}
      {sizes.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-gray">Sizes:</span>
          <div className="flex gap-1">
            {sizes.slice(0, 5).map((size) => {
              const sizeValue = typeof size === 'string' ? size : size.value;
              const sizeName = typeof size === 'string' ? size : size.name;
              const isSelected = activeSize === size || activeSize?.value === sizeValue;
              
              return (
                <button
                  key={sizeValue}
                  onClick={() => handleSizeChange(size)}
                  className={`px-2 py-1 text-xs font-medium rounded border transition-all duration-200 ${
                    isSelected
                      ? 'border-coral-red bg-coral-red text-white'
                      : 'border-gray-300 text-slate-gray hover:border-coral-red'
                  }`}
                >
                  {sizeName}
                </button>
              );
            })}
            {sizes.length > 5 && (
              <span className="text-xs text-gray-500 self-center">+{sizes.length - 5}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductVariants;