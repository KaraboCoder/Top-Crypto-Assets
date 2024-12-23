import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { fetchAssetHistory, fetchTopAssets, formatPrice, formatMarketCap } from '../services/api';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const TIME_RANGES = {
  '1D': 'm5',
  '1W': 'h2',
  '1M': 'h12',
  '1Y': 'd1'
} as const;

type TimeRange = keyof typeof TIME_RANGES;

const AssetDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [timeRange, setTimeRange] = useState<TimeRange>('1D');
  
  const { data: assets } = useQuery({
    queryKey: ['assets'],
    queryFn: fetchTopAssets
  });

  const { data: history } = useQuery({
    queryKey: ['assetHistory', id, timeRange],
    queryFn: () => fetchAssetHistory(id!, TIME_RANGES[timeRange]),
    enabled: !!id
  });

  const asset = assets?.find(a => a.id === id);
  
  if (!asset) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="neo-card">
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  const priceChange = parseFloat(asset.changePercent24Hr);
  const isPositive = priceChange > 0;

  return (
    <div className="min-h-screen p-8">
      <Link to="/" className="inline-flex items-center neo-button mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Assets
      </Link>

      <div className="neo-card mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold font-mono mb-2">{asset.name}</h1>
            <p className="text-neo-muted text-xl">{asset.symbol}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-mono font-bold mb-2">
              ${formatPrice(asset.priceUsd)}
            </p>
            <p className={`text-xl font-mono font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="mb-4">
          <ToggleGroup type="single" value={timeRange} onValueChange={(value: TimeRange) => value && setTimeRange(value)}>
            {Object.keys(TIME_RANGES).map((range) => (
              <ToggleGroupItem key={range} value={range} className="neo-button">
                {range}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="h-[400px] mb-6">
          {history && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history} margin={{ left: 15 }}>
                <XAxis 
                  dataKey="time"
                  tickFormatter={(time) => {
                    const date = new Date(time);
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                  }}
                  stroke="#8E9196"
                />
                <YAxis 
                  dataKey="priceUsd"
                  tickFormatter={(price) => '$' + formatPrice(price)}
                  stroke="#8E9196"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#2A2730',
                    border: '2px solid #FFFFFF',
                    borderRadius: '4px',
                  }}
                  labelFormatter={(time) => new Date(time).toLocaleString()}
                  formatter={(value: any) => ['$' + formatPrice(value), 'Price']}
                />
                <Line 
                  type="monotone"
                  dataKey="priceUsd"
                  stroke="#D6BCFA"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-neo-muted mb-1">Market Cap</p>
              <p className="text-xl font-mono font-bold">
                ${formatMarketCap(asset.marketCapUsd)}
              </p>
            </div>
            <div>
              <p className="text-neo-muted mb-1">24h Volume</p>
              <p className="text-xl font-mono font-bold">
                ${formatMarketCap(asset.volumeUsd24Hr)}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-neo-muted mb-1">Supply</p>
              <p className="text-xl font-mono font-bold">
                {formatMarketCap(asset.supply)} {asset.symbol}
              </p>
            </div>
            {asset.maxSupply && (
              <div>
                <p className="text-neo-muted mb-1">Max Supply</p>
                <p className="text-xl font-mono font-bold">
                  {formatMarketCap(asset.maxSupply)} {asset.symbol}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetail;