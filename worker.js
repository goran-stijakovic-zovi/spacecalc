export default {
  async fetch(request, env) {
    // Attempt to serve the requested asset from dist/
    const assetResponse = await env.ASSETS.fetch(request);

    // If asset found (2xx/3xx), return it directly
    if (assetResponse.status !== 404) {
      return assetResponse;
    }

    // SPA fallback: serve index.html for all unmatched paths
    // so client-side navigation and direct URL loads work correctly
    return env.ASSETS.fetch(new Request(new URL('/', request.url)));
  },
};
