"use client"
import Link from "next/link";
import ReactWrapBalancer from "react-wrap-balancer";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";

export function Hero() {
    const { data } = useSession();
    console.log(data?.user)
  return (
    <section>
      <div className="relative max-w-6xl px-4 mx-auto sm:px-6">
        <div className="pt-24 md:pt-52">
          {/* Hero content */}
          <div className="container mx-auto text-center">
            <div className="mb-6" data-aos="fade-down">
              <div className="relative inline-flex before:absolute before:inset-0 ">
                <Link
                  className="text-white px-3 py-1 text-sm font-medium inline-flex items-center justify-center border border-transparent rounded-full bg-[#333d7a62] transition duration-150 ease-in-out w-full group before:rounded-full before:pointer-events-none"
                  href="https://github.com/Praashh/offchain-orderbook"
                  target="_blank"
                >
                  <span className="relative inline-flex items-center px-2">
                  Mobile app available. Download now!{" "}
                    <span className="tracking-normal text-primary-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1 ">
                      &gt;
                    </span>
                  </span>
                </Link>
              </div>
            </div>
            <h1
              className="pb-4 font-extrabold tracking-tight text-transparent text-5xl md:text-6xl lg:text-8xl  bg-clip-text bg-gradient-to-r from-zinc-100/60 via-zinc-200 to-zinc-300/60"
              data-aos="fade-down"
            >
              <ReactWrapBalancer>
              Trade your opinion{" "}<span className="text-[#3A6EF2]">using OpiniX</span>
              </ReactWrapBalancer>
            </h1>
            <p
              className="mb-8 text-lg from-zinc-100/60 via-zinc-200 to-zinc-300/60"
              data-aos="fade-down"
              data-aos-delay="200"
            >
              buy and sell shares on various events, and profit from your insights.
            </p>
            <div
              className="flex flex-col w-1/5 items-center max-w-xs mx-auto gap-4 sm:max-w-none  sm:justify-center sm:flex-row sm:inline-flex"
              data-aos="fade-down"
              data-aos-delay="400"
            >
                <Button className="justify-center flex items-center whitespace-nowrap transition duration-200 ease-in-out font-medium rounded px-10 py-6 text-xl  text-zinc-100 bg-[#3A6EF2] hover:bg-[#325ecd]">Get Started now</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}