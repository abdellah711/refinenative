import React from 'react'
import { Stack } from 'expo-router'
import { AuthBindings, Refine } from '@refinedev/core'
import dataProvider from '@refinedev/simple-rest'
import routerProvider from '@refinenative/expo-router'
import { ReactNavigationThemeProvider } from '@refinenative/react-native-paper'
import { Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

/**
 *  mock auth credentials to simulate authentication
 */
const authCredentials = {
    email: "demo@refine.dev",
    password: "demodemo",
};


export default function Layout() {

    const authProvider: AuthBindings = {
        login: async ({ providerName, email }) => {

            if (email === authCredentials.email) {
                await AsyncStorage.setItem("email", email);
                return {
                    success: true,
                    redirectTo: "/",
                };
            }

            return {
                success: false,
                error: {
                    message: "Login failed",
                    name: "Invalid email or password",
                },
            };
        },
        register: async (params) => {
            if (params.email === authCredentials.email && params.password) {
                await AsyncStorage.setItem("email", params.email);
                return {
                    success: true,
                    redirectTo: "/",
                };
            }
            return {
                success: false,
                error: {
                    message: "Register failed",
                    name: "Invalid email or password",
                },
            };
        },
        updatePassword: async (params) => {
            if (params.password === authCredentials.password) {
                //we can update password here
                return {
                    success: true,
                };
            }
            return {
                success: false,
                error: {
                    message: "Update password failed",
                    name: "Invalid password",
                },
            };
        },
        forgotPassword: async (params) => {
            if (params.email === authCredentials.email) {
                //we can send email with reset password link here
                return {
                    success: true,
                };
            }
            return {
                success: false,
                error: {
                    message: "Forgot password failed",
                    name: "Invalid email",
                },
            };
        },
        logout: async () => {
            await AsyncStorage.removeItem("email");
            return {
                success: true,
                redirectTo: "/login",
            };
        },
        onError: async (error) => {
            console.error(error);
            return { error };
        },
        check: async () => {
            console.log('check')
            return await AsyncStorage.getItem("email")
                ? {
                    authenticated: true,
                }
                : {
                    authenticated: false,
                    error: {
                        message: "Check failed",
                        name: "Not authenticated",
                    },
                    logout: true,
                    redirectTo: "/login",
                }
        },
        getPermissions: async () => ["admin"],
        getIdentity: async () => ({
            id: 1,
            name: "Jane Doe",
            avatar: "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
        }),
    };

    return (
        <Refine
            routerProvider={routerProvider}
            options={{
                reactQuery: {
                    devtoolConfig: Platform.OS === "web" ? undefined : false,
                },
                disableTelemetry: true
            }}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "blog_posts",
                    list: "/blog-posts",
                    show: "/blog-posts/show/:id",
                    create: "/blog-posts/create",
                    edit: "/blog-posts/edit/:id",
                    meta: {
                        canDelete: true,
                        icon: 'post'
                    }
                },
                {
                    name: "categories",
                    list: "/categories",
                    show: "/categories/show/:id",
                    create: "/categories/create",
                    edit: "/categories/edit/:id",
                    meta: {
                        canDelete: true,
                        icon: 'shape'
                    }
                },
                {
                    name: "products",
                    list: "/products",
                    show: "/products/show/:id",
                    create: "/products/create",
                    edit: "/products/edit/:id",
                    meta: {
                        canDelete: true,
                        icon: 'store'
                    }
                },
                {
                    name: "users",
                    list: "/users",
                    show: "/users/show/:id",
                    create: "/users/create",
                    edit: "/users/edit/:id",
                    meta: {
                        canDelete: true,
                        icon: 'account-multiple'
                    }
                },
            ]}
            authProvider={authProvider}
        >
            <ReactNavigationThemeProvider>
                <Stack screenOptions={{header: () => null}}/>
            </ReactNavigationThemeProvider>
        </Refine>
    )
}
