import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    link: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 7,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    activeLink: {
        backgroundColor: '#1e90ff45',
    },
    text: {
        fontWeight: '500',
        color: '#414141',
    },
    activeText: {
        color: '#1e90ff',
    }
})