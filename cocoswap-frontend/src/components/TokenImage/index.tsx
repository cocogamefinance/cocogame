import React from 'react'
import {
  TokenPairImage as UIKitTokenPairImage,
  TokenPairImageProps as UIKitTokenPairImageProps,
  TokenImage as UIKitTokenImage,
  ImageProps,
} from '@pancakeswap/uikit'
import tokens from 'config/constants/tokens'
import { Token } from '@pancakeswap/sdk'

interface TokenPairImageProps extends Omit<UIKitTokenPairImageProps, 'primarySrc' | 'secondarySrc'> {
  primaryToken: Token
  secondaryToken: Token
}

// 农场交易对  加入自己代币图标  zpq
const getImageUrlFromToken = (token: Token) => {
  let farmTokenIcon = '';
  // 如果是自己的代币
  if(token.address === '0x39b719Fea96275b7504BeeDAA7BCa813e2E89992') {
    farmTokenIcon = '/images/tokens/favicon.ico'
  } else {
    const address = token.symbol === 'BNB' ? tokens.wbnb.address : token.address
    farmTokenIcon = `/images/tokens/${address}.svg`
  }
  return farmTokenIcon;

}

export const TokenPairImage: React.FC<TokenPairImageProps> = ({ primaryToken, secondaryToken, ...props }) => {
  return (
    <UIKitTokenPairImage
      primarySrc={getImageUrlFromToken(primaryToken)}
      secondarySrc={getImageUrlFromToken(secondaryToken)}
      {...props}
    />
  )
}

interface TokenImageProps extends ImageProps {
  token: Token
}

export const TokenImage: React.FC<TokenImageProps> = ({ token, ...props }) => {
  return <UIKitTokenImage src={getImageUrlFromToken(token)} {...props} />
}
