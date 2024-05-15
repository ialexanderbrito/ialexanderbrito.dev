import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  message: string;
  email: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ name, message, email }) => (
  <div>
    <h1>{name}, aqui.</h1>
    <span>Caso queira entrar em contato comigo esse é meu email: {email}</span>
    <br />
    <span>Segue a mensagem:</span>
    <p dangerouslySetInnerHTML={{ __html: message }} />
  </div>
);
