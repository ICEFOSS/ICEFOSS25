import Image from "next/image";
import WorflowImg01 from "@/public/images/workflow-01.png";
import WorflowImg02 from "@/public/images/workflow-02.png";
import WorflowImg03 from "@/public/images/workflow-03.png";
import Spotlight from "@/components/spotlight";

// Section Data
const sectionData = {
  badge: "Hands-on Learning",
  title: "About ICEFOSS",
  description:
    "Master cutting-edge technologies with hands-on, practical learning experiences that empower you to build real-world solutions and grow your expertise.",
};

// Card Data
const workflowData = [
  {
    id: 1,
    tag: "Frontend Essentials",
    image: WorflowImg01,
    alt: "Workflow 01",
    text: "Master modern frontend development with React, TailwindCSS, and component-driven design.",
  },
  {
    id: 2,
    tag: "Backend Development",
    image: WorflowImg02,
    alt: "Workflow 02",
    text: "Dive into Node.js and Express to build scalable APIs and handle server-side logic effectively.",
  },
  {
    id: 3,
    tag: "Database & Cloud",
    image: WorflowImg03,
    alt: "Workflow 03",
    text: "Learn database design with MongoDB and integrate cloud services for real-world deployments.",
  },
  {
    id: 4,
    tag: "Full Stack Integration",
    image: WorflowImg03,
    alt: "Workflow 04",
    text: "Bring it all together by building and deploying a complete full stack application.",
  },
];

export default function Workflows() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t py-12 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1] md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl  text-center ">
            {/* <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-linear-to-r from-green-500 to-green-200 bg-clip-text text-transparent">
                {sectionData.badge}
              </span>
            </div> */}
            <h2 className="pb-4 font-nacelle text-3xl font-semibold md:text-4xl">
              About{" "}
              <span className="bg-gradient-to-r from-[#FFE000] to-[#01F791] bg-clip-text text-transparent">
                ICEFOSS 2025
              </span>
            </h2>

            {/* <p className="text-lg text-indigo-200/65">
              {sectionData.description}
            </p> */}
            <p className="max-w-3xl text-lg leading-relaxed text-indigo-200/65 md:text-lg">
              Since its inception in 2010, ICEFOSS has proudly stood as the
              flagship event of the
              <span className="font-semibold">
                {" "}
                Computer Science and Engineering Department, FISAT
              </span>
              , serving as a beacon of innovation, collaboration, and
              technological excellence.
              <span className="font-semibold"> ICEFOSS 2025</span> is a platform
              that upholds the motto –
              <span className="italic">
                {" "}
                Catalyze Innovation. Code. Collaborate. Create.
              </span>
            </p>
          </div>

          {/* Spotlight items */}
          {/* <Spotlight className="group mx-auto grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-3">
            {workflowData.map((item) => (
              <a
                key={item.id}
                href="#0"
                className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px 
                           before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 
                           before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] 
                           before:rounded-full before:bg-indigo-500/80 before:opacity-0 before:blur-3xl 
                           before:transition-opacity before:duration-500 
                           after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 
                           after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] 
                           after:rounded-full after:bg-indigo-500 after:opacity-0 after:blur-3xl 
                           after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100"
              >
                <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 
                                after:absolute after:inset-0 after:bg-linear-to-br 
                                after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                  <div
                    className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full 
                               border border-gray-700/50 bg-gray-800/65 text-gray-200 
                               opacity-0 transition-opacity group-hover/card:opacity-100"
                    aria-hidden="true"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width={9} height={8} fill="none">
                      <path
                        fill="#F4F4F5"
                        d="m4.92 8-.787-.763 2.733-2.68H0V3.443h6.866L4.133.767 4.92 0 9 4 4.92 8Z"
                      />
                    </svg>
                  </div>

                  <Image
                    className="inline-flex"
                    src={item.image}
                    width={350}
                    height={288}
                    alt={item.alt}
                  />

                  <div className="p-6">
                    <div className="mb-3">
                      <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal 
                                      before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] 
                                      before:border before:border-transparent 
                                      before:[background:linear-gradient(to_bottom,--theme(--color-gray-700/.15),--theme(--color-gray-700/.5))_border-box] 
                                      before:[mask-composite:exclude_!important] 
                                      before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] 
                                      hover:bg-gray-800/60">
                        <span className="bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                          {item.tag}
                        </span>
                      </span>
                    </div>
                    <p className="text-indigo-200/65">{item.text}</p>
                  </div>
                </div>
              </a>
            ))}
          </Spotlight> */}
        </div>
      </div>
    </section>
  );
}
