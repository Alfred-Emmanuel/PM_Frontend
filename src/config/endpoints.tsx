import { config } from "./config";

const protectedBaseURL = config.api.base_url + config.api.protected;

const authBaseURL = config.api.base_url + config.api.auth;

export const Endpoints = {
  // auth endpoint
  login: authBaseURL + config.api.login_endpoint,

  register: authBaseURL + config.api.sign_up_endpoint,

  //list endpoint
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

  //tasks endpoints
  createTasks:
    protectedBaseURL +
    config.endpoints.tasks.base_url +
    config.endpoints.tasks.create_tasks,

  fetchTasks:
    protectedBaseURL +
    config.endpoints.tasks.base_url +
    config.endpoints.tasks.fetch_tasks,
};
