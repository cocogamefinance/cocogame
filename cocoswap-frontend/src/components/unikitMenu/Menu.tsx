import throttle from 'lodash/throttle'
import React, {useEffect, useRef, useState} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {Flex, Box, useMatchBreakpoints, Text, SubMenuItems, Image} from '@pancakeswap/uikit'
import {useThemeManager} from 'state/user/hooks'
import {MENU_HEIGHT, MOBILE_MENU_HEIGHT, TOP_BANNER_HEIGHT, TOP_BANNER_HEIGHT_MOBILE} from './config'
import LangSelector from './LangSelector/LangSelector'
import {DropdownMenu} from '../DropdownMenu/index'
import MenuItem from '../MenuItem/index'
import Footer from '../Footer/index'

const isTouchDevice = (): boolean => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

const StyledLink = styled(Link)`
  justify-content: center;
  width: 160px;
  height: fit-content;
`
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 0;
`

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  background-color: ${({theme}) => theme.nav.background};
  border-bottom: 1px solid ${({theme}) => theme.colors.cardBorder};
  transform: translate3d(0, 0, 0);

  padding-left: 16px;
  padding-right: 16px;
`

const FixedContainer = styled.div<{showMenu: boolean; height: number}>`
  position: fixed;
  top: ${({showMenu, height}) => (showMenu ? 0 : `-${height}px`)};
  left: 0;
  transition: top 0.2s;
  height: ${({height}) => `${height}px`};
  width: 100%;
  z-index: 20;
`

const TopBannerContainer = styled.div<{height: number}>`
  height: ${({height}) => `${height}px`};
  min-height: ${({height}) => `${height}px`};
  max-height: ${({height}) => `${height}px`};
  width: 100%;
`

const BodyWrapper = styled(Box)`
  position: relative;
  display: flex;
`

const Inner = styled.div<{isPushed: boolean; showMenu: boolean}>`
  flex-grow: 1;
  transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate3d(0, 0, 0);
  max-width: 100%;
`

const MenuItems = ({items = [], activeItem, activeSubItem, ...props}) => {
  return (
    <Flex {...props}>
      {items.map(({label, items: menuItems = [], href, icon = ''}) => {
        const statusColor = menuItems?.find((menuItem) => menuItem.status !== undefined)?.status?.color
        const isActive = activeItem === href
        const linkProps = isTouchDevice() && menuItems && menuItems.length > 0 ? {} : {href}
        return (
          <DropdownMenu key={`${label}#${href}#${icon}`} items={menuItems} activeItem={activeSubItem}>
            <MenuItem {...linkProps} isActive={isActive} statusColor={statusColor}>
              <span className="colorD53B79">{label}</span>
            </MenuItem>
          </DropdownMenu>
        )
      })}
    </Flex>
  )
}
const UikitMenu = ({
  userMenu,
  banner,
  globalMenu,
  isDark,
  toggleTheme,
  currentLang,
  setLang,
  cakePriceUsd,
  links,
  subLinks,
  footerLinks,
  activeItem,
  activeSubItem,
  langs,
  buyCakeLabel,
  children,
}) => {
  const {isMobile} = useMatchBreakpoints()
  const [showMenu, setShowMenu] = useState(true)
  const refPrevOffset = useRef(window.pageYOffset)
  // const [isDark] = useThemeManager()
  const topBannerHeight = isMobile ? TOP_BANNER_HEIGHT_MOBILE : TOP_BANNER_HEIGHT

  const totalTopMenuHeight = banner ? MENU_HEIGHT + topBannerHeight : MENU_HEIGHT

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight
      const isTopOfPage = currentOffset === 0
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true)
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current || currentOffset <= totalTopMenuHeight) {
          // Has scroll up
          setShowMenu(true)
        } else {
          // Has scroll down
          setShowMenu(false)
        }
      }
      refPrevOffset.current = currentOffset
    }
    const throttledHandleScroll = throttle(handleScroll, 200)

    window.addEventListener('scroll', throttledHandleScroll)
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [totalTopMenuHeight])

  // Find the home link if provided
  // const homeLink = links.find((link) => link.label === "Home");

  const subLinksWithoutMobile = subLinks?.filter((subLink) => !subLink.isMobileOnly)
  const subLinksMobileOnly = subLinks?.filter((subLink) => subLink.isMobileOnly)
  return (
    <Wrapper>
      <FixedContainer showMenu={showMenu} height={totalTopMenuHeight}>
        {banner && <TopBannerContainer height={topBannerHeight}>{banner}</TopBannerContainer>}
        <StyledNav>
          <Flex>
            <StyledLink to="/">
              {!isMobile && (
                <Image src={isDark ? '/images/mImg/bsss.png' : '/images/mImg/lo.png'} width={160} height={34} />
              )}
              {isMobile && <Image src="/images/mImg/uuu.png" width={30} height={30} />}
            </StyledLink>
            {/* <Logo isDark={isDark} href={homeLink?.href ?? "/"} /> */}
            {!isMobile && <MenuItems items={links} activeItem={activeItem} activeSubItem={activeSubItem} ml="24px" />}
          </Flex>
          <Flex alignItems="center">
            {!isMobile && (
              <Box mr="12px">
                <div style={{display: '-webkit-box', marginRight: '18px'}}>
                  <Image src="/images/mImg/uuu.png" width={30} height={30} />
                  <Text bold>{`$${cakePriceUsd.toFixed(3)}`}</Text>
                </div>
                {/* <CakePrice cakePriceUsd={cakePriceUsd} /> */}
              </Box>
            )}
            <Box mt="4px">
              <LangSelector
                currentLang={currentLang}
                langs={langs}
                setLang={setLang}
                buttonScale="xs"
                color="textSubtle"
                hideLanguage
              />
            </Box>
            {globalMenu} {userMenu}
          </Flex>
        </StyledNav>
      </FixedContainer>
      {subLinks && (
        <Flex justifyContent="space-around">
          <SubMenuItems
            items={subLinksWithoutMobile}
            mt={`${totalTopMenuHeight + 1}px`}
            activeItem={activeSubItem}
            className="colorD53B79"
          />
          {subLinksMobileOnly?.length > 0 && (
            <SubMenuItems
              items={subLinksMobileOnly}
              mt={`${totalTopMenuHeight + 1}px`}
              activeItem={activeSubItem}
              isMobileOnly
            />
          )}
        </Flex>
      )}
      <BodyWrapper mt={!subLinks ? `${totalTopMenuHeight + 1}px` : '0'}>
        <Inner isPushed={false} showMenu={showMenu}>
          {children}
          <Footer
            items={footerLinks}
            isDark={isDark}
            toggleTheme={toggleTheme}
            langs={langs}
            setLang={setLang}
            currentLang={currentLang}
            cakePriceUsd={cakePriceUsd}
            buyCakeLabel={buyCakeLabel}
            mb={[`${MOBILE_MENU_HEIGHT}px`, null, '0px']}
          />
        </Inner>
      </BodyWrapper>
      {/* {isMobile &&1} */}
    </Wrapper>
  )
}

export default UikitMenu
