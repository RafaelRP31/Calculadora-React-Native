import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';

const perguntasOriginais = [
    { id: 1, pergunta: "Quanto é 2 + 2?", alternativas: ["3", "4", "5"], resposta: "4" },
    { id: 2, pergunta: "Qual a raiz quadrada de 16?", alternativas: ["2", "4", "8"], resposta: "4" },
    { id: 3, pergunta: "Quanto é 5 x 3?", alternativas: ["15", "10", "20"], resposta: "15" },
];

const pontosPorAcerto = 10;
const pontosPorNivel = 50;

export default function DesafioMatematico({ onClose }) {
    const [perguntasRestantes, setPerguntasRestantes] = useState([]);
    const [perguntaAtual, setPerguntaAtual] = useState(null);
    const [pontos, setPontos] = useState(0);
    const [nivel, setNivel] = useState(1);

    useEffect(() => {
        iniciarJogo();
    }, []);

    function iniciarJogo() {
        setPerguntasRestantes([...perguntasOriginais]);
        const perguntaInicial = perguntasOriginais[Math.floor(Math.random() * perguntasOriginais.length)];
        setPerguntaAtual(perguntaInicial);
    }

    function proximaPergunta() {
        if (!perguntaAtual) return;

        let restantes = perguntasRestantes.filter(p => p.id !== perguntaAtual.id);
        if (restantes.length === 0) restantes = [...perguntasOriginais];

        const nova = restantes[Math.floor(Math.random() * restantes.length)];
        setPerguntaAtual(nova);
        setPerguntasRestantes(restantes);
    }

    function responder(respostaUsuario) {
        if (!perguntaAtual) return;

        const acertou = respostaUsuario === perguntaAtual.resposta;

        if (acertou) {
            const novosPontos = pontos + pontosPorAcerto;

            if (novosPontos >= nivel * pontosPorNivel) {
                const novoNivel = nivel + 1;
                setNivel(novoNivel);
                setPontos(0);  // Zera pontos ao subir de nível
                Alert.alert('🏆 Parabéns!', `Você subiu para o nível ${novoNivel}!`, [
                    { text: 'OK', onPress: proximaPergunta }
                ]);
                return;
            }

            setPontos(novosPontos);
            Alert.alert('✅ Correto!', `+${pontosPorAcerto} pontos.`, [
                { text: 'OK', onPress: proximaPergunta }
            ]);
        } else {
            const novosPontos = Math.max(0, pontos - pontosPorAcerto);
            setPontos(novosPontos);

            Alert.alert('❌ Errado!', `-10 pontos.`, [
                { text: 'OK', onPress: proximaPergunta }
            ]);
        }
    }

    if (!perguntaAtual) {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Desafio Matemático</Text>
                <Text style={{ textAlign: 'center' }}>Carregando pergunta...</Text>
                <Button title="Voltar ao Menu" onPress={onClose} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Desafio Matemático</Text>
            <Text style={styles.pergunta}>{perguntaAtual.pergunta}</Text>

            <View style={styles.botoes}>
                {perguntaAtual.alternativas.map((alt, index) => (
                    <View key={index} style={{ margin: 5 }}>
                        <Button title={alt} onPress={() => responder(alt)} />
                    </View>
                ))}
            </View>

            <Text style={styles.pontos}>Pontos: {pontos}</Text>
            <Text style={styles.nivel}>Nível: {nivel}</Text>
            <Button title="Voltar ao Menu" onPress={onClose} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    pergunta: { fontSize: 20, marginBottom: 20, textAlign: 'center' },
    botoes: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 20 },
    pontos: { fontSize: 18, marginTop: 10, textAlign: 'center' },
    nivel: { fontSize: 18, marginTop: 5, textAlign: 'center' },
});