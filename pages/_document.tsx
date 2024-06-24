import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="">
        <div className="p-5 bg-slate-200 site-container">
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  );
}
