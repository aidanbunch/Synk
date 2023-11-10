import React from "react";
import { useRouter } from "next/router";
import Meta from "@/components/meta/Meta";

function AuthPage(props: any) {
  const router = useRouter();

  return (
    <>
      <Meta title="Authentication" />
    </>
  );
}

// static files for each auth page
export const getStaticPaths = () => ({
  paths: [
    { params: { type: "signin" } },
    { params: { type: "signup" } },
    { params: { type: "forgotpass" } },
    { params: { type: "changepass" } },
  ],
  fallback: true,
});

export function getStaticProps({ params }: any) {
  return { props: {} };
}

export default AuthPage;
