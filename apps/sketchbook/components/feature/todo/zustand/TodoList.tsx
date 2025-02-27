'use client';
import React, { ChangeEvent, useState } from 'react';

import { TodoData, useTodoStore } from './store';
import { Checkbox } from '@workspace/ui/components/checkbox';
import { Pencil, Inbox, PencilOff, CircleX } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';

type Todo = {
  todo: TodoData;
};

export default function TodoList({ todo }: Todo) {
  const { text, completed } = todo;
  const { remove, update } = useTodoStore();
  const [checked, setChecked] = useState(completed);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const onComplete = (e) => {
    setChecked(e.target.checked);

    update({ ...todo, completed: e.target.checked });
  };

  const onUpdate = () => {
    setIsEditing(!isEditing);

    if (isEditing) {
      update({
        ...todo,
        text: editText,
      });
    }
  };

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const onRemove = () => {
    remove({
      ...todo,
      id: todo.id,
    });
  };

  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex items-center gap-2 flex-1">
        <Checkbox onChange={(e) => onComplete(e)} />
        {isEditing ? (
          <Input
            className="w-full"
            defaultValue={text}
            onChange={onChangeText}
          />
        ) : (
          <p className="text-semibold text-sm">{text}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={onUpdate}>
          {isEditing ? <PencilOff /> : <Pencil />}
        </Button>
        <Button onClick={onRemove}>
          <CircleX />
        </Button>
      </div>
    </div>
  );
}
