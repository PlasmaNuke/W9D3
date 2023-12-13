const csrfToken = document.querySelector("meta[name=csrf-token]").content;

async function customFetch(url, options = {}) {
  options.headers = {
    // Your code here
    "X-CSRF-Token": csrfToken,
    "Accept": "application/json",
    ...options.headers
  };

  let res = await fetch(url, options);
  if (res.ok) {
    return res.json()
  } else {
    throw res.json()
  }
  
}


export function followUser(id) {
  return customFetch(`/users/${id}/follow`, {method: "POST"})
}


export function unfollowUser(id) {
  return customFetch(`/users/${id}/follow`, { method: "DELETE" })
}

export function fetchTweets(options = {}) {
  let queryParams = new URLSearchParams(options).toString()
  return customFetch("/tweets?" + queryParams, options)
}