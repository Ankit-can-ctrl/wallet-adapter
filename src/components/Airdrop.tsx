import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import type { Connection } from "@solana/web3.js";
import { useEffect, useState } from "react";

const Airdrop = () => {
  const [network, setNetwork] = useState<string>("Loading...");
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  // const getNetwork = (endpoint: string) => {
  //   if (endpoint.includes("mainnet")) return "Mainnet";
  //   if (endpoint.includes("devnet")) return "Devnet";
  //   if (endpoint.includes("testnet")) return "Testnet";
  //   if (endpoint.includes("localhost")) return "Localhost";
  //   return "Unkown";
  // };

  // const network = getNetwork(import.meta.env.VITE_RPC_URL);

  // checking network using genesis hash
  const getNetworkFromGenesisHash = async (
    connection: Connection
  ): Promise<string> => {
    try {
      const genesisHash = await connection.getGenesisHash();

      // known genesis hashes
      const MAINNET_GENESIS = "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d";
      const DEVNET_GENESIS = "EtWTRABZaYq6iMfeYKouRu166VU2xqa1wcaWoxPkrZBG";
      const TESTNET_GENESIS = "4uhcVJyU9pJkvQyS88uRDiswHXSCkY3zQawwpjk2NsNY";

      if (genesisHash === MAINNET_GENESIS) return "Mainnet";
      if (genesisHash === DEVNET_GENESIS) return "Devnet";
      if (genesisHash === TESTNET_GENESIS) return "Testnet";
      return "Unknown/custom network.";
    } catch (error) {
      alert("Error while matching genesis hash.");
      return "Unknown";
    }
  };

  useEffect(() => {
    const detectNetwork = async () => {
      const detectedNetwork = await getNetworkFromGenesisHash(connection);
      setNetwork(detectedNetwork);
    };

    detectNetwork();
  }, [connection]);

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
        <div>
          <p>Network : {network}</p>
        </div>
        <input type="text" placeholder="Enter Amout of SOL to airdrop. " />
        <button onClick={handleAirdrop}>Send Airdrop</button>
      </div>
    </div>
  );
};

export default Airdrop;
