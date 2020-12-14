const contractArtifacts = require('./contractArtifacts');
const { BN } = require('./setup');

async function setUpUnitTest (accounts) {
  const [owner, pauser, recoverer, ...others] = accounts;

  const SafeMathLib = await contractArtifacts.SafeMathLib.new();

  const libs = {
    SafeMathLib: SafeMathLib.address,
  };

  await contractArtifacts.ZENXToken.link(libs);

  let ZENXToken = await contractArtifacts.ZENXToken.new({ from: owner });

  const contracts = {ZENXToken: ZENXToken};
  return { instances: contracts };
}

module.exports = {
  setUpUnitTest,
};