import Image from "next/image";

interface AvatarProps {
  imgSrc: string;
  alt: string;
  width: number;
  height: number;
}

export default function Avatar({imgSrc, alt, width,height}:AvatarProps) {
  return <div className="relative rounded-full overflow-hidden shrink-0" style={{width, height}}>
    <Image src={imgSrc} alt={alt} fill className="object-cover"/>
  </div>;
}
