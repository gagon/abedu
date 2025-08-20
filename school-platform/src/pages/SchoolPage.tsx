function SchoolPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">School</h1>
      
      <div className="space-y-8">
        {/* Test Tailwind Styling */}
        <div className="bg-blue-100 border border-blue-300 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            🎯 Tailwind CSS Test
          </h2>
          <p className="text-blue-600">
            If you can see this blue styling, Tailwind CSS is working correctly!
          </p>
        </div>
        
        {/* Placeholder for Grade Sections */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            School Page - Grades 1-5
          </h2>
          <p className="text-gray-500">
            Grade sections and subject cards will be implemented in step 5
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SchoolPage
