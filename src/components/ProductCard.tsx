import React, { useState } from 'react';
import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageError, setImageError] = useState<boolean>(false);
  const isLowStock = product.stock <= 10;

  return (
    <article className="product-card">
      <div className="product-image-container">
        {imageError ? (
          <div className="product-image-fallback" aria-label={`Image placeholder for ${product.title}`}>
            <span className="fallback-icon" aria-hidden="true">🛍️</span>
            <span className="fallback-text">No image available</span>
          </div>
        ) : (
          <img
            src={product.thumbnail}
            alt={product.title}
            className="product-image"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        )}
        <span className="category-badge">{product.category}</span>
        {isLowStock && (
          <span className="stock-warning-badge" title="Low stock warning">
            Low Stock ({product.stock})
          </span>
        )}
      </div>

      <div className="product-body">
        {product.brand && <div className="product-brand">{product.brand}</div>}
        <h3 className="product-title" title={product.title}>
          {product.title}
        </h3>

        <div className="product-rating" aria-label={`Rating: ${product.rating} out of 5 stars`}>
          <span className="rating-star" aria-hidden="true">★</span>
          <span className="rating-value">{product.rating.toFixed(1)}</span>
        </div>

        <div className="product-footer">
          <div className="product-price">${product.price.toFixed(2)}</div>
          <div className={`stock-status ${isLowStock ? 'stock-status--low' : 'stock-status--ok'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </div>
        </div>
      </div>
    </article>
  );
};

