import './App.css'
import { TaskProvider } from './components/TaskContext';
import TaskList from './components/TaskList';

function App() {

  return (
    <>
      <TaskProvider>
        <TaskList />
      </TaskProvider>
    </>
  )
}

export default App
