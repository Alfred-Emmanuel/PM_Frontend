import { ENVIRONMENT } from "../utils/environment";
// import { Endpoints } from "./endpoints";

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
    /**lists board endpoints */
    lists: {
      base_url: import.meta.env.VITE_LISTS,
      create: import.meta.env.VITE_CREATE_LIST,
      fetch_lists: import.meta.env.VITE_FETCH_ALL_LISTS,
    },
    /**kanban board endpoints */
    kanbanBoard: {
        base_url: import.meta.env.VITE_KANBAN_BOARD,
        create: import.meta.env.VITE_CREATE_KANBAN_BOARD,
        fetch_board: import.meta.env.VITE_FETCH_BOARDS
    }
  },
});
