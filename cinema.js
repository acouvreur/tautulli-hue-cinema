import hue from 'node-hue-api';

const v3 = hue.v3;
const USERNAME = process.env.HUE_USERNAME;

function turnOnLightGroup(groupId) {
  return v3.discovery
    .nupnpSearch()
    .then((searchResults) => {
      const host = searchResults[0].ipaddress;
      return v3.api.createLocal(host).connect(USERNAME);
    })
    .then((api) => {
      return api.groups.setGroupState(groupId, { on: true });
    });
}

function turnOffLightGroup(groupId) {
  return v3.discovery
    .nupnpSearch()
    .then((searchResults) => {
      const host = searchResults[0].ipaddress;
      return v3.api.createLocal(host).connect(USERNAME);
    })
    .then((api) => {
      return api.groups.setGroupState(groupId, { on: false });
    });
}

export { turnOffLightGroup, turnOnLightGroup };
