import Web3 from 'web3'

let web3 = null;
let currWalletAddress = null;
let connectedMainNetwork = false;
let connectedNetwork = "";
let connectedChainId = null;
let currWalletType = null;
const initWeb3 = async () => {
  let web3Provider
  const ethereum = window.ethereum;
  if (ethereum) {
    await connectMetaMask();
  } else if (window.web3) {
    web3Provider = window.web3.currentProvider
    if (typeof web3Provider !== 'undefined') {
      web3 = new Web3(web3Provider)
      // console.log('Connected wallet success!')
    } else {
      // console.log('Connected wallet failed!')
    }
  }
  if (!web3) {
    // set the provider you want from Web3.providers
    // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    // let HOST = process.env.HOST;
    // if (!!HOST && "test" == HOST.toLowerCase()) {
    //   web3 = new Web3(new Web3.providers.HttpProvider("https://http-testnet.hecochain.com"));
    // } else {
    //   web3 = new Web3(new Web3.providers.HttpProvider("https://http-mainnet.hecochain.com"));
    // }
    // web3 = new Web3(new Web3.providers.HttpProvider("https://http-mainnet.hecochain.com"));

    // heco
    // web3 = new Web3('https://http-mainnet.hecochain.com')

    // bnb test
    // web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545')

    // bnb main
    web3 = new Web3('https://bsc-dataseed1.binance.org:443')
  }
}

const getNetwork = () => {
  if (!web3 || !web3.eth) {
    connectedMainNetwork = false;
    connectedNetwork = "";
    connectedChainId = null;
    return;
  }
  web3.eth.net.getId().then(res => {
    connectedChainId = res;
    if (res === 1) {
      connectedMainNetwork = true;
      connectedNetwork = "Main";
    } else if (res === 3) {
      connectedNetwork = "Ropsten";
    } else if (res === 4) {
      connectedNetwork = "Rinkeby";
    } else if (res === 5) {
      connectedNetwork = "Goerli";
    } else if (res === 42) {
      connectedNetwork = "Kovan";
    } else if (res === 128) {
      connectedNetwork = "HECO Main";
    } else if (res === 256) {
      connectedNetwork = "HECO TEST";
    } else {
      connectedMainNetwork = false;
      connectedNetwork = "";
    }
  })
}

// const Get = async url => {
//   let res = await axios.get(url)
//   return res
// }

const  getchainid = async () => {
  let web3Provider = '';
  web3Provider = window.web3.currentProvider;
  web3 = new Web3(web3Provider);
  const chainid =  await web3.eth.net.getId()
  // console.log('9', chainid)
  return chainid;
}

// 授权登陆
const connectMetaMask = () => {
  return new Promise((resolve, reject) => {
    let web3Provider
    const ethereum = window.ethereum;
    if (ethereum) {
      web3Provider = ethereum;
      try {
        // user auth
        if (ethereum.request !== undefined) {
          ethereum.request({ method: 'eth_requestAccounts' });
        } else {
          ethereum.enable();
        }
        resolve(true);
      } catch (error) {
        // user not auth
        reject(error && error.message ? error.message : error);
      }
    } else {
      // reject("No Ethereum");
    }

    if (typeof web3Provider !== 'undefined') {
      web3 = new Web3(web3Provider)
      getNetwork()
      if (ethereum.isMetaMask) {
        currWalletType = "MetaMask";
      } else {
        currWalletType = "Ethereum";
      }
    }
  })
}

const connectWallet = () => {
  return new Promise((resolve, reject) => {
    if (web3 === undefined) {
      currWalletAddress = undefined;
      reject()
      return;
    }
    web3.eth.getAccounts().then(accounts => {
      if (accounts.length > 0) {
        currWalletAddress = accounts[0];
      } else {
        currWalletAddress = undefined;
      }
      resolve(currWalletAddress)
    }).catch((error) => {
      currWalletAddress = undefined;
      reject(error)
    })
  })
}

const commonCall = (method, ...params) => {
  return new Promise((resolve, reject) => {
    method(...params).call({ from: currWalletAddress }).then(result => {
      resolve(result);
    }).catch(error => {
      reject(error);
    })
  })
}

