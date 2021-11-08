import { AppState } from '@neuro-client/stim-lib-store';
import { User } from '@stechy1/diplomka-share';

export interface AuthState extends AppState {
  isAuthenticated: boolean;
  user: User;
  serializedRequest?: string;
}
