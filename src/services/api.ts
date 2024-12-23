import { toast } from "@/components/ui/use-toast";

const BASE_URL = 'https://api.coincap.io/v2';

interface Asset {
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
  changePercent24Hr: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  supply: string;
  maxSupply?: string;
}

export const fetchTopAssets = async () => {
  try {
    const response = await fetch(`${BASE_URL}/assets?limit=50`);
    if (!response.ok) throw new Error('Failed to fetch assets');
    const data = await response.json();
    return data.data;
  } catch (error) {
    toast({
      title: "Error fetching assets",
      description: "Please try again later",
      variant: "destructive",
    });
    throw error;
  }
};

export const fetchAssetHistory = async (id: string, interval = 'm5') => {
  try {
    const now = Date.now();
    const start = now - 24 * 60 * 60 * 1000; // 24 hours ago
    
    const response = await fetch(
      `${BASE_URL}/assets/${id}/history?interval=${interval}`
    );
    if (!response.ok) throw new Error('Failed to fetch asset history');
    const data = await response.json();
    return data.data;
  } catch (error) {
    toast({
      title: "Error fetching asset history",
      description: "Please try again later",
      variant: "destructive",
    });
    throw error;
  }
};

export const formatPrice = (price: string) => {
  const numPrice = parseFloat(price);
  if (numPrice < 1) return numPrice.toFixed(6);
  if (numPrice < 10) return numPrice.toFixed(4);
  return numPrice.toFixed(2);
};

export const formatMarketCap = (marketCap: string) => {
  const cap = parseFloat(marketCap);
  if (cap >= 1e12) return (cap / 1e12).toFixed(2) + 'T';
  if (cap >= 1e9) return (cap / 1e9).toFixed(2) + 'B';
  if (cap >= 1e6) return (cap / 1e6).toFixed(2) + 'M';
  return cap.toFixed(2);
};
