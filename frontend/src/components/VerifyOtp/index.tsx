// import { useMemo } from "react";

// // import { FormBuilder, useForm } from "@/componentsV3/FormBuilder";
// import { useMutation } from "@/libs/ReactQuery";

// // import Meta from "@/componentsV3/Meta";

// // import GuestAuthLayout from "@/layouts/GuestAuthLayout";

// import { resendVerifyEmail, verifyEmail } from "@/services/CurrentUser";
// import { useAuth } from "@/libs/Auth";

// import { showMessageError, showMessageSuccess } from "@/utils/toast";

// import { translate } from "@/locales";

// const Otp = ({ children }: any) => {
// 	const { user, refetchUser } = useAuth();

// 	const mutation = useMutation(
// 		() => {
// 			return resendVerifyEmail();
// 		},
// 		{
// 			onSuccess: () => {
// 				showMessageSuccess({ content: translate("resend_email_success") });
// 			},
// 			onError: () => {
// 				showMessageError({ content: translate("resend_email_found") });
// 			},
// 		},
// 	);
// 	const { mutate, isLoading } = useMutation(
// 		() => {
// 			return verifyEmail(form.values);
// 		},
// 		{
// 			onSuccess: () => {
// 				showMessageSuccess({ content: translate("resend_email_success") });
// 				refetchUser();
// 			},
// 			onError: () => {
// 				showMessageError({ content: translate("import_email_found") });
// 			},
// 		},
// 	);

// 	const form = useForm({
// 		validate: {
// 			otp: (value: any) => (value ? null : "Vui lòng nhập otp"),
// 		},
// 	});

// 	const fields = useMemo(
// 		() => [
// 			{
// 				type: "text",
// 				name: "otp",
// 				labelAlign: "left",
// 				label: "Mã OTP",
// 				component: {
// 					placeholder: "Nhập mã otp",
// 					rightSection: (
// 						<span
// 							className="text-sm font-semibold text-neutral-700 cursor-pointer"
// 							onClick={() => mutation.mutate()}
// 						>
// 							Gửi lại mã
// 						</span>
// 					),
// 					rightSectionWidth: 100,
// 					classNames: {
// 						label: "text-sm",
// 						input: "text-sm p-3",
// 						error: "text-xs",
// 					},
// 				},
// 			},
// 		],
// 		[],
// 	);
// 	if (user && user?.email_verified === false) {
// 		return (
// 			<>
// 				<GuestAuthLayout
// 					disabledSectionSearch
// 					withTermAnCondition={false}
// 					withFooter={false}
// 					title="Mã OTP"
// 					textFooterOr="Hoặc, đăng nhập với.."
// 					textFooterContent="Bạn chưa có tài khoản?"
// 					textHyperlinkFooterContent="Đăng kí ngay!"
// 					meta={<Meta title="Đăng nhập" description="Đăng nhập" />}
// 				>
// 					<div className="flex flex-col gap-6">
// 						<div className="description text-neutral-800 text-xs font-main">
// 							Chúng tôi đã gửi mã đến email:{" "}
// 							<span className="font-semibold">{user?.email}</span>
// 						</div>
// 						<FormBuilder
// 							gutter={24}
// 							size="lg"
// 							radius="md"
// 							withCardComponent={false}
// 							form={form}
// 							fields={fields}
// 							submitText="xác nhận"
// 							submitClassName="uppercase font-bold text-base"
// 							onSubmit={() => mutate()}
// 							submitLoading={isLoading}
// 						/>
// 					</div>
// 				</GuestAuthLayout>
// 			</>
// 		);
// 	} else return children;
// };

// export default Otp;
export {};
