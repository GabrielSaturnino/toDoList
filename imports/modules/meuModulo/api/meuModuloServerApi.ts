// region Imports
import { Recurso } from '../config/Recursos';
import { meuModuloSch, IMeuModulo } from './meuModuloSch';
import { userprofileServerApi } from '/imports/userprofile/api/UserProfileServerApi';
import { ProductServerBase } from '/imports/api/productServerBase';
// endregion

class MeuModuloServerApi extends ProductServerBase<IMeuModulo> {
    constructor() {
        super('meuModulo', meuModuloSch, {
            resources: Recurso,
        });

        const self = this;

        this.addTransformedPublication(
            'meuModuloList',
            (filter = {}) => {
                return this.defaultListCollectionPublication(filter, {
                    projection: { image: 1, title: 1, description: 1, createdby: 1 },
                });
            },
            (doc: IMeuModulo & { nomeUsuario: string }) => {
                const userProfileDoc = userprofileServerApi
                    .getCollectionInstance()
                    .findOne({ _id: doc.createdby });
                return { ...doc, nomeUsuario: userProfileDoc?.username };
            }
        );

        this.addPublication('meuModuloDetail', (filter = {}) => {
            return this.defaultDetailCollectionPublication(filter, {});
        });

        this.addRestEndpoint(
            'view',
            (params, options) => {
                console.log('Params', params);
                console.log('options.headers', options.headers);
                return { status: 'ok' };
            },
            ['post']
        );

        this.addRestEndpoint(
            'view/:meuModuloId',
            (params, options) => {
                console.log('Rest', params);
                if (params.meuModuloId) {
                    return self
                        .defaultCollectionPublication({
                            _id: params.meuModuloId,
                        })
                        .fetch();
                } else {
                    return { ...params };
                }
            },
            ['get'],
            {
                //authFunction: (_h, _p) => _p.meuModuloId === 'flkdsajflkasdjflsa',
            }
        );
    }
}

export const meuModuloServerApi = new MeuModuloServerApi();
