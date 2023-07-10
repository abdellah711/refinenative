import { SiderRenderProps } from '@refinedev/ui-types/dist/types'
import type { DrawerHeaderProps } from '@react-navigation/drawer'
import { PropsWithChildren } from 'react';
import { MD2Theme, MD3Theme } from 'react-native-paper';
import { Theme } from '@react-navigation/native'

export type RefineLayoutDrawerContentProps = {
    Title?: () => JSX.Element | null,
    render?: (props: Omit<SiderRenderProps, 'collapsed'>) => JSX.Element | null;
    meta?: any
}

export type RefineDrawerLayoutProps = {
    DrawerContent?: () => JSX.Element | null,
    Header?: (props: DrawerHeaderProps) => JSX.Element
}

export type ReactNavigationThemeProviderProps = PropsWithChildren<{
    theme?: MD2Theme | MD3Theme,
    reactNavigationTheme?: Theme
}>