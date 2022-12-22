import { PageProps } from "$fresh/server.ts";
import SearchView from "../islands/SearchView.tsx";
import { Layout } from "../components/index.tsx";

export default function Index(props: PageProps) {
  return (
    <Layout>
      <SearchView />
    </Layout>
  );
}
