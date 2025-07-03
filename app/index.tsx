import alert from '@/lib/alert';
import { attendance } from '@/lib/attendance';
import { logout } from '@/lib/auth';
import { useAuthStatus } from '@/lib/authStatus';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import GetApp from '@/components/getApp';

export default function CodeScreen() {
  const isAuthenticated = useAuthStatus()
  useEffect(() => {
    if (isAuthenticated === false) {
      router.replace('/login')
    }
  }, [isAuthenticated])

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
      alert('Error', `${code.length} ${code}`)
      return
    }

    const error = await attendance(code)

    if (error) {
      alert('Failed', error)
      return
    }

    alert('Success', 'Attendance submitted!')
  }

  return (
    <View style={styles.container}>
      <GetApp />

      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={handleInput}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        autoFocus={true}
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

      <TouchableOpacity style={styles.logout} onPress={() => {
        logout()
        router.replace('/login')
      }}>
        <Text style={styles.logoutText}>logout</Text>
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
    borderBottomColor: '#aaa',
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
  logout: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  logoutText: {
    color: '#007AFF',
    fontSize: 16,
    textAlign: 'right',
  },
})
