import useWindowSize from "@/lib/use-window-size";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  const screenSize = useWindowSize();
    return <div><Link href="/"><Image src="/images/icons/logo.webp" alt="logo" width={screenSize && screenSize.width < 768 ? 130 : 180} height={screenSize && screenSize.width < 768 ? 22 : 34} /></Link></div>;
  };
  
  export default Logo;
  