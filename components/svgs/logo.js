import Image from "next/image";

export default function Logo({ ...props }) {
  return (
    <Image
      src="/logo.png"
      alt="Logo"
      width={165}
      height={75}
      {...props}
    />
  )
}
