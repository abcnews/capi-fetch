# @abcnews/capi-fetch

Grab a Core Media document object from the Preview / Live Content API, based on the current execution domain

```sh
$ npm i @abcnews/capi-fetch
```

## Usage

```js
import capiFetch from '@abcnews/capi-fetch';

capiFetch(10736062, (err, doc) => {
  if (!err) {
    console.log(doc);
    // > {executionTime: "367 ms", id: 10736062, docType: "Article", ...}
  }
});
```

If your project's JS is currently executing in a page on `nucwed.aus.aunty.abc.net.au`, requests will be made to Preview CAPI (`http://nucwed.aus.aunty.abc.net.au/api/v2/*`), otherwise they'll be made to Live CAPI (`https://content-gateway.abc-prod.net.au/api/v2/*`).

If you want to direct a single request to Live CAPI, regardless of the current execution domain, pass `true` as a 3rd argument to `capiFetch`.

### API

```ts
function capiFetch(cmid: number, done: function, forceLive?: boolean): any { ... }
```

## Developing

To run the `/example` project, you need to pretend your local machine is `www.abc.net.au` to work around cross-domain request limitations on the Content APIs...

1. Add this to your hosts file:

```
127.0.0.1 mock.www.abc.net.au
127.0.0.1 mock.nucwed.aus.aunty.abc.net.au
```

2. Start the development server: `$ npm start`
3. Open [mock.nucwed.aus.aunty.abc.net.au:8080](http://mock.nucwed.aus.aunty.abc.net.au:8080) or [mock.www.abc.net.au:8080](http://mock.www.abc.net.au:8080)
4. Restore your hosts file when you're finished

The best way to check that the Preview / Live switching works is to use this module inside a project hosted on `*.abc.net.au`.

For testing purposes, you can direct all requests to Live CAPI by appending `?prod=1` to your current page URL.

## Authors

- Colin Gourlay ([Gourlay.Colin@abc.net.au](mailto:Gourlay.Colin@abc.net.au))
