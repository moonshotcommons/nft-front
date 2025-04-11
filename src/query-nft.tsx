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
              <a 
                href={`https://pharosscan.xyz/token/${wagmiContractConfig.address}/instance/${nft.nftId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/img/hackQuack_genesis.svg" alt={`NFT #${nft.nftId}`} />
              </a>
            </div>
            <div className="nft-details">
              <h3 className="nft-name">HackQuack #{nft.nftId}</h3>
              <div className="nft-owner">
                <span className="owner-label">铸造者:</span>
                <span className="owner-address">
                  {nft.owner ? `${nft.owner.slice(0, 6)}...${nft.owner.slice(-4)}` : '加载中...'}
                </span>
              </div>
              <div className="nft-contract">
                <span className="contract-label">合约地址:</span>
                <span className="contract-address">
                  {nft.participantContract ? `${nft.participantContract.slice(0, 6)}...${nft.participantContract.slice(-4)}` : '加载中...'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 