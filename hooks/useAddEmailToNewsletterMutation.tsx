import { useMutation } from "react-query"

export const useAddEmailToNewsletterMutation = () => 
    useMutation('add-to-newsletter', async ({ email } : { email : string} ) => {
        try {
            const response = await fetch('http://localhost:3000/api/mailerliter',{ 
                method: 'POST',     
                headers: {
                    'Content-Type': 'application/json'
                },     
                body: JSON.stringify({
                    email
                })})
            } catch (error) {
                console.error(error)
            }
    })