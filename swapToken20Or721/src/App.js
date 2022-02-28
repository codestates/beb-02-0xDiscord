import { useWeb3React } from "@web3-react/core";
import { NftSwap } from '@traderxyz/nft-swap-sdk';
import {useState, useEffect, useCallback} from 'react';
import { injected } from "./lib/connectors";
import { isNoEthereumObject } from "./lib/errors";


import "./styles.css";
export default function App() {
  const CRYPTOPUNK_420 = {
    tokenAddress: '0x8321e3b6c41e06b8f8d7883c12981de7339b802a',
    tokenId: '1',
    type: 'ERC721',
  };
  const CRYPTOPUNK_421 = {
    tokenAddress: '0x0ba54510d3b95ba4173a2c4c86be27561bb36678',
    amount: '69000000',
    type: 'ERC20',
  };

  const walletAddressUserA = '0x8772901ea06D450C18A92a53927Ba63EFcC97Dbe';
  const assetsToSwapUserA = [CRYPTOPUNK_420];

  const walletAddressUserB = '0xa179C868E21aD4C288f6084Eb349000Ba8623AeA';
  // const walletAddressUserB = '0x8772901ea06D450C18A92a53927Ba63EFcC97Dbe';
  const assetsToSwapUserB = [CRYPTOPUNK_421];
  // const assetsToSwapUserB = [CRYPTOPUNK_421];


  const { library, chainId, activate,  active, deactivate } = useWeb3React();
  const [swapSdk, setSwapSdk] = useState(null);
  const [signOrder, setSignedOrder] = useState("");

  const handleConnect = () => {
    if (active) {
      deactivate();
      return;
    }
    activate(injected, (error) => {
      if (isNoEthereumObject(error))
        window.open("https://metamask.io/download.html");
    });
  }

  
  useEffect(() => {
      console.log(active);
      if (active) {

        const sdk = new NftSwap(library, library.getSigner(), chainId);
        setSwapSdk(sdk);
        console.log(sdk);
      }
    }, [library, chainId])

  // Use the SDK however you'd like in the app...
  const handleClick = useCallback(() => {
    const fetchData = async () => {
      if (!swapSdk) {
        return;
      }
      await swapSdk.approveTokenOrNftByAsset(CRYPTOPUNK_420, walletAddressUserA);

      // Part One
      console.log(walletAddressUserB);
      const order = await swapSdk.buildOrder(assetsToSwapUserA, assetsToSwapUserB, walletAddressUserA,
      {
          fees: [
            {
              amount: '6900000000000', // 69 USDC fee
            },
          ],
        }
      );
      const signedOrder = await swapSdk.signOrder(order, walletAddressUserB);
      console.log("ttsignt", signedOrder);
      setSignedOrder(signedOrder);
  

      // Part 2
    }
    fetchData();

  }, [swapSdk]);

  const handleClick2 = useCallback(() => {
    const fetchData2 = async () => {
      if (!swapSdk) {
        return;
      }

      // Part 2
    
    await swapSdk.approveTokenOrNftByAsset(CRYPTOPUNK_421, walletAddressUserB);


    const fillTx = await swapSdk.fillSignedOrder(signOrder);
    console.log("fill", fillTx);
    const fillTxReceipt = await swapSdk.awaitTransactionHash(fillTx.hash);
    // console.log(fillTxReceipt.transactionHash);
    console.log(fillTxReceipt.transactionHash);

    }
    fetchData2();

  }, [swapSdk])


  return (
    <div>
            <button type="button" onClick={handleConnect}>
          {active ? "disconnect" : "connect"}
        </button>
            <button type="button" onClick={handleClick}> swap</button>
            <button type="button" onClick={handleClick2}> swap2</button>
    </div>
  );
}
