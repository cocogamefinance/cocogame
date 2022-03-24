import React, { useState, useEffect } from 'react'
import { Button, Heading, Skeleton, Text } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import Balance from 'components/Balance'
import 'popular-message/index.css';
import $message from "popular-message";
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import { usePriceCakeBusd } from 'state/farms/hooks'
import useToast from 'hooks/useToast'
import { useTranslation } from 'contexts/Localization'
import numberUtils from "config/abi/numberUtils";
import $web3js from "config/abi/web3";
import farmAbi from 'config/abi/stfarm.json'
import contractAddress from 'config/constants/zpool'
import useHarvestFarm from '../../../hooks/useHarvestFarm'
import { ActionContainer, ActionTitles, ActionContent } from './styles'


interface HarvestActionProps extends FarmWithStakedValue {
  userDataReady: boolean
}

const HarvestAction: React.FunctionComponent<HarvestActionProps> = ({ pid, userData, userDataReady }) => {
  const { toastSuccess, toastError } = useToast()
  const earningsBigNumber = new BigNumber(userData.earnings)
  const cakePrice = usePriceCakeBusd()
  let earnings = BIG_ZERO
  let earningsBusd = 0
  let displayBalance = userDataReady ? earnings.toLocaleString() : <Skeleton width={60} />

  // If user didn't connect wallet default balance will be 0
  if (!earningsBigNumber.isZero()) {
    earnings = getBalanceAmount(earningsBigNumber)
    earningsBusd = earnings.multipliedBy(cakePrice).toNumber()
    displayBalance = earnings.toFixed(3, BigNumber.ROUND_DOWN)
  }

  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvestFarm(pid)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const [isAuthed2, setIsAuthed2] = useState(false);
  useEffect(() => {
    // 2. 解锁是否授权
    const isAuth2 = async () => {
      const thisWeb3 = $web3js.getWeb3();
      const nftConst = new thisWeb3.eth.Contract(
        farmAbi,
        contractAddress.farm.address,
        {
          from: account,
        }
      );
      nftConst.methods
        .allowance(account, contractAddress.farm.address)
        .call({ from: account })
        .then((res) => {
          if (res > 0) {
            setIsAuthed2(true)
          }
        });
    }
    if (account) {
      isAuth2()
    }
  })

  // 授权
  const newAuth = async () => {
    console.log('123')
    connectMetaMask();
    const thisWeb3 = $web3js.getWeb3();
    const nftConst = new thisWeb3.eth.Contract(
      farmAbi,
      contractAddress.farm.address,
      {
        from: account,
      }
    );
    let getedHash = '';
    const amount111 = await numberUtils.movePointRight(99999999, 18);
    nftConst.methods
      .approve(contractAddress.farm.address, amount111)
      .send({ from: account })
      .on("transactionHash", function (hash) {
        $message.config({
          top: 50,
          duration: 0
        });
        $message.loading("请耐心等待交易打包，不要退出");
        getedHash = hash;
      })
      .on("receipt", function (receipt) {
        if (receipt.transactionHash === getedHash) {
          $message.destroy();
          setTimeout(() => {
            $message.success('授权成功！')
          }, 800)
          setIsAuthed2(true)
        }
      })
      .on("error", function (error, receipt) {
        $message.destroy();
        setTimeout(() => {
          $message.error(error.message);
        }, 800)
      });
  }
  function connectMetaMask() {
    $web3js
      .connectMetaMask()
      .then((res) => {
        // this.$toast(this.$t("lang.connectsuc"));
      })
      .catch((error) => {
        //    this.$toast(this.$t("lang.connectfail") + error);
      });
  }

  return (
    <ActionContainer>
      <ActionTitles>
        <Text bold textTransform="uppercase" color="secondary" fontSize="12px" pr="4px">
          CGC
        </Text>
        <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
          {t('Earned')}
        </Text>
      </ActionTitles>
      <ActionContent>
        <div>
          <Heading>{displayBalance}</Heading>
          {earningsBusd > 0 && (
            <Balance fontSize="12px" color="textSubtle" decimals={2} value={earningsBusd} unit=" USD" prefix="~" />
          )}
        </div>
        <Button
          disabled={isAuthed2 || account === undefined}
          onClick={newAuth}>
          {t('Auth')}
        </Button>
        <Button
          disabled={earnings.eq(0) || pendingTx || !userDataReady}
          onClick={async () => {
            setPendingTx(true)
            try {
              await onReward()
              toastSuccess(
                `${t('Harvested')}!`,
                t('Your %symbol% earnings have been sent to your wallet!', { symbol: 'CGC' }),
              )
            } catch (e: any) {
              toastError(
                t('Error'),
                t('Please try again. Confirm the transaction and make sure you are paying enough gas!'),
              )
              console.error(e)
            } finally {
              setPendingTx(false)
            }
            dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
          }}
          ml="4px"
          className='cocoButton7166B0'
        >
          {pendingTx ? t('Harvesting') : t('Harvest')}
        </Button>
      </ActionContent>
    </ActionContainer>
  )
}

export default HarvestAction
