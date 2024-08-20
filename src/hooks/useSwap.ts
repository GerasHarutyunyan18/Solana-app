import { TxVersion, solToWSol } from '@raydium-io/raydium-sdk-v2'
import useSWR from 'swr'
import { useCallback, useEffect, useState } from 'react'
import Decimal from 'decimal.js'
import axios from 'axios'

const fetcher = async (url: string): Promise<any> =>
    axios.get(url)

export default function useSwap(props: {
    shouldFetch?: boolean
    inputMint?: string
    outputMint?: string
    amount?: string
    refreshInterval?: number
    slippageBps?: number
    swapType: 'BaseIn' | 'BaseOut'
}) {
    const {
        inputMint: propInputMint = '',
        outputMint: propOutputMint = '',
        amount: propsAmount,
        slippageBps: propsSlippage,
        swapType,
        refreshInterval = 30 * 1000
    } = props || {}

    const [amount, setAmount] = useState('')
    const [inputMint, outputMint] = [
        propInputMint ? solToWSol(propInputMint).toBase58() : propInputMint,
        propOutputMint ? solToWSol(propOutputMint).toBase58() : propOutputMint
    ]

    const [txVersion, urlConfigs] = [null, null]
    const slippage = 0.1
    const slippageBps = new Decimal(propsSlippage || slippage * 10000).toFixed(0)

    const apiTrail = swapType === 'BaseOut' ? 'swap-base-out' : 'swap-base-in'
    const url =
        inputMint && outputMint && !new Decimal(amount.trim() || 0).isZero()
            ? `https://transaction-v1.raydium.io/compute/${apiTrail}?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps}&txVersion=${txVersion === TxVersion.V0 ? 'V0' : 'LEGACY'
            }`
            : null

    const updateAmount = useCallback((val: string) => {
        setAmount(val)
    },
        []
    )

    useEffect(() => {
        updateAmount(propsAmount as any)
    }, [propsAmount, updateAmount])

    const { data, error, ...swrProps } = useSWR(() => url, fetcher, {
        refreshInterval,
        focusThrottleInterval: refreshInterval,
        dedupingInterval: 30 * 1000
    })

    return {
        response: data,
        data: data?.data,
        error: error?.message || data?.msg,
        openTime: data?.openTime,
        ...swrProps
    }
}
