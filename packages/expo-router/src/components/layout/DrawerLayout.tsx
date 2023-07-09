import React from 'react'
import { Drawer } from 'expo-router/drawer'
import {DrawerContent as DefaultDrawerContent} from './drawer'
import { RefineDrawerLayoutProps } from './types'

export const DrawerLayout = ({
    DrawerContent,
    Header
}: RefineDrawerLayoutProps) => {

    const DrawerContentToRender = DrawerContent ?? DefaultDrawerContent
    return (
        <Drawer
            drawerContent={() => <DrawerContentToRender />}
            screenOptions={{ header: Header }}
        />
    )
}