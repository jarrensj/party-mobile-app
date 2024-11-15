import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  TouchableOpacity,
  Switch,
  Dimensions,
} from 'react-native';

const predefinedColors = ['#FFFFFF', '#000000', '#FFC0CB', '#0000FF', '#FFA500'];
const { width, height } = Dimensions.get('window');

interface LEDDisplayProps {
  text: string;
  textColor: string;
  backgroundColor: string;
  onTripleTap: () => void;
}

const LEDDisplay: React.FC<LEDDisplayProps> = ({ text, textColor, backgroundColor, onTripleTap }) => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const animation = setInterval(() => {
      setPosition((prevPosition) => {
        if (prevPosition > width) {
          return -width;
        }
        return prevPosition + 8; // speed of animation
      });
    }, 50);

    return () => clearInterval(animation);
  }, []);

  return (
    <TouchableOpacity
      style={[styles.ledContainer, { backgroundColor }]}
      activeOpacity={1}
      onPress={onTripleTap}
    >
      <View style={styles.ledTextContainer}>
        <Text
          style={[
            styles.ledText,
            { color: textColor, transform: [{ translateX: position }] },
          ]}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

function App(): JSX.Element {
  const [text, setText] = useState<string>('');
  const [displayText, setDisplayText] = useState<string>('');
  const [backgroundColor, setBackgroundColor] = useState<string>('#FFFFFF');
  const [textColor, setTextColor] = useState<string>('#000000');
  const [showColorOptions, setShowColorOptions] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [forceSingleLine, setForceSingleLine] = useState<boolean>(false);
  const [isLEDMode, setIsLEDMode] = useState<boolean>(false);
  const tapCountRef = useRef<number>(0);
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSubmit = () => {
    setDisplayText(text);
  };

  const handleExit = () => {
    setDisplayText('');
    setIsLEDMode(false);
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
        isLEDMode ? (
          <LEDDisplay
            text={displayText}
            textColor={textColor}
            backgroundColor={backgroundColor}
            onTripleTap={handleTripleTap}
          />
        ) : (
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
              numberOfLines={forceSingleLine ? 1 : undefined}
              adjustsFontSizeToFit
            >
              {displayText}
            </Text>
          </TouchableOpacity>
        )
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
              <View style={styles.switchContainer}>
                <Text style={styles.label}>Force Single Line </Text>
                <Switch
                  value={forceSingleLine}
                  onValueChange={setForceSingleLine}
                />
              </View>
              <View style={styles.switchContainer}>
                <Text style={styles.label}>LED Display Mode </Text>
                <Switch value={isLEDMode} onValueChange={setIsLEDMode} />
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
  ledContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: height, // use height for width due to rotation
    height: '100%',
    transform: [{ rotate: '90deg' }],
  },
  ledTextContainer: {
    width: height, // use height for width due to rotation
    overflow: 'hidden',
    height: '100%', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  ledText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});

export default App;
