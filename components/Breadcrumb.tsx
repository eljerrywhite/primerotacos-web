
import React from 'react';
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  taqueriaNombre: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ taqueriaNombre }) => {
  return (
    <nav 
      className="h-10 flex items-center px-4 md:px-6"
      style={{ 
        backgroundColor: '#ffffff',
        color: 'var(--text-primary)'
      }}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center gap-2">
        <li className="flex items-center gap-2">
          <Home className="h-5 w-5" style={{ color: 'var(--text-primary)' }} />
          <a 
            href="/"
            className="text-sm md:text-base hover:opacity-70 transition-opacity"
            style={{ color: 'var(--text-primary)' }}
          >
            Volver a inicio
          </a>
        </li>
        <li className="flex items-center gap-2">
          <ChevronRight className="h-5 w-5" style={{ color: 'var(--text-primary)' }} />
          <span 
            className="text-sm md:text-base"
            style={{ color: 'var(--text-primary)' }}
            aria-current="page"
          >
            {taqueriaNombre}
          </span>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
