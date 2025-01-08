const fs = require("fs")
const path = require("path")

const nextConfigPath = path.resolve(__dirname, "..", "next.config.js")
const nextConfig = fs.readFileSync(nextConfigPath, "utf8")

const updatedNextConfig = nextConfig.replace(
  "module.exports = nextConfig",
  'module.exports = { ...nextConfig, output: "standalone" }'
)

fs.writeFileSync(nextConfigPath, updatedNextConfig)
