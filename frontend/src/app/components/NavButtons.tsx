import Link from "next/link";

export default function NavButtons() {
  return (
    <>
      <Link href="/about" className="text-gray-700 hover:text-gray-900 mr-6">
        About
      </Link>
      <Link href="/login" className="text-gray-700 hover:text-gray-900">
        Login
      </Link>
    </>
  );
}