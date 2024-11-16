import Link from "next/link";
import NavButtons from "./NavButtons";

export default function NavBar() {
  return (
    <>
      <header className="bg-white border-b border-gray-300">
        <div className="px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <div className="w-10 h-10 bg-gray-300 mr-3"></div>
            <h1 className="text-xl font-bold">MoleClue</h1>
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <NavButtons />
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

