# XOC ERC20 Token on Polygon

A modern implementation of an ERC20 token for the Polygon network, built with Hardhat and TypeScript.

## Features

- ERC20 standard compliance
- Ownable functionality for administrative control
- Pausable mechanism for emergency stops
- Burning capability
- Comprehensive test suite
- TypeScript support
- Gas optimization

## Prerequisites

- Node.js >= 18.0.0
- npm or yarn

## Installation

```bash
npm install
# or
yarn install
```

## Configuration

1. Copy `.env.example` to `.env`
2. Fill in your environment variables:
   - `PRIVATE_KEY`: Your wallet private key
   - `MUMBAI_RPC_URL`: Mumbai testnet RPC URL
   - `POLYGON_RPC_URL`: Polygon mainnet RPC URL
   - `POLYGONSCAN_API_KEY`: PolygonScan API key for verification
   - `COINMARKETCAP_API_KEY`: CoinMarketCap API key for gas reporting

## Usage

### Compile Contracts

```bash
npm run compile
```

### Run Tests

```bash
npm test
```

### Deploy to Mumbai Testnet

```bash
npm run deploy:testnet
```

### Deploy to Polygon Mainnet

```bash
npm run deploy:mainnet
```

### Verify Contract

```bash
npm run verify <CONTRACT_ADDRESS>
```

## Contract Details

The XOC token implements the following features:

- Standard ERC20 functionality
- Configurable decimals
- Initial supply of 1 billion tokens
- Pausable transfers
- Token burning capability
- Owner-controlled administrative functions

## Security

- Uses OpenZeppelin's battle-tested contracts
- Includes comprehensive test coverage
- Implements security best practices

## License

MIT