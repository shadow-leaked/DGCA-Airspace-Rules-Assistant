import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Shield, Zap, BookOpen, MessageCircle } from 'lucide-react'

const features = [
  { icon: Sparkles, label: 'AI-Powered', desc: 'RAG-based answers' },
  { icon: Shield, label: 'Verified', desc: 'DGCA sources only' },
  { icon: Zap, label: 'Fast', desc: 'Local LLM inference' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-600/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-800/60 border border-dark-700/50 mb-8"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-dark-300">RAG System Active with 25+ DGCA Documents</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            <span className="block">DGCA Drone</span>
            <span className="block text-gradient">Rules Assistant</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-dark-300 max-w-2xl mx-auto mb-10"
          >
            AI-powered RAG system for Indian drone regulations. Get accurate answers 
            from official DGCA documents, NPNT guidelines, and airspace rules.
          </motion.p>

          {/* Architect Credit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mb-10"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600/10 to-cyan-500/10 border border-blue-500/20">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
                AS
              </div>
              <div className="text-left">
                <p className="text-xs text-dark-400 uppercase tracking-wider">System Architect</p>
                <p className="text-lg font-semibold text-white">Aribam Aditya Sharma</p>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              to="/chat"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-2xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all flex items-center gap-3"
            >
              <MessageCircle className="w-5 h-5" />
              Start Chatting
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/architecture"
              className="px-8 py-4 text-dark-300 hover:text-white font-medium rounded-2xl border border-dark-700 hover:border-dark-600 hover:bg-dark-800/50 transition-all flex items-center gap-3"
            >
              <BookOpen className="w-5 h-5" />
              View Architecture
            </Link>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 px-5 py-3 rounded-xl bg-dark-800/40 border border-dark-700/50 backdrop-blur-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-white">{feature.label}</p>
                    <p className="text-xs text-dark-400">{feature.desc}</p>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: '25+', label: 'DGCA Documents' },
            { value: '100%', label: 'Local RAG' },
            { value: '384D', label: 'Vector Dim' },
            { value: 'FAISS', label: 'Vector DB' },
          ].map((stat, index) => (
            <div
              key={index}
              className="glass-card p-6 text-center hover:bg-dark-800/80 transition-all group"
            >
              <p className="text-3xl font-bold text-gradient group-hover:scale-110 transition-transform inline-block">
                {stat.value}
              </p>
              <p className="text-sm text-dark-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
