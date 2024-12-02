import { config } from "./config";

export const Endpoints = {
  login: config.api.login_endpoint,
  register: config.api.sign_up_endpoint,
  createBoard: config.endpoints.kanban_board.create,
  fetchBoards: config.endpoints.kanban_board.fetch_boards,
};
