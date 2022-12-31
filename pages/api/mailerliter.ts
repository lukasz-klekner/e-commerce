import type { NextApiHandler} from 'next'

const handler: NextApiHandler = async (req, res) => {
  if(req.method !== 'POST'){
    return res.setHeader('Allow', 'POST').status(405).json({});
  }

  const MAILERLITE_TOKEN = process.env.MAILERLITE_TOKEN
  const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID

  if(!MAILERLITE_TOKEN ||!MAILERLITE_GROUP_ID){
    return res.status(500).json({ message: 'Brak zmiennych srodowiskowych!'})
  }

  const email = req.body.email

  if(typeof email !== 'string'){
    return res.status(400).json({ message: 'Niepoprawny email address'})
  }

  const response = await fetch('https://connect.mailerlite.com/api/subscribers',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${MAILERLITE_TOKEN}`,
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
      'Authorization' : `Bearer ${MAILERLITE_TOKEN}`,
    }
  })

  if(!mailerliteResponse.ok){
    return res.status(500).json({ message: 'Blad serwera'})
  }

  res.status(201).json({ message: 'Email dodany do newslettera!' })
}

export default handler;