import React, { FC } from 'react'
import { Image, Pressable } from 'react-native'
import { useGo } from '@refinedev/core'

type Props = {}

export const Title: FC<Props> = ({ }) => {
    const go = useGo()
    return (
        <Pressable onPress={() => go({ to: '/', type: 'push' })}>
            <Image
                source={{uri: 'https://raw.githubusercontent.com/abdellah711/refinenative/main/packages/expo-router/src/assets/refine.png'}}
                style={{ height: 40, alignSelf: 'stretch', tintColor: 'dodgerblue', marginVertical: 40 }}
                alt='Refine'
                resizeMode='center'
            />
        </Pressable>
    )
}