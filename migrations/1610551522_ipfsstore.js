const IPFSImageStore = artifacts.require('IPFSImageStore')

module.exports = function(_deployer) {
  _deployer.deploy(IPFSImageStore)
};
