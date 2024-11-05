import { clsx } from "clsx";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Swiper from "swiper";
import { useSwiper } from "swiper/react";

type SwiperArrowProps = {
  position: "left" | "right";
  hidden?: boolean;
  className?: string;
  iconSize?: number;
  swiper?: Swiper;
  removeSwiperBehavior?: boolean;
  onClick?: () => void;
};

export const SwiperArrow = ({ removeSwiperBehavior = false, ...props }: SwiperArrowProps) => {
  const swiper = useSwiper();
  const iconSize = props.iconSize ?? 14;

  return (
    <div
      className={clsx(
        `
      bg-white rounded-full 
      !shadow-xl border opacity-90 border-[#EBEBF0CC]
      hover:bg-orange-100 hover:border-orange-100 !cursor-pointer transition-all hover:text-white
        flex justify-center items-center p-2
        absolute z-10 ${props.position === "left" ? "left-1" : "right-1"} top-1/2 -translate-y-1/2
      `,
        props.className,
      )}
      onClick={() => {
        if (removeSwiperBehavior) return props.onClick?.();
        if (props.position === "left") (swiper ?? props.swiper).slidePrev();
        if (props.position === "right") (swiper ?? props.swiper).slideNext();
      }}
      style={{
        boxShadow: "0px 8px 8px -4px #18274B0A, 0px 4px 6px -4px #18274B0A",
      }}
    >
      {props.position === "left" ? <IconChevronLeft size={iconSize} /> : <IconChevronRight size={iconSize} />}
    </div>
  );
};
