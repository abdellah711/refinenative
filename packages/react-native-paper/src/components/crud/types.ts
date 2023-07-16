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

export type ListProps = Omit<
    RefineCrudListProps<
        CreateButtonProps,
        ViewProps,
        ViewProps
    >,
    'headerProps' | 'contentProps' | 'goBack'
>


export type CreateProps = Omit<
    RefineCrudCreateProps<
        SaveButtonProps,
        ViewProps,
        ViewProps,
        ViewProps
    >,
    'headerProps' | 'contentProps' | 'goBack'
>

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
    autoSaveProps: any // TODO: add type
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
>
