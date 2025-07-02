import { useState } from 'react'
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { attendance } from '@/lib/attendance'
import { useRouter } from 'expo-router'
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { logout } from '@/lib/auth';

export default function CodeScreen() {
  const CELL_COUNT = 3;

  const [code, setCode] = useState('')

  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const router = useRouter()

  const handleInput = (text: string) => {
    if (/^\d*$/.test(text) && text.length <= CELL_COUNT) {
      setCode(text)
    }

    if (text.length === CELL_COUNT) {
      handleSubmit(text)
    }
  }

  const handleSubmit = async (code: string) => {
    if (code.length !== 3) {
      Alert.alert('Error', `${code.length} ${code}`)
      return
    }

    const error = await attendance(code)

    if (error) {
      Alert.alert('Failed', error)
      return
    }

    Alert.alert('Success', 'Attendance submitted!')
  }

  return (
    <View style={styles.container}>
      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={handleInput}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}>
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />

      <TouchableOpacity onPress={() => {
        logout()
        router.replace('/login')
      }}>
        <Text style={{ color: '#007AFF', fontSize: 16 }}>logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f7f8fa',
  },
  codeFieldRoot: {
    marginTop: 20,
    width: 280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  cellText: {
    color: '#000',
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: '#007AFF',
    borderBottomWidth: 2,
  },
})
