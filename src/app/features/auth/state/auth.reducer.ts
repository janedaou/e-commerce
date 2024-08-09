import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  user: any;
  error: any;
}

export const initialState: State = {
  user: null,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, action) => ({ ...state, user: action.user })),
  on(AuthActions.loginFailure, (state, action) => ({ ...state, error: action.error })),
  on(AuthActions.signupSuccess, (state, action) => ({ ...state, user: action.user })),
  on(AuthActions.signupFailure, (state, action) => ({ ...state, error: action.error }))
);
