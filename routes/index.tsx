import { PageProps } from "$fresh/server.ts";
import { Layout } from "@components";
import SearchView from "../islands/SearchView.tsx";

export default function Index(props: PageProps) {
  return (
    <Layout>
      <SearchView />
    </Layout>
  );
}
