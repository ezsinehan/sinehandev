import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-blue-600 text-white p-4">
      <Link href="/" className="text-lg font-semibold hover:underline">
        next.js tailwind template
      </Link>
    </nav>
  );
}
