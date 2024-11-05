import { useRouter } from "next/router";
import clsx from "clsx";

import Container from "@/components/Container";
import { getSectionData, getSectionElementData, getSectionElementValue } from "@/services/strapi/page-api";

import Swiper, { SwiperSlide } from "@/components/Swiper";
import { Autoplay, Grid , Pagination, FreeMode, Navigation } from "swiper";


export default function Benefits() {
  const router = useRouter();
  const benefits =[
    {
      benefit: "Tra cứu pháp lý nhanh chóng",
      description: "Người dùng có thể dễ dàng tìm kiếm các văn bản luật, điều luật, và quy định pháp lý bằng cách nhập từ khóa hoặc sử dụng tính năng tìm kiếm nâng cao."
    },
    {
      benefit: "Tìm kiếm nâng cao và chính xác",
      description: "Cung cấp các tính năng tìm kiếm nâng cao, giúp người dùng tìm kiếm thông tin chính xác hơn dựa trên ngữ cảnh và ý nghĩa của từ khóa."
    },
    {
      benefit: "Trả lời vấn đề chuyên nghiệp",
      description: "Cung cấp tính năng hỏi đáp pháp lý, cho phép người dùng đặt câu hỏi và nhận được câu trả lời từ các chuyên gia pháp luật hoặc hệ thống AI như Law-GPT."
    },
    {
      benefit: "Tiết kiệm chi phí",
      description: "Truy cập miễn phí hoặc với chi phí thấp so với việc thuê luật sư tư vấn trực tiếp, tài khoản nâng cao ung cấp nhiều tính năng và tiện ích hơn."
    },
    {
      benefit: "Cập nhật thông tin mới nhất",
      description: "Trang tìm kiếm pháp lý thường xuyên cập nhật các văn bản luật mới nhất, đảm bảo người dùng luôn tiếp cận được thông tin chính xác và kịp thời."
    },
    {
      benefit: "Bảo mật và riêng tư",
      description: "Đảm bảo bảo mật thông tin và quyền riêng tư của người dùng khi sử dụng dịch vụ tìm kiếm và hỏi đáp pháp lý."
    },
  ];
  return (
    <div className="bg-gray-50 py-12">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-4xl font-bold mb-6">Tại sao Legal Search là một bạn đồng hành đáng tin tưởng?</h2>
      <p className="text-xl mb-12">
        Legal Search hiểu biết về ngành luật, khách hàng và cách cung cấp dịch vụ cho khách hàng.
      </p>
    <div className="flexbox">
        <Swiper
           modules={[Pagination]}
           slidesPerView={3}
           spaceBetween={10}
           freeMode={true}
           allowTouchMove={true}
           pagination={{ clickable: true }}
        >
          {benefits.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="  bg-white p-6 rounded-lg shadow-lg min-h-[200px] flex flex-col justify-between m-2">
                <h3 className="text-2xl font-semibold mb-4">{item.benefit}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  </div>

  );
}
     
     
       
    
