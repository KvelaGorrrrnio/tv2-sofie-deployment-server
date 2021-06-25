import { Server as httpServer } from 'http'
import express from 'express'
import { logger } from './logger'

export class Server {

  private express: express.Express
  private instance?: httpServer

  constructor(setup?: (express: express.Express) => void) {
    this.express = express()
    setup && setup(this.express)
  }

  async start(port: bigint) {
    return this.instance = this.express.listen(
      Number(port),
      () => logger.info(`Server listening at http://localhost:${port}.`)
    )
  }

  async stop() {
    this.instance && await this.instance.close()
    this.instance && delete this.instance
  }
}
