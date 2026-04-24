import { motion } from 'framer-motion'
import { FileText, ExternalLink, BookOpen, AlertCircle, CheckCircle2, Clock, User } from 'lucide-react'

const documentCategories = [
  {
    title: 'Advisory Circulars',
    description: 'Official DGCA circulars and guidelines',
    count: 8,
    color: 'from-blue-500 to-cyan-400',
    documents: [
      { name: 'AC-101-1', title: 'UAS Operations Guidelines', date: 'Nov 2021', status: 'Active' },
      { name: 'AC-102-1', title: 'Type Certification', date: 'Nov 2021', status: 'Active' },
      { name: 'AC-102-37', title: 'NPNT Compliance', date: 'Nov 2021', status: 'Active' },
      { name: 'ANSS AC 01/2025', title: 'Air Navigation Safety', date: '2025', status: 'Active' },
      { name: 'ANSS AC 01/2024', title: 'Air Navigation Standards', date: '2024', status: 'Active' },
      { name: 'ANSS AC 01/2026', title: 'Updated Safety Standards', date: '2026', status: 'Active' },
      { name: 'Drone Manufacturing Circular 01/2025', title: 'Manufacturing Guidelines', date: 'Oct 2025', status: 'Active' },
      { name: 'Advisory Circular', title: 'General Drone Operations', date: 'Latest', status: 'Active' },
    ]
  },
  {
    title: 'RPTO & Training',
    description: 'Remote Pilot Training Organization documents',
    count: 4,
    color: 'from-purple-500 to-pink-400',
    documents: [
      { name: 'DTC-1-of-2022', title: 'RPTO Authorization', date: '2022', status: 'Active' },
      { name: 'DTC-02-of-2022', title: 'Syllabus', date: '2022', status: 'Active' },
      { name: 'DTC-03-of-2022', title: 'Training Procedures Manual', date: '2022', status: 'Active' },
      { name: 'Public-Notice-by-RPTO', title: 'RPTO Public Notice', date: 'Latest', status: 'Active' },
    ]
  },
  {
    title: 'Regulations & Model',
    description: 'UAS regulations and framework models',
    count: 3,
    color: 'from-emerald-500 to-teal-400',
    documents: [
      { name: 'Model UAS Reg - Part 149', title: 'UAS Certification', date: 'Latest', status: 'Active' },
      { name: 'Model UAS Reg - Parts 101 & 102', title: 'Operations & Certification', date: 'Latest', status: 'Active' },
      { name: 'Registration of Non-Type Certified UAS', title: 'Non-Certified Registration', date: 'Latest', status: 'Active' },
    ]
  },
  {
    title: 'Public Notices & Procedures',
    description: 'Official notices and operational procedures',
    count: 7,
    color: 'from-amber-500 to-orange-400',
    documents: [
      { name: 'Public Notice - Monitoring Drone Manufacturers', title: 'DGCA Oversight', date: 'Latest', status: 'Active' },
      { name: 'Public Notice - Cancellation of Registration', title: 'Registration Cancellation', date: 'Latest', status: 'Active' },
      { name: 'ASM Manual', title: 'Airspace Management', date: 'Latest', status: 'Active' },
      { name: 'Class 3 Medical Examination (1)', title: 'Medical Procedures', date: 'Latest', status: 'Active' },
      { name: 'Class 3 Medical Examination (2)', title: 'Medical Procedures', date: 'Latest', status: 'Active' },
      { name: 'RPI List', title: 'Remote Pilot Instructors', date: 'Latest', status: 'Active' },
      { name: 'Viva Results (Jul 2025 - Jan 2026)', title: 'Examination Results', date: '2025-2026', status: 'Active' },
    ]
  },
]

const stats = [
  { label: 'Total Documents', value: '25+', icon: FileText },
  { label: 'Categories', value: '4', icon: BookOpen },
  { label: 'Active', value: '100%', icon: CheckCircle2 },
  { label: 'Indexed', value: 'Full', icon: CheckCircle2 },
]

export default function Documents({ showFull = true }) {
  if (!showFull) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Document Library</h2>
          <p className="text-dark-400 max-w-2xl mx-auto">
            Comprehensive collection of DGCA regulations, circulars, and guidelines
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <Icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-dark-400">{stat.label}</p>
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
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4">Document Library</h1>
        <p className="text-xl text-dark-400 max-w-3xl mx-auto">
          Complete collection of indexed DGCA documents powering the RAG system
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
          <span className="text-sm text-green-400">All documents indexed and searchable</span>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="glass-card p-6 text-center">
              <Icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-dark-400">{stat.label}</p>
            </div>
          )
        })}
      </motion.div>

      {/* Categories */}
      <div className="space-y-8">
        {documentCategories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-card overflow-hidden"
          >
            {/* Category Header */}
            <div className="p-6 border-b border-dark-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{category.title}</h2>
                    <p className="text-sm text-dark-400">{category.description}</p>
                  </div>
                </div>
                <div className="px-4 py-2 rounded-full bg-dark-700/50 text-sm text-dark-300">
                  {category.count} documents
                </div>
              </div>
            </div>

            {/* Document List */}
            <div className="divide-y divide-dark-700/30">
              {category.documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-4 flex items-center justify-between hover:bg-dark-800/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-dark-700/50 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-dark-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{doc.name}</p>
                      <p className="text-sm text-dark-400">{doc.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 text-sm text-dark-500">
                      <Clock className="w-4 h-4" />
                      {doc.date}
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs">
                      <CheckCircle2 className="w-3 h-3" />
                      {doc.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 glass-card p-6 text-center"
      >
        <AlertCircle className="w-6 h-6 text-blue-400 mx-auto mb-3" />
        <p className="text-dark-300 max-w-2xl mx-auto">
          All documents are automatically chunked and embedded into the FAISS vector database. 
          The system retrieves relevant passages based on semantic similarity to your queries.
        </p>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-dark-500">
          <User className="w-4 h-4" />
          <span>System Architect: <span className="text-blue-400 font-medium">Aribam Aditya Sharma</span></span>
        </div>
      </motion.div>
    </div>
  )
}
