import Badge from '../ui/Badge'
import { getStatusConfig } from '../../utils/budgetStatus'

export default function StatusBadge({ status }) {
  const config = getStatusConfig(status)
  return <Badge className={config.badge}>{config.label}</Badge>
}
