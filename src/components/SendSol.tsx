import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import React, { useState } from "react";
import Loader from "./Loader";
import { toast } from "react-toastify";

interface formdata {
  publicKey: string;
  sol: number;
}

const SendSol = () => {
  const [data, setData] = useState<formdata>({
    publicKey: "",
    sol: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
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
      toast.error("Please enter a valid public key.");
      return;
    }
    if (!publicKey) {
      toast.error("Please connect your wallet before you sign a transaction.");
      return;
    }

    if (!signTransaction) {
      toast.error("Your wallet does not support transaction signing.");
      return;
    }

    let receiverPublicKey!: PublicKey;
    try {
      setLoading(true);
      receiverPublicKey = new PublicKey(data.publicKey);

      if (!PublicKey.isOnCurve(receiverPublicKey.toBytes())) {
        toast.error("Invalid solana address - not a valid public key.");
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

      // send the signed transaction to the blockchain
      const signature = await connection.sendRawTransaction(signed.serialize());
      await connection.confirmTransaction(signature, "confirmed");

      setLoading(false);
      toast.success("SOL sent successfuly.");

      setData({
        publicKey: "",
        sol: 0,
      });
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong during the transfer.");
      console.log("something went wrong while sending.", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-blue-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
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
        <h2 className="text-2xl font-bold text-blue-900">Send SOL</h2>
      </div>

      <p className="text-blue-700 mb-6">
        Transfer SOL to any Solana wallet address
      </p>

      <div className="space-y-4">
        <input
          onChange={handleInput}
          value={data.publicKey}
          name="publicKey"
          type="text"
          placeholder="Recipient's Public Key"
          className="w-full px-4 py-3 bg-white border-2 border-blue-200 rounded-xl focus:border-blue-400 focus:outline-none transition-colors placeholder:text-gray-400"
        />

        <input
          onChange={handleInput}
          value={data.sol}
          name="sol"
          type="number"
          placeholder="Amount in SOL"
          className="w-full px-4 py-3 bg-white border-2 border-blue-200 rounded-xl focus:border-blue-400 focus:outline-none transition-colors placeholder:text-gray-400"
        />

        <button
          onClick={handleSignTransaction}
          className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-all shadow-md hover:shadow-lg"
        >
          {loading ? <Loader /> : "Send"}
        </button>
      </div>
    </div>
  );
};

export default SendSol;
