import React, { useState } from 'react';

const ProductModal = ({ isOpen, onClose, product }) => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!isOpen || !product) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const colors = [
    { name: 'Red', value: '#ff6452' },
    { name: 'Black', value: '#333' },
    { name: 'Blue', value: '#007bff' }
  ];

  const sizes = ['7', '8', '9', '10', '11', '12'];
  
  // Mock multiple product images for selection
  const productImages = [
    product.imgURL,
    product.imgURL, // In real app, these would be different angles
    product.imgURL
  ];

  const handleAddToCart = () => {
    // Add visual feedback and cart functionality here
    alert(`Added ${quantity} ${product.name} (Size: ${selectedSize || 'Not selected'}) to cart!`);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '10px',
        animation: 'fadeIn 0.3s ease-out'
      }}
      onClick={handleBackdropClick}
    >
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .modal-content {
            animation: slideUp 0.3s ease-out;
          }
          .image-thumbnail {
            transition: all 0.2s ease;
          }
          .image-thumbnail:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          }
          .size-button {
            transition: all 0.2s ease;
          }
          .size-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }
          .color-option {
            transition: all 0.2s ease;
          }
          .color-option:hover {
            transform: scale(1.1);
          }
          .add-to-cart-btn {
            transition: all 0.2s ease;
          }
          .add-to-cart-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(255, 100, 82, 0.3);
          }
        `}
      </style>
      <div 
        className="modal-content"
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '0',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '95vh',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(0,0,0,0.1)',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '8px',
            lineHeight: 1,
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(0,0,0,0.2)';
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(0,0,0,0.1)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          ×
        </button>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
          height: '100%'
        }}>
          {/* Left side - Images */}
          <div style={{ 
            flex: '1', 
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {/* Main product image */}
            <div style={{
              width: '100%',
              height: window.innerWidth <= 768 ? '250px' : '400px',
              overflow: 'hidden',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
            }}>
              <img 
                src={productImages[selectedImage]} 
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }}
              />
            </div>
            
            {/* Image selection thumbnails - Fixed for mobile */}
            <div style={{
              display: 'flex',
              gap: window.innerWidth <= 768 ? '8px' : '12px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              {productImages.map((img, index) => (
                <div
                  key={index}
                  className="image-thumbnail"
                  onClick={() => setSelectedImage(index)}
                  style={{
                    width: window.innerWidth <= 768 ? '60px' : '80px',
                    height: window.innerWidth <= 768 ? '60px' : '80px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: selectedImage === index ? '3px solid #ff6452' : '2px solid #e0e0e0',
                    boxShadow: selectedImage === index ? '0 4px 12px rgba(255, 100, 82, 0.3)' : '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Right side - Product Details */}
          <div style={{ 
            flex: '1', 
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            maxHeight: window.innerWidth <= 768 ? 'none' : '95vh',
            overflowY: 'auto'
          }}>
            {/* Product Title and Price */}
            <div>
              <h2 style={{ 
                margin: '0 0 8px 0', 
                fontSize: window.innerWidth <= 768 ? '20px' : '28px',
                fontWeight: '700',
                color: '#1a1a1a',
                lineHeight: '1.2'
              }}>{product.name}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <p style={{ 
                  fontSize: window.innerWidth <= 768 ? '18px' : '24px', 
                  fontWeight: 'bold', 
                  color: '#ff6452', 
                  margin: '0'
                }}>
                  ${product.price}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ color: '#ffd700', fontSize: '16px' }}>★★★★★</span>
                  <span style={{ fontSize: '14px', color: '#666' }}>(4.5) • 178 reviews</span>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div>
              <h3 style={{ 
                fontSize: '16px', 
                marginBottom: '8px', 
                fontWeight: '600',
                color: '#1a1a1a'
              }}>Description</h3>
              <p style={{ 
                fontSize: '14px', 
                lineHeight: '1.6', 
                color: '#666',
                margin: '0'
              }}>
                Experience unparalleled comfort and style with this premium Nike sneaker. 
                Crafted with high-quality materials and innovative design, perfect for both 
                athletic performance and everyday wear.
              </p>
            </div>
            
            {/* Color Selection */}
            <div>
              <h3 style={{ 
                fontSize: '16px', 
                marginBottom: '12px', 
                fontWeight: '600',
                color: '#1a1a1a'
              }}>Color: {colors[selectedColor].name}</h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="color-option"
                    onClick={() => setSelectedColor(index)}
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: color.value,
                      borderRadius: '50%',
                      border: selectedColor === index ? '3px solid #ff6452' : '2px solid #e0e0e0',
                      cursor: 'pointer',
                      boxShadow: selectedColor === index ? '0 4px 12px rgba(255, 100, 82, 0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
                      position: 'relative'
                    }}
                  >
                    {selectedColor === index && (
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: 'bold'
                      }}>✓</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Size Selection */}
            <div>
              <h3 style={{ 
                fontSize: '16px', 
                marginBottom: '12px', 
                fontWeight: '600',
                color: '#1a1a1a'
              }}>Size: {selectedSize || 'Select Size'}</h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: window.innerWidth <= 768 ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)',
                gap: window.innerWidth <= 768 ? '8px' : '12px'
              }}>
                {sizes.map(size => (
                  <button
                    key={size}
                    className="size-button"
                    onClick={() => setSelectedSize(size)}
                    style={{
                      padding: window.innerWidth <= 768 ? '12px 8px' : '12px 16px',
                      border: selectedSize === size ? '2px solid #ff6452' : '2px solid #e0e0e0',
                      backgroundColor: selectedSize === size ? '#fff5f4' : 'white',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: selectedSize === size ? '600' : '400',
                      color: selectedSize === size ? '#ff6452' : '#333',
                      minHeight: '44px'
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity Selection */}
            <div>
              <h3 style={{ 
                fontSize: '16px', 
                marginBottom: '12px', 
                fontWeight: '600',
                color: '#1a1a1a'
              }}>Quantity</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    padding: '12px 16px',
                    border: '2px solid #e0e0e0',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#333',
                    transition: 'all 0.2s ease',
                    minWidth: '44px',
                    height: '44px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = '#ff6452';
                    e.target.style.backgroundColor = '#fff5f4';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = '#e0e0e0';
                    e.target.style.backgroundColor = 'white';
                  }}
                >-</button>
                <span style={{ 
                  padding: '12px 20px', 
                  border: '2px solid #e0e0e0', 
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  minWidth: '60px',
                  textAlign: 'center',
                  backgroundColor: '#f8f9fa'
                }}>{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    padding: '12px 16px',
                    border: '2px solid #e0e0e0',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#333',
                    transition: 'all 0.2s ease',
                    minWidth: '44px',
                    height: '44px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = '#ff6452';
                    e.target.style.backgroundColor = '#fff5f4';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = '#e0e0e0';
                    e.target.style.backgroundColor = 'white';
                  }}
                >+</button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: '#ff6452',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: 'auto',
                background: 'linear-gradient(135deg, #ff6452 0%, #ff4757 100%)'
              }}
            >
              Add to Cart • ${(product.price * quantity).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;