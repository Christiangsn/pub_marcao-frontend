import React from 'react';

import { ProductsWrapper } from './styles';

export const ContentProducts = () => (
  <ProductsWrapper>
    <ul className="primary">
      <li>
        <span className="payments" />

        <div>
          <h3>Clientes</h3>
          <p>Criação e Edição de Clientes</p>
        </div>
      </li>
      <li>
        <span className="billing" />

        <div>
          <h3>Billing</h3>
          <p>Plataforma completa para pagamentos online</p>
        </div>
      </li>
      <li>
        <span className="connect" />

        <div>
          <h3>Connect</h3>
          <p>Plataforma completa para pagamentos online</p>
        </div>
      </li>
    </ul>
  </ProductsWrapper>
);