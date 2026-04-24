import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Loader2, FileText, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your DGCA Drone Rules Assistant. Ask me about Indian UAS/RPAS regulations, NPNT, Digital Sky, airspace zones, or any drone-related compliance questions.',
      sources: [],
      confidence: null,
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.answer,
        sources: data.sources || [],
        confidence: data.confidence,
      }])
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please ensure the backend server is running (uvicorn src.api:app --reload).',
        sources: [],
        confidence: null,
        error: true,
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">DGCA Drone Assistant</h1>
        <p className="text-dark-400">Powered by RAG • Architected by Aribam Aditya Sharma</p>
      </motion.div>

      {/* Chat Container */}
      <div className="glass-card overflow-hidden flex flex-col h-[calc(100vh-280px)] min-h-[500px]">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-blue-600 to-cyan-500'
                    : 'bg-gradient-to-br from-purple-600 to-pink-500'
                }`}>
                  {message.role === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>

                {/* Message Content */}
                <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block text-left px-5 py-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                      : message.error
                        ? 'bg-red-500/20 border border-red-500/30 text-red-200'
                        : 'bg-dark-800/60 border border-dark-700/50 text-dark-100'
                  }`}>
                    <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  </div>

                  {/* Sources */}
                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-2 ml-1">
                      <details className="group">
                        <summary className="flex items-center gap-2 text-xs text-dark-400 hover:text-blue-400 cursor-pointer transition-colors">
                          <FileText className="w-3 h-3" />
                          Sources ({message.sources.length})
                          <span className="group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <ul className="mt-2 space-y-1 pl-5 text-xs text-dark-400">
                          {message.sources.map((source, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="w-1 h-1 bg-blue-500 rounded-full" />
                              {source.source} (Page {source.page})
                              {source.chunk && <span className="text-dark-500"> Chunk {source.chunk}</span>}
                            </li>
                          ))}
                        </ul>
                      </details>
                    </div>
                  )}

                  {/* Confidence */}
                  {message.confidence !== null && message.confidence !== undefined && (
                    <div className="mt-1 ml-1 flex items-center gap-1 text-xs">
                      {message.confidence >= 0.5 ? (
                        <CheckCircle2 className="w-3 h-3 text-green-400" />
                      ) : (
                        <AlertCircle className="w-3 h-3 text-yellow-400" />
                      )}
                      <span className={message.confidence >= 0.5 ? 'text-green-400' : 'text-yellow-400'}>
                        Confidence: {(message.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading Indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-dark-800/60 border border-dark-700/50">
                <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                <span className="text-sm text-dark-400">Retrieving from vector database...</span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-dark-700/50 p-4 bg-dark-900/50">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about DGCA drone regulations, NPNT, airspace zones..."
              className="flex-1 px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 resize-none"
              rows={2}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
          <p className="mt-2 text-xs text-dark-500 text-center">
            Press Enter to send, Shift+Enter for new line • Answers sourced from indexed DGCA documents
          </p>
        </div>
      </div>
    </div>
  )
}
