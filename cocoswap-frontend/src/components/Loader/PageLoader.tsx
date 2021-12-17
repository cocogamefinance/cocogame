import React from 'react'
import styled from 'styled-components'
import { Image} from '@pancakeswap/uikit'
import Page from '../Layout/Page'

const Wrapper = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const PageLoader: React.FC = () => {
  return (
    <Wrapper>
        <Image src="/images/mImg/i.png" alt="Get some help" width={160} height={160} />
      {/* <Spinner /> */}
    </Wrapper>
  )
}

export default PageLoader
