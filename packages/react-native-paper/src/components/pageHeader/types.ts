import { PropsWithChildren } from "react"
import { ViewProps } from "react-native"

export type PageHeaderProps = PropsWithChildren<{
    title?: React.ReactNode,
    wrapperProps?: ViewProps,
    headerRight?: React.ReactNode
    headerLeft?: React.ReactNode
}>