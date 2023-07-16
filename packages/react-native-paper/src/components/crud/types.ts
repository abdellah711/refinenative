import {
    RefineCrudListProps,
    RefineCrudCreateProps,
    RefineCrudEditProps,
    RefineCrudShowProps,
} from '@refinedev/ui-types'
import {
    CreateButtonProps,
    SaveButtonProps,
    EditButtonProps,
} from '..'

export type ListProps = RefineCrudListProps<CreateButtonProps>


export type CreateProps = Omit<RefineCrudCreateProps<SaveButtonProps>, 'headerProps' | 'contentProps' | 'goBack'>

export type EditProps = RefineCrudEditProps<{
    saveButtonProps?: SaveButtonProps
}>

export type ShowProps = RefineCrudShowProps<{
}>
