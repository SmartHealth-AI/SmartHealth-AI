
// import Otp from "@/components/VerifyOtp";
import { clsx } from "clsx";
import type { FC, ReactNode } from "react";
import Footer from "../Footer";
import Header from "../Header";
import { useAuth } from "@/libs/Auth";
import Meta from "@/components/Meta";
interface IProps {
	meta: ReactNode;
	children?: ReactNode;
	isHomeLayout?: boolean;
	enableLightMode?: boolean;
	query?: any;
	mainClassName?: string;
	enableStickyCategory?: boolean;
	containerClassName?: string;
	headerData?: any;
}

const DefaultLayout: FC<IProps> = (props) => {       
	const {  children, query, mainClassName = " relative w-full" } = props;
	const { user, isLoggingOut } = useAuth();
	
	return (
		//<Otp></otp>

		<>
		
			{Meta}
			<Header/>
			<main className={`${mainClassName}`}>
				<div className={clsx("block", props.containerClassName)}>
					{children}
				</div>
			</main>
			<Footer/>
	
		</>
	);
};

export default DefaultLayout;
