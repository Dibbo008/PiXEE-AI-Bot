import { prevUser } from "./context/UserContext"

const Api_Url="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyDUm6oZM-jZl7HSaphkTQr1kVwSyLXttsk"

export async function generateResponse() {

    let RequestOption={
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
            "contents": [
                    {
                    "parts": [
                        {"text":prevUser.prompt},
                        prevUser.data?[{"inline_data": {
                            "mime_type": prevUser.mime_type,
                            "data": prevUser.data}}]:[]
                        ]
                    }
                ],
        })
        }
    try{
        let response= await fetch(Api_Url,RequestOption)
        let data=await response.json()
        let apiResponse=data.candidates[0].content.parts[0].text.replace(/(\*\*|__)([\s\S]*?)\1/g, '$2').trim()
        return apiResponse;
    }
    catch{

    }

}