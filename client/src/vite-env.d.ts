/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_WS_URL: string
  readonly VITE_MAPBOX_TOKEN: string
  readonly VITE_MAPBOX_STYLE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
