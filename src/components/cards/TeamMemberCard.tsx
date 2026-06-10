interface TeamMemberCardProps {
  name: string;
  role: string;
  credentials?: string;
  bio: string;
  initials?: string;
  linkedIn?: string;
}

export function TeamMemberCard({
  name,
  role,
  credentials,
  bio,
  initials,
  linkedIn,
}: TeamMemberCardProps) {
  return (
    <article className="flex flex-col rounded-xl bg-white p-8 shadow-sm">
      <div
        aria-hidden="true"
        className="mb-6 flex aspect-square w-full items-center justify-center rounded-xl bg-navy"
      >
        <span className="font-display text-6xl font-semibold text-gold">
          {initials ?? name.split(" ").map((n) => n[0]).join("")}
        </span>
      </div>
      <h3 className="text-xl font-semibold text-navy">{name}</h3>
      <p className="text-sm font-semibold text-gold-dark">{role}</p>
      {credentials && (
        <span className="mt-2 self-start rounded-full bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-[0.05em] text-navy">
          {credentials}
        </span>
      )}
      <p className="mt-3 flex-1 text-sm text-charcoal/80">{bio}</p>
      {linkedIn && (
        <a
          href={linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-gold-dark transition-colors duration-(--duration-fast)"
        >
          <svg aria-hidden="true" className="size-4 fill-current" viewBox="0 0 24 24">
            <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
          </svg>
          LinkedIn profile
          <span className="sr-only"> for {name}</span>
        </a>
      )}
    </article>
  );
}
