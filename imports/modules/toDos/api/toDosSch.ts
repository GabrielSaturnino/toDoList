import { IDoc } from '/imports/typings/IDoc';

export const toDosSch = {
    title: {
        type: String,
        label: 'Título',
        defaultValue: '',
        optional: false,
    },
    description: {
        type: String,
        label: 'Descrição',
        defaultValue: '',
        optional: true,
    },
    type: {
        type: String,
        label: 'Tipo',
        defaultValue: '',
        optional: false,
        options: [
            { value: 'pessoal', label: 'Pessoal' },
            { value: 'publica', label: 'Publica' },
        ],
    },
    complete: {
        type: Boolean,
        label: 'completa',
        defaultValue: false,
        optional: true,
    }
};

export interface IToDos extends IDoc {
    title: string;
    description: string;
    type: string;
    complete: Boolean;
}
