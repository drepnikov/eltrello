import { CurrentUser } from 'entities/auth/types/current-user';
import { httpGet, httpPost } from 'shared/lib/http';
import { environment } from 'shared/config/environment';
import { RegisterUserRequest } from 'entities/auth/types/register-user-request';
import { LoginRequest } from 'entities/auth/types/login-request';

export const login = (
  loginRequest: LoginRequest
): Promise<CurrentUser | null> =>
  httpPost(environment.REACT_APP_API_URL + '/user/login', {
    body: JSON.stringify(loginRequest),
    headers: { 'Content-Type': 'application/json' },
  });
export const registerUser = (
  registerRequest: RegisterUserRequest
): Promise<CurrentUser | null> =>
  httpPost(environment.REACT_APP_API_URL + '/user', {
    body: JSON.stringify(registerRequest),
    headers: { 'Content-Type': 'application/json' },
  });

export const getCurrentUser = async (): Promise<CurrentUser | null> =>
  httpGet(environment.REACT_APP_API_URL + '/user');
