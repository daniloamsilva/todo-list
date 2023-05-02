import { Trash } from "@phosphor-icons/react";
import styles from "./Task.module.css";

interface TaskProps {
  task: {
    id: string;
    content: string;
    done: boolean;
  },
  onChangeStatus(id: string): void
  onDelete(id: string): void;
}

export function Task({ task, onChangeStatus, onDelete }: TaskProps) {
  return (
    <div className={styles.task}>
      <label className={styles.container}>
        <input 
          type="checkbox" 
          checked={task.done} 
          onChange={() => onChangeStatus(task.id)}
        />
        <span className={styles.checkmark}></span>
      </label>
      <p className={task.done ? styles.taskDone : ''}>{task.content}</p>
      <button 
        type="button" 
        title="Remover tarefa"
        onClick={() => onDelete(task.id)}
      >
        <Trash size={20} />
      </button>
    </div>  
  )
}