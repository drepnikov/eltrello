import { RequestHandlerWithPayload } from '../types/http/request-handler-with-payload';
import { BoardModel } from '../models/board';
import { SocketEventHandler } from '../types/socket/socket-event-handler';

export const getBoards: RequestHandlerWithPayload = async (req, res, next) => {
  try {
    if (!req.user) return res.sendStatus(401);

    const boards = await BoardModel.find({ userId: req.user.id });

    res.json(boards);
  } catch (err) {
    next(err);
  }
};

export const createBoard: RequestHandlerWithPayload = async (
  req,
  res,
  next
) => {
  try {
    if (!req.user) return res.sendStatus(401);

    const board = new BoardModel({
      title: req.body.title,
      userId: req.user.id,
    });

    const savedBoard = await board.save();

    res.json(savedBoard);
  } catch (err) {
    next(err);
  }
};

export const getBoard: RequestHandlerWithPayload = async (req, res, next) => {
  try {
    if (!req.user) return res.sendStatus(401);

    if (!req.params.boardId) {
      return res.status(400).json({ errors: ['boardId required'] });
    }

    const board = await BoardModel.findById(req.params.boardId);

    if (!board) {
      return res
        .status(404)
        .json({ errors: [`Board ${req.params.boardId} not found`] });
    }

    return res.json(board);
  } catch (err) {
    next(err);
  }
};

export const joinBoard: SocketEventHandler<{ boardId: string }> = (
  io,
  socket,
  data
) => {
  console.log('server socket io join', data.boardId, socket.user);
  socket.join(data.boardId);
};

export const leaveBoard: SocketEventHandler<{ boardId: string }> = (
  io,
  socket,
  data
) => {
  console.log('server socket io leave', data.boardId, socket.user);
  socket.leave(data.boardId);
};
