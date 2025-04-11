import { writable } from 'svelte/store'

// returns a store with HTTP access functions for get, post, patch, delete
// anytime an HTTP request is made, the store is updated and all subscribers are notified.
export default function http<T>(initial: T) {
  // create the underlying store
  const store = writable(initial)

  // define a request function that will do `fetch` and update store when request finishes
  const request = async (method: string, url: string, params: object | null = null) => {
    // before we fetch, clear out previous errors and set `loading` to `true`
    store.update((data: any) => {
      delete data.errors
      data.loading = true

      return data
    })

    // define headers and body
    const headers = {
      "Content-type": "application/json"
    }
    const body = params ? JSON.stringify(params) : undefined

    // execute fetch
    const response = await fetch(url, { method, body, headers })
    // pull out json body
    const json = await response.json()

    // if response is 2xx
    if (response.ok) {
      // update the store, which will cause subscribers to be notified
      store.set(json)
    } else {
      // response failed, set `errors` and clear `loading` flag
      store.update((data: any) => {
        data.loading = false
        data.errors = json.errors
        return data
      })
    }
  }

  // convenience wrappers for get, post, patch, and delete
  const callGet = (url: string) => request('GET', url)
  const callPost = (url: string, params: object) => request('POST', url, params)
  const callPatch = (url: string, params: object) => request('PATCH', url, params)
  const callDelete = (url: string, params: object) => request('DELETE', url, params)

  // return the customized store
  return {
    ...store,
    get: callGet,
    post: callPost,
    patch: callPatch,
    delete: callDelete,
  }
}