import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

export default function Button({
  onPress,
  title, }: {
    onPress: () => void;
    title: string;
  }) {
  const [buttonStyle, setbuttonStyle] = useState(styles.button);

  return (
    <Pressable
      style={buttonStyle}
      onPressIn={() => setbuttonStyle({ ...styles.button, ...styles.buttonActive })}
      onPressOut={() => setbuttonStyle(styles.button)}
      onPress={onPress}
    >
      <LinearGradient
        locations={[0.3, 0.7, 0.9]}
        colors={['#3D52D5', '#001dd3', '#3D52D5']}
        style={styles.gradient}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 15,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
    overflow: 'hidden',
  },
  buttonActive: {
    shadowOpacity: 0.4,
    filter: 'brightness(0.8)',
    transform: [{ scale: 0.99 }],
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
