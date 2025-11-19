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
import Home from "./pages/Home";

const App = () => {
  return (
    <ConnectionProvider endpoint={import.meta.env.VITE_RPC_URL}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          {/* <WalletMultiButton></WalletMultiButton>
          <WalletDisconnectButton></WalletDisconnectButton> */}
          <Home />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
