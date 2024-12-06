import { config } from "./config";

const protectedBaseURL = config.api.base_url + config.api.protected;

const authBaseURL = config.api.base_url + config.api.auth;

export const Endpoints = {
  login: authBaseURL + config.api.login_endpoint,

  register: authBaseURL + config.api.sign_up_endpoint,

  createList:
    protectedBaseURL +
    config.endpoints.lists.base_url +
    config.endpoints.lists.create,

  fetchLists:
    protectedBaseURL +
    config.endpoints.lists.base_url +
    config.endpoints.lists.fetch_lists,

  createBoard:
    protectedBaseURL +
    config.endpoints.kanbanBoard.base_url +
    config.endpoints.kanbanBoard.create,

  fetchBoards:
    protectedBaseURL +
    config.endpoints.kanbanBoard.base_url +
    config.endpoints.kanbanBoard.fetch_board,

  deleteBoard:
    protectedBaseURL +
    config.endpoints.kanbanBoard.base_url +
    config.endpoints.kanbanBoard.delete_board,
};
