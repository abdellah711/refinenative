import {
    RefineCreateButtonProps,
    RefineSaveButtonProps,
    RefineShowButtonProps,
    RefineEditButtonProps,
    RefineDeleteButtonProps,
    RefineRefreshButtonProps,
    RefineListButtonProps,
} from '@refinedev/ui-types'
import { ButtonProps, FABProps, IconButtonProps } from 'react-native-paper'

// a button by default
export type ButtonOrFAB = (
    | Partial<ButtonOrIcon> & { asFAB?: false }
    | Partial<FABProps> & { asFAB: true }
)

// a FAB by default
export type FABOrButton = (
    | Partial<ButtonOrIcon> & { asFAB: false }
    | Partial<FABProps> & { asFAB?: true }
)

export type ButtonOrIcon = (
    | Partial<Omit<ButtonProps, 'hideText'>> & { hideText?: false }
    | Partial<Omit<IconButtonProps, 'hideText'>> & { hideText: true }
)

export type CreateButtonProps = RefineCreateButtonProps<FABOrButton>

export type SaveButtonProps = RefineSaveButtonProps<ButtonOrFAB>

export type ShowButtonProps = RefineShowButtonProps<ButtonOrFAB>

export type EditButtonProps = RefineEditButtonProps<ButtonOrFAB>

export type DeleteButtonProps = RefineDeleteButtonProps<ButtonOrFAB>

export type RefreshButtonProps = RefineRefreshButtonProps<ButtonOrIcon>

export type ListButtonProps = RefineListButtonProps<ButtonOrFAB>
