import Link from "next/link";
import ConnectWallet from "./components/connect-wallet";

export default async function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link href="/page-2" className="text-blue-700">
        Go Page 2
      </Link>
      <ConnectWallet />
    </>
  );
}
