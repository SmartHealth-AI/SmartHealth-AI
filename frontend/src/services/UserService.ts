import { get } from "lodash";
import instance, { instanceWithoutAuth } from "./config";

export const checkAvailability = ({ params }: any) => instanceWithoutAuth.get(``, { params });

export const requestPassword = (data: any) => instanceWithoutAuth.put(``, data);

export const resetPassword = (data: any) => instanceWithoutAuth.put(``, data);

export const verifyEmail = (data: any) => instance.put(``, data);

export const resendVerifyEmail = (data: any) => instance.put(``, data);

export const signIn = (data: any) => instance.post(``, data);

export const singUp = (data: any) => instance.post(``, data);

export const getUserInfo = () => instance.get(``);

export const deleteUser = () => instance.delete(``);

export const updateUser = (data: any) => instance.put(``, data);
