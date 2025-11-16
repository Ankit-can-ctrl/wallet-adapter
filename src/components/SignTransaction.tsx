import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { SystemProgram, Transaction } from "@solana/web3.js";

const SignTransaction = () => {
  const { publicKey, signTransaction } = useWallet();
  const { connection } = useConnection();

  const handleSignTransaction = async () => {
    if (!publicKey) {
      alert("Please connect your wallet before you sign a transaction.");
      return;
    }
    if (!signTransaction) {
      alert("Your wallet does not support transaction signing.");
      return;
    }

    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: publicKey,
        lamports: 0,
      })
    );

    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    tx.feePayer = publicKey;

    // ask wallet to sign
    const signed = await signTransaction(tx);
    alert("Transaction Signed :)");
    console.log("Transaction signed.", signed);
  };
  return (
    <div>
      <h1>Sign Transaction</h1>
      <button onClick={handleSignTransaction}>Sign</button>
    </div>
  );
};

export default SignTransaction;
