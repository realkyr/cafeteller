import {NextFederationPlugin} from "@module-federation/nextjs-mf";

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },

  webpack: (config, { isServer }) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'cafeteller',
        remotes: {
          core_cafeteller: initModuleMF('core_cafeteller', process.env.NEXT_PUBLIC_CORE_MF)
        },
        filename: 'static/chunks/remoteEntry.js',
        exposes: {},
        shared: {}
      })
    )

    return config
  }
};

const initModuleMF = (name, url) =>  `promise new Promise(resolve => {
      const urlParams = new URLSearchParams(window.location.search)
      // This part depends on how you plan on hosting and versioning your federated modules
      const remoteUrlWithVersion = '${url}' + '/assets/remoteEntry.js';
      const script = document.createElement('script')
      script.src = remoteUrlWithVersion
      script.onload = () => {
        // the injected script has loaded and is available on window
        // we can now resolve this Promise
        const proxy = {
          get: (request) => window["${name}"].get(request),
          init: (arg) => {
            try {
              return window["${name}"].init(arg)
            } catch(e) {
              console.log('remote container already initialized')
            }
          }
        }
        resolve(proxy)
      }
      // inject this script with the src set to the versioned remoteEntry.js
      document.head.appendChild(script);
    })
    `

export default nextConfig;
