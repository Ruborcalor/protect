import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useEffect } from "react"
import { useSigner } from "wagmi"

export const TestComponent = () => {
    const { data: signer } = useSigner()


    useEffect(()=> {
        console.log(signer)
    },[signer])

    return <><ConnectButton /></>
}