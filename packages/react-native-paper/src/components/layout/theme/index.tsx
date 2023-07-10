import React from 'react'
import {
    PaperProvider,
    MD3DarkTheme,
    MD3LightTheme,
    adaptNavigationTheme
} from 'react-native-paper'
import {
    ThemeProvider as NavigationThemeProvider,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'
import { useColorScheme } from 'react-native'
import { ReactNavigationThemeProviderProps } from '../types'


export const ReactNavigationThemeProvider = ({
    theme: themeFromProps,
    reactNavigationTheme: reactNavigationThemeFromProps,
    children
}: ReactNavigationThemeProviderProps) => {

    const colorScheme = useColorScheme()

    const {DarkTheme,LightTheme} = adaptNavigationTheme({
        reactNavigationLight: NavigationDefaultTheme,
        reactNavigationDark: NavigationDarkTheme
    })

    const theme = themeFromProps ?? (colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme)
    const reactNavigationTheme = reactNavigationThemeFromProps ?? (colorScheme === 'dark' ? DarkTheme : LightTheme)

    return (
        <PaperProvider theme={theme}>
            <NavigationThemeProvider value={reactNavigationTheme}>
                {children}
            </NavigationThemeProvider>
        </PaperProvider>
    )
}