import { exec } from '../lib/exec'
import { logger } from '../lib/logger'

const runAnsiblePlaybook = process.env.RUN_ANSIBLE_PLAYBOOK || './ansible-production.sh'

export const deploy = () => setTimeout(
  () => {
    logger.info('Deploying deployment server...')
    logger.debug(`Now executing: '${runAnsiblePlaybook} ./tv2-sofie-ansible/playbooks/deployment-server/playbook.yml'`)
    //exec(`${runAnsiblePlaybook} ./tv2-sofie-ansible/playbooks/deployment-server/playbook.yml`)
    exec('pwd && ls')
      .then(() => logger.error('Deployment of deployment server should not be successful.'))
      .catch(error => { console.log(error); logger.error(`Deployment of deployment server failed with: ${ error.stdout }`) })
  },
  1
)
