import VideoThumb from "@/public/images/hero-image-01.jpg";
import ModalVideo from "@/components/modal-video";
import RotatingDiscs from "./RotatingDiscs";

export default function HeroHome() {
  return (
    <section>
      <div className="mx-auto h-auto md:h-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="py-12 md:py-0 ">
          {/* Section header */}
          <div className="pb-12 md:pb-10">
            <RotatingDiscs />
          </div>
          <div className="pb-0 text-center md:pb-20">
            <h1
              className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,#FFE000,#01F791,#FFE000)] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-extrabold text-transparent md:text-6xl"
              data-aos="fade-up"
            >
              ICEFOSS 2025
            </h1>

            <div className="mx-auto max-w-3xl">
              <p
                className="mb-3 text-lg md:text-xl text-indigo-200/80 leading-relaxed"
                data-aos="fade-up"
                data-aos-delay={200}
              >International Conference on Emerging Trends in Free and Open Source Software
              </p>

              <p
                className="mb-10 text-lg md:text-xl font-semibold "
                data-aos="fade-up"
                data-aos-delay={300}
              >
                September 11 – 12, 2025
              </p>

              <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
                <div data-aos="fade-up" data-aos-delay={400}>
                  <a
                    className="btn group mb-4 w-full md:px-12 bg-gradient-to-tr from-[#FFE000] to-[#01F791] text-lg text-black font-semibold shadow-md hover:opacity-90 transition sm:mb-0 sm:w-auto"
                    href="/"
                  >
                    <span className="relative inline-flex items-center">
                      Register Now
                      <span className="ml-1 tracking-normal text-black/70 transition-transform group-hover:translate-x-0.5">
                        -&gt;
                      </span>
                    </span>
                  </a>
                </div>

                {/* <div data-aos="fade-up" data-aos-delay={600}>
                  <a
                    className="btn relative w-full bg-linear-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%] sm:ml-4 sm:w-auto"
                    href="#0"
                  >
                    Schedule Demo
                  </a>
                </div> */}
              </div>
            </div>
          </div>

          {/* <ModalVideo
            thumb={VideoThumb}
            thumbWidth={1104}
            thumbHeight={576}
            thumbAlt="Modal video thumbnail"
            video="videos//video.mp4"
            videoWidth={1920}
            videoHeight={1080}
          /> */}
        </div>
      </div>
    </section>
  );
}
