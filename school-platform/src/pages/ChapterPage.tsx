import { useParams } from 'react-router-dom'

function ChapterPage() {
  const { grade, subject, chapter } = useParams()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Grade {grade} - {subject} - Chapter {chapter}
      </h1>
      
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold text-gray-600 mb-2">
          Chapter Page
        </h2>
        <p className="text-gray-500">
          3-column layout with specific chapter content will be implemented in step 6
        </p>
      </div>
    </div>
  )
}

export default ChapterPage
