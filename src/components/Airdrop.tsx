import { useConnection, useWallet } from "@solana/wallet-adapter-react";

const Airdrop = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const handleAirdrop = async () => {
    try {
      if (!publicKey) {
        alert("Please connect your wallet first!");
        return;
      }
      await connection.requestAirdrop(publicKey, 1000000000);
      alert("Airdrop sent!");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <input type="text" placeholder="Enter Amout of SOL to airdrop. " />
        <button onClick={handleAirdrop}>Send Airdrop</button>
      </div>
    </div>
  );
};

export default Airdrop;
