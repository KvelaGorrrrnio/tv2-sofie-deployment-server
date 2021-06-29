import { exec as _exec } from 'child_process'
import { join } from 'path'
import { NodeSSH } from 'node-ssh'
import * as JSend from '../lib/jsend-response'

const cwd = process.env.SSH_CWD || '/usr/local/home/ansible'
const sshOptions = {
  host: process.env.SSH_HOST || 'localhost',
  username: process.env.SSH_USER || 'cdserver',
  privateKey: process.env.SSH_PRIVATE_KEY || '~/.ssh/id_rsa',
}

export const exec = (command: string, options: object = {}) => {
  const ssh = new NodeSSH()

  return ssh.connect(sshOptions)
  .catch(error => JSend.$fail(error))
  .then(() => ssh.execCommand(command)
    .catch(error => JSend.$fail(error))
    .then(data => { console.log(data); return data })
  )
  .finally(() => ssh.dispose())
}
