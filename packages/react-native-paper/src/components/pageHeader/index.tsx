import React, { useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useResource, useUserFriendlyName, userFriendlyResourceName } from '@refinedev/core'
import { PageHeaderProps } from './types'
import { ActivityIndicator, IconButton } from 'react-native-paper'


export const PageHeader: React.FC<PageHeaderProps> = ({
    title: titleFromProps,
    wrapperProps,
    headerLeft,
    headerRight,
    children,
    isLoading = false,
    drawerIcon,
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
                headerRight: () => headerRight,
                drawerIcon,
            })
        }
    }, [title])

    return (
        <ScrollView style={{flex: 1}} contentContainerStyle={{flex: 1}}>
            <View style={{ padding: 15, flex:1 }} {...wrapperProps}>
                {isLoading ? <ActivityIndicator style={{marginTop: 20}}/> : children}
            </View>
        </ScrollView>
    )
}