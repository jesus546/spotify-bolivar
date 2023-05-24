/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SPOTIFY_CLIENT_ID: "1e6f91a4a16f482ea8944bb53cff9cc6",
    SPOTIFY_CLIENT_SECRET: "5d835ada86454973a7a2da1c686cb89d",
    NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "+pSvs5EwqOTeCm3ENlSW/TEfIP3MwK5kJD0okAvTx5M=",
    NEXT_PUBLIC_SECRET: "+pSvs5EwqOTeCm3ENlSW/TEfIP3MwK5kJD0okAvTx5M="
  }
}

module.exports = nextConfig
