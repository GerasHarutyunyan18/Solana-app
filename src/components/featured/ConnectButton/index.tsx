import { useWallet } from "@solana/wallet-adapter-react";

export default function ConnectButton() {
  const { wallets, select, connected, disconnect, publicKey } =
    useWallet();

  const handleConnect = () => {
    console.log("wallets ==", wallets);
    select(wallets[0].adapter.name);
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const handleClick = () => {
    if (connected) {
      handleDisconnect();
    } else {
      handleConnect();
    }
  };

  return (
    <div>
      <button onClick={handleClick}>
        {connected ? "Disconnect" : "Connect Button"}
      </button>
      {connected && <div>Public key - {String(publicKey)}</div>}
    </div>
  );
}
