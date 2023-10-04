import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { AiOutlinePlus, AiOutlineDelete, AiOutlineEdit, AiOutlineSave } from 'react-icons/ai';
import { createTask } from '../../utils/CreateTask/CreateTask';
import { deleteTask } from '../../utils/DeleteTask/DeleteTask';
import { updateTask } from '../../utils/UpdateTask/UpdateTask';

const TodoListWrapper = styled.div`
  padding: 2% 0%;
  max-width: 400px;
  margin: 0 auto;
`;

const NewTaskContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 16px;
`;

const InputContainer = styled.div`
  display: flex;
  flex: 1;
`;

const TodoInput = styled.input`
  flex: 1;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 8px;
`;

const AddTaskButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 8px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const EditButton = styled.button`
  padding: 8px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
  margin-right: 8px;
  background-color: #337ab7;
  color: white;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2e6da4;
  }
`;

const SaveButton = styled.button`
  padding: 8px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
  margin-right: 8px;
  background-color: #5bc0de;
  color: white;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #46b8da;
  }
`;

const DeleteButton = styled.button`
  padding: 8px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
  background-color: #d9534f;
  color: white;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c9302c;
  }
`;

const TaskList = styled.div`
  .task {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    margin-bottom: 8px;
    padding: 8px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #f0f0f0;

      .action-buttons {
        display: flex;
      }
    }

    .action-buttons {
      display: none;
      align-items: center;
    }

    .delete-icon,
    .edit-icon {
      color: white;
      margin-right: 8px;
      cursor: pointer;
      border-radius: 4px;
      padding: 4px;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #d9534f;
      }
    }

    &:hover .delete-icon,
    &:hover .edit-icon {
      background-color: #d9534f;
    }

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: 1;
      margin-right: 8px;
      cursor: ${(props) => (props['data-isediting'] ? 'text' : 'default')};
    }
  }
`;

const TodoList = ({ tasks, setTasks }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [originalTitle, setOriginalTitle] = useState('');

  const newTaskRef = useRef(null);
  const taskRefs = useRef({});

  useEffect(() => {
    if (editingTaskId === null) {
      newTaskRef.current.focus();
    }
    if (editingTaskId !== null && taskRefs.current[editingTaskId]) {
      taskRefs.current[editingTaskId].focus();
    }
  }, [editingTaskId, tasks]);



  const handleCreateTask = async (newTaskTitle) => {
    try {
      if (!newTaskTitle.trim()) {
        return;
      }

      const newTaskData = {
        title: newTaskTitle,
      };

      const newTaskResponse = await createTask(newTaskData);

      setTasks((prevTasks) => [...prevTasks, newTaskResponse]);

      setNewTaskTitle('');
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };

  const handleEditButtonClick = (taskId, currentTitle) => {
    setEditingTaskId(taskId);
    setEditedTitle(currentTitle);
    setOriginalTitle(currentTitle);

    const taskRef = taskRefs.current[taskId];

    if (taskRef) {
      const range = document.createRange();
      const selection = window.getSelection();
  
      range.selectNodeContents(taskRef);
      range.collapse(false);
      
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const handleSaveEdit = async (taskId, newTitle) => {
    try {
      if (newTitle === undefined || !newTitle.trim()) {
        setEditedTitle(originalTitle);
        setEditingTaskId(null);
        return;
      }

      const updateTaskData = {
        id: taskId,
        title: newTitle,
      };

      await updateTask(taskId, updateTaskData);

      setEditingTaskId(null);
      setEditedTitle('');
    } catch (error) {
      console.error('Erro ao editar tarefa:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  return (
    <TodoListWrapper>
      <NewTaskContainer>
        <InputContainer>
          <TodoInput
            ref={newTaskRef}
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCreateTask(newTaskTitle);
              }
            }}
            placeholder="Nova tarefa"
          />
          <AddTaskButton onClick={() => handleCreateTask(newTaskTitle)}>
            <AiOutlinePlus />
          </AddTaskButton>
        </InputContainer>
      </NewTaskContainer>
      <TaskList>
        {tasks.map((task) => (
          <div className="task" key={task.id} data-isediting={editingTaskId === task.id}>
            <p
              ref={(el) => (taskRefs.current[task.id] = el)}
              contentEditable={editingTaskId === task.id}
              suppressContentEditableWarning
              onBlur={(e) => handleSaveEdit(task.id, e.target.innerText)}
            >
              {editingTaskId === task.id ? editedTitle : task.title}
            </p>
            <div className="action-buttons">
              {editingTaskId === task.id ? (
                <SaveButton onClick={(e) => handleSaveEdit(task.id, e.target.innerText)}>
                  <AiOutlineSave />
                </SaveButton>
              ) : (
                <>
                  <EditButton onClick={() => handleEditButtonClick(task.id, task.title)}>
                    <AiOutlineEdit />
                  </EditButton>
                  <DeleteButton onClick={() => handleDeleteTask(task.id)}>
                    <AiOutlineDelete />
                  </DeleteButton>
                </>
              )}
            </div>
          </div>
        ))}
      </TaskList>
    </TodoListWrapper>
  );
};

export default TodoList;
