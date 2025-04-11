import { useAccount, useConnect, useDisconnect } from 'wagmi'
import ParticipantNFT from './mint-display-nft.tsx'
import QueryNFT from './query-nft.tsx'
import './App.css'

function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <div className="minimal-container">
      <header className="minimal-header">
        <h1 className="minimal-title">NFT Garden</h1>
        <div className="minimal-account">
          <div className="account-status">
            <div className="status-item">
              <span className="status-label">Status</span>
              <span className="status-value">{account.status}</span>
            </div>
            <div className="status-item">
              <span className="status-label">Chain ID</span>
              <span className="status-value">{account.chainId}</span>
            </div>
          </div>
          {account.status === 'connected' ? (
            <div className="account-info">
              <div className="address">{account.addresses?.[0]?.slice(0, 6)}...{account.addresses?.[0]?.slice(-4)}</div>
              <button className="minimal-button" onClick={() => disconnect()}>
                Disconnect
              </button>
            </div>
          ) : (
            <div className="connect-buttons">
              {connectors.map((connector) => (
                <button
                  key={connector.uid}
                  onClick={() => connect({ connector })}
                  className="minimal-button"
                >
                  {connector.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <main className="minimal-main">
        <div className="minimal-card">
          <ParticipantNFT />
        </div>
        <div className="minimal-card">
          <QueryNFT />
        </div>
      </main>

      <footer className="minimal-footer">
        <p>NFT Garden © 2023</p>
      </footer>
    </div>
  )
}

export default App
