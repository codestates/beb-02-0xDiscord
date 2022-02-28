const Board = artifacts.require("Board");

module.exports = function(deployer) {
  deployer.deploy(Board);
};
