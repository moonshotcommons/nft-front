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
      <div className="minimal-nft-list">
        {nftInfos.map((nft) => (
          <div key={nft.nftId} className="minimal-nft-item">
            <div className="nft-image-container">
              <img src="/img/hackQuack_genesis.svg" alt={`NFT #${nft.nftId}`} />
            </div>
            <div className="nft-details">
              <h3 className="nft-name">HackQuack #{nft.nftId}</h3>
              <div className="nft-attributes">
                <div className="nft-attribute">稀有度: 传奇</div>
                <div className="nft-attribute">类型: Genesis</div>
              </div>
              <div className="nft-owner">
                <div className="owner-avatar"></div>
                <span className="owner-address">
                  {nft.owner ? `${nft.owner.slice(0, 6)}...${nft.owner.slice(-4)}` : '加载中...'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 