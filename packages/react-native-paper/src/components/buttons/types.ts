import { RefineCreateButtonProps, RefineSaveButtonProps } from '@refinedev/ui-types'
import { ButtonProps, FABProps } from 'react-native-paper'

export type ButtonOrFAB =  (
    | Partial<ButtonProps> & { asFAB: false }
    | Partial<FABProps> & { asFAB?: true }
)

export type CreateButtonProps = RefineCreateButtonProps<ButtonOrFAB>

export type SaveButtonProps = RefineSaveButtonProps<ButtonOrFAB>
