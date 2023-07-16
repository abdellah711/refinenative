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
} from '..'

export type ListProps = RefineCrudListProps<CreateButtonProps>


export type CreateProps = Omit<
    RefineCrudCreateProps<SaveButtonProps>,
    'headerProps' | 'contentProps' | 'goBack'
>

export type EditProps = RefineCrudEditProps<SaveButtonProps, DeleteButtonProps> & {
    autoSaveProps: any // TODO: add type
}

export type ShowProps = RefineCrudShowProps<{
}>
