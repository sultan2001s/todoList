import {useDispatch, useSelector} from "react-redux";
import {addUsers, deleteAllUsers, deleteUsers, doneUsers, editUsers, isImportant} from "./redux/reducers/users";
import {useState} from "react";

function App() {
  // redux hooks
  const dispatch = useDispatch()
  const users = useSelector((s) => s.users.users)
  const usersCount = useSelector((s) => s.users.usersCount)

  // react hooks
  const [value, setValue] = useState('')
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')

  return (
    <div className="App">
      <h2>Количество юзеров - {usersCount}</h2>
      <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='поиск'/>
      <div>
          <button type='button' onClick={() => dispatch(deleteAllUsers())}>Удалить все</button>
          <button onClick={() => setStatus('all')} type='button'>ALL</button>
          <button onClick={() => setStatus('done')} type='button'>DONE</button>
          <button onClick={() => setStatus('important')} type='button'>IMPORTANT</button>
      </div>
      <ul>
          {
              users.filter(el => {
                  if (status === 'all') {
                      return el
                  } else if (status === 'done') {
                      return el.isDone
                  } else if (status === 'important') {
                      return el.isImportant
                  } else {
                      return el
                  }
              }
              ).filter(el => el.name.toLowerCase().includes(search.toLowerCase())).map(item => (
              <li key={item.id}>
                  <button type='button' onClick={() => dispatch(doneUsers(item.id, item.isDone))}>Done</button>
                  <button type='button' onClick={() => dispatch(isImportant(item.id, item.isImportant))}>Important</button>
                 <span style={{textDecoration: item.isDone ? 'line-through' : '', color: item.isImportant ? 'red' : ''}}>
                     {item.change ? <input onChange={(e) => setValue(e.target.value)} defaultValue={item.name} type="text"/> : item.name}
                 </span>
                  <button type='button' onClick={() => dispatch(addUsers(item.name, item.age))}>Копировать</button>
                  <button type='button' onClick={() => dispatch(deleteUsers(item.id))}>Удалить</button>
                  <button type='button' onClick={() => {
                      dispatch(editUsers(item.id, value, item.change))
                      if (item.change) {
                          setValue('')
                      } else {
                          setValue(item.name)
                      }
                  }}>
                      {item.change ? 'save' : 'edit'}
                  </button>
              </li>
          ))}
      </ul>

      <form onSubmit={(e) => {
          e.preventDefault()
          dispatch(addUsers(e.target[0].value, e.target[1].value))
          e.target[0].value = ''
          e.target[1].value = ''
      }}>
          <input placeholder='name' type="text"/>
          <input placeholder='age' type="number"/>
          <button type='submit'>Добавить</button>
      </form>
    </div>
  );
}

export default App;

