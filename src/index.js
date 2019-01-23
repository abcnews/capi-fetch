import xhr from 'xhr';

// This built JS asset _will_be_ rewritten on-the-fly, so we need to obscure the origin somewhat
const GENIUNE_MEDIA_ORIGIN_PATTERN = new RegExp(['http', '://', 'mpegmedia', '.abc.net.au'].join(''), 'g');
const PROXIED_MEDIA_ORIGIN = 'https://abcmedia.akamaized.net';
const PREVIEW_HOSTNAME = 'nucwed.aus.aunty.abc.net.au';
const CAPI_LIVE_ORIGIN = 'https://content-gateway.abc-prod.net.au';
const CAPI_PREVIEW_ORIGIN = `http://${PREVIEW_HOSTNAME}`;
const IS_PREVIEW_SITE = window.location.hostname.indexOf(PREVIEW_HOSTNAME) > -1;
const HAS_LIVE_FLAG = window.location.search.indexOf('prod') > -1;
const CAPI_RESOLVED_ORIGIN = !IS_PREVIEW_SITE || HAS_LIVE_FLAG ? CAPI_LIVE_ORIGIN : CAPI_PREVIEW_ORIGIN;

function capiFetch(cmid, done) {
  if (!cmid.length && cmid != +cmid) {
    return done(new Error(`Invalid CMID: ${cmid}`));
  }

  function onResponse(error, response) {
    if (error || response.statusCode !== 200) {
      return done(error || new Error(response.statusCode));
    }

    // The Content API is not returning proxied asset URLs (yet)
    const body = response.body.replace(GENIUNE_MEDIA_ORIGIN_PATTERN, PROXIED_MEDIA_ORIGIN);

    done(null, JSON.parse(body));
  }

  xhr(`${CAPI_RESOLVED_ORIGIN}/api/v2/content/id/${cmid}`, onResponse);
}

export default capiFetch;
