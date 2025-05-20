import React, { useState } from 'react'
import { View, TextInput, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'

const ChatMode = ({ onClose, theme }) => {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')

    const isDark = theme === 'dark'

    const handleSend = async () => {
        if (!input.trim()) return

        const userMessage = { id: Date.now().toString(), text: input, from: 'user' }
        setMessages(prev => [...prev, userMessage])

        try {
            const res = await fetch(`http://192.168.1.78/pesquisa.php?q=${encodeURIComponent(input)}`)
            const data = await res.json()

            const botMessage = {
                id: (Date.now() + 1).toString(),
                text: data.resposta,
                from: 'bot'
            }
            setMessages(prev => [...prev, botMessage])
        } catch (error) {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                text: 'Erro ao buscar resposta na internet.',
                from: 'bot'
            }])
        }

        setInput('')
    }


    return (
        <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
            <FlatList
                data={messages}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Text style={[styles.message, { alignSelf: item.from === 'user' ? 'flex-end' : 'flex-start', color: isDark ? '#fff' : '#000' }]}>
                        {item.from === 'user' ? 'Você: ' : 'MathBot: '}
                        {item.text}
                    </Text>
                )}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    value={input}
                    onChangeText={setInput}
                    placeholder="Digite uma expressão ou dúvida matemática..."
                    placeholderTextColor={isDark ? '#aaa' : '#666'}
                    style={[styles.input, { color: isDark ? '#fff' : '#000', borderColor: isDark ? '#fff' : '#000' }]}
                />
                <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                    <Text style={{ color: '#fff' }}>Enviar</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={{ color: '#fff' }}>Fechar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    message: { marginVertical: 4, padding: 8, borderRadius: 5, backgroundColor: '#444' },
    inputContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
    input: { flex: 1, borderWidth: 1, borderRadius: 8, padding: 8, marginRight: 8 },
    sendButton: { padding: 10, backgroundColor: '#007AFF', borderRadius: 5 },
    closeButton: { marginTop: 10, alignSelf: 'center' }
})

export default ChatMode
