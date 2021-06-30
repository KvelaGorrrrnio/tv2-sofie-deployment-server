import { exec } from '../lib/exec'
import { logger } from '../lib/logger'

const runAnsiblePlaybook = process.env.RUN_ANSIBLE_PLAYBOOK || './ansible-develop.sh'
