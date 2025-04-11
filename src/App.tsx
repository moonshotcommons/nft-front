import { useAccount } from 'wagmi'
import MindAndDisplayNFT from './mint-display-nft'
import QueryNFT from './query-nft'
import './App.css'

function App() {
  const { address, isConnected } = useAccount()

  return (
    <div className="minimal-app">
      <header className="minimal-header">
        <h1 className="minimal-title">HackQuack NFT</h1>
        <div className="account-status">
          <div className="minimal-status">
            {isConnected ? '已连接' : '未连接'}
          </div>
          <div className="minimal-account">
            {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '未连接钱包'}
          </div>
        </div>
      </header>

      <main className="minimal-main">
        <section className="minimal-section">
          <h2 className="minimal-subtitle">NFT 铸造</h2>
          <MindAndDisplayNFT />
        </section>

        <section className="minimal-section">
          <h2 className="minimal-subtitle">NFT 收藏</h2>
          <QueryNFT />
        </section>
      </main>

      <footer className="minimal-footer">
        <p>© 2024 HackQuack NFT. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
