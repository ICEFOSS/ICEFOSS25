const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center text-white">
        <h1 className="text-2xl font-bold text-[#CCFF00] tracking-wide">ICESFOSS</h1>

        <ul className="flex space-x-6 text-lg font-medium items-center">
          {["Home", "About", "Contact"].map((item, i) => (
            <li key={i} className="relative group cursor-pointer">
              <span className="group-hover:text-[#90ff00] transition">{item}</span>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#90ff00] group-hover:w-full transition-all duration-300"></span>
            </li>
          ))}

          {/* Register Button */}
          <li>
            <button className="relative px-5 py-2 rounded-xl bg-white/10 text-white font-semibold backdrop-blur-sm border border-white/30 overflow-hidden z-10">
              <span className="relative z-10">Register</span>

              {/* Multi-color Firefly Glow */}
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400 via-yellow-300 to-blue-400 blur-xl opacity-80 animate-pulse" />

              {/* Outer Ring Glow */}
              <span className="absolute inset-0 rounded-xl ring-2 ring-green-400/30 animate-glow" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
