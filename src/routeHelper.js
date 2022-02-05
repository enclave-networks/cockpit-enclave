// Cockpit will dynamically generate an ID for your install this route allows us to wildcard it
const urlPrefix = "/:id/enclave/index.html";

export function createRoute(route) {
  if (!route.startsWith("/")) {
    route = `/${route}`;
  }

  return `${urlPrefix}${route}`;
}
