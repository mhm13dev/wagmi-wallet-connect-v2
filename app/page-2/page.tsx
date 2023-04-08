import Link from "next/link";
import ConnectWallet from "../components/connect-wallet";

export default function Home() {
  return (
    <div>
      <h1>Page 2</h1>
      <Link href="/" className="text-blue-700">
        Go Home
      </Link>
      <ConnectWallet />
    </div>
  );
}
