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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    Alert,
    Platform
} from 'react-native'

import { RefineLayoutDrawerContentProps } from '../types'
import { Button, Divider, Drawer, Surface } from 'react-native-paper'

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

    const insets = useSafeAreaInsets();


    const TitleToRender = Title

    const renderTreeView = (tree: ITreeMenu[]) => {
        return tree.map((item) => {
            const { label: legacyLabel, name, icon: legacyIcon, children, meta, list } = item;
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
                    <Drawer.CollapsedItem
                        label={label}
                        active={isSelected}
                        focusedIcon={typeof icon === 'string' ? icon : () => icon}
                        unfocusedIcon={typeof icon === 'string' ? icon : () => icon}
                    >
                        {renderTreeView(children)}
                    </Drawer.CollapsedItem>
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
                    <Drawer.Item
                        label={label ?? ''}
                        icon={typeof icon === 'string' ? icon : () => icon}
                        onPress={() => go({ to: list as string, type: 'push' })}
                        active={isSelected}
                    />
                </CanAccess>
            );
        });
    };

    const items = renderTreeView(menuItems);

    const dashboard = hasDashboard ? (
        <CanAccess resource="dashboard" action="list">
            <Drawer.Item
                label={translate("dashboard.title", "Dashboard")}
                icon="view-dashboard"
                onPress={() => go({ to: '/', type: 'push' })}
                active={selectedKey === '/'}
            />
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
        <>
            <Divider style={{ marginTop: 'auto', marginBottom: 10 }} />
            <Button
                key="logout"
                onPress={handleLogout}
                icon="logout"
            >
                {translate("buttons.logout", "Logout")}
            </Button>
        </>
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
        <Surface
            style={{
                flex: 1,
                paddingHorizontal: 8,
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
            }}>
            {TitleToRender && <TitleToRender />}
            {renderSider()}
        </Surface>
    )
}