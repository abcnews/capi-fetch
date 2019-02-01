// This built JS asset _will_be_ rewritten on-the-fly, so we need to obscure the origin somewhat
const GENIUNE_MEDIA_ORIGIN_PATTERN = new RegExp(['http', '://', 'mpegmedia', '.abc.net.au'].join(''), 'g');
const PROXIED_MEDIA_ORIGIN = 'https://abcmedia.akamaized.net';
const PREVIEW_HOSTNAME = 'nucwed.aus.aunty.abc.net.au';
const CAPI_LIVE_ORIGIN = 'https://content-gateway.abc-prod.net.au';
const CAPI_PREVIEW_ORIGIN = `http://${PREVIEW_HOSTNAME}`;
const IS_PREVIEW_SITE = window.location.hostname.indexOf(PREVIEW_HOSTNAME) > -1;
const HAS_LIVE_FLAG = window.location.search.indexOf('prod') > -1;
const CAPI_ENV_BASED_ORIGIN = !IS_PREVIEW_SITE || HAS_LIVE_FLAG ? CAPI_LIVE_ORIGIN : CAPI_PREVIEW_ORIGIN;

function capiFetch(
  cmid: string | number,
  done: (err?: ProgressEvent | Error, doc?: Object) => void,
  forceLive?: boolean,
  forcePreview?: boolean
): void {
  if (cmid != +cmid && !String(cmid).length) {
    return done(new Error(`Invalid CMID: ${cmid}`));
  }

  const xhr = new XMLHttpRequest();
  const errorHandler = (event: ProgressEvent) => done(event);

  xhr.onabort = errorHandler;
  xhr.onerror = errorHandler;
  xhr.onload = event => (xhr.status !== 200 ? done(event) : done(undefined, parse(xhr.responseText)));
  xhr.open(
    'GET',
    `${
      forceLive ? CAPI_LIVE_ORIGIN : forcePreview ? CAPI_PREVIEW_ORIGIN : CAPI_ENV_BASED_ORIGIN
    }/api/v2/content/id/${cmid}`
  );
  xhr.responseType = 'text';
  xhr.send();
}

function parse(responseText: string): Object {
  // The Content API is not returning proxied asset URLs (yet)
  return JSON.parse(responseText.replace(GENIUNE_MEDIA_ORIGIN_PATTERN, PROXIED_MEDIA_ORIGIN));
}

export default capiFetch;
