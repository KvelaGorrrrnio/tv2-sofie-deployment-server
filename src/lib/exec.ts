import { exec as _exec } from 'child_process'
import { join } from 'path'
import { NodeSSH } from 'node-ssh'
import { logger } from '../lib/logger'
import { readFileSync } from 'fs'
import * as JSend from '../lib/jsend-response'

// Create passphrase object
let passphrase: { passphrase?: string } = {}
try {
  if (process.env.SSH_PASSPHRASE) {
    logger.debug(`Trying to load SSH_PASSPHRASE from: ${process.env.SSH_PASSPHRASE}`)
    passphrase = { passphrase: readFileSync(process.env.SSH_PASSPHRASE, 'utf8') }
    logger.debug('SSH_PASSPHRASE loaded:', passphrase.passphrase)
  } else {
    logger.debug('No SSH_PASSPHRASE.')
  }
} catch(error) {
  logger.warn(`Failed loading SSH_PASSPHRASE for exec: ${error.message}`)
}

// Set ssh options
const cwd = process.env.SSH_CWD || '/usr/local/home/ansible'
const sshOptions = {
  host: process.env.SSH_HOST || 'localhost',
  username: process.env.SSH_USER || 'cdserver',
  privateKey: process.env.SSH_PRIVATE_KEY || '~/.ssh/id_rsa',
  ...passphrase,
  // https://github.com/mscdex/ssh2/issues/604
  tryKeyboard: !!passphrase.passphrase,
  onKeyboardInteractive: (name: any, instructions: any, instructionsLang: any, prompts: any, finish: any) => finish([passphrase.passphrase]),
}

export const exec = (command: string) => {
  const ssh = new NodeSSH()

  logger.debug('sshCommand', command)
  logger.debug('sshOptions', sshOptions)

  return ssh.connect(sshOptions)

  .then(() => logger.debug('SSH connected'))
  .catch(error => { logger.debug('SSH connection failed'); return JSend.$fail(error) })

  .then(() => ssh.execCommand(command)
    .catch(error => { logger.debug('execCommand failed.'); return JSend.$fail(error) })
    .then(data => { console.log(data); return data })
  )
  .finally(() => ssh.dispose())
}
