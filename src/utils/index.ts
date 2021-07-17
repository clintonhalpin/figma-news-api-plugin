import { NYTArticleSearchApi } from "./../interfaces";
const NYTIMESBASE = `https://api.nytimes.com/svc/search/v2/articlesearch.json`;

// Convert an Object to a query string
export function toParams(params) {
  return Object.keys(params)
    .map(key => key + "=" + params[key])
    .join("&");
}

// Make an API Request to the NY Times
export function fetchNyTimesSearch({
  q = "figma",
  sort = "relevance",
  page = 0,
  apiKey
}): Promise<NYTArticleSearchApi> {
  const urlParams = {
    q: encodeURI(q),
    sort,
    page,
    "api-key": apiKey
  };
  return new Promise(async (resolve, reject) => {
    fetch(`${NYTIMESBASE}?${toParams(urlParams)}`)
      .then(res => res.json())
      .then(async (response: NYTArticleSearchApi) => {
        if ("OK" === response.status) {
          resolve(response);
        } else {
          throw new Error("Unable to Authorize!");
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}

export const sendJsonMessage = (type: string, payload: any) => {
  parent.postMessage(
    {
      pluginMessage: {
        type,
        name: `name_${type}`,
        payload: JSON.stringify(payload)
      }
    },
    "*"
  );
};
