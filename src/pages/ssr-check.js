import Head from "next/head";

export default function SSRCheck() {
  return (
    <>
      <Head>
        <title>SSR TITLE WORKING</title>
        <meta name="description" content="Server-side rendered example" />
      </Head>
      <h1>SSR TEST PAGE</h1>
    </>
  );
}

export async function getServerSideProps() {
  return { props: {} };
}
