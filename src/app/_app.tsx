import Head from 'next/head';

function MyApp({ Component, pageProps }: any) {
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="/node_modules/reveal.js/dist/reveal.css" />
        <link rel="stylesheet" href="/node_modules/reveal.js/dist/theme/black.css" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;