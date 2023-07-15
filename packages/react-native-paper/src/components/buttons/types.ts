import { RefineCreateButtonProps } from '@refinedev/ui-types'
import { ButtonProps, FABProps } from 'react-native-paper'


export type CreateButtonProps = RefineCreateButtonProps<(
    | Partial<ButtonProps> & { asFAB: false }
    | Partial<FABProps> & { asFAB?: true }
)>