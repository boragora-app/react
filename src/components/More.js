import Button from 'react-bootstrap/Button';

export default function More({ pagination, loadNextPage }) {
  let thereAreMore = false;
  if (pagination) {
    const { offset, count, total } = pagination;
    thereAreMore = offset + count < total;
  }

  return (
    <div className="More">
      {thereAreMore &&
        <Button size="sm" variant="outline-primary" onClick={loadNextPage}>
          Mais &raquo;
        </Button>
      }
    </div>
  );
}