import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native'
import Button from './Component/Button'
import Display from './Component/Display'
import Converter from './Component/ConversorDeUnidade'
import ChatMode from './Component/Chat'
import DesafioMatematico from './Component/Desafio'

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
  showMenu: false,
  theme: 'dark',
  showConverter: false,
  showChat: false,
  showDesafio: false,
  expression: '',
  showResult: false,
  fullExpression: '',
}

export default class App extends Component {
  state = { ...initialState }

  toggleTheme = () => {
    const newTheme = this.state.theme === 'dark' ? 'light' : 'dark'
    this.setState({ theme: newTheme, showMenu: false })
  }

  addDigit = n => {
    if (this.state.showResult) {
      this.setState({
        expression: n,
        displayValue: n,
        clearDisplay: false,
        showResult: false,
        fullExpression: '',
      })
      return
    }

    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay

    if (n === '.' && !clearDisplay && this.state.displayValue.includes('.')) {
      return
    }

    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + n
    const newExpression = this.state.expression + n

    this.setState({ displayValue, clearDisplay: false, expression: newExpression })
  }

  clearMemory = () => {
    this.setState({ ...initialState })
  }

  setOperation = operation => {
    const realOp = operation === 'x' ? '*' : operation

    if (this.state.expression === '') return

    const lastChar = this.state.expression.slice(-1)
    if (['+', '-', '*', '/'].includes(lastChar)) {
      this.setState({
        expression: this.state.expression.slice(0, -1) + realOp
      })
      return
    }

    if (operation === '=') {
      let result = 0
      try {
        result = eval(this.state.expression)
      } catch (e) {
        result = 'Erro'
      }

      const fullExpr = `${this.state.expression}=${result}`

      this.setState({
        displayValue: `${result}`,
        expression: '',
        fullExpression: fullExpr,
        showResult: true,
        values: [result, 0],
        current: 0,
      })
    } else {
      this.setState({
        expression: this.state.expression + realOp,
        clearDisplay: false,
      })
    }
  }

  render() {
    const isDark = this.state.theme === 'dark'
    const themeStyles = {
      fundo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isDark ? '#000' : '#fff',
      },
      menuText: {
        fontSize: 28,
        color: isDark ? '#fff' : '#000',
      },
      menuContainer: {
        backgroundColor: isDark ? '#222' : '#eee',
        borderRadius: 8,
        paddingVertical: 10,
        width: 200,
      },
      menuItemText: {
        color: isDark ? '#fff' : '#000',
        fontSize: 16,
      }
    }

    return (
      <View style={themeStyles.fundo}>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => this.setState({ showMenu: true })}
        >
          <Text style={themeStyles.menuText}>☰</Text>
        </TouchableOpacity>

        <Modal
          visible={this.state.showMenu}
          transparent={true}
          animationType="fade"
          onRequestClose={() => this.setState({ showMenu: false })}
        >
          <TouchableWithoutFeedback onPress={() => this.setState({ showMenu: false })}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={themeStyles.menuContainer}>
                  {['Desafio do Dia', 'Conversor de Unidade', 'Modo Chat', 'Tema'].map(option => (
                    <TouchableOpacity
                      key={option}
                      style={styles.menuItem}
                      onPress={() => {
                        if (option === 'Tema') {
                          this.toggleTheme()
                        } else if (option === 'Conversor de Unidade') {
                          this.setState({ showConverter: true, showMenu: false })
                        } else if (option === 'Modo Chat') {
                          this.setState({ showChat: true, showMenu: false })
                        } else if (option === 'Desafio do Dia') {
                          this.setState({ showDesafio: true, showMenu: false })
                        }
                      }}
                    >
                      <Text style={themeStyles.menuItemText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {this.state.showConverter && (
          <Modal
            transparent={false}
            animationType="slide"
            visible={this.state.showConverter}
            onRequestClose={() => this.setState({ showConverter: false })}
          >
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: isDark ? '#000' : '#fff' }}>
              <Converter onClose={() => this.setState({ showConverter: false })} />
            </View>
          </Modal>
        )}

        {this.state.showChat && (
          <Modal
            transparent={false}
            animationType="slide"
            visible={this.state.showChat}
            onRequestClose={() => this.setState({ showChat: false })}
          >
            <ChatMode onClose={() => this.setState({ showChat: false })} theme={this.state.theme} />
          </Modal>
        )}

        {this.state.showDesafio && (
          <Modal
            transparent={false}
            animationType="slide"
            visible={this.state.showDesafio}
            onRequestClose={() => this.setState({ showDesafio: false })}
          >
            <DesafioMatematico onClose={() => this.setState({ showDesafio: false })} />
          </Modal>
        )}

        <Display
          value={this.state.showResult ? this.state.fullExpression : (this.state.expression || this.state.displayValue)}
          theme={this.state.theme}
        />
        <View style={styles.buttons}>
          <Button label='C' triple onClick={this.clearMemory} />
          <Button label='/' operation onClick={this.setOperation} />
          <Button label='1' onClick={this.addDigit} />
          <Button label='2' onClick={this.addDigit} />
          <Button label='3' onClick={this.addDigit} />
          <Button label='x' operation onClick={this.setOperation} />
          <Button label='4' onClick={this.addDigit} />
          <Button label='5' onClick={this.addDigit} />
          <Button label='6' onClick={this.addDigit} />
          <Button label='-' operation onClick={this.setOperation} />
          <Button label='7' onClick={this.addDigit} />
          <Button label='8' onClick={this.addDigit} />
          <Button label='9' onClick={this.addDigit} />
          <Button label='+' operation onClick={this.setOperation} />
          <Button label='0' double onClick={this.addDigit} />
          <Button label='.' onClick={this.addDigit} />
          <Button label='=' operation onClick={this.setOperation} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(0, 0, 0)',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  menuText: {
    fontSize: 28,
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 60,
    paddingRight: 20,
  },
  menuContainer: {
    backgroundColor: '#222',
    borderRadius: 8,
    paddingVertical: 10,
    width: 200,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  menuItemText: {
    color: '#fff',
    fontSize: 16,
  },
})