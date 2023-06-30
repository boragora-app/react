import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const { pathname } = location;

  // Divide o caminho atual em partes separadas
  const pathSegments = pathname.split('/').filter(segment => segment !== '');

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {pathSegments.map((segment, index) => {
          const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const label = segment; // Utilize o segmento atual como rótulo do breadcrumb

          return (
            <li key={index}>
              <Link to={path}>{label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
