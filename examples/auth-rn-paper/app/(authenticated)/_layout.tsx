import React from 'react'
import { CatchAllNavigate, DrawerLayout } from '@refinenative/expo-router'
import { Stack } from 'expo-router'
import { Header, DrawerContent } from '@refinenative/react-native-paper'
import { Authenticated } from '@refinedev/core'

export default function Layout() {
    return (
        <Authenticated fallback={<CatchAllNavigate to='/login'/>}>
            <Stack.Screen options={{ header: () => null }} />
            <DrawerLayout
                DrawerContent={() => <DrawerContent/>}
                Header={Header}
            />
        </Authenticated>
    )
}
