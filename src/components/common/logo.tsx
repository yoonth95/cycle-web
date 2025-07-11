import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-3 cursor-pointer">
      <div className="w-10 h-10 rounded flex items-center justify-center">
        <Image
          src="/logo-white.png"
          alt="삼천리 자전거 중동역점"
          width={40}
          height={40}
          priority
          className="w-10 h-10 object-contain"
        />
      </div>
      <h1 className="heading-5 font-bold text-white">삼천리 자전거 중동역점</h1>
    </Link>
  );
};
