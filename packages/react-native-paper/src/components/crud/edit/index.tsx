import React from 'react'
import { EditProps } from '../types'
import {
    useGo,
    useMutationMode,
    useResource,
    useToPath,
    useTranslate,
    useUserFriendlyName,
    userFriendlyResourceName
} from '@refinedev/core';
import { DeleteButtonProps, ListButtonProps, RefreshButtonProps, SaveButtonProps } from '../../buttons/types'
import { DeleteButton, ListButton, RefreshButton, SaveButton } from '../../buttons'
import { PageHeader } from 'src/components/pageHeader';
import { View } from 'react-native';
import { AutoSaveIndicator } from 'src/components/autoSaveIndicator';

export const Edit: React.FC<EditProps> = ({
    children,
    resource: resourceFromProps,
    recordItemId,
    deleteButtonProps: deleteButtonPropsFromProps,
    mutationMode: mutationModeFromProps,
    saveButtonProps: saveButtonPropsFromProps,
    canDelete,
    dataProviderName,
    isLoading,
    footerButtons: footerButtonsFromProps,
    footerButtonProps,
    headerButtons: headerButtonsFromProps,
    headerButtonProps,
    wrapperProps,
    title: titleFromProps,
    autoSaveProps,
    fabButton: fabButtonFromProps,
}) => {

    const translate = useTranslate();
    const { mutationMode: mutationModeContext } = useMutationMode();
    const mutationMode = mutationModeFromProps ?? mutationModeContext;

    const go = useGo();
    const getUserFriendlyName = useUserFriendlyName?.() ?? userFriendlyResourceName;

    const {
        resource,
        id: idFromParams,
        identifier,
    } = useResource(resourceFromProps);

    const goListPath = useToPath({
        resource,
        action: "list",
    });

    const id = recordItemId ?? idFromParams;

    const hasList = resource?.list && !recordItemId;
    const isDeleteButtonVisible =
        canDelete ??
        ((resource?.meta?.canDelete ?? resource?.canDelete) ||
            deleteButtonPropsFromProps);

    const listButtonProps: ListButtonProps | undefined = hasList
        ? {
            ...(isLoading ? { disabled: true } : {}),
            resource: identifier ?? resource?.name,
            hideText: true,
            mode: 'outlined'
        }
        : undefined;

    const refreshButtonProps: RefreshButtonProps | undefined = {
        ...(isLoading ? { disabled: true } : {}),
        resource: identifier ?? resource?.name,
        recordItemId: id,
        dataProviderName,
        hideText: true,
    };

    const deleteButtonProps: DeleteButtonProps | undefined =
        isDeleteButtonVisible
            ? ({
                ...(isLoading ? { disabled: true } : {}),
                resource: identifier ?? resource?.name,
                mutationMode,
                onSuccess: () => {
                    go({ to: goListPath });
                },
                recordItemId: id,
                dataProviderName,
                ...deleteButtonPropsFromProps,
            } as const)
            : undefined;

    const saveButtonProps: SaveButtonProps = {
        ...(isLoading ? { disabled: true } : {}),
        ...saveButtonPropsFromProps,
    };

    const defaultHeaderButtons = (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
            {autoSaveProps && <AutoSaveIndicator {...autoSaveProps} />}
            {hasList && <ListButton {...listButtonProps} />}
            <RefreshButton {...refreshButtonProps} />
        </View>
    );

    const defaultFooterButtons = (
        <>
            {isDeleteButtonVisible && <DeleteButton {...deleteButtonProps} />}
            <SaveButton {...saveButtonProps} />
        </>
    );

    const headerButtons = headerButtonsFromProps
        ? typeof headerButtonsFromProps === "function"
            ? headerButtonsFromProps({
                defaultButtons: defaultHeaderButtons,
                listButtonProps,
                refreshButtonProps,
            })
            : headerButtonsFromProps
        : defaultHeaderButtons;

    const footerButtons = footerButtonsFromProps
        ? typeof footerButtonsFromProps === "function"
            ? footerButtonsFromProps({
                defaultButtons: defaultFooterButtons,
                deleteButtonProps,
                saveButtonProps,
            })
            : footerButtonsFromProps
        : defaultFooterButtons;

    const title = titleFromProps ?? translate(
        `${identifier}.titles.edit`,
        `Edit ${getUserFriendlyName(
            resource?.meta?.label ??
            resource?.options?.label ??
            resource?.label ??
            identifier ??
            resource?.name,
            "singular",
        )}`,
    )

    return (
        <PageHeader
            title={title}
            isLoading={isLoading}
            headerRight={(
                <View
                    style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 5, alignItems: 'center' }}
                    {...headerButtonProps}
                >
                    {headerButtons}
                </View>
            )}
            wrapperProps={wrapperProps}
        >
            {children}
            <View
                style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 5, marginTop: 8 }}
                {...footerButtonProps}
            >
                {footerButtons}
            </View>
            {fabButtonFromProps}
        </PageHeader>
    );
}