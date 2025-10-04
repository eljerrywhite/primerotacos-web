
import React from 'react';
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  taqueriaNombre: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ taqueriaNombre }) => {
  return (
    <nav 
      className="h-12 flex items-center"
      style={{ 
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        paddingLeft: '27px',
        paddingRight: '27px'
      }}
      aria-label="Breadcrumb"
    >
      <style jsx>{`
        @media (min-width: 768px) {
          nav {
            padding-left: 48px !important;
            padding-right: 48px !important;
          }
        }
      `}</style>
      <ol className="flex items-center gap-2 w-full">
        <li className="flex items-center gap-2 flex-shrink-0">
          <Home className="h-3.5 w-3.5" style={{ color: 'var(--text-primary)' }} />
          <a 
            href="/"
            className="text-sm underline hover:opacity-70 transition-opacity whitespace-nowrap"
            style={{ color: 'var(--text-primary)' }}
          >
            Inicio
          </a>
        </li>
        <li className="flex items-center gap-2 min-w-0 flex-1">
          <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" style={{ color: 'var(--text-primary)' }} />
          <span 
            className="text-sm truncate block"
            style={{ color: 'var(--text-primary)', maxWidth: '200px' }}
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
