import { ChangeEvent, useState } from 'react';
import styles from './TaskList.module.css';
import { PlusCircle } from '@phosphor-icons/react';

export function TaskList() {
  const [newTaskText, setNewTaskText] = useState('');

  function handleNewTaskTextChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value);
  }

  const isNewTaskTextEmpty = newTaskText.length === 0;

  return (
    <div className={styles.wrapper}>
      <form action="">
        <input 
          type="text" 
          placeholder="Adicione uma nova tarefa"
          value={newTaskText}
          onChange={handleNewTaskTextChange}
        />
        <button type="submit" disabled={isNewTaskTextEmpty}>
          Criar <PlusCircle size={16} weight="bold" />
        </button>
      </form>
    </div>
  )
}