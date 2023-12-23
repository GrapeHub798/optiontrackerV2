import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth.slice';
import { userReducer } from './user.slice';

export * from './auth.slice';
export * from './user.slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer
    },
});
