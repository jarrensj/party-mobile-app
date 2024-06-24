import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// white, black, pink, blue, orange 
const predefinedColors = ['#FFFFFF', '#000000', '#FFC0CB', '#0000FF', '#FFA500'];

function App(): React.JSX.Element {
  const [text, setText] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [textColor, setTextColor] = useState('#000000');
  const [showColorOptions, setShowColorOptions] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
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

  const handleBackgroundColorChange = (color: string) => {
    setBackgroundColor(color);
    if (color === textColor) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  };

  const handleTextColorChange = (color: string) => {
    setTextColor(color);
    if (color === backgroundColor) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  };

  const getFontSize = (text: string) => {
    const baseSize = Math.min(width, height) / 5; // Base font size scaling factor
    const lengthFactor = text.length > 50 ? 0.4 : text.length > 20 ? 0.6 : 1;
    return baseSize * lengthFactor;
  };

  return (
    <SafeAreaView style={styles.container}>
      {displayText ? (
        <TouchableOpacity
          style={[styles.fullScreen, { backgroundColor }]}
          activeOpacity={1}
          onPress={handleTripleTap}
        >
          <Text
            style={[
              styles.fullScreenText,
              { color: textColor, fontSize: getFontSize(displayText) },
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {displayText}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            value={text}
            onChangeText={setText}
          />
          <Button
            title={showColorOptions ? 'Hide Edit Styles' : 'Show Edit Styles'}
            onPress={() => setShowColorOptions(!showColorOptions)}
          />
          {showColorOptions && (
            <>
              <Text style={styles.label}>Choose Text Color:</Text>
              <View style={styles.colorPickerContainer}>
                {predefinedColors.map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorPicker,
                      { backgroundColor: color },
                      textColor === color && styles.selectedColorPicker,
                    ]}
                    onPress={() => handleTextColorChange(color)}
                  />
                ))}
              </View>
              <Text style={styles.label}>Choose Background Color:</Text>
              <View style={styles.colorPickerContainer}>
                {predefinedColors.map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorPicker,
                      { backgroundColor: color },
                      backgroundColor === color && styles.selectedColorPicker,
                    ]}
                    onPress={() => handleBackgroundColorChange(color)}
                  />
                ))}
              </View>
            </>
          )}
          {showWarning && (
            <Text style={styles.warningText}>
              Warning: Text and background color are the same!
            </Text>
          )}
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
    alignItems: 'center',
    padding: 16,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '80%',
  },
  label: {
    marginVertical: 8,
    fontSize: 16,
  },
  colorPickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  colorPicker: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
  selectedColorPicker: {
    borderWidth: 3,
    borderColor: 'blue',
  },
  warningText: {
    color: 'red',
    marginVertical: 8,
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
    width: '100%',
  },
  fullScreenText: {
    transform: [{ rotate: '90deg' }],
    textAlign: 'center',
    width: '100%',
  },
});

export default App;
