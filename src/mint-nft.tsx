import { type BaseError, useReadContracts, useBlockNumber } from 'wagmi'
import { wagmiContractConfig } from './contracts'
import { useEffect } from 'react'

function ReadContract() {
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

    if (isPending) return <div>Loading...</div>

    if (error)
        return (
            <div>
                Error: {(error as BaseError).shortMessage || error.message}
            </div>
        )

    return (
        <>
            <div>NAME: {String(name?.result || '')}</div>
            <div>SYMBOL: {String(symbol?.result || '')}</div>
            <div>MINTED AMOUNT: {Number(nftId?.result || 0)}</div>
        </>
    )
}


export default ReadContract