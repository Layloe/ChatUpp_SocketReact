import React, { useState, useContext, useEffect } from "react";
import io from 'socket.io-client'
import jwtDecode from 'jwt-decode'
import ChatRoomList from './components/ChatRoomList'
import MessageList from "./components/MessageList";
import LoginForm from "./components/Login";
import SignForm from "./components/Signup";
import { AuthContext } from './components/AuthContext'

const socket = io('http://localhost:4000')

function AppContent() {
    const [rooms, setRoom] = useState(['General', 'Sports', 'Coding'])
    const [currentRoom, setCurrentRoom] = useState(null)
    const [messages, setMessages] = useState([])
    const { isAuthenticated, setIsAuthenticated, setToken, token, username, setUsername } = useContext(AuthContext)

    useEffect(() => {
        if(isAuthenticated) {
            socket.connect()

            socket.on('connect', () => {
                console.log('Connected to server')
            })

            socket.on('newMessage', (message) => {
                setMessages((prevMessages) => [message, ...prevMessages])
            })

            socket.on('previousMessages', (previousMessages) => {
                setMessages(prevMessages)
            })
        } else {
            socket.disconnect()
        }
        return () => {
             socket.off('connect')
             socket.off('newMessage')
             socket.off('previousMessage')
        }
    }, [isAuthenticated])

    const handleLogin = (token, username) => {
        localStorage.setItem('token', token)
        setToken(token)
        localStorage.setItem('username', username)
        setUsername(username)
        setIsAuthenticated(true)
    }

    const handleSignup = (token, username) => {
        localStorage.setItem('token', token)
        setToken(token)
        localStorage.setItem('username', username)
        setUsername(username)
        setIsAuthenticated(true)
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        setIsAuthenticated(false)
        setToken(null)
        setUsername(null)
        socket.disconnect()
    }


}

