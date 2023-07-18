import React, { useContext } from "react";
import { ListButtonProps } from "../types";
import { AccessControlContext, useCan, useGo, useNavigation, useResource, useTranslate, useUserFriendlyName, userFriendlyResourceName } from "@refinedev/core";
import { Button, ButtonProps, FAB, FABProps, IconButton, IconButtonProps } from "react-native-paper";


export const ListButton: React.FC<ListButtonProps> = ({
    resource: resourceNameFromProps,
    hideText = false,
    accessControl,
    meta,
    children,
    onPress,
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

    const translate = useTranslate();

    const getUserFriendlyName = useUserFriendlyName?.() ?? userFriendlyResourceName;


    const { listUrl: generateListUrl } = useNavigation();

    const { resource, identifier } = useResource(resourceNameFromProps);


    const { data } = useCan({
        resource: resource?.name,
        action: "list",
        queryOptions: {
            enabled: accessControlEnabled,
        },
        params: {
            resource,
        },
    });

    const go = useGo()

    const listUrl = resource ? generateListUrl(resource, meta) : "";


    if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
        return null;
    }

    const text = !hideText && (children ??
        translate(
            `${identifier ??
            resourceNameFromProps
            }.titles.list`,
            getUserFriendlyName(
                resource?.meta?.label ??
                resource?.label ??
                identifier ??
                resource?.name ??
                resourceNameFromProps,
                "plural",
            ),
        ));

    return asFAB ? (
        <FAB
            label={typeof text === 'string' ? text : undefined}
            icon="format-list-bulleted"
            mode="elevated"
            disabled={data?.can === false}
            style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
            onPress={() => go({ to: listUrl, type: 'push' })}
            {...rest as FABProps}
        />
    ) : (
        hideText ? (
            <IconButton
                mode="outlined"
                icon="format-list-bulleted"
                aria-label={text + ''}
                disabled={data?.can === false}
                onPress={() => go({ to: listUrl, type: 'push' })}
                {...rest as Omit<IconButtonProps, 'icon'>}
            />
        ) : (
            <Button
                mode="outlined"
                icon="format-list-bulleted"
                disabled={data?.can === false}
                onPress={() => go({ to: listUrl, type: 'push' })}
                {...rest as ButtonProps}
            >
                {text}
            </Button>
        )
    );
}
