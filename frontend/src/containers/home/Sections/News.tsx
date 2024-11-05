import { useRouter } from "next/router";
import clsx from "clsx";

import Container from "@/components/Container";
import { getSectionData, getSectionElementData, getSectionElementValue } from "@/services/strapi/page-api";


import React, { FC, HTMLAttributes, useEffect, useMemo, useRef, useState } from "react";

import Link from "next/link";
import FeatureCard from "../components/Features";
import Benefits from "./Benefits";

export default function News() {
  const router = useRouter();

  return (
      <Container>
        <div className="relative bg-white py-20 px-4 sm:px-6 lg:px-8 mt-8">
          <div className="relative inset-0 items-center justify-center">
            <div className="text-center text-black mx-auto">
              <h1 className="text-4xl font-bold mb-4">
                Legal Search có gì mới?
              </h1>
              <p className="text-lg leading-relaxed py-10 ">
                (Đang phát triển)
              </p>  
         
           
            </div >
          </div>  
      </div>
    </Container>
  );
}
     
     