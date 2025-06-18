
import './App.css'
import Users from './components/Users'


const usersPromie = fetch('http://localhost:3000/users').then(res => res.json());

function App() {


  return (
    <>

      <h1>Simple CRUD Operation</h1>
      <Users usersPromie={usersPromie}></Users>

    </>
  )
}

export default App
