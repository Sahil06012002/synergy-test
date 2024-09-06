import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import User from './screens/users';
function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path='/user' element={<User />} />

        </Routes>
      </Router>
      
    </>
  )
}

export default App
