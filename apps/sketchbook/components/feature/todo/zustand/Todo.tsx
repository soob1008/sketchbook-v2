'use client';

import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { TodoData, useTodoStore } from './store';
import TodoList from './TodoList';
import { Input } from '@workspace/ui/components/input';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';

export default function Todo() {
  const [text, setText] = useState('');
  const { todos, insert } = useTodoStore();

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const onAdd = () => {
    if (text.trim() === '') {
      return alert('todo를 작성해주세요.');
    }

    insert({
      id: Date.now(),
      text,
      completed: false,
    });
    setText('');
  };

  const onAddKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onAdd();
    }
  };

  return (
    <div className="p-5 w-1/2">
      <div className="flex gap-2">
        <Input
          placeholder="input search text"
          onChange={onChangeText}
          onKeyDown={onAddKeyPress}
          value={text}
        />
        <Button
          type="primary"
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
}