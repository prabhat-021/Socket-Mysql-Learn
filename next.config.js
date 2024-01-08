/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'utfs.io',
            pathname: '**',
          },
        ],
      },
    // images: {
    //     remotePatterns: [
    //       "uploadthing.com",
    //       "utfs.io"
    //     ]
    //   }
}

module.exports = nextConfig



// In Next.js, the next.config.js file is used to configure various aspects of your Next.js
//  application, including settings related to images.
//  It seems like you're trying to configure the images
//  module to allow loading images from a specific 
// domain.
// 