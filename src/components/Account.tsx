import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

const Account = () => {
  const [balance, setBalance] = useState<number | null>();
  const [loading, setLoading] = useState(false);
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const getBalance = async () => {
    if (publicKey) {
      try {
        setLoading(true);
        const lamps = await connection.getBalance(publicKey);
        setBalance(lamps / LAMPORTS_PER_SOL);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error fetching balance", error);
      }
    }
  };

  useEffect(() => {
    getBalance();
  }, [publicKey, connection]);

  return (
    <div>
      {loading && <p>Loading....</p>}
      {!loading && publicKey && balance != null && (
        <p>Account balance : {balance.toFixed(4)} SOL</p>
      )}
      {!loading && !publicKey && <p>Please connect your wallet.</p>}
    </div>
  );
};

export default Account;
