import { SiderRenderProps } from '@refinedev/ui-types/dist/types'
import type { DrawerHeaderProps } from '@react-navigation/drawer'


export type RefineLayoutDrawerContentProps = {
    Title?: () => JSX.Element | null,
    render?: (props: Omit<SiderRenderProps, 'collapsed'>) => JSX.Element | null;
    meta?: any
}

export type RefineDrawerLayoutProps = {
    DrawerContent?: () => JSX.Element | null,
    Header?: (props: DrawerHeaderProps) => JSX.Element
}
