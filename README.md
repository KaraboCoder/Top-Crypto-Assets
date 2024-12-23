# Crypto Asset Tracker

A modern cryptocurrency tracking application built with React, TypeScript, and Vite. Track real-time prices, market caps, and historical data for the top 50 cryptocurrencies.

![Demo Screenshot]
_[Add a screenshot of your application here]_

## Features

- Real-time price tracking for top 50 cryptocurrencies
- Detailed asset views with price charts
- Historical price data with multiple time ranges (1D, 1W, 1M, 1Y)
- Market cap and volume statistics
- Responsive design with a neomorphic UI style
- Auto-refreshing data every 30 seconds

## Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Data Fetching**: TanStack Query
- **Charts**: Recharts
- **API**: CoinCap API

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to the project directory
cd <project-name>

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

## Development

### Project Structure

```
src/
├── components/     # React components
├── services/      # API services
├── pages/         # Page components
├── hooks/         # Custom React hooks
└── lib/           # Utility functions
```

### Key Components

1. **Asset List** (`src/pages/Index.tsx`): Displays the list of top cryptocurrencies with their current prices and 24h changes.

2. **Asset Detail** (`src/components/AssetDetail.tsx`): Shows detailed information about a specific cryptocurrency, including:

   - Price chart with multiple time ranges
   - Market statistics
   - Supply information
   - Price change indicators

3. **API Service** (`src/services/api.ts`): Handles all communication with the CoinCap API, including:
   - Fetching top assets
   - Getting historical price data
   - Formatting price and market cap values

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [CoinCap API](https://docs.coincap.io/) for providing cryptocurrency data
- [shadcn/ui](https://ui.shadcn.com/) for the component library
- [Recharts](https://recharts.org/) for the charting library
