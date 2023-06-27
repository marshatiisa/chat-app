import React, {useState, useEffect} from 'react'
import { databases, DATABASE_ID, COLLECTION_ID_MESSAGES } from '../appwriteConfig'

const Room = () => {

const [messages, setMessages] = useState([])
    useEffect(() =>{
        getMessages()
    }, [])

    const getMessages = async () => {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_MESSAGES)
        console.log('RESPONSE:', response)
        setMessages(response.documents)
    }
    return (
        <div>
            <div>
                {messages.map(messages =>(
                    <div key={messages.$id}>
                        <div>
                            <p>{messages.$createdAt}</p>
                        </div>
                        <div>
                            <span>{messages.body}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Room