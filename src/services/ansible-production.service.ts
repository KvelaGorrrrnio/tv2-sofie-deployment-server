import { exec } from '../lib/exec'
import { logger } from '../lib/logger'

const runAnsiblePlaybook = process.env.RUN_ANSIBLE_PLAYBOOK || './ansible-production.sh'

/**
 * @desc   Deploying the deployment server itself
 */
export const deployment_server = () => setTimeout(
  () => {
    const cmd = `${runAnsiblePlaybook} ./tv2-sofie-ansible/playbooks/deployment-server/playbook.yml`
    logger.info('Deploying deployment server...')
    logger.debug(`Now executing: '${cmd}'`)
    exec(cmd)
      .then(() => logger.error('Deployment of deployment server should not be successful.'))
      .catch(error => { console.log(error); logger.error(`Deployment of deployment server failed with: ${ error.stdout }`) })
  },
  1
)

/**
 * @desc   Deploying the health monitor
 */
export const health_monitor = () => setTimeout(
  () => {
    const cmd = `${runAnsiblePlaybook} ./tv2-sofie-ansible/playbooks/health-monitor/playbook.yml`
    logger.info('Deploying health monitor...')
    logger.debug(`Now executing: '${cmd}'`)
    exec(cmd)
      .then(() => logger.info('Health monitor has been deployed.'))
      .catch(error => { logger.debug(error); logger.error(`Deployment of health_monitor failed with: ${ error.stdout }\n${ error.stderr }`) })
  },
  1
)
