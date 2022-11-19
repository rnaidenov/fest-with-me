import { useRef } from 'preact/hooks';
import { PageProps } from "$fresh/server.ts";
import SearchView from '../islands/SearchView.tsx';

export default function Index(props: PageProps) {
  return (
    <div >
      <SearchView />
    </div>
  )
}
