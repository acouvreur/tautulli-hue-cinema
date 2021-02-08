const v3 = require('node-hue-api').v3;

const USERNAME = 'oFKsKPuVFsDiB-ejKyrXSRH8-0lG5uK5dDTGckE3';

v3.discovery
  .nupnpSearch()
  .then((searchResults) => {
    const host = searchResults[0].ipaddress;
    return v3.api.createLocal(host).connect(USERNAME);
  })
  .then((api) => {
    return api.groups.getAll();
  })
  .then((allGroups) => {
    allGroups.forEach((group) => {
      console.log(group.toStringDetailed());
    });
  });
