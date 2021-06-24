import { createLogger, format as wformat } from 'winston'
import { isLocal } from '../environment'

// Log levels
const level: string = process.env.LOG_LEVEL || (isLocal ? 'debug' : 'info')
const levels: { [key: string]: number } = {
  'error':   0,
  'success': 1,
  'warn':    2,
  'info':    3,
  'debug':   4,
}

// Collect tranports
const transports: any[] = []
transports.push(require('./console.transport').transport)

// Create logger
export const logger = createLogger({
  level, levels,
  transports,
})

