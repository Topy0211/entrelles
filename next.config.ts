
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer, webpack }) => {
    // For client-side bundles, alias problematic modules to prevent them from being bundled
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@opentelemetry/exporter-jaeger': false, // Alias Jaeger exporter to prevent client-side bundling
      };
      
      // Provide an empty mock for fs, net, tls for the client-side.
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "fs": false,
        "net": false,
        "tls": false,
      };

      // If 'memfs' is intended for fs mocking (though 'fs: false' is often simpler for pure client)
      // config.plugins.push(
      //   new webpack.ProvidePlugin({
      //     fs: require.resolve('memfs'), 
      //   })
      // );
    }

    // To handle ".node" files if any dependency uses them (less common for these errors)
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });
    
    return config;
  },
};

export default nextConfig;
