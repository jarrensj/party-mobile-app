import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
} from 'react-native';

function App(): React.JSX.Element {
  const [text, setText] = useState('');
  const [displayText, setDisplayText] = useState('');

  const handleSubmit = () => {
    setDisplayText(text);
  };

  const handleExit = () => {
    setDisplayText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {displayText ? (
        <View style={styles.fullScreen}>
          <Text style={styles.fullScreenText}>{displayText}</Text>
          <View style={styles.exitButtonContainer}>
            <Button title="Exit" onPress={handleExit} />
          </View>
        </View>
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
  exitButtonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: '30%',
  },
});

export default App;
