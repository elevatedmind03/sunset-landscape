import type { Metadata, Viewport } from "next";
import { Fraunces, Jost } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sunset Landscape Co. | Beautiful Landscapes. Built to Last. | Los Angeles, Orange County & Inland Empire",
  description:
    "Sunset Landscape Co. transforms Southern California properties with expert landscaping, design, artificial turf, pavers, lighting and outdoor living solutions. Free estimates for residential & commercial. Serving Los Angeles County, Orange County & Inland Empire.",
  keywords:
    "landscaping Southern California, landscape design Los Angeles, artificial turf installation, paver patios, outdoor lighting, lawn maintenance, retaining walls, tree services, Orange County landscaper, Inland Empire landscaping",
  authors: [{ name: "Sunset Landscape Co." }],
  robots: "index, follow",
  alternates: { canonical: "https://www.sunsetlandscapeco.com/" },
  openGraph: {
    type: "website",
    title: "Sunset Landscape Co. | Beautiful Landscapes. Built to Last.",
    description:
      "Expert landscaping, design and outdoor solutions for Southern California. Free estimates — residential & commercial.",
    url: "https://www.sunsetlandscapeco.com/",
    siteName: "Sunset Landscape Co.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Sunset Landscape Co.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunset Landscape Co. | Beautiful Landscapes. Built to Last.",
    description:
      "Expert landscaping, design and outdoor solutions for Southern California.",
    images: [
      "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1200&q=80",
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#142B1E",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jost.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23142B1E'/%3E%3Ccircle cx='32' cy='29' r='13' fill='none' stroke='%23A67C52' stroke-width='3.5'/%3E%3Cpath d='M32 16v-6M14 29h-6M50 29h-6M20.5 17.5l-4-4M43.5 17.5l4-4' stroke='%23A67C52' stroke-width='3.5' stroke-linecap='round'/%3E%3Cpath d='M32 34c-3.5 0-6.5-2-8.5-5.5 3 0 5.5-1 7.5-3.5 2 2.5 4.5 3.5 7.5 3.5C36.5 32 33.5 34 32 34Z' fill='%236DBE8F'/%3E%3C/svg%3E" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LandscapingBusiness",
              name: "Sunset Landscape Co.",
              slogan: "Beautiful Landscapes. Built to Last.",
              description:
                "Professional landscaping, landscape design, artificial turf, pavers, irrigation, outdoor lighting and outdoor living solutions for residential and commercial properties throughout Southern California.",
              url: "https://www.sunsetlandscapeco.com/",
              telephone: "+1-626-555-0134",
              email: "hello@sunsetlandscapeco.com",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                addressRegion: "CA",
                addressCountry: "US",
              },
              areaServed: [{ "@type": "State", name: "California" }],
              sameAs: [
                "https://www.google.com/maps",
                "https://www.yelp.com",
                "https://www.instagram.com",
                "https://www.facebook.com",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "187",
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "07:00",
                closes: "18:00",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Do you offer free estimates?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, we provide free consultations to understand your project and recommend the best solution.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What landscaping services do you provide?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We offer complete landscaping services including maintenance, design, turf installation, irrigation, patios, lighting, and more.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do you work with commercial properties?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, we provide landscaping solutions for both residential and commercial clients.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How quickly can my project start?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Project timelines depend on size and scope. Contact us for availability.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
