import { type BaseError, useReadContracts, useBlockNumber, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
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
        }, {
            ...wagmiContractConfig,
            functionName: 'allParticipants',
        }, {
            ...wagmiContractConfig,
            functionName: 'allParticipantContracts',
        }]
    })

    const { data: balance } = useReadContract({
        ...wagmiContractConfig,
        functionName: 'ownerOf',
        args: ['0x03A71968491d55603FFe1b11A9e23eF013f75bCF'],
    })

    const { data: blockNumber } = useBlockNumber({ watch: true })

    useEffect(() => {
        refetch()
    }, [blockNumber])

    const [nftId, symbol, name, allParticipants, allParticipantContracts] = data || []

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
            <div>allParticipants: {String(allParticipants?.result || '')}</div>
            <div>allParticipantContracts: {String(allParticipantContracts?.result || '')}</div>

            <form onSubmit={submit}>
                <input name="yourNFT" placeholder="69420" required />
                <button
                    disabled={writeIsPending}
                    type="submit"
                >
                    Mint
                    {writeIsPending ? 'Confirming...' : 'Mint'}
                </button>
                {hash && <div>Transaction Hash: {hash}</div>}
                {isConfirming && <div>Waiting for confirmation...</div>}
                {isConfirmed && <div>Transaction confirmed.</div>}
                {writeError && (
                    <div>Error: {(writeError as BaseError).shortMessage || writeError.message}</div>
                )}
            </form>
        </>
    )
}


export default MindAndDisplayNFT