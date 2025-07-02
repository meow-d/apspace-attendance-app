import { Alert } from 'react-native';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web'

/**
 * Displays an alert using React Native's alert, but with a window.alert fallback for the web.
*/
export default function alert(title: string, message: string): void {
  if (isWeb) window.alert(`${title}: ${message}`);
  else Alert.alert(title, message);
}
