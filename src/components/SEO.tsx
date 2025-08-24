import React from 'react';
import { Helmet } from 'react-helmet-async';

type SEOProps = {
  title: string;
  description?: string;
  canonical?: string;
  image?: string;     // full URL till en OG-bild (t.ex. https://dindoman.se/og.jpg)
  noindex?: boolean;  // för ev. sidor du inte vill indexera
};

const SITE_NAME = 'Ditt Företag'; // <-- byt till ditt företagsnamn

const SEO: React.FC<SEOProps> = ({ title, description, canonical, image, noindex }) => {
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Twitter */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {canonical && <meta property="og:url" content={canonical} />}
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

export default SEO;
