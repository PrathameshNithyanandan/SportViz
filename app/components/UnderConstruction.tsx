interface UnderConstructionProps {
  sport?: string;
  feature?: string;
  title?: string;
  description?: string;
  icon?: string;
}

export default function UnderConstruction({ sport, feature, title: customTitle, description: customDescription, icon: customIcon }: UnderConstructionProps) {
  const icon = customIcon || (sport === 'Cricket' ? '🏏' : '⚽');
  const title = customTitle || (sport && feature ? `${sport} ${feature}` : 'Coming Soon');
  const description = customDescription || (sport && feature ? `Explore ${sport.toLowerCase()} ${feature.toLowerCase()} statistics and information` : 'This feature is being developed');
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-8 text-center">
        <div className="bg-white rounded-lg shadow-lg p-12">
          <div className="text-8xl mb-6">{icon}</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-xl text-gray-600 mb-8">{description}</p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center gap-3 text-yellow-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold text-lg">Under Construction</span>
            </div>
            <p className="text-yellow-700 mt-2">This feature is currently being developed. Check back soon!</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Coming Soon</span>
            </div>
            <a
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
