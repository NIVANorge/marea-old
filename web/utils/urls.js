/**
 * Removes any double slashes in a given path.
 * For example: "/product//" => "/product/"
 */
function removeDoubleSlashes(path) {
  return path.replace(/\/{2,}/g, '/');
}

/**
 * Transforms a given slug into a path with a leading slash.
 * For example: "contact/" => "/contact/"
 */
export function getPathFromSlug(slug) {
  return removeDoubleSlashes(`/${slug || ''}`);
}

/**
 * Generates an absolute URL from a given slug and base URL.
 * For example: "/about" => "https://my-site.com/about"
 */
export function slugToAbsUrl(slug, baseUrl) {
  return baseUrl + getPathFromSlug(slug);
}

/**
 * Transforms a slug into an array of its possible variations.
 * Useful for finding slugs in different forms, especially if editors add leading/trailing slashes.
 */
export function getSlugVariations(slug) {
  const slashless = slug.replace(/\//g, '');
  return [
    slashless,
    `/${slashless}/`, // /slash-on-both-ends/
    `${slashless}/`, // trailing/
    `/${slashless}`, // /leading
  ];
}

/**
 * Converts a slug parameter from Next.js router into a path string.
 * Handles both single path strings and arrays of paths.
 */
export function slugParamToPath(slugParam) {
  const slug = Array.isArray(slugParam)
    ? slugParam.join('/')
    : slugParam || '/';
  return slug;
}

/**
 * Enhances the getPathFromSlug function by incorporating the locale into the generated path.
 * For example: getLocalizedPath("about", "en") => "/en/about"
 *               getLocalizedPath("kontakt", "no") => "/no/kontakt"
 */
export function getLocalizedPath(slug, locale) {
  const path = getPathFromSlug(slug);
  // If locale is not defined or is the default (e.g., 'no'), return just the path.
  return locale ? removeDoubleSlashes(`/${locale}${path}`) : path;
}

/**
 * Converts a localized slug and base URL into a complete absolute URL.
 * For example: getLocalizedAbsUrl("about", "https://my-site.com", "en") => "https://my-site.com/en/about"
 */
export function getLocalizedAbsUrl(slug, baseUrl, locale) {
  const localizedPath = getLocalizedPath(slug, locale);
  return slugToAbsUrl(localizedPath, baseUrl);
}
