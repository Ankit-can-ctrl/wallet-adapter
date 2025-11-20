import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, type PublicKey } from "@solana/web3.js";

async function getBalance(publicKey: PublicKey) {
  const { connection } = useConnection();
  try {
    const lamps = await connection.getBalance(publicKey);
    const sol = lamps / LAMPORTS_PER_SOL;
    return sol;
  } catch (error) {
    alert("Something went wrong while fetching balance.");
  }
}

export default getBalance;
