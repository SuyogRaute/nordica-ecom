
import React from 'react';

const ProductVideoSection = ({ 
  productName = "Product",
  mainVideo = {
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1",
    title: "Product Video",
    description: "Watch this detailed demonstration to see how the product works and learn professional installation tips."
  },
  additionalVideos = []
}) => {
  return (
    <section>
      <div className="container mx-auto px-4 mt-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Video</h2>

          {/* Main Video Container */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="aspect-video bg-black">
              <iframe
                className="w-full h-full"
                src={mainVideo.url}
                title={mainVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Description */}
            <div className="p-6 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                See {productName} in Action
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {mainVideo.description}
              </p>
            </div>
          </div>

          {/* Additional Videos Grid */}
          {additionalVideos.length > 0 && (
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              {additionalVideos.map((video, index) => (
                <div 
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video bg-black relative">
                    <iframe
                      className="w-full h-full"
                      src={video.url}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                      {video.title}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {video.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
};export default ProductVideoSection;