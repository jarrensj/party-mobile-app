import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Button,
  useColorScheme,
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
          <Button title="Exit" onPress={handleExit} />
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
    marginBottom: 20,
  },
});

export default App;
