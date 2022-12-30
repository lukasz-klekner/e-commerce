import type { NextApiHandler} from 'next'

const MAILERLITE_GROUP_ID = '75945935450932858'
const MAILERLITE_TOKEN = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiYWU2ODk0YTZjZDc3OGYyZjA1ZjAyZDZjOGViYzNkMDhhOTEzY2ExNmNjZjc1YWIzYjkzYjI4YjZiM2E5ZjYyZDk2MTJjZDgxYjFlODg2MjEiLCJpYXQiOjE2NzI0MTQxNDkuMTUzMjY1LCJuYmYiOjE2NzI0MTQxNDkuMTUzMjY3LCJleHAiOjQ4MjgwODc3NDkuMTQ5NDIyLCJzdWIiOiIyOTY5MDAiLCJzY29wZXMiOltdfQ.suXaI8Us2rrQc6Aas_FqF4wstj72WwIL_qDVo24njmABfgkICan1NY87owRrBa3a3u7JVALbqVNm1p1PHyfe0MCIrMEzQ8ohRCrR3pgM-dygrV0VsZrG4QNvUfznnnoe1jB4Gkzh6xNIG6WEbhyt8_wU1itq6I9R6pS32gQcSVE7iXOptt26Edl8CLuRa_CKg4U2F506fygvsqLg5XrRzPUeq3ixbnfrC7Lvy4vKMQ8XRPmrr6dL7mlpQm-u780_VMn6nRdRAcsgxjo1bzQoq1mDF60c1lecrN8Nw4wZiBvj6xcLT5SGUliBa1ln-0lk2cKl53-tic0m8O6qvoxL6xO6Witq1V5Aa_c9rA78lJz38PlSwo425n2adu8GUXI5a1viVI6ixXal04ia58BGeFVILm-zjWsxKTxUyIqs6p59QWwIz2dNdEifNAXz9pso3zawLU0GY7ITFZ948pOBaPUjv_NlHKPzqsVanFKhY01e32eQgQb8txIeqRe8SdPDF6H6pEoDDLJeesGcmuiicPao-vMoW8JsfqzSl5xTTm3pXrwaBhDFi1tRTaQrT3A-QuvyAY5okbIkTNJDN_hai7wLOSXW-D12Dhp0SyAntSTNtfE3exWElAKBpnmrvhvjM7sA16Wz9B4g3o6c7AliSJJpbVG5OsWa5nAwNkyk-fg'


const handler: NextApiHandler = async (req, res) => {
  if(req.method !== 'POST'){
    return res.setHeader('Allow', 'POST').status(405).json({});
  }

  const email = req.body.email

  if(typeof email !== 'string'){
    return res.status(400).json({ message: 'Niepoprawny email address'})
  }

  const response = await fetch('https://connect.mailerlite.com/api/subscribers',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : MAILERLITE_TOKEN,
    },
    body: JSON.stringify({
      email
    })
  })

  const createdSubsscriber = await response.json()

  const idSubscriber = createdSubsscriber.data.id

  if(!response.ok){
    return res.status(500).json({ message: 'Blad serwera'})
  }

  const mailerliteResponse = await fetch(`https://connect.mailerlite.com/api/subscribers/${idSubscriber}/groups/${MAILERLITE_GROUP_ID}`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : MAILERLITE_TOKEN ,
    }
  })

  if(!mailerliteResponse.ok){
    return res.status(500).json({ message: 'Blad serwera'})
  }

  res.status(201).json({ message: 'Email dodany do newslettera!' })
}

export default handler;