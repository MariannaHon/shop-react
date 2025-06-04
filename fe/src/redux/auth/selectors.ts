import { RootState } from '../store';

export const selectUser = (state: RootState) => state.auth.user;

export const selectIsRefresh = (state: RootState) => state.auth.refresh;
export const selectIsLoggedIn = (state: RootState) => state.auth.loggedIn;
export const selectIsLoading = (state: RootState) => state.auth.loading;

export const selectError = (state: RootState) => state.auth.error;
