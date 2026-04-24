import { motion } from 'framer-motion'
import { Database, Brain, Shield, FileText, Cpu, ArrowRight, Layers, Search, Filter, MessageSquare, Server, HardDrive } from 'lucide-react'

const architectureSteps = [
  {
    icon: FileText,
    title: 'Document Ingestion',
    description: '25+ DGCA PDFs loaded via PyPDF',
    details: ['Advisory Circulars', 'Public Notices', 'RPTO Guidelines', 'Medical Procedures'],
    color: 'from-blue-500 to-cyan-400',
  },
  {
    icon: Layers,
    title: 'Text Chunking',
    description: '700-char chunks with 100-char overlap',
    details: ['Recursive splitting', 'Metadata preservation', 'Page tracking', 'Source attribution'],
    color: 'from-cyan-500 to-teal-400',
  },
  {
    icon: Brain,
    title: 'Embedding Generation',
    description: 'all-MiniLM-L6-v2 via sentence-transformers',
    details: ['384-dimensional vectors', 'Normalized embeddings', 'Cached model', 'Local processing'],
    color: 'from-teal-500 to-emerald-400',
  },
  {
    icon: Database,
    title: 'FAISS Vector Store',
    description: 'IndexFlatIP for similarity search',
    details: ['Inner product metric', 'Top-K retrieval', 'Persisted index', 'Fast lookups'],
    color: 'from-purple-500 to-pink-400',
  },
  {
    icon: Search,
    title: 'Query Retrieval',
    description: 'Semantic search with score filtering',
    details: ['Min score: 0.25', 'Top 5 chunks', 'Distance calculation', 'Confidence scoring'],
    color: 'from-pink-500 to-rose-400',
  },
  {
    icon: Shield,
    title: 'Guardrails',
    description: 'Domain validation & query sanitization',
    details: ['Domain term matching', 'Length validation', 'Off-topic detection', 'Safety filters'],
    color: 'from-orange-500 to-amber-400',
  },
  {
    icon: MessageSquare,
    title: 'Response Generation',
    description: 'Local LLM (Phi3/Mistral via Ollama)',
    details: ['Grounded answers only', 'No hallucinations', 'Source grounding', 'Low temperature'],
    color: 'from-amber-500 to-yellow-400',
  },
]

const techStack = [
  { category: 'Backend', items: ['FastAPI', 'Python 3.11', 'Uvicorn', 'Pydantic'] },
  { category: 'AI/ML', items: ['LangChain', 'Ollama', 'Phi3/Mistral', 'sentence-transformers'] },
  { category: 'Vector DB', items: ['FAISS', 'NumPy', 'Pickle serialization'] },
  { category: 'Document', items: ['PyPDF', 'PDFMiner', 'Unstructured'] },
  { category: 'Frontend', items: ['React 18', 'Vite', 'TailwindCSS', 'Framer Motion'] },
]

export default function Architecture({ showFull = true }) {
  if (!showFull) {
    // Preview version for home page
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">System Architecture</h2>
          <p className="text-dark-400 max-w-2xl mx-auto">
            A complete RAG pipeline from document ingestion to AI response generation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {architectureSteps.slice(0, 3).map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 hover:bg-dark-800/80 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-dark-400">{step.description}</p>
              </motion.div>
            )
          })}
        </div>
      </section>
    )
  }

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-white mb-4">System Architecture</h1>
        <p className="text-xl text-dark-400 max-w-3xl mx-auto">
          Complete RAG (Retrieval-Augmented Generation) pipeline designed by 
          <span className="text-blue-400 font-semibold"> Aribam Aditya Sharma</span>
        </p>
      </motion.div>

      {/* Architecture Flow */}
      <div className="relative mb-20">
        {/* Flow Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-purple-500 hidden lg:block" />

        <div className="space-y-8">
          {architectureSteps.map((step, index) => {
            const Icon = step.icon
            const isEven = index % 2 === 0

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`relative flex flex-col lg:flex-row items-center gap-6 ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className={`flex-1 ${isEven ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12'}`}>
                  <div className="glass-card p-6 hover:bg-dark-800/80 transition-all group">
                    <div className={`flex items-center gap-3 mb-4 ${isEven ? 'lg:justify-end' : ''}`}>
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                    </div>
                    <p className="text-dark-300 mb-4">{step.description}</p>
                    <div className={`flex flex-wrap gap-2 ${isEven ? 'lg:justify-end' : ''}`}>
                      {step.details.map((detail, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-xs rounded-full bg-dark-700/50 text-dark-300 border border-dark-600/50"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Center Node */}
                <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-2xl font-bold text-white text-center mb-8">Technology Stack</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {techStack.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-5"
            >
              <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">
                {category.category}
              </h3>
              <ul className="space-y-2">
                {category.items.map((item, idx) => (
                  <li key={idx} className="text-sm text-dark-300 flex items-center gap-2">
                    <span className="w-1 h-1 bg-cyan-400 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Infrastructure */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card p-8"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Infrastructure Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <Server className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">FastAPI Backend</h3>
              <p className="text-dark-400 text-sm">
                Asynchronous Python web framework handling chat endpoints, 
                document indexing, and vector database queries.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <HardDrive className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Local LLM (Ollama)</h3>
              <p className="text-dark-400 text-sm">
                Self-hosted language model (Phi3/Mistral) running locally 
                for privacy and zero API costs.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
              <Database className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">FAISS Vector DB</h3>
              <p className="text-dark-400 text-sm">
                Facebook AI Similarity Search for efficient semantic 
                document retrieval with Inner Product metric.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <Cpu className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Sentence Transformers</h3>
              <p className="text-dark-400 text-sm">
                all-MiniLM-L6-v2 model for generating 384-dimensional 
                embeddings optimized for semantic similarity.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
