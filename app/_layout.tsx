import { useAuthStatus } from '@/lib/authStatus'
import { Stack } from 'expo-router'

export default function Layout() {
  const isAuthenticated = useAuthStatus()

  if (isAuthenticated === null) return null

  return <Stack screenOptions={{ headerShown: false }}>
    <Stack.Protected guard={!isAuthenticated}>
      <Stack.Screen name="login" />
    </Stack.Protected>
    <Stack.Protected guard={isAuthenticated}>
      <Stack.Screen name="index" />
    </Stack.Protected>
  </Stack>
}
