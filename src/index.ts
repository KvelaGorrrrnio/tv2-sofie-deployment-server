import { Server } from './lib/server'
import { setupServer } from './loaders/setup-server.loader'
import { logger } from './lib/logger'
import { isLocal } from './lib/environment'

const PORT = BigInt(process.env.PORT || '8080')

logger.info(`Deployment Server version: ${ process.env.npm_package_version }.`)

const server = new Server(setupServer)
server.start(PORT)
