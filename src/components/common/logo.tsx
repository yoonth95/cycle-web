import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
  return (
    <Link href="/" className="flex cursor-pointer items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded">
        <Image
          src="/logo-white.png"
          alt="삼천리 자전거 중동역점"
          width={40}
          height={40}
          priority
          className="h-10 w-10 object-contain"
        />
      </div>
      <h1 className="heading-5 hidden w-max font-bold text-white [@media(min-width:375px)]:block">
        삼천리 자전거 중동역점
      </h1>
    </Link>
  );
};
