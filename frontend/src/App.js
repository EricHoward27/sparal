// import custom components
import Header from './components/Header'
import Footer from './components/Footer'
// import react-bootstrap
import { Container } from 'react-bootstrap'
// import Screen Components
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
// import react router dom
import { Route } from 'react-router-dom'

function App() {
  return (
    <>
    <Header />
    <main className='py-3'>
      <Container>
        <Route path='/' component={HomeScreen} exact />
        <Route path='/product/:id' component={ProductScreen} />
        <Route path='/cart/:id?' component={CartScreen} />
      </Container>
    </main>
     <Footer />
    </>
  );
}

export default App;
