// homepage

// icons
import {FaGithub} from "react-icons/fa";
import {FaLinkedin} from "react-icons/fa";
import {IoDocumentOutline} from "react-icons/io5";
import {FaArrowDownLong} from "react-icons/fa6";

export default function Home() {
  return (
      <main className="px-[10%]">
        <section className="flex relative items-center h-screen">
          <div className="flex flex-col gap-10">
            <header>
              <p>hey, i&#39;m</p>
              <h1 className="relative font-bold text-6xl leading-20 tracking-wide">
                <span className="absolute inset-0 blur-xs">justin abuyuan.</span>
                <span className="relative z-10">justin abuyuan.</span>
              </h1>
              <h2 className="text-xl leading-10">software engineering @ uwaterloo</h2>
              <p className="text-gray-400">i like to code stuff and build things that solve problems.</p>
            </header>

            {/* Social buttons */}
            <section className="flex flex-row gap-4 opacity-75">
              <FaGithub className="size-10"/>
              <FaLinkedin className="size-10"/>
              <IoDocumentOutline className="size-10"/>
            </section>
          </div>
          <div className="absolute flex justify-center bottom-10 w-full">
            <FaArrowDownLong
                className="opacity-50 animate-bounce size-5"/>
          </div>
        </section>

        {/* Overview section */}
        <section className="flex h-screen">
          <div className="flex flex-col gap-10 pl-[10%]">

          </div>
        </section>
      </main>
  );
}
