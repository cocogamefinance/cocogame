import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'CocoSwap',
  description:
    'The most popular AMM on BSC by user count! Earn CAKE through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by CocoSwap), NFTs, and more, on a platform you can trust.',
  image: 'https://pancakeswap.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else if (path.startsWith('/nfts/collections')) {
    basePath = '/nfts/collections'
  } else if (path.startsWith('/nfts/profile')) {
    basePath = '/nfts/profile'
  } else if (path.startsWith('/pancake-squad')) {
    basePath = '/pancake-squad'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('CocoSwap')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('CocoSwap')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('CocoSwap')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('CocoSwap')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('CocoSwap')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('CocoSwap')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('CocoSwap')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('CocoSwap')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('CocoSwap')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('CocoSwap')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('CocoSwap')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('CocoSwap')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('CocoSwap')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('CocoSwap')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('CocoSwap')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('CocoSwap')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('CocoSwap')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('CocoSwap')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('CocoSwap Info & Analytics')}`,
        description: 'View statistics for CocoSwap exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('CocoSwap Info & Analytics')}`,
        description: 'View statistics for CocoSwap exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | ${t('CocoSwap Info & Analytics')}`,
        description: 'View statistics for CocoSwap exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | ${t('CocoSwap')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('CocoSwap')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Your Profile')} | ${t('CocoSwap')}`,
      }
    case '/pancake-squad':
      return {
        title: `${t('Pancake Squad')} | ${t('CocoSwap')}`,
      }
    default:
      return null
  }
}
