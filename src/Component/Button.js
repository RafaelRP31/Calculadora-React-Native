import React from "react"
import { StyleSheet, Text, View, Dimensions, TouchableHighlight } from 'react-native'

const styles = StyleSheet.create({
    button: {
        height: Dimensions.get('window').width / 4,
        width: Dimensions.get('window').width / 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#888',
    },
    buttonText: {
        fontSize: 40,
        color: '#000',
    },
    operationButton: {
        backgroundColor: '#fa8231',
    },
    operationText: {
        color: '#fff',
    },
    buttonDouble: {
        width: (Dimensions.get('window').width / 4) * 2,
    },
    buttonTriple: {
        width: (Dimensions.get('window').width / 4) * 3,
    }
})

export default props => {
    const buttonStyles = [styles.button]
    const textStyles = [styles.buttonText]

    if (props.double) buttonStyles.push(styles.buttonDouble)
    if (props.triple) buttonStyles.push(styles.buttonTriple)
    if (props.operation) {
        buttonStyles.push(styles.operationButton)
        textStyles.push(styles.operationText)
    }

    return (
        <TouchableHighlight onPress={() => props.onClick(props.label)}>
            <View style={buttonStyles}>
                <Text style={textStyles}>{props.label}</Text>
            </View>
        </TouchableHighlight>
    )
}
