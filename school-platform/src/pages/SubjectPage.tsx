import { useParams } from 'react-router-dom'

function SubjectPage() {
  const { grade, subject } = useParams()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Grade {grade} - {subject}
      </h1>
      
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold text-gray-600 mb-2">
          Subject Page
        </h2>
        <p className="text-gray-500">
          3-column layout with chapter navigation will be implemented in step 6
        </p>
      </div>
    </div>
  )
}

export default SubjectPage
