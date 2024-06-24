import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  TouchableOpacity,
} from 'react-native';

function App(): React.JSX.Element {
  const [text, setText] = useState('');
  const [displayText, setDisplayText] = useState('');
  const tapCountRef = useRef(0);
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSubmit = () => {
    setDisplayText(text);
  };

  const handleExit = () => {
    setDisplayText('');
  };

  const handleTripleTap = () => {
    tapCountRef.current += 1;

    if (tapCountRef.current === 3) {
      handleExit();
      tapCountRef.current = 0;
      if (tapTimeoutRef.current) {
        clearTimeout(tapTimeoutRef.current);
      }
    } else {
      if (tapTimeoutRef.current) {
        clearTimeout(tapTimeoutRef.current);
      }

      tapTimeoutRef.current = setTimeout(() => {
        tapCountRef.current = 0;
      }, 300);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {displayText ? (
        <TouchableOpacity
          style={styles.fullScreen}
          activeOpacity={1}
          onPress={handleTripleTap}
        >
          <Text style={styles.fullScreenText}>{displayText}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            value={text}
            onChangeText={setText}
          />
          <Button title="Submit" onPress={handleSubmit} />
          <Text style={styles.instructionText}>
            After submit, tap three times quickly to exit that screen.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '80%',
  },
  instructionText: {
    marginTop: 4,
    textAlign: 'center',
    color: 'gray',
    fontSize: 10,
  },
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  fullScreenText: {
    fontSize: 48,
    transform: [{ rotate: '90deg' }],
    textAlign: 'center',
  },
});

export default App;
