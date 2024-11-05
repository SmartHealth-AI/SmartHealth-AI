import instance from "./config";

export const userStayActive = () => instance.put(`v1/users/current/stay_active`);

export const businessStayActive = () => instance.put(`v1/users/current/business/stay_active`);

export const shopStayActive = (shopId: number) => instance.put(`v1/users/current/shops/${shopId}/stay_active`);
