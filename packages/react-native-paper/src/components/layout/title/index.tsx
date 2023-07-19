import { useGo } from "@refinedev/core"
import React from "react"
import { FC } from "react"
import { TouchableRipple } from "react-native-paper"
import { Image } from "react-native"


export const Title: FC = ({ }) => {
    const go = useGo()
    return (
        <TouchableRipple onPress={() => go({ to: '/', type: 'push' })}>
            <Image
                source={{ uri: 'https://miro.medium.com/v2/resize:fit:1000/1*SO0aLb4auvpDawdMXHu2iw.png' }}
                style={{ height: 40, alignSelf: 'stretch', tintColor: 'dodgerblue', marginVertical: 40 }}
                alt='Refine'
                resizeMode='center'
            />
        </TouchableRipple>
    )
}