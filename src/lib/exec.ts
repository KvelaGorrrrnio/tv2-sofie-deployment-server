import { exec as _exec } from 'child_process'
import { join } from 'path'
import { NodeSSH } from 'node-ssh'
import { logger } from '../lib/logger'
import * as JSend from '../lib/jsend-response'

const cwd = process.env.SSH_CWD || '/usr/local/home/ansible'
const sshOptions = {
  host: process.env.SSH_HOST || 'localhost',
  username: process.env.SSH_USER || 'cdserver',
  privateKey: process.env.SSH_PRIVATE_KEY || '~/.ssh/id_rsa',
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
