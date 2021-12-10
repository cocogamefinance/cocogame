/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import styled, {keyframes} from 'styled-components'
import {Link} from 'react-router-dom'
import {Flex, Button, Image,useMatchBreakpoints} from '@pancakeswap/uikit'
import {useWeb3React} from '@web3-react/core'
import {useTranslation} from 'contexts/Localization'
import ConnectWalletButton from 'components/ConnectWalletButton'
import useTheme from 'hooks/useTheme'
import {SlideSvgDark, SlideSvgLight} from './SlideSvg'
import CompositeImage, {CompositeImageProps} from './CompositeImage'
import lf from '../img/lf.png'
import lr from '../img/lr.png'

const flyingAnim = () => keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(-5px, -5px);
  }
  to {
    transform: translate(0, 0px);
  }  
`

const fading = () => keyframes`
  from {
    opacity: 0.9;
  }
  50% {
    opacity: 0.1;
  }
  to {
    opacity: 0.9;
  }  
`

const BgWrapper = styled.div`
  z-index: -1;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0px;
  left: 0px;
`

const InnerWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: -3px;
`

const BunnyWrapper = styled.div`
  width: 100%;
  animation: ${flyingAnim} 3.5s ease-in-out infinite;
`

const StarsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  & :nth-child(2) {
    animation: ${fading} 2s ease-in-out infinite;
    animation-delay: 1s;
  }

  & :nth-child(3) {
    animation: ${fading} 5s ease-in-out infinite;
    animation-delay: 0.66s;
  }

  & :nth-child(4) {
    animation: ${fading} 2.5s ease-in-out infinite;
    animation-delay: 0.33s;
  }
`
const ImageWrapper = styled.div`
  margin-bottom: 44px;
`
// const imagePath = '/images/home/lunar-bunny/'
// const imageSrc = 'bunny'

const starsImage: CompositeImageProps = {
  path: '/images/home/lunar-bunny/',
  attributes: [
    {src: 'star-l', alt: '3D Star'},
    {src: 'star-r', alt: '3D Star'},
    {src: 'star-top-r', alt: '3D Star'},
  ],
}

const Hero = () => {
  const {t} = useTranslation()
  const {account} = useWeb3React()
  const {theme} = useTheme()
  const { isMobile } = useMatchBreakpoints();
  return (
    <>
      <BgWrapper>
        <InnerWrapper>{theme.isDark ? <SlideSvgDark width="100%" /> : <SlideSvgLight width="100%" />}</InnerWrapper>
      </BgWrapper>
      <Flex
        position="relative"
        flexDirection={['column-reverse', null, null, 'row']}
        alignItems={['flex-end', null, null, 'center']}
        justifyContent="center"
        mt={[account ? '280px' : '50px', null, 0]}
        id="homepage-hero"
      >
        <Flex flex="1" flexDirection="column">
          {/* <ImageWrapper>
            <Image src={lf} alt="all the bunnies" width={606} height={224} />
          </ImageWrapper> */}
          <div>
            <span
              style={{
                display: 'flex',
                alignContent: 'center',
                fontWeight: 800,
                fontSize: '50px',
                justifyContent: 'center',
              }}
            >
              
              <span style={{lineHeight: '95px'}}>{t('Hi, welcome')}</span>
              <img src="/images/mImg/op.png" style={{height: '50px'}} />
            </span>
            <span style={{display: 'flex', alignContent: 'center', fontWeight: 800, fontSize: '50px'}}>
              <span>
                <img src="/images/mImg/oi.png" width={300} />
              </span>
               {!isMobile&&  <span style={{lineHeight: '95px'}}>{t('World~')}</span>}
            </span>
            {
              isMobile &&  <span style={{lineHeight: '95px', fontWeight: 800, fontSize: '50px'}}>{t('World~')}</span>
            }
            <span style={{display: 'flex', alignContent: 'center', fontWeight: 400, margin: '5px 0  20px',lineHeight:'20px'}}>
              {t('Trade on the most popular de neutralisation platform to earn and win cryptocurrency')}
            </span>
          </div>
          {/* <Heading scale="xxl" color="secondary" mb="24px">
            {t('The moon is made of pancakes.')}
          </Heading>
          <Heading scale="md" mb="24px">
            {t('Trade, earn, and win crypto on the most popular decentralized platform in the galaxy.')}
          </Heading> */}
          <Flex>
            {!account && <ConnectWalletButton mr="8px" className="cocoButton7166B0" />}
            <Link to="/swap">
              <Button className=" cocoButton7166B0NoBorder" variant={!account ? 'secondary' : 'primary'}>
                {t('Trade Now')}
              </Button>
            </Link>
          </Flex>
        </Flex>
        <Flex
          height={['192px', null, null, '100%']}
          width={['192px', null, null, '100%']}
          flex={[null, null, null, '1']}
          mb={['24px', null, null, '0']}
          position="relative"
        >
          <BunnyWrapper>
            <Image src={lr} alt="all the bunnies" width={688} height={560} />
          </BunnyWrapper>

          <StarsWrapper>
            <CompositeImage {...starsImage} />
          </StarsWrapper>
        </Flex>
      </Flex>
    </>
  )
}

export default Hero
