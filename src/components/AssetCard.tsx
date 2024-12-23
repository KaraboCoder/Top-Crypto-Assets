import React from 'react';
import { Asset, formatPrice, formatMarketCap } from '../services/api';
import { Link } from 'react-router-dom';

interface AssetCardProps {
  asset: Asset;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset }) => {
  const priceChange = parseFloat(asset.changePercent24Hr);
  const isPositive = priceChange > 0;

  return (
    <Link to={`/asset/${asset.id}`}>
      <div className="neo-card">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold font-mono">{asset.name}</h3>
            <p className="text-neo-muted">{asset.symbol}</p>
          </div>
          <span className="text-neo-accent font-mono">#{asset.rank}</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-neo-muted">Price</span>
            <span className="font-mono font-bold">
              ${formatPrice(asset.priceUsd)}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-neo-muted">24h Change</span>
            <span className={`font-mono font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-neo-muted">Market Cap</span>
            <span className="font-mono font-bold">
              ${formatMarketCap(asset.marketCapUsd)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AssetCard;