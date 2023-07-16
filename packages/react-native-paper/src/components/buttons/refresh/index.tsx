import React from 'react'
import { useOne, useResource, useTranslate } from '@refinedev/core';
import { RefreshButtonProps } from '../types';
import { Button, ButtonProps, IconButton, IconButtonProps } from 'react-native-paper';


export const RefreshButton: React.FC<RefreshButtonProps> = ({
    resource: resourceNameFromProps,
    recordItemId,
    hideText = false,
    meta,
    dataProviderName,
    icon,
    children,
    onPress,
    ...rest
}) => {
    const { identifier, id } = useResource(resourceNameFromProps);

    const translate = useTranslate();

    const { refetch, isFetching } = useOne({
        resource: identifier,
        id: recordItemId ?? id ?? "",
        queryOptions: {
            enabled: false,
        },
        meta,
        metaData: meta,
        liveMode: "off",
        dataProviderName,
    });
    return hideText ? (
        <IconButton
            mode="outlined"
            icon={icon ?? "refresh"}
            aria-label={translate("buttons.refresh", "Refresh")}
            onPress={() => refetch()}
            disabled={isFetching}
            {...rest as Omit<IconButtonProps, 'icon'>}
        />
    ) : (
        <Button
            mode="outlined"
            icon="refresh"
            loading={isFetching}
            onPress={() => refetch()}
            {...rest as ButtonProps}
        >
            {children ?? translate("buttons.refresh", "Refresh")}
        </Button>
    );
}