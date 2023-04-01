import { PageProps } from "$fresh/server.ts";
import { CurrencyProvider, Layout } from "@components";
import SearchView from "../islands/SearchView.tsx";

export default function Index(props: PageProps) {
  return (
    <CurrencyProvider>
      <Layout>
        <SearchView />
      </Layout>
    </CurrencyProvider>
  );
}
