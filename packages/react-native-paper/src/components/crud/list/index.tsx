import React from 'react'
import { PageHeader } from '../../pageHeader'
import { useResource, useTranslate, useUserFriendlyName, userFriendlyResourceName } from '@refinedev/core'
import { CreateButton, CreateButtonProps } from '../../'
import { ListProps } from '../types'


export const List = ({
    children,
    canCreate,
    title: titleFromProps,
    wrapperProps,
    resource: resourceFromProps,
    createButtonProps: createButtonPropsFromProps,
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


    const title = titleFromProps ?? translate(`${identifier}.titles.list`, getUserFriendlyName(
        resource?.meta?.label ??
        resource?.options?.label ??
        resource?.label ??
        identifier ??
        resource?.name,
        "plural",
    ))

    return (
        <PageHeader title={title} wrapperProps={wrapperProps}>
            {defaultButton}
            {children}
        </PageHeader>
    )
}