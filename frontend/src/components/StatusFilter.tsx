interface StatusFilterProps {
  value: string
  onChange: (value: string) => void
}

const selectStyle = {
  width: '100%',
  padding: '12px 14px',
  color: '#172033',
  background: '#ffffff',
  border: '1px solid #cbd5e1',
  borderRadius: '8px',
}

function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <div className="form-field" style={{ flex: '1 1 220px' }}>
      <label htmlFor="status-filter">Status</label>
      <select
        id="status-filter"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        style={selectStyle}
      >
        <option value="all">All</option>
        <option value="available">Available</option>
        <option value="reserved">Reserved</option>
        <option value="sold">Sold</option>
      </select>
    </div>
  )
}

export default StatusFilter
