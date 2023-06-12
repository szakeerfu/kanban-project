import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    
    <BrowserRouter>
    <Routes>
        <Route index path="/" element={<App/>}/>
        <Route path="/:board_id/:card_id" element={<App/>}/>
    </Routes>
    </BrowserRouter>


   

);


