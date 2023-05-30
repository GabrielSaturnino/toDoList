// region Imports
import { ProductBase } from '../../../api/productBase';
import { meuModuloSch, IMeuModulo } from './meuModuloSch';

class MeuModuloApi extends ProductBase<IMeuModulo> {
    constructor() {
        super('meuModulo', meuModuloSch, {
            enableCallMethodObserver: true,
            enableSubscribeObserver: true,
        });
    }
}

export const meuModuloApi = new MeuModuloApi();
