import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import Decimal from "decimal.js";

export default function Swap() {
  const { publicKey } = useWallet();
  const handleSwap = async () => {
    const {
      data,
      success,
    }: {
      id: string;
      success: true;
      version: "V1";
      msg?: string;
      data?: { transaction: string }[];
    } = await axios.post(
      "https://transaction-v1.raydium.io/transaction/swap-base-in",
      {
        wallet: publicKey?.toBase58(),
        computeUnitPriceMicroLamports: new Decimal(0).toFixed(0),
        swapResponse,
        txVersion: isV0Tx ? "V0" : "LEGACY",
        wrapSol: isInputSol,
        unwrapSol,
        inputAccount: isInputSol ? undefined : inputTokenAcc?.toBase58(),
        outputAccount: isOutputSol ? undefined : outputTokenAcc?.toBase58(),
      }
    );
  };
  return (
    <div>
      <input placeholder="From amount..." />
      <button>Swap</button>
    </div>
  );
}
