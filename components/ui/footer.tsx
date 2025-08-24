import Logo from "./logo";

export default function Footer() {
  return (
    <footer className="relative border-t border-gray-800">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 md:py-12 text-center">
        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <div className="h-16 md:h-20 w-32 md:w-40 overflow-hidden flex items-center justify-center">
            <img
              src="/icefoss.png"
              alt="ICEFOSS Logo"
              className="object-contain"
            />
          </div>
        </div>

        {/* Text */}
        <p className="text-sm text-indigo-200/65">
          Developed by <span className="font-semibold">ICEFOSS Tech Team</span>
        </p>
        <p className="mt-2 text-sm text-indigo-200/65">© ICEFOSS 2025</p>
      </div>
    </footer>
  );
}
