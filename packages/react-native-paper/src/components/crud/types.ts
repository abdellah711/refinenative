import {
    RefineCrudListProps,
    RefineCrudCreateProps,
    RefineCrudEditProps,
    RefineCrudShowProps,
} from '@refinedev/ui-types'

import {
    CreateButtonProps,
    SaveButtonProps,
    DeleteButtonProps,
    EditButtonProps,
    RefreshButtonProps,
    ListButtonProps,
} from '..'
import { ViewProps } from 'react-native'
import { ReactNode } from 'react'

export type ListProps = Omit<
    RefineCrudListProps<
        CreateButtonProps,
        ViewProps,
        ViewProps
    >,
    'headerProps' | 'contentProps' | 'goBack'
> & {
    fabButton?: ReactNode
}


export type CreateProps = Omit<
    RefineCrudCreateProps<
        SaveButtonProps,
        ViewProps,
        ViewProps,
        ViewProps
    >,
    'headerProps' | 'contentProps' | 'goBack'
> & {
    fabButton?: ReactNode
}

export type EditProps = Omit<RefineCrudEditProps<
    SaveButtonProps,
    DeleteButtonProps,
    ViewProps,
    ViewProps,
    ViewProps,
    {},
    ViewProps,
    {},
    RefreshButtonProps,
    ListButtonProps
>,
    'headerProps' | 'contentProps' | 'goBack'
> & {
    autoSaveProps?: any // TODO: add type
    fabButton?: ReactNode
}

export type ShowProps = Omit<RefineCrudShowProps<
    ViewProps,
    ViewProps,
    ViewProps,
    {},
    {},
    {},
    EditButtonProps,
    DeleteButtonProps,
    RefreshButtonProps,
    ListButtonProps
>,
    'headerProps' | 'contentProps' | 'goBack'
> & {
    fabButton?: ReactNode
}
