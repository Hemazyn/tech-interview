"use client";
import { useState, useEffect } from "react";
import { Form, Loading, Header } from "@/components/index";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center px-5 justify-center h-[100vh]">
        {loading ? (
          <div className="flex flex-col gap-20 max-wfit">
            <div className="flex flex-col gap-4 md:gap-2 max-w-fit">
              <h1 className="text-3xl font-bold text-center lg:text-5xl">Welcome to <span className="text-teal-700 uppercase">tech interview prep</span></h1>
              <span className="text-xs font-semibold text-center md:text-right md:text-base lg:text-lg">Guess it gonna be hot seat</span>
            </div>
            <Loading />
          </div>
        ) : (
          <Form />
        )}
      </div>
    </>
  );
}
