import { type BaseError, useReadContracts, useBlockNumber, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { wagmiContractConfig } from './contracts'
import { useEffect } from 'react'
import * as React from 'react'
import { getAddress } from 'viem'

function MindAndDisplayNFT() {

    const { data: hash, error: writeError, isPending: writeIsPending, writeContract } = useWriteContract()

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const yourNFT = formData.get('yourNFT') as string
        writeContract({
            ...wagmiContractConfig,
            functionName: 'mint',
            args: [getAddress(yourNFT)],
        })
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        })

    const {
        data,
        error,
        isPending,
        refetch
    } = useReadContracts({
        contracts: [{
            ...wagmiContractConfig,
            functionName: 'nftId',
        }, {
            ...wagmiContractConfig,
            functionName: 'symbol',
        }, {
            ...wagmiContractConfig,
            functionName: 'name',
        }]
    })

    const { data: blockNumber } = useBlockNumber({ watch: true })

    useEffect(() => {
        refetch()
    }, [blockNumber])

    const [nftId, symbol, name] = data || []

    if (isPending) return <div className="minimal-loading">加载中...</div>

    if (error)
        return (
            <div className="minimal-error">
                错误: {(error as BaseError).shortMessage || error.message}
            </div>
        )

    return (
        <div className="minimal-mint-container">
            <div className="minimal-mint-info">
            <div className="mint-info-item highlight">
                    <span className="mint-info-label">主合约地址:</span>
                    <span className="mint-info-value">
                        <a 
                            href={`https://pharosscan.xyz/token/${wagmiContractConfig.address}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="minimal-link"
                        >
                            {wagmiContractConfig.address.slice(0, 6)}...{wagmiContractConfig.address.slice(-4)}
                        </a>
                    </span>
                </div>
                <div className="mint-info-item">
                    <span className="mint-info-label">名称:</span>
                    <span className="mint-info-value">{String(name?.result || '')}</span>
                </div>
                <div className="mint-info-item">
                    <span className="mint-info-label">符号:</span>
                    <span className="mint-info-value">{String(symbol?.result || '')}</span>
                </div>
                <div className="mint-info-item highlight">
                    <span className="mint-info-label">已铸造数量:</span>
                    <span className="mint-info-value">{Number(nftId?.result || 0)}</span>
                </div>                
            </div>
            
            <div className="mint-nft-preview">
                <img src="/img/nft.svg" alt="HackQuack Genesis NFT" />
            </div>
        
            <form onSubmit={submit} className="minimal-mint-form">
                <div className="form-group">
                    <input 
                        id="yourNFT"
                        name="yourNFT" 
                        placeholder="NFT 合约地址" 
                        required 
                        className="minimal-input"
                    />
                </div>
                <button
                    className="minimal-mint-button"
                    disabled={writeIsPending}
                    type="submit"
                >
                    {writeIsPending ? '确认中...' : '铸造 NFT'}
                </button>
            </form>
            
            <div className="transaction-status-container">
                {hash && (
                  <div className="transaction-status">
                    <div className="tx-hash">
                      交易哈希:{' '}
                      <a 
                        href={`https://pharosscan.xyz/tx/${hash}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="minimal-link"
                      >
                        {hash.slice(0, 6)}...{hash.slice(-4)}
                      </a>
                    </div>
                  </div>
                )}
                
                {isConfirming && <div className="tx-confirming">等待确认中...</div>}
                {isConfirmed && <div className="tx-confirmed">交易已确认</div>}
                {writeError && (
                    <div className="tx-error">
                        错误: {(writeError as BaseError).shortMessage || writeError.message}
                    </div>
                )}
            </div>
        </div>
    )
}


export default MindAndDisplayNFT