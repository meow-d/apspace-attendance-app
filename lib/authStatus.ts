import { useEffect, useState } from 'react'
import { getItem } from './store'

export function useAuthStatus() {
    const [isAuthenticated, setAuthenticated] = useState<boolean | null>(null)

    useEffect(() => {
        const check = async () => {
            const username = await getItem('username')
            const password = await getItem('password')
            const tgt = await getItem('tgt')
            setAuthenticated(!!username && !!password && !!tgt)
        }
        check()
    }, [])

    return isAuthenticated
}
