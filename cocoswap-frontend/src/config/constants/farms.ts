import { serializeTokens } from './tokens'
import { SerializedFarmConfig } from './types'

const serializedTokens = serializeTokens()

const farms: SerializedFarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'CGC',
    lpAddresses: {
      97: '0x9C21123D94b93361a29B2C2EFB3d5CD8B17e0A9e',
      56: '0xd2A65E9D9F06B26b04edF099226129Df53B47158',
    },
    token: serializedTokens.syrup,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'CGC-USDT LP',
    lpAddresses: {
      97: '0x9C21123D94b93361a29B2C2EFB3d5CD8B17e0A9e',
      56: '0xAd95ADa241F62300E265AbDE39379cF7Af9CD0bC',
    },
    token: serializedTokens.cgc,
    quoteToken: serializedTokens.usdt,
  },
  {
    pid: 2,
    lpSymbol: 'CGC-BNB LP',
    lpAddresses: {
      97: '0x9C21123D94b93361a29B2C2EFB3d5CD8B17e0A9e',
      56: '0x5B16E108a1b25bEA6d10250E00a89aa2Df4F8A6F',
    },
    token: serializedTokens.cgc,
    quoteToken: serializedTokens.bnb,
  }
]
export default farms
