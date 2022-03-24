import React from 'react'
import {
  Link,
  Flex,
  Box,
  Colors,
  Button,
  ThemeSwitcher,
  CakePrice,
  Image,
  ArrowForwardIcon,
  Text,
} from '@pancakeswap/uikit'
// import { baseColors, darkColors, lightColors } from "../../theme/colors";
// import { Flex, Box } from "../Box";
// import { Link } from "../Link";
import styled from 'styled-components'
import {baseColors, darkColors, lightColors} from '../unikitMenu/theme'
import {
  StyledFooter,
  StyledIconMobileContainer,
  StyledList,
  StyledListItem,
  StyledText,
  // StyledSocialLinks,
  StyledToolsContainer,
} from './styles'
import {FooterProps} from './types'

// import LangSelector from "../LangSelector/LangSelector";
// import CakePrice from "../CakePrice/CakePrice";
// import { LogoWithTextIcon, ArrowForwardIcon } from "../Svg";
// import { Button } from "../Button";
// import { Colors } from "../..";
const ImageWrapper = styled(Flex)`
  justify-content: center;
  width: 160px;
  height: fit-content;
`
const MenuItem: React.FC<FooterProps> = ({
  items,
  isDark,
  toggleTheme,
  currentLang,
  langs,
  setLang,
  cakePriceUsd,
  buyCakeLabel,
  ...props
}) => {
  return (
    <StyledFooter p={['40px 16px', null, '56px 40px 32px 40px']} {...props} justifyContent="center" className="aaa">
      <Flex flexDirection="column" width={['100%', null, '1200px;']}>
        <StyledIconMobileContainer display={['block', null, 'none']}>
          {/* <LogoWithTextIcon isDark width="130px" /> */}
        </StyledIconMobileContainer>
        <Flex
          order={[2, null, 1]}
          flexDirection={['column', null, 'row']}
          justifyContent="space-between"
          alignItems="flex-start"
          mb={['42px', null, '36px']}
        >
          {items?.map((item) => (
            <StyledList key={item.label}>
              <StyledListItem>{item.label}</StyledListItem>
              {item.items?.map(({label, href, isHighlighted = false}) => (
                <StyledListItem key={label}>
                  {href ? (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <Link
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      color={isHighlighted ? baseColors.warning : darkColors.text}
                      bold={false}
                    >
                      {label}
                    </Link>
                  ) : (
                    <></>
                    // <StyledText>{label}</StyledText>
                  )}
                </StyledListItem>
              ))}
            </StyledList>
          ))}
          <Box display={['none', null, 'block']}>
            <ImageWrapper>
              <Image src="/images/mImg/iu.png" width={160} height={38} />
            </ImageWrapper>
          </Box>
        </Flex>
        {/* <StyledSocialLinks order={[2]} pb={["42px", null, "32px"]} mb={["0", null, "32px"]} /> */}
        <StyledToolsContainer
          order={[1, null, 3]}
          flexDirection={['column', null, 'row']}
          justifyContent="space-between"
        >
          <Flex order={[2, null, 1]} alignItems="center">
            <ThemeSwitcher isDark={isDark} toggleTheme={toggleTheme} />
            {/* <LangSelector
              currentLang={currentLang}
              langs={langs}
              setLang={setLang}
              color={darkColors.textSubtle as keyof Colors}
              dropdownPosition="top-right"
            /> */}
          </Flex>

          {/* footer 购买 cake 按钮 zpq */}
          {/* <Flex order={[1, null, 2]} mb={["24px", null, "0"]} justifyContent="space-between" alignItems="center"> */}
          {/* <Box mr="20px"> */}
          {/* <div style={{display:'-webkit-box',marginRight:'18px'}}>
                     <Image src='/images/mImg/uuu.png' width={30} height={30} />
                      <Text bold color="#fff">{`$${cakePriceUsd.toFixed(3)}`}</Text>
                    </div> */}
          {/* <CakePrice cakePriceUsd={cakePriceUsd} color={darkColors.textSubtle as keyof Colors} /> */}
          {/* </Box> */}
          {/* <Button
              as="a"
              href="https://pancakeswap.finance/swap?outputCurrency=0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82"
              target="_blank"
              scale="sm"
              endIcon={<ArrowForwardIcon color={lightColors.backgroundAlt} />}
              className='cocoButton7166B0'
            >
              {buyCakeLabel}
            </Button> */}
          {/* </Flex> */}
        </StyledToolsContainer>
      </Flex>
    </StyledFooter>
  )
}

export default MenuItem
