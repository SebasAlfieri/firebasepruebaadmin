import React, { useReducer, useContext, createContext, Dispatch } from 'react';

const dev = process.env.NODE_ENV !== 'production';

const TOGGLE_MODAL = 'TOGGLE_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

/**
 * Types
 */
type ModalActionsTypes = typeof TOGGLE_MODAL | typeof CLOSE_MODAL;

type State = {
  current?: string;
  visible: boolean;
};

type ModalActionType<T> = {
  type: T;
  payload?: {
    current?: string;
  };
};

type ModalContextProviderProps = {
  children: React.ReactNode;
};

/**
 * Context
 */
const ModalStateContext = createContext<State | undefined>(undefined);
const ModalDispatchContext = createContext<
  Dispatch<ModalActionType<ModalActionsTypes>> | undefined
>(undefined);

const initialState: State = {
  current: undefined,
  visible: false
};

/**
 * Reducer
 */
export function ModalReducer(state: State, action: ModalActionType<ModalActionsTypes>) {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        visible: !state.visible,
        current: action.payload?.current
      };
    case CLOSE_MODAL:
      return {
        ...state,
        current: undefined,
        visible: false
      };
    default:
      return state;
  }
}

/**
 * Actions
 */
export function toggleModal(modalKey?: string): ModalActionType<ModalActionsTypes> {
  if (dev) {
    console.log(TOGGLE_MODAL);
  }

  return {
    type: TOGGLE_MODAL,
    payload: {
      current: modalKey
    }
  };
}

export function closeModal(): ModalActionType<ModalActionsTypes> {
  if (dev) {
    console.log(CLOSE_MODAL);
  }

  return {
    type: CLOSE_MODAL
  };
}

/**
 * ContextProvider
 */
export const ModalContextProvider = ({ children }: ModalContextProviderProps) => {
  const [state, dispatch] = useReducer(ModalReducer, initialState);

  return (
    <ModalStateContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>{children}</ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
};

export function useModalState(): State {
  const context = useContext(ModalStateContext);

  if (context === undefined) {
    throw new Error('useModalState must be used within a ModalContextProvider');
  }
  return context;
}

export function useModalDispatch(): Dispatch<ModalActionType<ModalActionsTypes>> {
  const context = useContext(ModalDispatchContext);

  if (context === undefined) {
    throw new Error('useModalDispatch must be used within a ModalContextProvider');
  }
  return context;
}
