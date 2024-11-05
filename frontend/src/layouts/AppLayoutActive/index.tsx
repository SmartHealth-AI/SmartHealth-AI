import { useAuth } from "@/libs/Auth";
import { businessStayActive, shopStayActive, userStayActive } from "@/services/ActiveMessageService";
import React, { useEffect } from "react";

interface IProps {
  children: React.ReactNode;
}

const TIME_STAY_ACTIVE = 5 * 60 * 1000; // refresh active every 5 minutes

const AppLayoutActive = ({ children }: IProps) => {
  const { user } = useAuth();

  useEffect(() => {
    let intervalUser = null;
    let intervalShop = null;

    if (!user || user === null) {
      typeof intervalUser === "number" && clearInterval(intervalUser);
      typeof intervalShop === "number" && clearInterval(intervalShop);
      return;
    }

    if (user && user.id) {
      // fetch stay active for user and business
      keepStayActive();
      intervalUser = setInterval(() => {
        keepStayActive();
      }, TIME_STAY_ACTIVE);
    }

    if (user && user.shops && user.shops.length > 0) {
      // fetch stay active for shop
      const listIdShop = user.shops.map((item: any) => item.id);
      keepStayActiveShop(listIdShop);
      intervalShop = setInterval(() => {
        keepStayActiveShop(listIdShop);
      }, TIME_STAY_ACTIVE);
    }
  }, [user]);

  const keepStayActive = async () => {
    try {
      // fetch stay active for user and business
      await Promise.allSettled([userStayActive(), businessStayActive()]).then((res) => {});
    } catch (error) {}
  };
  const keepStayActiveShop = async (shopId: number[]) => {
    try {
      // fetch stay active for shop
      await Promise.allSettled(shopId.map((id) => shopStayActive(id))).then((res) => {});
    } catch (error) {}
  };

  return <>{children}</>;
};
export default AppLayoutActive;
