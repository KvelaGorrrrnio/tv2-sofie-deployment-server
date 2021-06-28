import { exec } from '../lib/exec'
import { logger } from '../lib/logger'

const ansibleRootPath = process.env.ANSIBLE_ROOT_PATH || '..'

export const deploy = () => setTimeout(
  () => {
    logger.info('Deploying deployment server...')
    exec(`ansible-playbook -i ./sofie-ansible-config/inventories/production/inventory.yml ./tv2-sofie-ansible/playbooks/deployment-server/playbook.yml`)
      .then(() => logger.error('Deployment of deployment server should not be successful.'))
      .catch(error => { console.log(error); logger.error(`Deployment of deployment server failed with: ${ error.stdout }`) })
  },
  1
)
