import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { TEAM } from "@/lib/team";

function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export function TeamGrid() {
  return (
    <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
      {TEAM.map((member, i) => (
        <Reveal key={member.name} delay={(i % 4) * 90}>
          <div className="relative aspect-square overflow-hidden bg-paper-tint">
            <Image
              src={member.photo}
              alt={member.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="mt-5 flex items-baseline justify-between gap-3">
            <h3 className="font-serif text-[1.2rem] font-semibold leading-snug text-navy">
              {member.name}
            </h3>
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on LinkedIn`}
                className="text-navy/35 transition-colors duration-300 hover:text-navy"
              >
                <LinkedInIcon className="h-[1.05rem] w-[1.05rem]" />
              </a>
            )}
          </div>
          <p className="eyebrow mt-1.5 !text-[0.625rem]">{member.role}</p>
          <p className="mt-3.5 font-sans text-[0.875rem] leading-[1.7] text-navy/65">
            {member.bio}
            {member.bioLink && (
              <>
                {" "}
                <a
                  href={member.bioLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-navy underline decoration-gold-500 decoration-1 underline-offset-4 transition-colors duration-300 hover:text-navy-600"
                >
                  {member.bioLink.label}
                </a>
              </>
            )}
          </p>
        </Reveal>
      ))}
    </div>
  );
}
