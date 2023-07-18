import React from 'react'
import { PageHeader } from '../../pageHeader'
import { useResource, useTranslate, useUserFriendlyName, userFriendlyResourceName } from '@refinedev/core'
import { CreateButton, CreateButtonProps } from '../../'
import { ListProps } from '../types'
import { View } from 'react-native'


export const List = ({
    children,
    canCreate,
    title: titleFromProps,
    wrapperProps,
    resource: resourceFromProps,
    createButtonProps: createButtonPropsFromProps,
    headerButtons: headerButtonsFromProps,
    headerButtonProps,
}: ListProps) => {

    const { resource, identifier } = useResource(resourceFromProps)

    const getUserFriendlyName = useUserFriendlyName?.() ?? userFriendlyResourceName;

    const translate = useTranslate()

    const isCreateButtonVisible =
        canCreate ??
        ((resource?.canCreate ?? !!resource?.create) ||
            createButtonPropsFromProps);

    const createButtonProps: CreateButtonProps | undefined =
        isCreateButtonVisible
            ? {
                resource: identifier,
                ...createButtonPropsFromProps,
            }
            : undefined;

    const defaultButton = isCreateButtonVisible ? (
        <CreateButton {...createButtonProps} />
    ) : undefined;


    const headerButtons = headerButtonsFromProps
        ? typeof headerButtonsFromProps === "function"
            ? headerButtonsFromProps({
                defaultButtons: null,
                createButtonProps,
            })
            : headerButtonsFromProps
        : null;


    const title = titleFromProps ?? translate(`${identifier}.titles.list`, getUserFriendlyName(
        resource?.meta?.label ??
        resource?.options?.label ??
        resource?.label ??
        identifier ??
        resource?.name,
        "plural",
    ))

    return (
        <PageHeader
            title={title}
            wrapperProps={wrapperProps}
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
        >
            {defaultButton}
            {children}
        </PageHeader>
    )
}