import { createContext, useContext, useReducer, useEffect } from 'react';

const UserContext = createContext();

// User actions
const USER_ACTIONS = {
  SET_USER: 'SET_USER',
  UPDATE_USER: 'UPDATE_USER',
  CLEAR_USER: 'CLEAR_USER',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
};

// User reducer
const userReducer = (state, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case USER_ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        error: null,
      };
    case USER_ACTIONS.CLEAR_USER:
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
      };
    case USER_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case USER_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  user: null,
  loading: true,
  error: null,
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Load user from localStorage on mount
  useEffect(() => {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        dispatch({ type: USER_ACTIONS.SET_USER, payload: parsedUser });
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user_data');
        dispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
      }
    } else {
      dispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
    }
  }, []);

  // Actions
  const setUser = (userData) => {
    localStorage.setItem('user_data', JSON.stringify(userData));
    dispatch({ type: USER_ACTIONS.SET_USER, payload: userData });
  };

  const updateUser = (updates) => {
    const updatedUser = { ...state.user, ...updates };
    localStorage.setItem('user_data', JSON.stringify(updatedUser));
    dispatch({ type: USER_ACTIONS.UPDATE_USER, payload: updates });
  };

  const clearUser = () => {
    localStorage.removeItem('user_data');
    localStorage.removeItem('auth_token');
    dispatch({ type: USER_ACTIONS.CLEAR_USER });
  };

  const setLoading = (loading) => {
    dispatch({ type: USER_ACTIONS.SET_LOADING, payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: USER_ACTIONS.SET_ERROR, payload: error });
  };

  const value = {
    ...state,
    setUser,
    updateUser,
    clearUser,
    setLoading,
    setError,
    isAuthenticated: !!state.user,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
