import { useCallback, useEffect, useState } from "react";
import { loadTasks } from "../../utils/LoadTasks/LoadTasks";
import TodoList from "../../components/TodoList/TodoList";



const HomePage = () => {
    const [tasks, setTasks] = useState([]);

    const handleLoadTasks = useCallback(async () => {
        const tasks = await loadTasks();

        setTasks(tasks);
    })

    useEffect(() => {
        handleLoadTasks();

    }, []);
        
    return (
        <>
        <TodoList tasks={tasks} setTasks={setTasks} ></TodoList>
        </>
    )
}

export default HomePage;