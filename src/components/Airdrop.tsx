import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Connection, clusterApiUrl } from "@solana/web3.js";

const Airdrop = () => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const handleAirdrop = async () => {
    try {
      if (!wallet.publicKey) {
        alert("Please connect your wallet first!");
        return;
      }

      // Use public devnet ONLY for airdrops
      const airdropConnection = new Connection(
        clusterApiUrl("devnet"),
        "confirmed"
      );

      console.log(wallet.publicKey);
      const signature = await airdropConnection.requestAirdrop(
        wallet.publicKey,
        1000000000
      );

      // Use Alchemy connection to confirm (faster)
      await connection.confirmTransaction(signature);

      alert("Airdrop sent!");
    } catch (error) {
      console.error("Airdrop error:", error);
      alert(`Airdrop failed: ${error.message}`);
    }
  };
  return (
    <div>
      <p>hello your public key is: {wallet.publicKey?.toString()}</p>

      <div>
        <input type="text" placeholder="Enter Amout of SOL to airdrop. " />
        <button onClick={handleAirdrop}>Send Airdrop</button>
      </div>
    </div>
  );
};

export default Airdrop;
