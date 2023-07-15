import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useResource, useUserFriendlyName, userFriendlyResourceName } from '@refinedev/core'
import { PageHeaderProps } from './types'


export const PageHeader: React.FC<PageHeaderProps> = ({
    title: titleFromProps,
    wrapperProps,
    headerLeft,
    headerRight,
    children,
}) => {
    const { setOptions } = useNavigation()

    const { resource, identifier } = useResource()
    const getUserFriendlyName = useUserFriendlyName?.() ?? userFriendlyResourceName;

    const title = titleFromProps ?? getUserFriendlyName(resource?.meta?.label ??
        resource?.options?.label ??
        resource?.label ??
        identifier ??
        resource?.name, 'plural')

    useEffect(() => {
        if (title !== false) {
            setOptions({
                title,
                headerLeft: () => headerLeft,
                headerRight: () => headerRight
            })
        }
    }, [title])

    return (
        <View style={{ padding: 15, flex: 1 }} {...wrapperProps}>
            {children}
        </View>
    )
}