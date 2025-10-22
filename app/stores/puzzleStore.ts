import { create } from 'zustand';

export type Store = {
  inputText:string;
  output:string;
  alphaOutput:string;
  error:string,
};

export type Action = {
  setInput: (input:any) => void
};

const initialStoreState:Store = {
  inputText: '(id, name, email, type(id, name, customFields(c1, c2, c3)), externalId)',
  output: '',
  alphaOutput: '', 
  error: '',
}

const createPuzzleStore = (initState: Store = initialStoreState) => {
  return create<Store & Action>()((set, get) => ({
  ...initState,
  setInput: (input: any) => {
   console.log(`setInput=${input}`);
   set((state) => ({ inputText : input }))
  },
}));
}

const usePuzzleStore = createPuzzleStore();

export default usePuzzleStore;