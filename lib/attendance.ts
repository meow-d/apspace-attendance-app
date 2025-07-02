import { getTicket, refreshTGT } from './auth';

// TODO: chatgpt generated, cleanup needed

export async function attendance(code: string): Promise<string | null> {
  const service = 'https://api.apiit.edu.my/attendix'
  let ticket = await getTicket(service)

  if (!ticket) {
    const ok = await refreshTGT()
    if (!ok) return 'Login failed while refreshing TGT'
    ticket = await getTicket(service)
    if (!ticket) return 'Failed to get service ticket'
  }

  const body = JSON.stringify({
    operationName: 'updateAttendance',
    variables: { otp: code },
    query: `mutation updateAttendance($otp: String!) {
      updateAttendance(otp: $otp) {
        id attendance classcode date startTime endTime classType __typename
      }
    }`,
  })

  const res = await fetch('https://attendix.apu.edu.my/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': 'da2-u4ksf3gspnhyjcokxzugo3mqr4',
      'ticket': ticket,
    },
    body,
  })

  const json = await res.json()

  if (!json || json.errors?.length) {
    const msg = json.errors?.[0]?.message?.toLowerCase() ?? 'Unknown error'
    return `Error: ${msg}`
  }

  return null
}
