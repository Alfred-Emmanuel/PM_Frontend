import { ENVIRONMENT } from "../utils/environment";
import { Endpoints } from "./endpoints";

export const config = Object.freeze({
  app: {
    environment: {
      mode: import.meta.env.VITE_NODE_ENV,
      isInProduction: import.meta.env.VITE_NODE_ENV === ENVIRONMENT.PROD,
      isInDevelopment: import.meta.env.VITE_NODE_ENV === ENVIRONMENT.DEV,
      isInTesting: import.meta.env.VITE_NODE_ENV === ENVIRONMENT.TEST,
    },
  },
  api: {
    base_url: import.meta.env.VITE_BASE_URL,
    auth: import.meta.env.VITE_AUTH,
    protected: import.meta.env.VITE_PROTECTED,
    login_endpoint: import.meta.env.VITE_LOGIN_ENDPOINT,
    sign_up_endpoint: import.meta.env.VITE_SIGN_UP_ENDPOINT,
  },
  endpoints: {
    /**kanban board endpoints */
    kanban_board: {
      base_url: import.meta.env.VITE_KANBAN_BOARD,
      create: import.meta.env.VITE_CREATE_KANBAN_BOARD,
      fetch_boards: import.meta.env.VITE_FETCH_ALL_BOARDS
    },
  },
});
