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
        <View>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            value={text}
            onChangeText={setText}
          />
          <Button title="Submit" onPress={handleSubmit} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenText: {
    fontSize: 24,
    transform: [{ rotate: '90deg' }],
    textAlign: 'center',
  },
});

export default App;
