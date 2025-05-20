import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Display = ({ value, theme, history }) => {
    const isDark = theme === 'dark'
    const displayStyles = {
        backgroundColor: isDark ? '#000' : '#fff',
    }
    const historyColor = { color: isDark ? '#aaa' : '#888' }
    const valueColor = { color: isDark ? '#fff' : '#000' }

    return (
        <View style={[styles.display, displayStyles]}>
            {history ? <Text style={[styles.history, historyColor]}>{history}</Text> : null}
            <Text style={[styles.displayValue, valueColor]}>{value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    display: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    history: {
        fontSize: 20,
        textAlign: 'right',
    },
    displayValue: {
        fontSize: 40,
        textAlign: 'right',
    },
})

export default Display
