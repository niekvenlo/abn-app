// A default query function allows us to simplify API calls,
// for example:
// - `useQuery(['random'])` to fetch a random recipe (array)
// - `useQuery(['search', {s: 'Pie'}])` to fetch recipes matching the string 'Pie'.
export async function defaultQueryFunction({ queryKey }) {
  const response = await fetch(getUrl(queryKey));
  const data = await response.json();
  return data?.meals ?? [];

  // This function should be hardened.
  function getUrl(queryKey) {
    console.log(queryKey);
    const baseUrl = `https://www.themealdb.com/api/json/v1/1/`;
    if (typeof queryKey[queryKey.length - 1] !== "object") {
      return `${baseUrl}${queryKey.join("/")}.php`;
    }
    // If the last part of the key is an object, extract the values into
    // a search string.
    const params = queryKey.slice(-1)[0];
    const entries = Object.entries(params).filter((entry) => entry[1]);
    if (entries.length < 1) {
      return `${baseUrl}${queryKey.slice(0, -1).join("/")}.php`;
    }
    const paramsString =
      "?" +
      Object.entries(params)
        .filter((entry) => entry[1])
        .map((entry) => `${entry[0]}=${entry[1]}`)
        .join("&");
    return `${baseUrl}${queryKey.slice(0, -1).join("/")}.php${paramsString}`;
  }
}
