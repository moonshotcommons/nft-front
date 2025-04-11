import { useReadContracts } from 'wagmi'
import { wagmiContractConfig } from './contracts'

export default function QueryNFT() {
  const { data: contractData } = useReadContracts({
    contracts: [{
      ...wagmiContractConfig,
      functionName: 'allParticipants',
    }]
  })

  const [allParticipants] = contractData || []
  const participants = (allParticipants?.result as string[] | undefined) || []

  const { data: ownersData } = useReadContracts({
    contracts: participants.map((_, index) => ({
      ...wagmiContractConfig,
      functionName: 'ownerOf',
      args: [BigInt(index + 1)],
    })),
  })

  const owners = ownersData?.map(data => data?.result as string | undefined) || []

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
        {participants.map((participant, index) => (
          <div key={index} className="minimal-nft-item">
            <div className="nft-item">
              <span className="nft-label">NFT ID</span>
              <span className="nft-value">{index + 1}</span>
            </div>
            <div className="nft-item">
              <span className="nft-label">参与者地址</span>
              <span className="nft-value">
                {participant ? `${participant.slice(0, 6)}...${participant.slice(-4)}` : '未知'}
              </span>
            </div>
            <div className="nft-item">
              <span className="nft-label">所有者地址</span>
              <span className="nft-value">
                {owners[index] ? `${owners[index].slice(0, 6)}...${owners[index].slice(-4)}` : '加载中...'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 