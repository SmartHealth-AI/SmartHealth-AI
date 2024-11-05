import { get } from "lodash";
import instance from "./config";

export const verifyEmail = ({ otp }: any) => instance.put(``, { otp: otp });

export const resendVerifyEmail = () => instance.put(``);

export const resendOtpEmail = ({ email }: any) => instance.put(``, { email: email });

export const requestOtpEmail = ({ email }: any) => instance.put(``, { email: email });

export const createUserAddress = (data: any) => instance.post(``, data);

export const postImages = ({ data, accessToken }: { data: FormData; accessToken: string }) =>
  instance.post(``, data, {
    headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${accessToken}` },
  });

export const getUserAddresses = () => instance.get(``);

export const deleteUserAddresses = (id: number) => instance.delete(``);

export const updateUserAddress = (params: any) =>
   instance.put(``, {
//     first_name: params.first_name,
//     last_name: params.last_name,
//     line_1: params.line_1,
//     line_2: params.line_2,
//     phone_number: params.phone_number,
//     city: params.city,
//     state: params.state,
//     district: params.district,
//     zip_code: params.zip_code,
//     primary: params.primary,
  });

export const postReview = (data: any) => instance.post(``, data);
export const signOut = (data: any) => instance.delete(``, data);

export const changePassword = (data: any) => instance.put(``, data);
export const verifyOtp = (otp: string): Promise<{ success: boolean }> =>
  instance.put(``, { otp }).then((rs) => get(rs, "data.data"));
export const verifyPassword = (password: string): Promise<{ success: boolean }> =>
  instance.put(``, { password }).then((rs) => get(rs, "data.data"));

export const updateProfile = (data: any) => instance.put(``, data);
