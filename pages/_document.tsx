import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Inline critical CSS to prevent layout shift */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
            body {
              margin: 0;
              padding: 0;
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            }
            
            * {
              box-sizing: border-box;
            }
            
            /* Fixed header space */
            body {
              padding-top: 64px;
            }
            
            /* Prevent content jumps */
            .fixed-height-card {
              height: 400px;
            }
            
            .fixed-height-image {
              height: 256px;
              position: relative;
              background-color: #f3f4f6;
            }
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
