import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import LanguageSelector from '../components/LanguageSelector'

export default function OpmlImport() {
  const [file, setFile] = useState(null)
  const { t } = useTranslation()

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.name.endsWith('.opml')) {
      setFile(selectedFile)
    } else {
      toast.error(t('opml.invalidFile'))
      e.target.value = ''
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      toast.error(t('opml.noFile'))
      return
    }

    try {
      // TODO: Implement actual OPML file processing
      toast.success(t('opml.importSuccess'))
    } catch (error) {
      toast.error(t('opml.importError'))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <LanguageSelector />
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">{t('opml.title')}</h2>
        <div className="mb-6">
          <p className="text-gray-600 text-center">{t('opml.description')}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
            <div className="mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <label className="cursor-pointer">
              <span className="text-blue-600 hover:text-blue-700">{t('opml.selectFile')}</span>
              <input
                type="file"
                accept=".opml"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {file && (
              <div className="mt-2 text-sm text-gray-600">
                {file.name}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="auth-button"
            disabled={!file}
          >
            {t('opml.import')}
          </button>
        </form>
      </div>
    </div>
  )
}