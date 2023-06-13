import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import { arbitrum } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { Profile } from './profile'
 
const { chains, publicClient, webSocketPublicClient } = configureChains(
    [arbitrum],
    [publicProvider()],
  )
  
  // Set up wagmi config
  const config = createConfig({
    autoConnect: false,
    connectors: [
      new MetaMaskConnector({ chains }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: 'wagmi',
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          projectId: '...',
        },
      }),
      new InjectedConnector({
        chains,
        options: {
          name: 'Injected',
          shimDisconnect: true,
        },
      }),
    ],
    publicClient,
    webSocketPublicClient,
  })

  
export default function Wagmi() {
  return (
    <WagmiConfig config={config}>
      <Profile />
    </WagmiConfig>
  )
}