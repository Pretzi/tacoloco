export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "TacoLoco",
    description:
      "Authentic Mexican street food in Kensington Market, Toronto. Tacos, birria, pastor, chorizo, tortas.",
    url: "https://tacoloco.to",
    image: "https://tacoloco.to/images/logo.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "160 Baldwin Street",
      addressLocality: "Toronto",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.6532,
      longitude: -79.4004,
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
        "Sunday",
      ],
      opens: "12:00",
      closes: "20:30",
    },
    servesCuisine: "Mexican",
    priceRange: "$$",
    sameAs: [
      "https://www.instagram.com/tacoloco.to/",
      "https://www.ubereats.com/ca/store/taco-loco/vX78IiGsUzW3WnND5jpRTg",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
