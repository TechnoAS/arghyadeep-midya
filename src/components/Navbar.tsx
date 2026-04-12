import Image from "next/image";
import Link from "next/link";
import { GalleryThumbnails } from "lucide-react";

const CTA_BUTTON = {
  href: "/gallery",
  label: "Gallery",
};

export default function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex h-16 w-full items-center justify-between bg-transparent px-4 sm:px-8 md:px-12">
      <Link
        href="/"
        className="flex shrink-0 items-center opacity-95 transition-opacity hover:opacity-100"
        aria-label="Home"
      >
        <Image
          src="/logo%20main.png"
          alt="Arghyadeep Midya – AM monogram logo"
          width={120}
          height={80}
          className="navbar-logo"
          priority
          sizes="(max-width: 640px) 52px, 64px"
        />
      </Link>

      <Link 
        href={CTA_BUTTON.href} 
        className="navbar-gallery-cta group relative min-w-[6.5rem] overflow-hidden sm:min-w-[7.5rem]"
      >
        <span className="flex items-center justify-center transition-all duration-500 ease-in-out group-hover:scale-50 group-hover:opacity-0 group-hover:-translate-y-4">
          {CTA_BUTTON.label}
        </span>
        <span className="absolute inset-0 flex items-center justify-center translate-y-4 scale-50 opacity-0 transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
          <GalleryThumbnails className="h-4 w-4 sm:h-5 sm:w-5 group-hover:animate-pulse" />
        </span>
      </Link>
    </nav>
  );
}
