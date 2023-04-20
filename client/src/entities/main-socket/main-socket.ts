import { Socket } from '../../shared/lib/socket';
import { environment } from '../../shared/config/environment';
import { CurrentUser } from '../auth/types/current-user';
import { MainSocketEvents } from './types/main-socket-events';
import { createAuthorizationHeader } from '../../shared/config/createAuthorizationHeader';
import { CreateColumnDto } from '../column/types/create-column-dto';
import { Column } from '../column/types/column';
import { CreateTaskDto } from '../task/types/create-task-dto';
import { Task } from '../task/types/task';
import { Board } from '../board/types/board';

class MainSocket {
  constructor(private socket: Socket) {}

  setup(currentUser: CurrentUser): boolean {
    this.socket.setup(environment.REACT_APP_SOCKET_URL, {
      token: createAuthorizationHeader(currentUser.token),
    });

    return true;
  }

  disconnect(): void {
    this.socket.disconnect();
  }

  emitJoinBoard(boardId: string): void {
    this.socket.emit(MainSocketEvents.boardsJoin, { boardId });
  }

  emitLeaveBoard(boardId: string): void {
    this.socket.emit(MainSocketEvents.boardsLeave, { boardId });
  }
  emitUpdateBoard(payload: {
    boardId: string;
    fields: { title: string };
  }): void {
    this.socket.emit(MainSocketEvents.boardsUpdate, payload);
  }

  listenUpdateBoardSuccess(cb: (board: Board) => void): void {
    this.socket.listen(MainSocketEvents.boardsUpdateSuccess, cb);
  }

  emitDeleteBoard(payload: { boardId: string }): void {
    this.socket.emit(MainSocketEvents.boardsDelete, payload);
  }

  listenDeleteBoardSuccess(cb: (board: Board) => void): void {
    this.socket.listen(MainSocketEvents.boardsDeleteSuccess, cb);
  }

  emitCreateColumn(columnDto: CreateColumnDto): void {
    this.socket.emit(MainSocketEvents.columnsCreate, columnDto);
  }

  listenCreateColumnSuccess(cb: (column: Column) => void): void {
    this.socket.listen(MainSocketEvents.columnsCreateSuccess, cb);
  }

  emitDeleteColumn(payload: { columnId: string; boardId: string }): void {
    this.socket.emit(MainSocketEvents.columnsDelete, payload);
  }

  listenDeleteColumnSuccess(cb: (deletedColumn: Column) => void): void {
    this.socket.listen(MainSocketEvents.columnsDeleteSuccess, cb);
  }

  emitCreateTask(taskDto: CreateTaskDto): void {
    this.socket.emit(MainSocketEvents.tasksCreate, taskDto);
  }

  listenCreateTaskSuccess(cb: (task: Task) => void): void {
    this.socket.listen(MainSocketEvents.tasksCreateSuccess, cb);
  }
}

export const mainSocket = new MainSocket(new Socket());
