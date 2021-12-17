import { serializeTokens } from './tokens'
import { SerializedFarmConfig } from './types'

const serializedTokens = serializeTokens()

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
  
 /**
  * zpq
  * pid : 0; 为 自己发的 代币；
  * 需要在 tokens.ts 中配置（因为 walletInfo.ts 中读取 余额 时，代币名称直接写死的读取 tokens.ts 中的 cgc 的地址）
  * 
  * 
  */
  {
    pid: 0,
    lpSymbol: 'CAKE',
    lpAddresses: {
      97: '0x9C21123D94b93361a29B2C2EFB3d5CD8B17e0A9e',
      56: '0x39b719Fea96275b7504BeeDAA7BCa813e2E89992',
    },
    token: serializedTokens.syrup,
    quoteToken: serializedTokens.wbnb,
  },
  // {
  //   pid: 1,
  //   lpSymbol: 'BNB-USDT LP',
  //   lpAddresses: {
  //     97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
  //     56: '0x35d3cf2c2671d1acd392fb55addc67035e8cf5bd',
  //   },
  //   token: serializedTokens.wbnb,
  //   quoteToken: serializedTokens.usdt
  // },
  {
    pid: 1,
    lpSymbol: 'CGC-BNB LP',
    lpAddresses: {
      97: '0x9C21123D94b93361a29B2C2EFB3d5CD8B17e0A9e',
      56: '0xc983eb33a9fa15e0bea79502312f03b21ec32f17',
    },
    token: serializedTokens.cgc,
    quoteToken: serializedTokens.wbnb,
  },
  // 新加 zpq
  {
    pid: 2,
    lpSymbol: 'BTC-TEST-BNB LP',
    lpAddresses: {
      97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      56: '0x3e74444DBa5D10Da20FDAE9e6459D1d092Cbce93',
    },
    token: serializedTokens['BTC-TEST'],
    quoteToken: serializedTokens.wbnb,
  }
]

export default farms
