import React from "react";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="w-32 h-auto animate-pulse">
        <Image
          src="/img/logo.jpg" // place your logo file inside /public
          alt="Loading..."
          width={300}
          height={300}
          priority
        />
      </div>
    </div>
  );
}
