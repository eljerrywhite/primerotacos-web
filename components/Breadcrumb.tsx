
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
