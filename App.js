import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import InputPin from './src/components/InputPin'

const App = () => {
  const firstInput = useRef(null)
  const secondInput = useRef(null)
  const thirdInput = useRef(null)
  const fourthInput = useRef(null)
  
  const [ pinValues, setPinValues ] = useState({
    first: '',
    second: '',
    third: '',
    fourth: ''
  })

  const [ invalidPIN, setInvalidPIN ] = useState(false);

  useEffect(() => {
    const { first, second, third, fourth } = pinValues
    const inputPIN = `${first}${second}${third}${fourth}`
    const challengePIN = '1234'
    
    const validate = () => {
      if(inputPIN.length === 4 && inputPIN !== challengePIN) {
        setInvalidPIN(true)
      } else {
        setInvalidPIN(false)
      }
    }

    validate()
  }, [pinValues])

  return (
    <>
      <View style={styles.inputWrapper}>
        <InputPin 
          ref={firstInput}
          value={pinValues.first}
          style={styles.input}
          maxLength={1}
          onChangeText={text => {
            setPinValues(prev => {
              return {...prev, first: text }
            })
            text && secondInput.current.focus()
          }}
          invalid={invalidPIN}
        />
        <InputPin 
          ref={secondInput}
          value={pinValues.second}
          style={styles.input}
          maxLength={1}
          onChangeText={text => {
            setPinValues(prev => {
              return {...prev, second: text }
            })
            text && thirdInput.current.focus()
          }}
          onBackspace={() => {
            !pinValues.second && firstInput.current.focus()
          }}
          invalid={invalidPIN}
        />
        <InputPin 
          ref={thirdInput}
          value={pinValues.third}
          style={styles.input}
          maxLength={1}
          onChangeText={text => {
            setPinValues(prev => {
              return {...prev, third: text }
            })
            text && fourthInput.current.focus()
          }}
          onBackspace={() => {
            !pinValues.third && secondInput.current.focus()
          }}
          invalid={invalidPIN}
        />
        <InputPin 
          ref={fourthInput}
          value={pinValues.fourth}
          style={styles.input}
          maxLength={1}
          onChangeText={text => {
            setPinValues(prev => {
              return {...prev, fourth: text }
            })
          }}  
          onBackspace={() => {
            !pinValues.fourth && thirdInput.current.focus()
          }}
          invalid={invalidPIN}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  input: {
    width: 50,
    marginHorizontal: 10,
  }
});

export default App;
