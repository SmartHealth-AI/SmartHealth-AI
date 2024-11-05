import React, { FC, HTMLAttributes, useEffect, useMemo, useRef, useState } from "react";
import { clsx } from "clsx";
import Container from "@/components/Container";
import Link from "next/link";


export default function Footer () {
    const headerRef = useRef<HTMLDivElement | null>(null);
    const [isFixed, setIsFixed] = useState(false);

    return (
        <footer className="bg-gray-200 py-8 text-neutral-950">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div>
            <h2 className="text-2xl font-bold mb-2">Legal Search</h2>
            <span className="text-neutral-800">
              <b>Legal Search</b> là nền tảng hàng đầu cung cấp dịch vụ tra cứu và giải đáp thông tin pháp lý toàn diện. 
              Với mục tiêu phục vụ các cá nhân và doanh nghiệp tại Việt Nam, 
              Legal Search mang đến giải pháp pháp lý giúp việc tìm kiếm và hiểu rõ các quy định pháp luật trở nên dễ dàng hơn, 
              tạo ra cơ hội và thúc đẩy sự hiểu biết pháp lý. Trên Legal Search, người dùng có thể truy cập hàng triệu văn bản pháp luật và các dịch vụ tư vấn pháp lý thuộc nhiều lĩnh vực khác nhau, 
              giúp họ tìm kiếm thông tin và giải pháp pháp lý chỉ qua vài bước đơn giản. Hơn thế nữa, các công cụ thông minh trên Legal Search giúp người dùng dễ dàng tra cứu, 
              phân tích các văn bản luật và nhận được tư vấn pháp lý chất lượng, tối ưu hiệu quả cho các vấn đề pháp lý của họ. Việc kết nối với các chuyên gia hàng đầu trong lĩnh vực luật, tài chính, 
              và quản trị doanh nghiệp nhằm tối ưu giải pháp và chi phí cho người dùng khiến Legal Search trở thành một điểm đến toàn diện mà mỗi cá nhân và doanh nghiệp đều cần!
            </span>
          </div>
          
      
          <div className="border-l-2 border-gray-300 pl-4">
            <h3 className="text-xl font-semibold mb-4">Liên kết nhanh</h3>
            <ul>
              <li className="mb-2"><a href="#" className="text-neutral-800 hover:text-black">Trang chủ</a></li>
              <li className="mb-2"><a href="#" className="text-neutral-800 hover:text-black">Dịch vụ</a></li>
              <li className="mb-2"><a href="#" className="text-neutral-800 hover:text-black">Về chúng tôi</a></li>
              <li className="mb-2"><a href="#" className="text-neutral-800 hover:text-black">Liên hệ</a></li>
            </ul>
          </div>
          

          <div className="border-l-2 border-gray-300 pl-4">
            <h3 className="text-xl font-semibold mb-4">Thông tin liên hệ</h3>
            <p className="text-neutral-800 mb-2">Địa chỉ: </p>
            <p className="text-neutral-800 mb-2">Email: contact@legalsearch.vn</p>
            <p className="text-neutral-800 mb-2">Điện thoại: +84 123 456 789</p>
          </div>
        </div>
        
        
  
        <div className="flex justify-center mt-8">
          <a href="#" className="mx-2 text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .733.592 1.324 1.325 1.324h21.351c.733 0 1.324-.592 1.324-1.325v-21.35c0-.733-.592-1.325-1.325-1.325zm-13.482 19.327h-3.548v-8.92h3.548v8.92zm-1.774-10.17c-1.146 0-2.075-.93-2.075-2.075s.93-2.075 2.075-2.075 2.075.93 2.075 2.075-.93 2.075-2.075 2.075zm13.353 10.17h-3.548v-4.729c0-1.128-.025-2.579-1.571-2.579-1.573 0-1.814 1.229-1.814 2.497v4.81h-3.548v-8.92h3.405v1.217h.049c.474-.897 1.632-1.845 3.357-1.845 3.588 0 4.247 2.361 4.247 5.437v4.111h-.003z"/></svg>
          </a>
          <a href="#" className="mx-2 text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c-5.463 0-9.837 4.374-9.837 9.837 0 4.884 3.645 8.934 8.437 9.683.616.113.84-.267.84-.596 0-.294-.011-1.073-.017-2.106-3.452.75-4.18-1.665-4.18-1.665-.56-1.422-1.369-1.802-1.369-1.802-1.119-.766.085-.751.085-.751 1.237.087 1.888 1.271 1.888 1.271 1.1 1.886 2.885 1.34 3.585 1.025.11-.798.432-1.341.786-1.649-2.754-.313-5.65-1.377-5.65-6.129 0-1.354.484-2.462 1.275-3.328-.129-.314-.553-1.575.121-3.283 0 0 1.037-.332 3.4 1.27.984-.274 2.038-.412 3.088-.417 1.05.005 2.105.143 3.091.417 2.36-1.602 3.395-1.27 3.395-1.27.675 1.708.251 2.969.123 3.283.793.866 1.274 1.974 1.274 3.328 0 4.763-2.9 5.812-5.66 6.119.443.383.838 1.14.838 2.297 0 1.656-.015 2.994-.015 3.399 0 .332.223.715.847.593 4.787-.748 8.428-4.798 8.428-9.683 0-5.463-4.374-9.837-9.837-9.837z"/></svg>
          </a>
          <a href="#" className="mx-2 text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.628 0-12 5.372-12 12 0 5.304 3.438 9.799 8.205 11.387.6.111.818-.261.818-.582 0-.287-.011-1.049-.017-2.057-3.338.727-4.042-1.609-4.042-1.609-.546-1.387-1.332-1.757-1.332-1.757-1.089-.745.084-.73.084-.73 1.206.085 1.84 1.239 1.84 1.239 1.071 1.834 2.809 1.303 3.494.996.109-.775.419-1.302.762-1.601-2.75-.311-5.645-1.36-5.645-6.062 0-1.338.478-2.435 1.261-3.295-.126-.313-.548-1.569.12-3.272 0 0 1.03-.33 3.375 1.26 1.009-.281 2.086-.421 3.164-.426 1.078.005 2.155.145 3.165.426 2.344-1.59 3.374-1.26 3.374-1.26.669 1.703.247 2.959.121 3.272.784.86 1.261 1.957 1.261 3.295 0 4.711-2.898 5.747-5.656 6.053.43.372.813 1.104.813 2.225 0 1.609-.015 2.907-.015 3.307 0 .324.217.701.825.579 4.76-1.588 8.199-6.083 8.199-11.387 0-6.628-5.372-12-12-12z"/></svg>
          </a>
        </div>
      </div>
      <div className="text-center mt-8 text-gray-500">
        © 2024 Legal Search. All rights reserved.
      </div>
    </footer>
   
    
    );
};