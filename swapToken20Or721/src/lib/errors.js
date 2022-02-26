const NO_ETHEREUM_OBJECT = /No Ethereum provider was found on window.ethereum/;

export const isNoEthereumObject = (err) => {
  return NO_ETHEREUM_OBJECT.test(err);
};

