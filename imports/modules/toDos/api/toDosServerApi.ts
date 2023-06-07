// region Imports
import { Recurso } from '../config/Recursos';
import { toDosSch, IToDos } from './toDosSch';
import { userprofileServerApi } from '/imports/userprofile/api/UserProfileServerApi';
import { ProductServerBase } from '/imports/api/productServerBase';
import { getUser } from '/imports/libs/getUser';
// endregion

class ToDosServerApi extends ProductServerBase<IToDos> {
    constructor() {
        super('toDos', toDosSch, {
            resources: Recurso,
        });

        const self = this;

        this.addTransformedPublication(
            'toDosList',
            (filter = {}, options = {}) => {

                const user = getUser();
                const newFilter = { ...filter, createdby: user._id }
                const newOptions = { ...options }

                return this.defaultListCollectionPublication(newFilter, {
                    ...newOptions,
                    projection: { title: 1, description: 1, createdby: 1, type: 1 },
                });
            },

            (doc: IToDos & { nomeUsuario: string }) => {

                // const userProfileDoc = userprofileServerApi.getCollectionInstance().findOne({ _id: doc.createdby });

                // return { ...doc, nomeUsuario: userProfileDoc?.username };
                return doc
            }
        );

        this.addPublication('toDosPublica', (filter = {}, options = {}) => {
            return this.defaultListCollectionPublication(filter, options)
        });

        this.addPublication('toDosPublicaConcluida', (filter = {}, options = {}) => {
            return this.defaultListCollectionPublication(filter, options)
        });
    }
}

export const toDosServerApi = new ToDosServerApi();
