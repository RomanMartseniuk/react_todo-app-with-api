/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  handleDeleteTodo: (id: number, callback: (arg: boolean) => void) => void;
  handleUpdateTodo: (todo: Todo, callback: (arg: boolean) => void) => void;
  loading?: boolean;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  handleDeleteTodo,
  handleUpdateTodo,
  loading = false,
}) => {
  const [isLoading, setIsLoading] = useState(loading as boolean);
  const [isChanging, setIsChanging] = useState(false);

  const [currentTodo, setCurrentTodo] = useState<Todo>(todo);

  const changeIsLoading = (state: boolean) => setIsLoading(state);

  const onTodoUpdate = async () => {
    try {
      await handleUpdateTodo(currentTodo, setIsLoading);
    } catch (err) {
      setIsChanging(true);
    }
  };

  const setTodoCompleted = async () => {
    try {
      const newTodo = { ...currentTodo, completed: !currentTodo.completed };

      await handleUpdateTodo(newTodo, setIsLoading);

      setCurrentTodo(newTodo);
    } catch (err) {
      setCurrentTodo(todo);
    }
  };

  const handleDoubleClick = () => {
    setIsChanging(true);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTodo({ ...currentTodo, title: e.target.value });
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      setIsChanging(false);
      onTodoUpdate();
    }
  };

  const handleOnBlur = () => {
    setIsChanging(false);
    onTodoUpdate();
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: currentTodo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={currentTodo.completed}
          onChange={() => setTodoCompleted()}
        />
      </label>

      {isChanging ? (
        <input
          type="text"
          value={currentTodo.title}
          onBlur={() => handleOnBlur()}
          onChange={e => handleOnChange(e)}
          onKeyDown={e => handleOnKeyDown(e)}
          autoFocus
        />
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => handleDoubleClick()}
        >
          {currentTodo.title}
        </span>
      )}

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={e => {
          e.preventDefault();
          handleDeleteTodo(currentTodo.id, changeIsLoading);
        }}
      >
        ×
      </button>

      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', { 'is-active': isLoading })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
