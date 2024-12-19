/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  inputRef: React.RefObject<HTMLInputElement>;
  inputText: string;
  setInputText: (value: string) => void;
  createFunc: () => void;
  completeFunc: () => void;
  todos: Todo[];
  loadingTodos: number[];
};

export const Header: React.FC<Props> = ({
  inputRef,
  inputText,
  setInputText,
  createFunc,
  completeFunc,
  todos,
  loadingTodos,
}) => {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.filter(todo => !todo.completed).length === 0,
          })}
          data-cy="ToggleAllButton"
          onClick={() => {
            completeFunc();
          }}
          disabled={loadingTodos.length > 0}
        />
      )}
      {/* Add a todo on form submit */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputText}
          ref={inputRef}
          onChange={e => {
            e.preventDefault();
            setInputText(e.target.value);
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              createFunc();
            }
          }}
        />
      </form>
    </header>
  );
};
