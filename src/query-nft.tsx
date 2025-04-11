import { useReadContracts, useBlockNumber } from 'wagmi'
import { wagmiContractConfig } from './contracts'
import { useEffect } from 'react'

interface NFTInfo {
  nftId: number
  owner: string
  participantContract: string
  tokenURI: string
}

export default function QueryNFT() {
  const { data: contractData, refetch: refetchContractData } = useReadContracts({
    contracts: [{
      ...wagmiContractConfig,
      functionName: 'allParticipants',
    }, {
      ...wagmiContractConfig,
      functionName: 'allParticipantContracts',
    }]
  })

  const [allParticipants, allParticipantContracts] = contractData || []
  const participants = (allParticipants?.result as string[] | undefined) || []
  const participantContracts = (allParticipantContracts?.result as string[] | undefined) || []

  const { data: nftData, refetch: refetchNFTData } = useReadContracts({
    contracts: participants.flatMap((_, index) => [
      {
        ...wagmiContractConfig,
        functionName: 'ownerOf',
        args: [BigInt(index + 1)],
      },
      {
        ...wagmiContractConfig,
        functionName: 'tokenURI',
        args: [BigInt(index + 1)],
      }
    ]),
  })

  const { data: blockNumber } = useBlockNumber({ watch: true })

  useEffect(() => {
    refetchContractData()
    refetchNFTData()
  }, [blockNumber])

  const nftInfos: NFTInfo[] = participants.map((participant, index) => {
    const nftId = index + 1
    const ownerData = nftData?.[index * 2]
    const tokenURIData = nftData?.[index * 2 + 1]

    return {
      nftId,
      owner: ownerData?.result as string || '',
      participantContract: participantContracts[index] || '',
      tokenURI: tokenURIData?.result as string || '',
    }
  })

  return (
    <div className="minimal-nft-container">
      <h2 className="minimal-subtitle">NFT 所有者列表</h2>

      <div className="minimal-nft-info">
        <div className="nft-item">
          <span className="nft-label">总 NFT 数量</span>
          <span className="nft-value">{participants.length}</span>
        </div>
      </div>

      <div className="minimal-nft-list">
        {nftInfos.map((nft) => (
          <div key={nft.nftId} className="minimal-nft-item">
            <div className="nft-item">
              <span className="nft-label">NFT ID</span>
              <span className="nft-value">{nft.nftId}</span>
            </div>
            <div className="nft-item">
              <span className="nft-label">所有者地址</span>
              <span className="nft-value">
                {nft.owner ? `${nft.owner.slice(0, 6)}...${nft.owner.slice(-4)}` : '加载中...'}
              </span>
            </div>
            <div className="nft-item">
              <span className="nft-label">参与者合约地址</span>
              <span className="nft-value">
                {nft.participantContract ? `${nft.participantContract.slice(0, 6)}...${nft.participantContract.slice(-4)}` : '未知'}
              </span>
            </div>
            <div className="nft-item">
              <span className="nft-label">Token URI</span>
              <span className="nft-value">
                {nft.tokenURI || '加载中...'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 