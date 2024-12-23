import { useQuery } from '@tanstack/react-query';
import { fetchTopAssets } from '../services/api';
import AssetCard from '../components/AssetCard';

const Index = () => {
  const { data: assets, isLoading } = useQuery({
    queryKey: ['assets'],
    queryFn: fetchTopAssets,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="neo-card">
          <p className="text-xl">Loading assets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Top Crypto Assets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets?.map((asset) => (
          <AssetCard key={asset.id} asset={asset} />
        ))}
      </div>
    </div>
  );
};

export default Index;