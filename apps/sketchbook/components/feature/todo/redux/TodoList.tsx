import React, { ChangeEvent, useState } from 'react';
import { Pencil, Inbox, PencilOff, CircleX } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { remove, update, TodoData } from './todoSlice';
import { Checkbox } from '@workspace/ui/components/checkbox';
import { Input } from '@workspace/ui/components/input';
import { Button } from '@workspace/ui/components/button';

type Todo = {
  todo: TodoData;
};

const TodoList = ({ todo }: Todo) => {
  const { text, completed } = todo;
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(completed);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const onComplete = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);

    dispatch(update({ ...todo, completed: e.target.checked }));
  };

  const onUpdate = () => {
    setIsEditing(!isEditing);

    if (isEditing) {
      dispatch(
        update({
          id: todo.id,
          text: editText,
        })
      );
    }
  };

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const onRemove = () => {
    dispatch(remove(todo.id));
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
};

export default TodoList;