import Header from './components/Header'
import CoursesPage from './views/CoursesPage'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <CoursesPage />
      </AuthProvider>
    </div>
  );
}

export default App;
