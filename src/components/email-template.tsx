import * as React from 'react';

const theme = {
  background: '#FFFFFF',
  foreground: '#09090B',
  primary: '#18181B',
  primaryForeground: '#F8F8F8',
  secondary: '#F4F4F5',
  secondaryForeground: '#18181B',
  muted: '#F4F4F5',
  mutedForeground: '#71717A',
  accent: '#F4F4F5',
  accentForeground: '#18181B',
  border: '#E4E4E7',
  radius: '0.5rem',
};

interface EmailTemplateProps {
  name: string;
  message: string;
  email: string;
  subject?: string;
  date?: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  message,
  email,
  subject,
  date = new Date().toLocaleDateString('pt-BR'),
}) => (
  <div
    style={{
      fontFamily: 'Arial, Helvetica, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      borderRadius: theme.radius,
      border: `1px solid ${theme.border}`,
      backgroundColor: theme.background,
      color: theme.foreground,
    }}
  >
    {/* Cabeçalho */}
    <div
      style={{
        borderBottom: `2px solid ${theme.primary}`,
        paddingBottom: '10px',
        marginBottom: '20px',
        textAlign: 'center',
      }}
    >
      <h2 style={{ color: theme.primary, margin: '0' }}>Nova Mensagem de Contato</h2>
      <p style={{ color: theme.mutedForeground, margin: '5px 0 0' }}>{date}</p>
    </div>

    {/* Conteúdo */}
    <div style={{ padding: '10px 0' }}>
      <div style={{ marginBottom: '15px' }}>
        <span style={{ fontWeight: 'bold', color: theme.foreground }}>Assunto:</span>
        <span style={{ marginLeft: '5px' }}>{subject}</span>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <span style={{ fontWeight: 'bold', color: theme.foreground }}>Nome:</span>
        <span style={{ marginLeft: '5px' }}>{name}</span>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <span style={{ fontWeight: 'bold', color: theme.foreground }}>Email para contato:</span>
        <span style={{ marginLeft: '5px' }}>
          <a href={`mailto:${email}`} style={{ color: theme.primary, textDecoration: 'none' }}>
            {email}
          </a>
        </span>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <span style={{ fontWeight: 'bold', color: theme.foreground }}>Mensagem:</span>
        <div
          style={{
            marginTop: '10px',
            padding: '15px',
            backgroundColor: theme.secondary,
            borderRadius: theme.radius,
            border: `1px solid ${theme.border}`,
            color: theme.secondaryForeground,
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: message }} />
        </div>
      </div>
    </div>

    {/* Rodapé */}
    <div
      style={{
        borderTop: `1px solid ${theme.border}`,
        marginTop: '20px',
        paddingTop: '15px',
        fontSize: '14px',
        color: theme.mutedForeground,
        textAlign: 'center',
      }}
    >
      <p>Esta mensagem foi enviada através do seu portfólio pessoal.</p>
      <p>© {new Date().getFullYear()} ialexanderbrito</p>
    </div>
  </div>
);
