import Image from "next/image";
import type { Magazine } from "@/lib/webflow";

export default function MagazineHero({ magazine }: { magazine: Magazine }) {
  const issueUrl = `https://thecatholicherald.com/magazine/${magazine.slug}?utm_source=linkinbio&utm_medium=social&utm_campaign=magazine_cover`;

  return (
    <section className="px-4 pb-4">
      <div className="flex gap-3 items-stretch bg-white rounded-lg p-3 border border-[#dadada]">
        {magazine.coverImageUrl && (
          <a
            href={issueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 block w-[88px] h-[120px] relative overflow-hidden rounded-sm shadow-sm"
          >
            <Image
              src={magazine.coverImageUrl}
              alt={magazine.coverImageAlt || `${magazine.name} cover`}
              fill
              sizes="88px"
              className="object-cover"
            />
          </a>
        )}
        <div className="flex flex-col justify-between min-w-0 flex-1">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#7a7979]">
              New issue
            </p>
            <p className="font-serif text-base font-semibold text-[#222] mt-0.5 leading-tight">
              {magazine.name}
            </p>
            <p className="text-xs text-[#7a7979] mt-1">
              The Catholic Herald magazine
            </p>
          </div>
          <a
            href={issueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-3 py-2 rounded-lg bg-[#db3334] text-white text-sm font-semibold hover:bg-[#c42d2e] transition-colors mt-2"
          >
            Read Issue
          </a>
        </div>
      </div>
    </section>
  );
}
