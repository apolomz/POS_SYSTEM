import SalesForm from "../components/SalesFrom";


function Home() {
    return(
        <div>
      <h2>Facturación de productos POS</h2>
      <p>Selecciona los elementos para facturar.</p>
      
      <SalesForm />
    </div>
    )
    
}

export default Home;