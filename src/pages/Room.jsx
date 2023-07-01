import React, {useState, useEffect, useRef} from 'react'
import client, { databases, DATABASE_ID, COLLECTION_ID_MESSAGES } from '../appwriteConfig'
import {ID, Query, Role, Permission} from 'appwrite'
import {Trash2} from 'react-feather'
import Header from '../components/Header'
import { useAuth } from '../utils/AuthContext'

const Room = () => {

    const { user } = useAuth()

    const [messages, setMessages] = useState([])
    const [messageBody, setMessageBody] = useState('')
    const messagesRef = useRef();
    messagesRef.current = messages

    console.log('top',messages)

    // const getCurrentMessages = () => {
    //     return messages
    // }

    useEffect(() =>{
        getMessages()

        const unsubscribe = client.subscribe([`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`], response => {
            console.log('top subscribe', messages)
            if(response.events.includes("databases.*.collections.*.documents.*.create")){
                console.log('A MESSAGE WAS CREATED', response.payload)
                console.log('MESSAGES BEFORE SETMESSAGES:', messages, messagesRef)
                setMessages([response.payload, ...messagesRef.current])
                // setMessages(prevState => [response.payload, ...messagesRef.current])

            }

            if(response.events.includes("databases.*.collections.*.documents.*.delete")){
                console.log('A MESSAGE WAS DELETED!!')
                const newMessages = messagesRef.current.filter(message => message.$id !== response.payload.$id)
                console.log(newMessages)
                setMessages([...newMessages]) 
                // setMessages(prevState => messages.filter(message => message.$id !== response.payload.$id))

            }
        });

        return () => {
            unsubscribe()
        }
    }, [])

    const handleSubmit = async (e) => {
        console.log('top handle submit',messages)
        e.preventDefault()

        let payload = {
            userid: user.$id,
            username: user.name,
            body: messageBody
        }

        // 4 permissions - import role and permissions from appwrite
        let permissions = [
            Permission.write(Role.user(user.$id))
        ]
        let response = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            ID.unique(),
            payload,
            permissions
        )
            console.log('created', response)

        // setMessages(prevState => [response, ...messages])
        setMessageBody('') //resets the message
        console.log('bottom handle submit', messages)
    }

    const getMessages = async () => {
        const response = await databases.listDocuments(
            DATABASE_ID, 
            COLLECTION_ID_MESSAGES,
            [
                Query.orderDesc('$createdAt'),
                Query.limit(20)
            ]
            )
        console.log('RESPONSE:', response)
        setMessages(response.documents)
    }

    const deleteMessage = async (message_id) => {
        databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, message_id)
        // updating message array
        // setMessages(prevState => messages.filter(message => message.$id !== message_id))
    }

    return (
        <main className='container'>
            <Header />
            <div className='room--container'>
                <form onSubmit={handleSubmit} id='message--form'>
                    <div>
                        <textarea
                            required
                            maxLength='1000'
                            placeholder='Say hey'
                            onChange={(e)=>{setMessageBody(e.target.value)}}
                            value={messageBody}
                            ></textarea>
                    </div>
                    <div className='send-btn--wrapper'>
                       <input className='btn btn--secondary' type='submit' value='Send'/>
                    </div>
                </form>
                <div>
                    <div>
                        {messages.map(message =>(
                            <div key={message.$id} className='messages--wrapper'>
                                <div className='message--header'>
                                    <p>
                                        {message?.username ? (
                                            <span>{message.username}</span>
                                        ): (
                                           <span>Anonymous user</span>
                                        )}
                                         <small className='message-timestamp'
                                    >
                                        {new Date (message.$createdAt).toLocaleString()}
                                    </small>
                                    </p>
                                    {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
                                        <Trash2 
                                        className='delete--btn'
                                        onClick={() =>{deleteMessage(message.$id)}}
                                        /> 
                                    )}
                                    
                                </div>
                                <div className='message--body'>
                                    <span>{message.body}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Room