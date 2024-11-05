import { Swiper } from "swiper/react";

import styled from "styled-components";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/grid";

const SwiperComponent = styled(Swiper)`
  .swiper-pagination-bullet-active {
    background: #615045;
  }
`;

export default SwiperComponent;
