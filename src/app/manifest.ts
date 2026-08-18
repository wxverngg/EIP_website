import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "EIP & Associates | Corporate Law Firm Panama",
    short_name: "EIP Law",
    description:
      "Premier corporate law firm in Panama specializing in immigration, residency programs, work permits, and international investments.",
    start_url: "/",
    display: "standalone",
    background_color: "#0D0D0D",
    theme_color: "#C8A04A",
    icons: [
      {
        src: "/images/logo/eip-white.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/logo/eip-white.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
