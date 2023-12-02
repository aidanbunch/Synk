import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

type PageMeta ={
    title?: string;
    description?: string;
    image?: string;
    type?: string;
}

type GlobalMeta = {
    siteName: string;
    domain: string;
}

function Meta(props: { children?: React.ReactNode } & PageMeta) {
  const { children, ...customPageMeta } = props;
  const router = useRouter();

  // Meta values that are the same across all pages
  const globalMeta: GlobalMeta = {
    siteName: "Synk",
    // prod domain
    domain: "https://getsynk.co",
  };

  // default, can be overriden with props
  const defaultPageMeta: PageMeta = {
    title: "Synk",
    description: "Corporate event planning made easy.",
    image: "/images/social.png",
    type: "website",
  };

  const meta = { ...globalMeta, ...defaultPageMeta, ...customPageMeta };

  return (
    <Head>
      <title>{meta.title}</title>
      <meta content={meta.description} name="description" key="description" />
      {meta.domain && <link rel="canonical" href={`${meta.domain}${router.asPath}`} key="canonical" />}

      {/* Open Graph stuff */}
      <meta property="og:title" content={meta.title} key="og-title" />
      <meta property="og:description" content={meta.description} key="og-description" />
      <meta property="og:site_name" content={meta.siteName} key="og-site-name" />
      <meta property="og:type" content="website" key="og-type" />
      {meta.domain && <meta property="og:url" content={`${meta.domain}${router.asPath}`} key="og-url" />}
      {meta.domain && meta.image && <meta property="og:image" content={`${meta.domain}${meta.image}`} key="og-image" />}
    </Head>
  );
}

export default Meta;
