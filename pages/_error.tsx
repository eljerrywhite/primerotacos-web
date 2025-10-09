
import { NextPageContext } from 'next';

interface ErrorProps {
  statusCode?: number;
}

function Error({ statusCode }: ErrorProps) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"Courier Prime", "Courier New", monospace',
      padding: '20px',
      backgroundColor: '#f5f5f5'
    }}>
      <h1 style={{ 
        fontSize: '72px', 
        margin: '0',
        color: '#000'
      }}>
        {statusCode || '?'}
      </h1>
      <p style={{ 
        fontSize: '24px', 
        marginTop: '20px',
        color: '#4b5563'
      }}>
        {statusCode === 404
          ? 'Esta página no existe'
          : statusCode
          ? `Ocurrió un error en el servidor (${statusCode})`
          : 'Ocurrió un error en el cliente'}
      </p>
      <a
        href="/"
        style={{
          marginTop: '40px',
          padding: '12px 24px',
          backgroundColor: '#000',
          color: '#fff',
          textDecoration: 'none',
          textTransform: 'uppercase',
          fontSize: '16px',
          border: '2px solid #000',
          transition: 'all 0.2s'
        }}
      >
        Volver al inicio
      </a>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
