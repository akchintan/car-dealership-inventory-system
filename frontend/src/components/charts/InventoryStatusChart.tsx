import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import Card from '../ui/Card'

export interface InventoryStatusChartData {
  name: string
  value: number
}

interface InventoryStatusChartProps {
  data: InventoryStatusChartData[]
}

const statusColors: Record<string, string> = {
  Available: '#12b76a',
  Reserved: '#f79009',
  Sold: '#f04438',
}

const fallbackColors = ['#175cd3', '#7f56d9', '#667085']

export function InventoryStatusChartSkeleton() {
  return (
    <Card className="inventory-chart-skeleton" style={{ minHeight: '340px' }} aria-hidden="true">
      <div className="inventory-chart-skeleton__chart" />
      <div className="inventory-chart-skeleton__legend">
        <span />
        <span />
        <span />
      </div>
    </Card>
  )
}

function InventoryStatusChart({ data }: InventoryStatusChartProps) {
  const hasData = data.some((entry) => entry.value > 0)

  if (!hasData) {
    return (
      <Card style={{ display: 'grid', minHeight: '340px', placeItems: 'center', textAlign: 'center' }}>
        <div>
          <p style={{ margin: 0, color: '#172033', fontWeight: 700 }}>No inventory data available</p>
          <p style={{ margin: '8px 0 0', color: '#667085' }}>Status distribution will appear once vehicles are added.</p>
        </div>
      </Card>
    )
  }

  return (
    <Card style={{ minHeight: '340px' }}>
      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              outerRadius="72%"
              label={({ name, value }) => (value > 0 ? `${name}: ${value}` : '')}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={statusColors[entry.name] ?? fallbackColors[index % fallbackColors.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value} vehicles`, 'Count']} />
            <Legend verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

export default InventoryStatusChart
