import React, { useContext } from "react";
import { EditButtonProps } from "../types";
import { AccessControlContext, useCan, useGo, useNavigation, useResource, useTranslate } from "@refinedev/core";
import { Button, ButtonProps, FAB, FABProps } from "react-native-paper";


export const EditButton: React.FC<EditButtonProps> = ({
    resource: resourceNameFromProps,
    hideText = false,
    accessControl,
    meta,
    children,
    recordItemId,
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

    const { editUrl: generateEditUrl } = useNavigation();

    const { resource,id } = useResource(resourceNameFromProps);

        const { data } = useCan({
        resource: resource?.name,
        action: "edit",
        params: { id: recordItemId ?? id, resource },
        queryOptions: {
            enabled: accessControlEnabled,
        },
    });

    const go = useGo()

    const editUrl =
        resource && (recordItemId ?? id)
            ? generateEditUrl(resource, recordItemId! ?? id!, meta)
            : "";


    if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
        return null;
    }

    const text = !hideText && (children ?? translate("buttons.edit", "Edit"));

    return asFAB ? (
        <FAB
            label={typeof text === 'string' ? text : undefined}
            icon="pen"
            mode="elevated"
            disabled={data?.can === false}
            style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
            onPress={() => go({ to: editUrl, type: 'push' })}
            {...rest as FABProps}
        />
    ) : (
        <Button
            disabled={data?.can === false}
            icon="pen"
            mode="contained"
            onPress={() => go({ to: editUrl, type: 'push' })}
            {...rest as ButtonProps}
        >{text}</Button>
    )
}