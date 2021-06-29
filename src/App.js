import Header from './components/Header'
import CoursesPage from './views/CoursesPage'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <CartProvider>
          <div className="w-full min-h-screen" style={{ backgroundImage: 'linear-gradient(to right top, #53dfef, #00c8f9, #00aefe, #368ff6, #7b69dd)' }}>
            <Header />
            <CoursesPage />
          </div>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
