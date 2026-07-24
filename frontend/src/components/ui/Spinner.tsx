interface SpinnerProps {
  size?: number
}

function Spinner({ size = 16 }: SpinnerProps) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: `${size}px`,
        height: `${size}px`,
        border: '2px solid currentColor',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'button-spin 700ms linear infinite',
      }}
    />
  )
}

export default Spinner
