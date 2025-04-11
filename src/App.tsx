import { useAccount, useConnect, useDisconnect, useChainId } from 'wagmi'
import { metaMask } from 'wagmi/connectors'
import MindAndDisplayNFT from './mint-display-nft'
import QueryNFT from './query-nft'
import { wagmiContractConfig } from './contracts'
import './App.css'

function App() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  const handleConnect = () => {
    connect({ connector: metaMask() })
  }

  return (
    <div className="minimal-app">
      <header className="minimal-header">
        <div className="header-content">
          <h1 className="minimal-title">HackQuack NFT</h1>
          <div className="account-status">
            <div className="minimal-chain">
              ChainID: {chainId || '未知'}
            </div>
            <div className="minimal-status">
              {isConnected ? '已连接' : '未连接'}
            </div>
            <div className="minimal-account">
              {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '未连接钱包'}
            </div>
            <div className="minimal-actions">
              {isConnected ? (
                <button className="minimal-button" onClick={() => disconnect()}>
                  断开连接
                </button>
              ) : (
                <button className="minimal-button" onClick={handleConnect}>
                  连接钱包
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="minimal-main">
        <div className="minimal-sections-container">
          <section className="minimal-section">
            <MindAndDisplayNFT />
          </section>

          <section className="minimal-section">
            <QueryNFT />
          </section>
        </div>
      </main>

      <footer className="minimal-footer">
        <p>© 2025 HackQuack NFT. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
