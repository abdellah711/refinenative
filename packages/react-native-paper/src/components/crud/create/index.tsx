import React from 'react'
import { CreateProps } from '../types'
import {
    useResource,
    useTranslate,
    useUserFriendlyName,
    userFriendlyResourceName
} from '@refinedev/core';
import { SaveButtonProps } from '../../buttons/types'
import { SaveButton } from '../../buttons'
import { PageHeader } from 'src/components/pageHeader';
import { View } from 'react-native';

export const Create: React.FC<CreateProps> = ({
    children,
    saveButtonProps: saveButtonPropsFromProps,
    isLoading,
    resource: resourceFromProps,
    footerButtons: footerButtonsFromProps,
    footerButtonProps,
    headerButtons: headerButtonsFromProps,
    headerButtonProps,
    wrapperProps,
    title: titleFromProps,
    fabButton: fabButtonFromProps,
}) => {
    const translate = useTranslate();

    const getUserFriendlyName = useUserFriendlyName?.() ?? userFriendlyResourceName;

    const { resource, identifier } = useResource(resourceFromProps);

    const saveButtonProps: SaveButtonProps = {
        ...(isLoading ? { disabled: true } : {}),
        asFAB: true,
        ...saveButtonPropsFromProps as any,
    };

    const headerButtons = headerButtonsFromProps
        ? typeof headerButtonsFromProps === "function"
            ? headerButtonsFromProps({
                defaultButtons: null,
            })
            : headerButtonsFromProps
        : null;

    const footerButtons = footerButtonsFromProps
        ? typeof footerButtonsFromProps === "function"
            ? footerButtonsFromProps({
                defaultButtons: null,
                saveButtonProps,
            })
            : footerButtonsFromProps
        : null;

    const fabButton = fabButtonFromProps ?? <SaveButton {...saveButtonProps} />;

    const title = titleFromProps ?? translate(
        `${identifier}.titles.create`,
        `Create ${getUserFriendlyName(
            resource?.meta?.label ??
            resource?.options?.label ??
            resource?.label ??
            identifier ??
            resource?.name,
            "singular",
        )}`)

    return (
        <PageHeader
            title={title}
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
                style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 3, marginTop: 8 }}
                {...footerButtonProps}
            >
                {footerButtons}
            </View>
            {fabButton}
        </PageHeader>
    );
}