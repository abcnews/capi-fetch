import capi from '../../src';

const CMIDS = [10736062, 10735012, 10734902];

CMIDS.forEach(cmid => capi(cmid, (err, doc) => console.log(`[env] ${cmid}`, err, doc)));
CMIDS.forEach(cmid => capi(cmid, (err, doc) => console.log(`[live] ${cmid}`, err, doc), true));
CMIDS.forEach(cmid => capi(cmid, (err, doc) => console.log(`[preview] ${cmid}`, err, doc), null, true));
