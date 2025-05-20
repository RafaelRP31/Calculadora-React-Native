import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import { Picker } from '@react-native-picker/picker'

const conversions = {
    'm-cm': value => value * 100,
    'cm-m': value => value / 100,
    'km-mi': value => value * 0.621371,
    'mi-km': value => value / 0.621371,
    'kg-lb': value => value * 2.20462,
    'lb-kg': value => value / 2.20462,
}

const Converter = ({ onClose }) => {
    const [inputValue, setInputValue] = useState('')
    const [result, setResult] = useState('')
    const [conversionType, setConversionType] = useState('m-cm')

    const handleConvert = () => {
        const val = parseFloat(inputValue)
        if (!isNaN(val)) {
            const converted = conversions[conversionType](val)
            setResult(converted.toFixed(2))
        } else {
            setResult('Valor inválido')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Conversor de Unidade</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Digite o valor"
                value={inputValue}
                onChangeText={setInputValue}
            />
            <Picker
                selectedValue={conversionType}
                onValueChange={itemValue => setConversionType(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Metros para Centímetros" value="m-cm" />
                <Picker.Item label="Centímetros para Metros" value="cm-m" />
                <Picker.Item label="Quilômetros para Milhas" value="km-mi" />
                <Picker.Item label="Milhas para Quilômetros" value="mi-km" />
                <Picker.Item label="Quilos para Libras" value="kg-lb" />
                <Picker.Item label="Libras para Quilos" value="lb-kg" />
            </Picker>

            <Button title="Converter" onPress={handleConvert} />
            <Text style={styles.result}>Resultado: {result}</Text>
            <Button title="Fechar" color="red" onPress={onClose} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#333',
        padding: 20,
        borderRadius: 10,
        margin: 20,
    },
    title: {
        fontSize: 22,
        marginBottom: 10,
        color: '#fff',
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    picker: {
        color: '#fff',
        backgroundColor: '#444',
        marginBottom: 10,
    },
    result: {
        fontSize: 18,
        marginTop: 10,
        color: '#fff',
        textAlign: 'center',
    },
})

export default Converter
