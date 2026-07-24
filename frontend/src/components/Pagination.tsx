interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const pageButtonStyle = {
  minWidth: '38px',
  minHeight: '38px',
  padding: '8px 12px',
  color: '#344054',
  background: '#ffffff',
  border: '1px solid #cbd5e1',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 700,
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <nav aria-label="Pagination" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{ ...pageButtonStyle, cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.55 : 1 }}
      >
        Previous
      </button>

      {pageNumbers.map((page) => {
        const isCurrentPage = page === currentPage

        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={isCurrentPage ? 'page' : undefined}
            style={{
              ...pageButtonStyle,
              color: isCurrentPage ? '#ffffff' : '#344054',
              background: isCurrentPage ? '#c2410c' : '#ffffff',
              borderColor: isCurrentPage ? '#c2410c' : '#cbd5e1',
            }}
          >
            {page}
          </button>
        )
      })}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{ ...pageButtonStyle, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages ? 0.55 : 1 }}
      >
        Next
      </button>
    </nav>
  )
}

export default Pagination
