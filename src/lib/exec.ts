import { exec as _exec } from 'child_process'

export const exec: (cmd:string) => Promise<any> = (cmd: string) => {
  return new Promise((resolve, reject) => _exec(cmd, (error, stdout, stderr) => {
    if (error) {
      reject({ error, stdout, stderr })
    } else {
      resolve({ stdout, stderr })
    }
  }))
}
