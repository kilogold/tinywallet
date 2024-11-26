# TinyWallet

TinyWallet is an extendable wallet library designed to abstract different kinds of wallets for use within other programs.  
It is a basic demonstration of wallet management and transaction handling, conceptually similar to [Solana's Wallet Adapter](https://github.com/solana-labs/wallet-adapter).

## Features

- **Support for Multiple Keystore Types**: 
  - Local Filesystem
  - Ledger Hardware Wallet
  - Turnkey Service
  - Environment Variables
- **Transaction Building and Signing**: Easily build, sign, and send transactions using the provided key managers.
- **Extendable Architecture**: Add support for additional keystore types as needed.

## Installation

To install TinyWallet, use npm or yarn:

```bash
pnpm install tinywallet
```

## Usage

To use TinyWallet, you need to create an instance of the `core` class with the desired keystore type. Here's a basic example:

```javascript
import { core, KeystoreType } from 'tinywallet';

async function initializeWallet() {
    const wallet = await core.CreateAsync(KeystoreType.Local);
    console.log(`Keystore Type: ${wallet.GetKeystoreType()}`);
}

initializeWallet();
```

## Configuration

TinyWallet uses environment variables for configuration. Ensure the following variables are set in your `.env` file:

- `KEYSTORE_TYPE`: The type of keystore to use (e.g., `local`, `ledger`, `turnkey`, `environment`).
- `RPC_URL`: The Solana RPC URL.
- `COMMITMENT`: The commitment level for transactions.

For Turnkey and Environment keystores, additional environment variables are required:

- `BASE_URL`, `API_PUBLIC_KEY`, `API_PRIVATE_KEY`, `ORGANIZATION_ID`, `WALLET_ID` for Turnkey.
- `ENV_PRIVATE_KEY` for Environment.

## Testing

TinyWallet includes a suite of tests to ensure functionality. To run the tests, use:

```bash
pnpm test
```

Ensure that your environment is properly configured before running tests, as they may require network access and valid credentials.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.