import { useConnection } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { toast } from "react-toastify";

const Network = () => {
  const [network, setNetwork] = useState<string>("Loading...");
  const { connection } = useConnection();
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
      toast.error("Error while matching genesis hash.");
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

  return (
    <div className=" w-full flex items-center justify-center  font-semibold">
      <div className=" text-white bg-[#3C84F6] py-2 px-3 rounded-xl">
        Network : {network === "Loading..." ? <Loader /> : network}
      </div>
    </div>
  );
};

export default Network;
