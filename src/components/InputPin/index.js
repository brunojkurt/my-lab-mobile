import React, { forwardRef } from 'react'
import { TextInput, StyleSheet } from 'react-native'

const InputPin = forwardRef((props, ref) => {
  const { onChangeText, maxLength, style, invalid, value, onBackspace } = props

  const validationStyles = {
    valid: {
      color: 'black',
      borderBottomColor: 'rgba(0, 0, 0, 0.2)'
    },
    invalid: {
      borderBottomColor: 'red',
      color: 'red'
    }
  }
  return (
    <TextInput
      ref={ref}
      onChangeText={value => {
        onChangeText && onChangeText(value.replace(/[^0-9]/g, ''))
      }}
      maxLength={maxLength}
      keyboardType="numeric"
      textAlign="center"
      style={{
        ...style,
        ...styles.baseStyle,
        ...validationStyles[invalid ? 'invalid' : 'valid']
      }}
      value={value}
      onKeyPress={value => {
        (value.nativeEvent.key === 'Backspace' && onBackspace) && onBackspace()
      }}
    />
  )
})

const styles = StyleSheet.create({
  baseStyle: {
    borderBottomWidth: 2,
    fontSize: 18,
  }
})

export default InputPin;