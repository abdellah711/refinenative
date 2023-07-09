import React, { FC } from 'react'
import {
    useGo,
    useMenu,
    ITreeMenu,
    CanAccess,
    useRefineContext,
    useTranslate,
    useWarnAboutChange,
    useLogout,
    useIsExistAuthentication
} from '@refinedev/core'
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    Platform
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { styles } from './styles'

import { Title as DefaultTitle } from '../title'
import { RefineLayoutDrawerContentProps } from '../types'


export const DrawerContent: FC<RefineLayoutDrawerContentProps> = ({
    Title,
    render,
    meta
}) => {
    const { menuItems, selectedKey } = useMenu({ meta })
    const go = useGo()
    const { hasDashboard } = useRefineContext();
    const translate = useTranslate()
    const { warnWhen, setWarnWhen } = useWarnAboutChange();
    const { mutate: mutateLogout } = useLogout()
    const isExistAuthentication = useIsExistAuthentication();

    const TitleToRender = Title ?? DefaultTitle

    const renderTreeView = (tree: ITreeMenu[]) => {
        return tree.map((item) => {
            const { label: legacyLabel, name, icon: legacyIcon, children, meta, identifier, list } = item;
            const icon = legacyIcon ?? meta?.icon;
            const label = legacyLabel ?? meta?.label;
            const isSelected = item.key === selectedKey;
            const isParent = children.length > 0;

            if (isParent) return (
                <CanAccess
                    key={item.key}
                    resource={name.toLowerCase()}
                    action="list"
                    params={{
                        resource: item,
                    }}
                >
                    <View>
                        <TouchableOpacity
                            key={identifier}
                            onPress={() => go({ to: list as string, type: 'push' })}
                            style={[styles.link, isSelected && styles.activeLink]}
                        >
                            {icon}
                            <Text style={[styles.text, isSelected && styles.activeText]}>{label}</Text>
                        </TouchableOpacity>
                        <View style={{ paddingStart: 10 }}>
                            {renderTreeView(children)}
                        </View>
                    </View>
                </CanAccess>
            )

            return (
                <CanAccess
                    key={item.key}
                    resource={name.toLowerCase()}
                    action="list"
                    params={{
                        resource: item,
                    }}
                >
                    <TouchableOpacity
                        key={identifier}
                        onPress={() => go({ to: list as string, type: 'push' })}
                        style={[styles.link, isSelected && styles.activeLink]}
                    >
                        {icon}
                        <Text style={[styles.text, isSelected && styles.activeText]}>{label}</Text>
                    </TouchableOpacity>
                </CanAccess>
            );
        });
    };

    const items = renderTreeView(menuItems);

    const dashboard = hasDashboard ? (
        <CanAccess resource="dashboard" action="list">
            <TouchableOpacity
                onPress={() => go({ to: '/', type: 'push' })}
                style={[styles.link, selectedKey === '/' && styles.activeLink]}
            >
                <MaterialIcons name="dashboard" size={20} color={selectedKey === '/' ? styles.activeText.color : styles.text.color} />
                <Text style={[styles.text, selectedKey === '/' && styles.activeText]}>
                    {translate("dashboard.title", "Dashboard")}
                </Text>
            </TouchableOpacity>
        </CanAccess>
    ) : null;

    const handleLogout = () => {
        if (warnWhen) {
            if (Platform.OS === 'web') {
                const confirm = window.confirm(
                    translate(
                        "warnWhenUnsavedChanges",
                        "Are you sure you want to leave? You have unsaved changes.",
                    ),
                );

                if (confirm) {
                    setWarnWhen(false);
                    mutateLogout();
                }
            } else {
                Alert.alert(
                    translate(
                        "warnWhenUnsavedChanges",
                        "Are you sure you want to leave? You have unsaved changes.",
                    ),
                    undefined,
                    [
                        {
                            text: translate("buttons.cancel", "Cancel"),
                        },
                        {
                            text: translate("buttons.ok", "OK"),
                            onPress: () => {
                                setWarnWhen(false);
                                mutateLogout();
                            }
                        }
                    ]
                )
            }
        } else {
            mutateLogout();
        }
    };

    const logout = isExistAuthentication && (
        <TouchableOpacity
            key="logout"
            onPress={handleLogout}
            style={[styles.link, { marginTop: 'auto', backgroundColor: '#2e2e2e', alignSelf: 'flex-end' }]}
        >
            <Text style={[styles.text, { color: 'white' }]}>
                {translate("buttons.logout", "Logout")}
            </Text>
        </TouchableOpacity>
    );

    const renderSider = () => {
        if (render) {
            return render({
                dashboard,
                items,
                logout,
            });
        }
        return (
            <>
                {dashboard}
                {items}
                {logout}
            </>
        );
    };

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <TitleToRender />
            {renderSider()}
        </View>
    )
}