import { useRouter } from "next/router";
import clsx from "clsx";

import Container from "@/components/Container";
import { getSectionData, getSectionElementData, getSectionElementValue } from "@/services/strapi/page-api";




export default function Banner() {
  const router = useRouter();
  
  return (
    <div className="relative inset-0 flex flex-col justify-center py-6 md:py-8 lg:py-10 ">
      <div className="relative w-full h-full">
        <img className={clsx("w-full h-full object-cover rounded-lg shadow-2xl")} src="/images/Banners/Banner-3.png" />
        <div className="absolute inset-0 bg-black opacity-50 "></div>
      </div>
    <div className="absolute inset-0 flex items-center pl-13">
      <div className="text-left text-white">
        <h1 className="text-8xl font-bold">
          Legal Search
        </h1>
        <p className="mt-9 text-3xl pl-6">Hỗ trợ giải quyết tất cả các nhu cầu pháp lý của bạn</p>
    </div>
  </div>
</div>

  );
}
     
     
       
    
