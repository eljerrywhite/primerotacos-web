
import React from 'react';
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  taqueriaNombre: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ taqueriaNombre }) => {
  return (
    <nav 
      className="absolute top-0 left-0 right-0 h-10 flex items-center px-4 md:px-6 z-30"
      style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        color: 'var(--text-primary)'
      }}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center gap-2">
        <li className="flex items-center gap-2">
          <Home className="h-3.5 w-3.5" style={{ color: 'var(--text-primary)' }} />
          <a 
            href="/"
            className="text-sm underline hover:opacity-70 transition-opacity"
            style={{ color: 'var(--text-primary)' }}
          >
            Inicio
          </a>
        </li>
        <li className="flex items-center gap-2">
          <ChevronRight className="h-3.5 w-3.5" style={{ color: 'var(--text-primary)' }} />
          <span 
            className="text-sm"
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
