import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "../ui/accordion";
  
  const FAQS = () => {
    return (
      <div className="relative flex justify-center items-center flex-col gap-5 md:gap-0 mb-10 mt-10 w-full overflow-hidden">
         <div
          className="absolute inset-0 -z-10 -mx-28 rounded-t-[3rem] pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
        </div>
        <div className="mx-auto w-full text-center animate-fade-up inline-block bg-clip-text">
          <h1 className=" lg:mt-8 mt-2 md:mt-0 md:-mb-8 font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-200/60 via-zinc-200 to-zinc-200/60 flex justify-center w-full items-center gap-1 sm:gap-4 h-[5rem] md:h-[4rem] lg:h-[16rem] sm:text-[5rem] lg:text-[30px] xl:text-[50px] text-[2.2rem]">
            <span>F</span>
            <span>A</span>
            <span>Qs</span>
          </h1>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem
            value="item-1"
            className="px-2 md:px-10 md:py-2 rounded-xl"
          >
            <AccordionTrigger className="text-lg md:text-xl text-zinc-400">
              How does OpiniX ensure security?
            </AccordionTrigger>
            <AccordionContent>
            Centre to constitute the 8th Pay Commission?
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            className="px-2 md:px-10 md:py-2 rounded-xl mt-5"
          >
            <AccordionTrigger className="text-lg md:text-xl text-zinc-400">
             is it safe
            </AccordionTrigger>
            <AccordionContent>
             yes 100%
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-3"
            className="px-2 md:px-10 md:py-2 rounded-xl mt-5"
          >
            <AccordionTrigger className="text-lg md:text-xl text-zinc-400">
              Will money withdrawals easy?
            </AccordionTrigger>
            <AccordionContent>
            yes it is easy, just one click.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-4"
            className="px-2 md:px-10 md:py-2 rounded-xl mt-5"
          >
            <AccordionTrigger className="text-lg md:text-xl text-zinc-400">
              is there any mobile app?
            </AccordionTrigger>
            <AccordionContent>
              Yes,there will mobile app soon, in v2.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-5"
            className="px-2 md:px-10 md:py-2 rounded-xl mt-5"
          >
            <AccordionTrigger className="text-lg md:text-xl text-zinc-400">
              How can I get started with OpiniX?
            </AccordionTrigger>
            <AccordionContent>
              just register and start trading.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  };
  
  export default FAQS;