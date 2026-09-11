import Image from "next/image";
import Link from "next/link";

export const logoPath = "/images/logo.png";

const LOGO_ASPECT = 1024 / 682;

type Props = {
  className?: string;
  priority?: boolean;
};

export default function Logo({ className = "", priority = false }: Props) {
  return (
    <Link href="/" className={`inline-flex items-center flex-shrink-0 ${className}`}>
      <Image
        src={logoPath}
        alt="Drywell Hangers — Smart Hanging Solutions"
        width={Math.round(72 * LOGO_ASPECT)}
        height={72}
        className="h-14 w-auto sm:h-16 md:h-[4.75rem] object-contain"
        priority={priority}
      />
    </Link>
  );
}
