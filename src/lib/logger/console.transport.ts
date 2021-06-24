import { transports, format as wformat } from 'winston'
import { environment, Environment } from '../environment'

const colors = {
  'error':   'red',
  'warn':    'orange',
  'info':    'green',
  'debug':   'cyan',
}

const format = environment === Environment.Local ?
  wformat.combine(
    wformat.timestamp(),
    wformat.printf(({ level, message, timestamp }) => `[${ timestamp }] [${ level }] ${ message }`),
    wformat.colorize({ all: true, colors }),
  ) :
  wformat.json()

export const transport = new transports.Console({ format })
