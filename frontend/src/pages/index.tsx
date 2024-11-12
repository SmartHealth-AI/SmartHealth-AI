import Image from "next/image";
import {Header} from "@/layouts/Header";
import Meta from "@/components/Meta";
import DefaultLayout from "@/layouts/DefaultLayout"
import Banner from "@/containers/home/Sections/Banner";
import IntroductionWeb from "@/containers/home/Sections/IntroductionWeb";
import Benefits from "@/containers/home/Sections/Benefits";
import News from "@/containers/home/Sections/News";
const page = "home";
const Home = ({ query }: any) => {
  return (
    <>
      <DefaultLayout
        
        containerClassName="bg-white"
        enableStickyCategory
        enableLightMode
        meta={<Meta title="LegalSearch" description="LegalSearch" />}
      >
       <div className="space-y-8">  
          <Banner />
          <IntroductionWeb />
          <Benefits />
          <News/>
        </div>
      </DefaultLayout>
    </>
  );
}

// Home.getInitialProps = ({ query }: any) => {
//   return { query };
// };

export default Home;
