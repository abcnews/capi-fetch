import capi from '../../src';

[10736062, 10735012, 10734902].forEach(cmid => capi(cmid, (err, doc) => console.log(cmid, err, doc)));
