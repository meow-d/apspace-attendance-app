import { getItem, setItem } from './store'

// TODO: chatgpt generated, cleanup needed

const baseUrl = 'https://cas.apiit.edu.my/cas/v1/tickets'

export async function login(username: string, password: string): Promise<boolean> {
  try {
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
    })

    if (res.status !== 201) return false

    const location = res.headers.get('Location')
    if (!location || !location.includes('TGT-')) return false

    const tgt = location.split('/').pop()

    await setItem('username', username)
    await setItem('password', password)
    await setItem('tgt', tgt!)
    return true
  } catch {
    return false
  }
}

export async function logout(): Promise<void> {
  await setItem('username', '')
  await setItem('password', '')
  await setItem('tgt', '')
}

// helpers
export async function getTicket(service: string): Promise<string | null> {
  const tgt = await getItem('tgt')
  if (!tgt) return null

  const res = await fetch(`${baseUrl}/${tgt}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `service=${encodeURIComponent(service)}`,
  })

  const text = await res.text()
  return text.startsWith('ST-') ? text : null
}

export async function refreshTGT(): Promise<boolean> {
  const username = await getItem('username')
  const password = await getItem('password')
  if (!username || !password) return false

  return await login(username, password)
}
