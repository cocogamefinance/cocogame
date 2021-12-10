import React from 'react'
import { ModalProvider, light, dark } from '@pancakeswap/uikit'
import { Web3ReactProvider } from '@web3-react/core'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { useThemeManager } from 'state/user/hooks'
import { getLibrary } from 'utils/web3React'
import { LanguageProvider } from 'contexts/Localization'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import { ToastsProvider } from 'contexts/ToastsContext'
import store from 'state'
import  {baseColors,additionalColors,lightColors,darkColors} from './components/unikitMenu/theme'


const ThemeProviderWrapper = (props) => {
  const [isDark] = useThemeManager()
    const t = isDark ? dark : light
    const b = {...baseColors,...additionalColors,...lightColors}
    const c = {...baseColors,...additionalColors,...darkColors}
    if(isDark){
      t.colors = {...c}
    }else{
      t.colors = {...b}
    }
  return <ThemeProvider theme={t} {...props} />
}

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <ToastsProvider>
          <HelmetProvider>
            <ThemeProviderWrapper>
              <LanguageProvider>
                <RefreshContextProvider>
                  <ModalProvider>{children}</ModalProvider>
                </RefreshContextProvider>
              </LanguageProvider>
            </ThemeProviderWrapper>
          </HelmetProvider>
        </ToastsProvider>
      </Provider>
    </Web3ReactProvider>
  )
}

export default Providers
