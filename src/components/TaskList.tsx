import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './TaskList.module.css';
import { v4 as uuid } from 'uuid';
import { PlusCircle } from '@phosphor-icons/react';
import { Task } from './Task';

interface Task {
  id: string;
  content: string;
  done: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  function handleNewTaskTextChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value);
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    setTasks(tasks => [...tasks, {
      id: uuid(),
      content: newTaskText,
      done: false
    }]);

    setNewTaskText('');
  }

  function handleChangeTaskStatus(id: string) {
    const tasksWithChangedOne = tasks.map(task => {
      if(task.id === id) task.done = !task.done;
      return task;
    });

    setTasks(tasksWithChangedOne);
  }

  function handleDeleteTask(id: string) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== id;
    });

    setTasks(tasksWithoutDeletedOne);
  }

  function countDoneTasks() {
    return tasks.reduce(function(acc, task) {
      return task.done ? acc + 1 : acc
    }, 0)
  }

  const isNewTaskTextEmpty = newTaskText.length === 0;

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleCreateNewTask}>
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

      <div className={styles.info}>
        <div>
          <strong className={styles.created}>Tarefas criadas</strong>
          <span>{tasks.length}</span>
        </div>
        <div>
          <strong className={styles.done}>Concluídas</strong>
          <span>{`${countDoneTasks()} de ${tasks.length}`}</span>
        </div>
      </div>

      { tasks.map(task => (
        <Task 
          key={task.id} 
          task={task} 
          onChangeStatus={handleChangeTaskStatus}
          onDelete={handleDeleteTask}
        />
      )) }
    </div>
  )
}