import { useRouter } from "next/router";
import clsx from "clsx";

import Container from "@/components/Container";
import { getSectionData, getSectionElementData, getSectionElementValue } from "@/services/strapi/page-api";


import React, { FC, HTMLAttributes, useEffect, useMemo, useRef, useState } from "react";

import Link from "next/link";
import FeatureCard from "../components/Features";
import Benefits from "./Benefits";

export default function IntroductionWeb() {
  const router = useRouter();
  const features = [
    {
      id: 1,
      description: "Nhanh chóng và dễ dàng tìm kiếm các văn bản pháp luật ",
      name: "Tìm kiếm cơ bản",
      imageUrl: "images/Banners/banner-2.png",
    },
    {
      id: 2,
      description: "Cung cấp kết quả tìm kiếm chính xác và liên quan hơn, phù hợp với bối cảnh và nội dung người dùng tìm kiếm",
      name: "Tìm kiếm nâng cao",
      imageUrl: "images/Banners/banner-1.png",
    },
    {
      id: 3,
      description: "Tìm kiếm chính xác và chi tiết hơn nhờ sự hỗ trợ từ các mô hình ngôn ngữ lớn (LLMs)",
      name: "Tìm kiếm chính xác",
      imageUrl: "images/Banners/banner-1.jpg",
    },
    {
      id: 4,
      description: "Người dùng có thể đặt câu hỏi và nhận được các câu trả lời giải thích tương tự như hỏi đáp với luật sư chuyên nghiệp",
      name: "Chat Law-GPT",
      imageUrl: "images/Banners/banner-1.jpg",
    },
  ];


  
  return (
      <Container>
        <div className="relative bg-white py-20 px-4 sm:px-6 lg:px-8 mt-8">
          <div className="relative inset-0 items-center justify-center">
            <div className="text-center text-black mx-auto">
              <h1 className="text-4xl font-bold mb-4">
                Giới thiệu về Legal Search
              </h1>
              <p className="text-lg leading-relaxed py-10 ">
                Bạn đang gặp phải vấn đề pháp lý hay chỉ đang tìm kiếm thêm thông tin về một chủ đề pháp lý cụ thể? Phần Tìm hiểu về Luật của Legal Search là điểm khởi đầu hoàn hảo. 
                Tìm hiểu về Luật có các bài viết cung cấp thông tin về nhiều chủ đề pháp lý khác nhau cũng như thông tin cụ thể về 
                các chủ đề như tìm hiểu theo bộ luật, tìm hiểu theo các tình huống, nội dung liên quan đến điều luật... Và đặc biệt có thể hỏi đáp với Law-Gpt để đưa ra định hướng phù hợp nhất.
              </p>  
         
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-4 gap-x-6 gap-y-6 mt-4">
                {
                  features.map((items: any, index: any) => {
                    return (
                      <div className="col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2 rounded-lg shadow-lg" key={index}>
                        {/* <FeatureCard 
                          imageUrl={features[index].imageUrl}
                          name={features[index].name}
                          description={features[index].description}>
                        </FeatureCard> */}
                      </div>
                    )
                  })
                } 
              </div>
            </div> 
            </div >
          </div>  
      </div>
    </Container>
  );
}
     
     