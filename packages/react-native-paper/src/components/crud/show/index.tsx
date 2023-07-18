import React from 'react'
import { ShowProps } from '../types'
import {
    useGo,
    useResource,
    useToPath,
    useTranslate,
    useUserFriendlyName,
    userFriendlyResourceName
} from '@refinedev/core';
import { DeleteButtonProps, EditButtonProps, ListButtonProps, RefreshButtonProps } from '../../buttons/types'
import { DeleteButton, EditButton, ListButton, RefreshButton } from '../../buttons'
import { PageHeader } from 'src/components/pageHeader';
import { View } from 'react-native';

export const Show: React.FC<ShowProps> = ({
    children,
    resource: resourceFromProps,
    recordItemId,
    canDelete,
    canEdit,
    dataProviderName,
    isLoading,
    footerButtons: footerButtonsFromProps,
    footerButtonProps,
    headerButtons: headerButtonsFromProps,
    headerButtonProps,
    wrapperProps,
    title: titleFromProps,
    fabButton: fabButtonFromProps,
}) => {

    const translate = useTranslate();
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
        canDelete ?? resource?.meta?.canDelete ?? resource?.canDelete;
    const isEditButtonVisible =
        canEdit ?? resource?.canEdit ?? !!resource?.edit;

    const listButtonProps: ListButtonProps | undefined = hasList
        ? {
            ...(isLoading ? { disabled: true } : {}),
            resource: identifier ?? resource?.name,
            mode: 'outlined',
            hideText: true,
        }
        : undefined;
    const editButtonProps: EditButtonProps | undefined = isEditButtonVisible
        ? {
            ...(isLoading ? { disabled: true } : {}),
            resource: identifier ?? resource?.name,
            recordItemId: id,
            asFAB: true,
        }
        : undefined;
    const deleteButtonProps: DeleteButtonProps | undefined =
        isDeleteButtonVisible
            ? {
                ...(isLoading ? { disabled: true } : {}),
                resource: identifier ?? resource?.name,
                recordItemId: id,
                onSuccess: () => {
                    go({ to: goListPath });
                },
                dataProviderName,
                hideText: true,
            }
            : undefined;
    const refreshButtonProps: RefreshButtonProps = {
        ...(isLoading ? { disabled: true } : {}),
        resource: identifier ?? resource?.name,
        recordItemId: id,
        dataProviderName,
        hideText: true,
    };

    const defaultHeaderButtons = (
        <>
            {listButtonProps && <ListButton {...listButtonProps} />}
            {isDeleteButtonVisible && <DeleteButton {...deleteButtonProps} />}
            <RefreshButton {...refreshButtonProps} />
        </>
    );

    const headerButtons = headerButtonsFromProps
        ? typeof headerButtonsFromProps === "function"
            ? headerButtonsFromProps({
                defaultButtons: defaultHeaderButtons,
                deleteButtonProps,
                editButtonProps,
                listButtonProps,
                refreshButtonProps,
            })
            : headerButtonsFromProps
        : defaultHeaderButtons;


    const footerButtons = footerButtonsFromProps
        ? typeof footerButtonsFromProps === "function"
            ? footerButtonsFromProps({ defaultButtons: null })
            : footerButtonsFromProps
        : null;

    const defaultFabButton = isEditButtonVisible ? (
        <EditButton {...editButtonProps} />
    ) : null;

    const fabButton = fabButtonFromProps ?? defaultFabButton;

    const title = titleFromProps ?? translate(
        `${identifier}.titles.show`,
        `Show ${getUserFriendlyName(
            resource?.meta?.label ??
            resource?.options?.label ??
            resource?.label ??
            identifier ??
            resource?.name,
            "singular",
        )}`,
    );
    return (
        <PageHeader title={title}
            isLoading={isLoading}
            headerRight={(
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        gap: 3,
                        alignItems: 'center'
                    }}
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
            {fabButton}
        </PageHeader>
    );
};