const commonCallAndHandler = (method, handler, ...params) => {
  return new Promise((resolve, reject) => {
    method(...params).call({ from: currWalletAddress }).then(result => {
      resolve(handler(result));
    }).catch(error => {
      reject(error);
    })
  })
}

const commonCallAndHandlerParams = (method, handler, handlerParams, ...params) => {
  return new Promise((resolve, reject) => {
    method(...params).call({ from: currWalletAddress }).then(result => {
      resolve(handler(result, ...handlerParams));
    }).catch(error => {
      reject(error);
    })
  })
}

const commonSend = (method, ...params) => {
  return new Promise((resolve, reject) => {
    method(...params).send({ from: currWalletAddress }, function (error, result) {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const commonEstimateGas = (method, ...params) => {
  return new Promise((resolve, reject) => {
    method(...params).estimateGas({ from: currWalletAddress }, function (error, result) {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const getEthBalance = (address) => {
  return new Promise((resolve, reject) => {
    web3.eth.getBalance(address).then(res => {
      resolve(fromWei(res))
    }).catch(error => {
      reject(error)
    })
  })
}

const getGasPrice = () => {
  return new Promise((resolve, reject) => {
    web3.eth.getGasPrice().then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

/** 
 * jsonParams {
 * from,
 * to,
 * gas,
 * gasPrice,
 * value,
 * data,
 * nonce
 * }
*/
const estimateGas = (jsonParams) => {
  return new Promise((resolve, reject) => {
    web3.eth.estimateGas(jsonParams).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

const getTransaction = (_txid) => {
  return new Promise((resolve, reject) => {
    web3.eth.getTransaction(_txid).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

const getTransactionReceipt = (_txid) => {
  return new Promise((resolve, reject) => {
    web3.eth.getTransactionReceipt(_txid).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

const getCurrWalletAddress = () => {
  return currWalletAddress;
}

const isMainNet = () => {
  return connectedMainNetwork;
}

const getConnectedNetwork = () => {
  return connectedNetwork;
}

const getConnectedChainId = () => {
  return connectedChainId;
}

const getWeb3 = () => {
  return web3;
}

const getEth = () => {
  // return !!web3 ? web3.eth : undefined;
}

const toBigNumber = (str) => {
  return web3.utils.toBigNumber(str);
}

const toWei = (number, unit) => {
  return web3.utils.toWei(number, unit);
}

const fromWei = (number, unit) => {
  return web3.utils.fromWei(number, unit);
}

const toChecksumAddress = () => {
  return web3.utils.toChecksumAddress(getCurrWalletAddress())
}

const signTypedData = (signer, data) => {
  return new Promise((resolve, reject) => {
    const params = [signer, data];
    const ethereum = window.ethereum;
    if (ethereum.request !== undefined) {
      ethereum.request({ method: 'eth_signTypedData_v3', params }).then((result) => {
        // console.log("error: " + result);
        resolve(result)
      })
        .catch((error) => {
          // console.log("error: " + error);
          reject(error);
        });
    } else {
      web3.currentProvider.sendAsync(
        {
          method: "eth_signTypedData_v3",
          params,
          from: signer
        },
        (error, result) => {
          if (!!result && !!result.result) {
            resolve(result.result)
          } else {
            reject(error);
          }
          // console.log("error: " + error);
        }
      );
    }
  });
}

const stringToBytes32 = (data) => {
  // if (!String(data).startsWith("0x")) {
  //   data = web3.utils.utf8ToHex(data);
  // }
  // return web3.eth.abi.encodeParameter('bytes32', data);
}

const getMaxApprove = () => {
  // 9007199254740991
  return Number.MAX_SAFE_INTEGER;
}

initWeb3();
// onEthereumEvent();

export default {
  // 初始化 web3
  initWeb3,
  connectMetaMask,
  connectWallet,
  commonCall,
  commonCallAndHandler,
  commonCallAndHandlerParams,
  commonSend,
  commonEstimateGas,

  toChecksumAddress,
  signTypedData,
  getCurrWalletAddress,
  toBigNumber,
  toWei,
  fromWei,
  isMainNet,
  getConnectedNetwork,
  getConnectedChainId,
  getMaxApprove,
  getWeb3,
  getEth,
  stringToBytes32,
  getchainid,
  // eth
  estimateGas,
  getEthBalance,
  getGasPrice,
  getTransaction,
  getTransactionReceipt,
}
