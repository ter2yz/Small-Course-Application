import Header from './components/Header'
import CoursesPage from './views/CoursesPage'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <CartProvider>
          <Header />
          <CoursesPage />
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
