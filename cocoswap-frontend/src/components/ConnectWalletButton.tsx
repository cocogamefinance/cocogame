import React from 'react'
import { Button, useWalletModal } from '@pancakeswap/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'

const ConnectWalletButton = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)

  return (
    <Button  style={{width:'max-content'}} onClick={onPresentConnectModal} {...props}  className='cocoButton7166B0'>
      {t('Connect Wallet')}
    </Button>
  )
}

export default ConnectWalletButton
