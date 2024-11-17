import Link from "next/link";
import BuyToken from "./BuyToken";

export default function NavButtons() {
  return (
    <>
      <BuyToken />
      <Link href="/about" className="text-gray-700 hover:text-gray-900 mr-6">
        About
      </Link>
      <Link href="/login" className="text-gray-700 hover:text-gray-900">
        Login
      </Link>
    </>
  );
}