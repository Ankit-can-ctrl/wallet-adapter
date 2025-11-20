import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import React, { useEffect, useState } from "react";

interface formdata {
  publicKey: string;
  sol: number;
}

const SendSol = () => {
  const [data, setData] = useState<formdata>({
    publicKey: "",
    sol: 0,
  });
  const { publicKey, signTransaction } = useWallet();
  const { connection } = useConnection();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSolToLamports = () => {
    const lamps = data.sol * LAMPORTS_PER_SOL;
    return lamps;
  };

  const handleSignTransaction = async () => {
    // const receiverPublicKey = new PublicKey(data.receiverKey);

    if (!data.publicKey || data.publicKey.trim() === "") {
      alert("Please enter a recepient address.");
      return;
    }
    if (!publicKey) {
      alert("Please connect your wallet before you sign a transaction.");
      return;
    }

    if (!signTransaction) {
      alert("Your wallet does not support transaction signing.");
      return;
    }

    let receiverPublicKey!: PublicKey;
    try {
      receiverPublicKey = new PublicKey(data.publicKey);

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
      setData({
        publicKey: "",
        sol: 0,
      });
    } catch (error) {
      alert("Something went wrong during the transfer.");
      console.log("something went wrong while sending.", error);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Send SOL</h2>
      </div>

      <p className="text-gray-600 mb-6">
        Transfer SOL to any Solana wallet address
      </p>

      <div className="space-y-4">
        <input
          onChange={handleInput}
          value={data.publicKey}
          name="publicKey"
          type="text"
          placeholder="Recipient's Public Key"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
        />

        <input
          onChange={handleInput}
          value={data.sol}
          name="sol"
          type="number"
          placeholder="Amount in SOL"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
        />

        <button
          onClick={handleSignTransaction}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl"
        >
          Send Transaction
        </button>
      </div>
    </div>
  );
};

export default SendSol;
