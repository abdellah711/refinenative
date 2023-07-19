import React from 'react'
import type { DrawerHeaderProps } from '@react-navigation/drawer'
import { Appbar, IconButton } from 'react-native-paper'


export const Header = (props: DrawerHeaderProps) => {
    const {
        route,
        options,
        navigation
    } = props

    const title = options.title ?? route.name

    const DrawerIcon = options.drawerIcon as (props: { color: string, size: number }) => JSX.Element
    const { header, headerLeft, headerRight, } = options


    if (header && header !== Header) {
        const DefaultHeader = header as React.FC<DrawerHeaderProps>
        return <DefaultHeader {...props} />
    }

    return (
        <Appbar.Header>
            <IconButton icon={DrawerIcon ? ((props) => <DrawerIcon {...props} size={20} />) : 'menu'} onPress={navigation?.openDrawer} />
            {headerLeft && headerLeft({})}
            <Appbar.Content title={title} />
            {headerRight && headerRight({})}
        </Appbar.Header>
    )
}