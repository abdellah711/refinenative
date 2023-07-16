import React, { useContext, useState } from 'react'
import {
    Button,
    ButtonProps,
    FAB,
    FABProps,
    Modal,
    Portal,
    Text,
    useTheme
} from 'react-native-paper'
import {
    AccessControlContext,
    pickNotDeprecated,
    useCan,
    useDelete,
    useMutationMode,
    useResource,
    useTranslate,
    useWarnAboutChange
} from '@refinedev/core'
import { RefineButtonTestIds } from '@refinedev/ui-types'
import { Dimensions, View } from 'react-native'
import { DeleteButtonProps } from '../types'

export const DeleteButton: React.FC<DeleteButtonProps> = ({
    resource: resourceNameFromProps,
    resourceNameOrRouteName: propResourceNameOrRouteName,
    recordItemId,
    onSuccess,
    mutationMode: mutationModeProp,
    children,
    successNotification,
    errorNotification,
    hideText = false,
    accessControl,
    metaData,
    meta,
    dataProviderName,
    confirmTitle,
    confirmOkText,
    confirmCancelText,
    invalidates,
    asFAB = false,
    ...rest
}) => {
    const accessControlContext = useContext(AccessControlContext);

    const accessControlEnabled =
        accessControl?.enabled ??
        accessControlContext.options.buttons.enableAccessControl;

    const hideIfUnauthorized =
        accessControl?.hideIfUnauthorized ??
        accessControlContext.options.buttons.hideIfUnauthorized;


    const theme = useTheme()
    const translate = useTranslate()

    const { id, resource, identifier } = useResource(
        resourceNameFromProps ?? propResourceNameOrRouteName,
    );
    console.log()
    const { mutationMode: mutationModeContext } = useMutationMode();

    const mutationMode = mutationModeProp ?? mutationModeContext;

    const { mutate, isLoading, variables } = useDelete();

    const { data } = useCan({
        resource: resource?.name,
        action: "delete",
        params: { id: recordItemId ?? id, resource },
        queryOptions: {
            enabled: accessControlEnabled,
        },
    });

    const { setWarnWhen } = useWarnAboutChange();
    const [showModal, setShowModal] = useState(false);

    const onConfirm = () => {
        if ((identifier ?? resource?.name) && (recordItemId ?? id)) {
            setWarnWhen(false);
            setShowModal(false);
            
            mutate(
                {
                    id: recordItemId ?? id ?? "",
                    resource: identifier ?? resource?.name as string,
                    mutationMode,
                    successNotification,
                    errorNotification,
                    meta: pickNotDeprecated(meta, metaData),
                    metaData: pickNotDeprecated(meta, metaData),
                    dataProviderName,
                },
                {
                    onSuccess: (value) => {
                        onSuccess?.(value);
                    },
                },
            );
        }
    };

    if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
        return null;
    }

    const text = !hideText && (children ?? translate("buttons.delete", "Delete"))

    return (
        <>
            <Portal>
                <Modal visible={showModal}
                    onDismiss={() => setShowModal(false)}
                    contentContainerStyle={{
                        minWidth: Math.min(400, Dimensions.get('window').width * 0.8),
                        alignSelf: 'center',
                        borderRadius: 12,
                        backgroundColor: theme.colors.background,
                        padding: 15,
                    }}
                >
                    <Text variant='titleMedium'>{confirmTitle ?? translate("buttons.confirm", "Are you sure?")}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12, gap: 5 }}>
                        <Button
                            mode='text'
                            textColor={theme.colors.onBackground}
                            onPress={() => setShowModal(false)}
                        >{confirmCancelText ?? translate("buttons.cancel", "Cancel")}</Button>
                        <Button
                            mode='contained'
                            buttonColor={theme.colors.errorContainer}
                            textColor={theme.colors.error}
                            loading={isLoading}
                            onPress={onConfirm}
                        >{confirmOkText ?? translate("buttons.delete", "Delete")}</Button>
                    </View>
                </Modal>
            </Portal>
            {asFAB ? (
                <FAB
                    label={typeof text === 'string' ? text : undefined}
                    icon="delete"
                    mode="elevated"
                    color={theme.colors.error}
                    disabled={data?.can === false}
                    testID={RefineButtonTestIds.DeleteButton}
                    loading={(recordItemId ?? id) === variables?.id && isLoading}
                    style={{ position: 'absolute', margin: 16, right: 0, bottom: 0, backgroundColor: theme.colors.errorContainer }}
                    onPress={() => setShowModal(true)}
                    {...rest as FABProps}
                />
            ) : (
                <Button
                    mode="contained"
                    buttonColor={theme.colors.errorContainer}
                    textColor={theme.colors.error}
                    icon="delete"
                    disabled={data?.can === false}
                    onPress={() => setShowModal(true)}
                    loading={(recordItemId ?? id) === variables?.id && isLoading}
                    testID={RefineButtonTestIds.DeleteButton}
                    {...rest as ButtonProps}
                >
                    {text}
                </Button >
            )}
        </>
    )
}
