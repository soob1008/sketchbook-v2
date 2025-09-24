'use client';

import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import TodoList from './TodoList';
import { useSelector, useDispatch } from 'react-redux';
import { insert, selectTodos, TodoData } from './todoSlice';
import dayjs from 'dayjs';
import { Input } from '@workspace/ui/components/input';
import { Button } from '@workspace/ui/components/button';

const Todo = () => {
  const [text, setText] = useState('');
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();
  const [time, setTime] = useState(dayjs().format('HH:mm:ss'));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(dayjs().format('HH:mm:ss'));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const onAdd = () => {
    if (text.trim() === '') {
      return alert('todo를 작성해주세요.');
    }

    dispatch(insert(text));
    setText('');
  };

  const onAddKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onAdd();
    }
  };

  return (
    <div className="p-5 w-1/2">
      <div className="mb-6">
        <span>{dayjs().format('YYYY-MM-DD')}</span>
        <span className="ml-2">{time}</span>
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="input search text"
          onChange={onChangeText}
          onKeyDown={onAddKeyPress}
          value={text}
        />
        <Button
          onClick={onAdd}
          style={{
            borderRadius: '0 3px 3px 0',
          }}
        >
          입력
        </Button>
      </div>
      <div className="mt-4 flex flex-col gap-10">
        {todos.map((todo: TodoData) => (
          <TodoList key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default Todo;