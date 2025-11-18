import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { useEffect, useState } from "react";

interface formData {
  receiverKey: string;
  sol: number;
}

const SignTransaction = () => {
  const [data, setData] = useState<formData>({
    receiverKey: "",
    sol: 0,
  });
  const { publicKey, signTransaction } = useWallet();
  const { connection } = useConnection();

  const handleSolToLamports = () => {
    const lamps = data.sol * LAMPORTS_PER_SOL;
    return lamps;
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: name === "sol" ? Number(value) : value,
    }));
  };

  const handleSignTransaction = async () => {
    // const receiverPublicKey = new PublicKey(data.receiverKey);

    if (!data.receiverKey || data.receiverKey.trim() === "") {
      alert("Please enter a recepient address.");
      return;
    }
    if (!publicKey) {
      alert("Please connect your wallet before you sign a transaction.");
      return;
    }
    console.log(publicKey);
    if (!signTransaction) {
      alert("Your wallet does not support transaction signing.");
      return;
    }

    let receiverPublicKey!: PublicKey;
    try {
      receiverPublicKey = new PublicKey(data.receiverKey);

      if (!PublicKey.isOnCurve(receiverPublicKey.toBytes())) {
        alert("Invalid solana address - not a valid public key.");
        return;
      }

      const lamps = handleSolToLamports();

      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: receiverPublicKey,
          lamports: lamps,
        })
      );

      tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      tx.feePayer = publicKey;

      // ask wallet to sign
      const signed = await signTransaction(tx);
      console.log("Transaction signed.", signed);

      // send the signed transaction to the blockchain
      const signature = await connection.sendRawTransaction(signed.serialize());
      await connection.confirmTransaction(signature, "confirmed");

      alert("Transaction sent! Signature: " + signature);
      console.log("Transaction signature:", signature);
    } catch (error) {
      alert("Invalid solana address format.");
      console.log("Invalid solana address format.", error);
    }
  };
  return (
    <div>
      <input
        name="receiverKey"
        value={data.receiverKey}
        type="text"
        onChange={handleInput}
        placeholder="Public Key"
      />
      <input
        name="sol"
        value={data.sol}
        type="number"
        onChange={handleInput}
        placeholder="Amount"
      />
      <button onClick={handleSignTransaction}>Send</button>
    </div>
  );
};

export default SignTransaction;
