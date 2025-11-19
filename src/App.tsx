import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
import Airdrop from "./components/Airdrop";
import SignTransaction from "./components/SignTransaction";
import Account from "./components/Account";

const App = () => {
  return (
    <ConnectionProvider endpoint={import.meta.env.VITE_RPC_URL}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton></WalletMultiButton>
          <WalletDisconnectButton></WalletDisconnectButton>
          <div>
            <h1>Airdrop some solana </h1>
            <p>================</p>
            <Airdrop />
          </div>
          <div>
            <h1>Sign a transaction</h1>
            <p>==========================</p>
            <SignTransaction />
          </div>
          <div>
            <p>==========================</p>
            <Account />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
