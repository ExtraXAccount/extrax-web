import { Contract } from 'ethers'
import { useCallback, useEffect, useState } from 'react'

export function useSingleContractResult(contract: Contract | null, funcName: string, args: any[]) {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const getData = useCallback(async () => {
    if (contract) {
      setLoading(true)
      try {
        const res = await contract[funcName](...args)
        setResult(res)
        setLoading(false)
      } catch (err) {
        setLoading(false)
      }
    }
  }, [contract, funcName, args])

  useEffect(() => {
    getData()
  }, [getData])

  return {
    loading,
    result,
  }
}

export function useSingleContractMultipleData(contract: Contract | null, funcName: string, args: any[][]) {
  const [result, setResult] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const getData = useCallback(async () => {
    if (contract) {
      setLoading(true)
      try {
        const res = await Promise.all(
          args.map((arg) => {
            const argsArray = Array.isArray(arg) ? arg : [arg]
            return contract[funcName](...argsArray)
          })
        )
        setResult(res)
        setLoading(false)
      } catch (err) {
        console.log(err)
        setLoading(false)
      }
    }
  }, [contract, funcName, args])

  useEffect(() => {
    getData()
  }, [getData])

  return {
    loading,
    result,
  }
}
