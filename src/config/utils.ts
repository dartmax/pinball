export const updateQueryStringParameter = (uri: string, key: any, value: any) => {
  const re = new RegExp(`([?&])${key}=.*?(&|$)`, "i");
  const separator = uri.indexOf("?") !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, `$1${key}=${value}$2`);
  }
  return `${uri + separator + key}=${value}`;
};

const buildSearchProductUrl = (requestConfig: any, url: string) => {
  Object.keys(requestConfig).forEach((key) => {
    if (typeof requestConfig[key] === "string" && requestConfig[key] !== "") {
      url = updateQueryStringParameter(
        url,
        key,
        encodeURIComponent(requestConfig[key])
      );
    } else if (
      typeof requestConfig[key] === "number" ||
      (typeof requestConfig[key] === "object" &&
        requestConfig[key] !== null &&
        requestConfig[key].length > 0)
    ) {
      url = updateQueryStringParameter(
        url,
        key,
        encodeURIComponent(JSON.stringify(requestConfig[key]))
      );
    } else if (
      typeof requestConfig[key] === "boolean" &&
      requestConfig[key] !== false
    ) {
      url = updateQueryStringParameter(
        url,
        key,
        encodeURIComponent(requestConfig[key])
      );
    }
  });
  return url;
};

export const requestSearchUrl = (url: string, requestConfig: any) => {
  // @ts-ignore
  const requestUrl = buildSearchProductUrl(requestConfig, url);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return requestUrl;
};