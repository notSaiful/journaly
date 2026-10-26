import { renderToString } from 'react-dom/server';
import { RouterProvider } from '../utils/router';
import SiteFrame from '../components/SiteFrame';
import { buildHeadTags } from '../seo/metadata';

export function renderRoute(path) {
  const appHtml = renderToString(
    <RouterProvider initialPath={path}>
      <div className="min-h-screen bg-[#FAF7F2] text-[#1E1B18] font-sans flex flex-col">
        <SiteFrame />
      </div>
    </RouterProvider>
  );
  return {
    appHtml,
    headHtml: buildHeadTags(path)
  };
}
