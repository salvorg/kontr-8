import React from 'react';
import Navbar from "./components/Navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home";
import QuoteForm from "./components/Quotes/QuoteForm";

function App() {
  return (
    <div>
      <header><Navbar/></header>
      <main className="container-fluid">
        <Routes>
          <Route path="/" element={(<Home/>)}>
            <Route path=":id" element={(<QuoteForm/>)}/>
          </Route>
          <Route path="/quotes/:id" element={(<Home/>)}/>
          <Route path="/all" element={(<Home/>)}/>
          <Route path="/quotes/:id/edit" element={(<QuoteForm/>)}/>
          <Route path="/add-quote" element={(<QuoteForm/>)}/>

        </Routes>
      </main>
    </div>

  );
}

export default App;
