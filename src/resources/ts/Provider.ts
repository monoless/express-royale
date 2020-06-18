import { useContext, createContext } from "react";
import { onSnapshot } from "mobx-state-tree";
import uuid from 'uuid-random';
import { localStorage } from '@/helpers';
import { RootStore, RootStoreInterface } from '@/stores';

const [id] = localStorage('identifier', uuid());

export const stores = RootStore.create({
    id
});

export const RootStoreContext = createContext<null | RootStoreInterface>(stores);

export const { Provider } = RootStoreContext;

export function useMobxStateTree() {
    const store = useContext(RootStoreContext);
    if (null === store) {
        throw new Error("Store cannot be null, please add a context provider");
    }

    return store;
}

onSnapshot(stores, snapshot => console.log('Snapshot: ', snapshot));