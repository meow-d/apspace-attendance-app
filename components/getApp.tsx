import { Linking, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function GetApp() {
  return (
    <TouchableOpacity
      onPress={() => Linking.openURL('https://github.com/meow-d/apspace-attendance-app/releases/latest')}
      style={styles.getApp}
    >
      <Text style={styles.getAppText}>
        get the app
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  getApp: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  getAppText: {
    color: '#007AFF',
    fontSize: 16,
    textAlign: 'left',
  },
});
