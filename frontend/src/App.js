// import custom components
import Header from './components/Header'
import Footer from './components/Footer'
// import react-bootstrap
import { Container } from 'react-bootstrap'
// import Screen Components
import HomeScreen from './screens/HomeScreen'

function App() {
  return (
    <>
    <Header />
    <main className='py-3'>
      <Container>
        <HomeScreen />
      </Container>
    </main>
     <Footer />
    </>
  );
}

export default App;
