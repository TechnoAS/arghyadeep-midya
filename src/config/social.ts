/**
 * Public profile URLs — replace with your real handles before launch.
 * Optional: set NEXT_PUBLIC_* in `.env.local` to override.
 */
export const socialLinks = {
  instagram:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/lens_of_arghya?igsh=Mmh5Y2EyeXFnNml1",

  linkedin:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/in/arghyadeepmidya?utm_source=share_via&utm_content=profile&utm_medium=member_android",
} as const;

/** Used as mailto: — set NEXT_PUBLIC_CONTACT_EMAIL in `.env.local` for your Gmail address */
export const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "arghyadipmidya@gmail.com";
