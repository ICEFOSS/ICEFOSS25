import Image from "next/image";
import BlurredShapeGray from "@/public/images/blurred-shape-gray.svg";
import BlurredShape from "@/public/images/blurred-shape.svg";
import FeaturesImage from "@/public/images/features.png";
import { Calendar, BadgeIndianRupee } from "lucide-react";

// Section Data
const sectionData = {
  badge: "Hands-on Learning",
  title: "Workshops",
  description:
    "Learn by doing — build, code, and deploy real projects that sharpen your skills beyond theory.",
  image: FeaturesImage,
};

// Features Data
const featuresData = [
  {
    id: 1,
    title:
      "Mastering GenAI & Retrieval Augmented Generation (RAG): From Fundamentals to Real-World Applications",
    description:
      "Learn how Generative AI and Retrieval-Augmented Generation (RAG) power smarter chatbots, knowledge assistants, and enterprise search. Covers concepts, tools, and real-world use cases.",
    icon: (
      <svg
        className="mb-3 fill-[#01f791]"
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
      >
        <path d="M9 2a7 7 0 0 0-7 7v2a7 7 0 0 0 7 7h1v-2H9a5 5 0 0 1-5-5V9a5 5 0 0 1 5-5h1V2H9Zm5 0v2h1a5 5 0 0 1 5 5v2a5 5 0 0 1-5 5h-1v2h1a7 7 0 0 0 7-7V9a7 7 0 0 0-7-7h-1Z" />
        <circle cx="9" cy="12" r="1.5" />
        <circle cx="15" cy="12" r="1.5" />
        <path d="M12 17c1.5 0 3-1.5 3-3h-6c0 1.5 1.5 3 3 3Z" />
      </svg>
    ),
    date: "September 11–12, 2025 (Two days)",
    price: 449,
    image: "/workshops/workshop1.jpg",
  },
  {
    id: 2,
    title: "Intro to Hugging Face: Train, Tune, Deploy",
    description:
      "Build and fine-tune cutting-edge transformer models for text classification, sentiment analysis, and chatbots using Hugging Face Transformers.",
    icon: (
      <svg
        className="mb-3 fill-[#01f791]"
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
      >
        <path d="M4 4h16v10H5.17L4 15.17V4Zm2 2v6h12V6H6Zm0 12h12v2H6v-2Z" />
      </svg>
    ),
    date: "September 12, 2025",
    price: 299,
    image: "/workshops/workshop2.jpg",
  },
  {
    id: 3,
    title: "Kickstart Your Journey in Data Science & ML",
    description:
      "Get started with the fundamentals of Data Science and ML. Learn why they matter, where they're used, and explore career paths in this fast-growing field.",
    icon: (
      <svg
        className="mb-3 fill-[#01f791]"
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
      >
        <path d="M3 3h2v18H3V3Zm8 6h2v12h-2V9Zm8-4h2v16h-2V5Z" />
      </svg>
    ),
    date: "September 12, 2025",
    price: 299,
    image: "/workshops/workshop3.jpg",
  },
  {
    id: 4,
    title: "WEBCRAFT MERNSTACK",
    description:
      "Learn to build scalable, production-ready apps with MongoDB, Express.js, React, and Node.js. Covers both backend and frontend, with deployment best practices.",
    icon: (
      <svg
        className="mb-3 fill-[#01f791]"
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
      >
        <path d="M8.293 6.293 2.586 12l5.707 5.707L9.707 16.293 5.414 12l4.293-4.293-1.414-1.414ZM15.707 6.293 14.293 7.707 18.586 12l-4.293 4.293 1.414 1.414L21.414 12l-5.707-5.707Z" />
      </svg>
    ),
    date: "September 12, 2025",
    price: 299,
    image: "/workshops/workshop4.jpg",
  },
];

export default function Workshop() {
  return (
    <section className="relative">
      {/* Background shapes */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -mt-20 -translate-x-1/2"
        aria-hidden="true"
      >
        <Image
          className="max-w-none"
          src={BlurredShapeGray}
          width={760}
          height={668}
          alt="Blurred shape"
        />
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -mb-80 -translate-x-[120%] opacity-50"
        aria-hidden="true"
      >
        <Image
          className="max-w-none"
          src={BlurredShape}
          width={760}
          height={668}
          alt="Blurred shape"
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t py-12 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1] md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-4 text-center md:pb-18">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-gradient-to-r from-[#FFE000] to-[#01F791] bg-clip-text text-transparent">
                {sectionData.badge}
              </span>
            </div>
            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              {sectionData.title}
            </h2>
            <p className="text-lg text-indigo-200/65">
              {sectionData.description}
            </p>
          </div>

          {/* Section image */}
          {/* <div className="flex justify-center pb-4 md:pb-12" data-aos="fade-up">
            <Image
              className="max-w-none"
              src={sectionData.image}
              width={1104}
              height={384}
              alt="Features"
            />
          </div> */}

          {/* Features grid */}
          <div className="mx-auto grid max-w-sm gap-12 sm:max-w-none sm:grid-cols-2 md:gap-x-14 md:gap-y-16 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <article key={feature.id}>
                {/* {feature.icon} */}
                <div className="mb-3 ">
                  <img src={feature.image} alt="" className="rounded" />
                </div>
                <h3 className="mb-1 font-nacelle text-[1rem] font-semibold text-gray-200">
                  <span className="bg-gradient-to-br from-[#FFE000] to-[#01F791] bg-clip-text text-transparent font-semibold ">
                    Workshop {feature.id}
                  </span>{" "}
                  - {feature.title}
                </h3>
                <p className="text-indigo-200/65">{feature.description}</p>
                <p className="mt-3 flex items-center gap-6 text-sm text-indigo-200/70">
                  {/* Date */}
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-indigo-400 drop-shadow-[0_0_6px_rgba(99,102,241,0.8)]" />
                    <span className="font-medium">
                      {feature.date || "Coming Soon"}
                    </span>
                  </span>

                  {/* Price */}
                  <span className="flex items-center gap-2 text-emerald-300/80">
                    <BadgeIndianRupee className="h-4 w-4 text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.9)]" />
                    <span className="font-semibold">{feature.price}</span>
                  </span>
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
