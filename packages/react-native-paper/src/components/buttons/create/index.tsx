import React, { useContext } from 'react'
import { AccessControlContext, useCan, useGo, useNavigation, useResource, useTranslate } from '@refinedev/core'
import { Button, ButtonProps, FAB, FABProps, } from 'react-native-paper'
import { CreateButtonProps } from '../types';


export const CreateButton: React.FC<CreateButtonProps> = ({
    resource: resourceNameFromProps,
    hideText = false,
    accessControl,
    meta,
    children,
    onPress,
    asFAB = true,
    ...rest
}) => {
    const accessControlContext = useContext(AccessControlContext);

    const accessControlEnabled =
        accessControl?.enabled ??
        accessControlContext.options.buttons.enableAccessControl;

    const hideIfUnauthorized =
        accessControl?.hideIfUnauthorized ??
        accessControlContext.options.buttons.hideIfUnauthorized;

    const translate = useTranslate();

    const { createUrl: generateCreateUrl } = useNavigation();

    const { resource } = useResource(resourceNameFromProps);

    const { data } = useCan({
        resource: resource?.name,
        action: "create",
        queryOptions: {
            enabled: accessControlEnabled,
        },
        params: {
            resource,
        },
    });

    const go = useGo()

    const createUrl = resource ? generateCreateUrl(resource, meta) : "";

    if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
        return null;
    }

    const text = !hideText && (children ?? translate("buttons.create", "Create"));

    return asFAB ? (
        <FAB
            label={typeof text === 'string' ? text : undefined}
            icon="plus"
            mode="elevated"
            disabled={data?.can === false}
            style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
            onPress={() => go({ to: createUrl, type: 'push' })}
            {...rest as FABProps}
        />
    ) : (
        <Button
            disabled={data?.can === false}
            icon="plus"
            mode="contained"
            onPress={() => go({ to: createUrl, type: 'push' })}
            {...rest as ButtonProps}
        >{text}</Button>
    )
}