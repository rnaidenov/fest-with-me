import { asset, Head } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/src/server/types.ts";

export default function App({ Component }: AppProps) {
  return (
    <html data-custom="data">
      <Head>
        <title>FestWithMe</title>
        <link rel="stylesheet" href={asset("styles.css")} />
      </Head>
      <body class="font-barlow text-base">
        <Component />
      </body>
    </html>
  );
}
