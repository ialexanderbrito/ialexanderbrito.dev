import * as React from 'react';

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
  date = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }),
}) => (
  <div
    style={{
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      backgroundColor: '#F4F4F5',
      padding: '40px 20px',
    }}
  >
    <table
      cellPadding="0"
      cellSpacing="0"
      style={{
        maxWidth: '520px',
        width: '100%',
        margin: '0 auto',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <tr>
        <td
          style={{
            backgroundColor: '#18181B',
            padding: '28px 32px',
          }}
        >
          <table cellPadding="0" cellSpacing="0" style={{ width: '100%' }}>
            <tr>
              <td>
                <img
                  src="https://ialexanderbrito.dev/favicon.png"
                  alt="Logo"
                  width="28"
                  height="28"
                  style={{
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    marginRight: '10px',
                  }}
                />
                <span
                  style={{
                    color: '#FAFAFA',
                    fontSize: '16px',
                    fontWeight: '600',
                    verticalAlign: 'middle',
                    letterSpacing: '-0.3px',
                  }}
                >
                  Alexander
                </span>
              </td>
              <td style={{ textAlign: 'right' }}>
                <span
                  style={{
                    color: '#A1A1AA',
                    fontSize: '12px',
                  }}
                >
                  Nova mensagem
                </span>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      {/* Corpo */}
      <tr>
        <td style={{ padding: '32px' }}>
          {/* Remetente */}
          <table
            cellPadding="0"
            cellSpacing="0"
            style={{ width: '100%', marginBottom: '28px' }}
          >
            <tr>
              <td
                style={{
                  width: '40px',
                  height: '40px',
                  verticalAlign: 'middle',
                }}
              >
                <table
                  cellPadding="0"
                  cellSpacing="0"
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#18181B',
                    borderRadius: '50%',
                  }}
                >
                  <tr>
                    <td
                      style={{
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        color: '#FAFAFA',
                        fontSize: '16px',
                        fontWeight: '600',
                        lineHeight: '40px',
                      }}
                    >
                      {name.charAt(0).toUpperCase()}
                    </td>
                  </tr>
                </table>
              </td>
              <td style={{ paddingLeft: '12px', verticalAlign: 'middle' }}>
                <p
                  style={{
                    margin: '0',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#18181B',
                    lineHeight: '1.3',
                  }}
                >
                  {name}
                </p>
                <a
                  href={`mailto:${email}`}
                  style={{
                    color: '#71717A',
                    fontSize: '13px',
                    textDecoration: 'none',
                    lineHeight: '1.3',
                  }}
                >
                  {email}
                </a>
              </td>
            </tr>
          </table>

          {/* Separador */}
          <div
            style={{
              height: '1px',
              backgroundColor: '#E4E4E7',
              marginBottom: '24px',
            }}
          />

          {/* Assunto */}
          <p
            style={{
              fontSize: '11px',
              fontWeight: '600',
              color: '#A1A1AA',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              margin: '0 0 6px 0',
            }}
          >
            Assunto
          </p>
          <p
            style={{
              fontSize: '17px',
              fontWeight: '600',
              color: '#18181B',
              margin: '0 0 24px 0',
              lineHeight: '1.4',
            }}
          >
            {subject}
          </p>

          {/* Mensagem */}
          <p
            style={{
              fontSize: '11px',
              fontWeight: '600',
              color: '#A1A1AA',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              margin: '0 0 8px 0',
            }}
          >
            Mensagem
          </p>
          <div
            style={{
              backgroundColor: '#FAFAFA',
              borderRadius: '8px',
              padding: '16px 20px',
            }}
          >
            <p
              style={{
                margin: '0',
                fontSize: '14px',
                lineHeight: '1.7',
                color: '#27272A',
                whiteSpace: 'pre-wrap',
              }}
            >
              {message}
            </p>
          </div>

          {/* Botão responder */}
          <table
            cellPadding="0"
            cellSpacing="0"
            style={{ width: '100%', marginTop: '28px' }}
          >
            <tr>
              <td style={{ textAlign: 'center' }}>
                <a
                  href={`mailto:${email}?subject=Re: ${subject}`}
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#18181B',
                    color: '#FAFAFA',
                    padding: '12px 28px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontWeight: '600',
                  }}
                >
                  Responder
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      {/* Footer */}
      <tr>
        <td
          style={{
            padding: '20px 32px',
            textAlign: 'center',
            borderTop: '1px solid #F4F4F5',
          }}
        >
          <p
            style={{
              margin: '0 0 4px 0',
              fontSize: '12px',
              color: '#A1A1AA',
            }}
          >
            Enviada em {date}
          </p>
          <p
            style={{
              margin: '0',
              fontSize: '12px',
              color: '#A1A1AA',
            }}
          >
            via{' '}
            <a
              href="https://ialexanderbrito.dev"
              style={{
                color: '#71717A',
                textDecoration: 'none',
                fontWeight: '500',
              }}
            >
              ialexanderbrito.dev
            </a>
          </p>
        </td>
      </tr>
    </table>
  </div>
);
