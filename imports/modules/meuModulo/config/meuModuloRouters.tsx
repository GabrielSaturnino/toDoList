import React from 'react';
import MeuModuloContainer from '../ui/pages/meuModuloContainer';

export const meuModuloRouterList = [
  {
    path: '/meuModulo/:screenState/:meuModuloId',
    component: MeuModuloContainer,
    isProtected: true,
  },
  {
    path: '/meuModulo/:screenState',
    component: MeuModuloContainer,
    isProtected: true,
  },
  {
    path: '/meuModulo',
    component: MeuModuloContainer,
    isProtected: true,
  },
];
