
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
        '@opentelemetry/exporter-jaeger': false,
        // If other opentelemetry or node-specific modules cause issues, they can be added here
      };
    }

    // To handle "require.extension is not supported by webpack" for certain .node files
    // This is a common workaround but might need adjustment based on the exact problematic module
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });
    
    // Some libraries might use `fs` module which is not available in browser
    // Provide an empty mock for it.
    if (!isServer) {
      config.plugins.push(
        new webpack.ProvidePlugin({
          fs: require.resolve('memfs'), // or use an empty module: `config.resolve.alias.fs = false;`
        })
      );
       // Fallback for 'net' and 'tls' if they are still causing issues after aliasing jaeger
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "net": false,
        "tls": false,
        "fs": false, // Explicitly ensure fs is ignored if ProvidePlugin isn't enough
      };
    }


    return config;
  },
};

export default nextConfig;
