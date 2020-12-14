const { 
    SafeMathLib,
    ZENXToken
} = require('../test/helpers/contractArtifacts');

const { accountsData } = require('../test/helpers/accounts');

const BN = require('bn.js');

module.exports = async function (deployer, network, accounts) {
    const [owner, pauser, recoverer, ...others] = accounts;

    // deploy and link SafeMath
    await deployer.deploy(SafeMathLib);
    await deployer.link(SafeMathLib, ZENXToken);

    // // deploy USDT proxy
    await deployer.deploy(ZENXToken);

    const zenx = await ZENXToken.deployed();

    // add backup account for ZENX Pauser
    await zenx.addPauser(pauser, {from: owner });

    // add backup account for ZENX Recoverer
    await zenx.addRecoverer(recoverer, {from: owner });

}