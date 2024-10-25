import Image from "next/image";
import ImgLogo from "../public/logo.png";
export default function Loading() {
  // Or a custom loading skeleton component

  return (
    <div className="w-full h-screen flex justify-center  text-center items-center ">
      <Image
        src={ImgLogo}
        alt="loading"
        className="w-60  h-60   animate-spin"
      />
    </div>
  );
}
