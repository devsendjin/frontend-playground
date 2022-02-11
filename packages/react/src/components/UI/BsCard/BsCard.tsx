import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const BsCard: React.FC<{ to?: string }> = ({ to, children }) => {
  return (
    <Card bg="dark" text="white">
      {to && <Link to={to} className="stretched-link" />}
      <Card.Body>
        <Card.Title className="mb-0 text-center">{children}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export { BsCard };
