import {
    RefineCreateButtonProps,
    RefineSaveButtonProps,
    RefineShowButtonProps,
    RefineEditButtonProps,
    RefineDeleteButtonProps,
    RefineRefreshButtonProps,
    RefineListButtonProps,
} from '@refinedev/ui-types'
import { ButtonProps, FABProps } from 'react-native-paper'

// a button by default
export type ButtonOrFAB = (
    | Partial<ButtonProps> & { asFAB?: false }
    | Partial<FABProps> & { asFAB: true }
)

// a FAB by default
export type FABOrButton = (
    | Partial<ButtonProps> & { asFAB: false }
    | Partial<FABProps> & { asFAB?: true }
)

export type CreateButtonProps = RefineCreateButtonProps<FABOrButton>

export type SaveButtonProps = RefineSaveButtonProps<ButtonOrFAB>

export type ShowButtonProps = RefineShowButtonProps<ButtonOrFAB>

export type EditButtonProps = RefineEditButtonProps<ButtonOrFAB>

export type DeleteButtonProps = RefineDeleteButtonProps<ButtonOrFAB>

export type RefreshButtonProps = RefineRefreshButtonProps<ButtonOrFAB>

export type ListButtonProps = RefineListButtonProps<ButtonOrFAB>
