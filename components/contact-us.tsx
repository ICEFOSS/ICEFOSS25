export default function ContactUs() {
  return (
    <section id="contact" className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t py-12 md:py-20 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1]">
          {/* Section header */}
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="pb-4 font-nacelle text-3xl font-semibold md:text-4xl">
              <span className="">Contact Us</span>
            </h2>
            <p className="text-lg text-indigo-200/65">
              Reach out to us for any queries or details about ICEFOSS 2025.
            </p>
          </div>

          {/* Contact details */}
          <div className="mt-10 grid gap-6 text-center text-indigo-200/80 sm:grid-cols-3">
            <div>
              <h3 className="font-semibold text-gray-200">Email</h3>
              <p>
                <a
                  href="mailto:icefoss@fisat.ac.in"
                  className="text-[#01F791] hover:underline"
                >
                  icefoss@fisat.ac.in
                </a>
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-200">Phone</h3>
              <p>+91 9400902319</p>
              <p>Rhithika</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-200">Location</h3>
              <p>FISAT, Angamaly, Kerala</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
