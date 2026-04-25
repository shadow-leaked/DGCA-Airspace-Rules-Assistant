import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart, ExternalLink, Code, Database, Cpu, User, Globe, Briefcase } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-dark-700/50 bg-dark-900/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Me / Connect with Dev */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">Aribam Aditya Sharma</h3>
                <p className="text-xs text-blue-400">System Architect & Developer</p>
              </div>
            </div>
            <p className="text-dark-400 text-sm mb-4 max-w-md">
              Hi! I'm a software developer passionate about AI/ML and aviation technology. 
              This RAG system is built from scratch to help drone operators navigate DGCA regulations. 
              Let's connect and build something amazing together!
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/shadow-leaked"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-dark-800 hover:bg-dark-700 rounded-lg text-dark-300 hover:text-white transition-all flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/aditya-sharma-616b17272"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-dark-800 hover:bg-dark-700 rounded-lg text-dark-300 hover:text-white transition-all flex items-center gap-2"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href="mailto:shadowleaked@gmail.com"
                className="px-4 py-2 bg-dark-800 hover:bg-dark-700 rounded-lg text-dark-300 hover:text-white transition-all flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-dark-400 hover:text-blue-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="/chat" className="text-dark-400 hover:text-blue-400 transition-colors">Chat Assistant</a>
              </li>
              <li>
                <a href="/architecture" className="text-dark-400 hover:text-blue-400 transition-colors">Architecture</a>
              </li>
              <li>
                <a href="/documents" className="text-dark-400 hover:text-blue-400 transition-colors">Documents</a>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="font-semibold text-white mb-4">Tech Stack</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-dark-400">
                <Code className="w-4 h-4" />
                FastAPI + React
              </li>
              <li className="flex items-center gap-2 text-dark-400">
                <Database className="w-4 h-4" />
                FAISS Vector DB
              </li>
              <li className="flex items-center gap-2 text-dark-400">
                <Cpu className="w-4 h-4" />
                Ollama (Local LLM)
              </li>
              <li className="flex items-center gap-2 text-dark-400">
                <ExternalLink className="w-4 h-4" />
                <a href="https://langchain.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                  LangChain
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-dark-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-dark-500">
              © {new Date().getFullYear()} DGCA Drone Rules Assistant. Built with{' '}
              <Heart className="w-4 h-4 inline text-red-400 mx-1" /> by{' '}
              <span className="text-blue-400 font-medium">Aribam Aditya Sharma</span>
            </p>
            <div className="flex items-center gap-6 text-sm text-dark-500">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                System Operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
