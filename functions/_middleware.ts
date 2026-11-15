/**
 * Pages middleware — keep exactly one canonical host.
 *
 * Requests that still arrive on the *.pages.dev hostname (the pre-domain
 * deployment URL) are permanently redirected to https://songqian.me, so search
 * engines and visitors never see two copies of the site. Requests on the
 * custom domain (and local previews on localhost) pass through untouched.
 */
export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);

  if (url.hostname === 'songqian-personal-website.pages.dev') {
    return Response.redirect(`https://songqian.me${url.pathname}${url.search}`, 301);
  }

  return context.next();
};
