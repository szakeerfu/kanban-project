import React from 'react';
 
import Navbar from './components/Navbar/navbar';
import KanbanBoard from './components/KanbanBoard';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';

const App = () => {
  return (
   
      <div className="App">
        <Navbar />
        <DndProvider backend={HTML5Backend}>
         
            <KanbanBoard />  
       
        
        </DndProvider>
      </div>
   
  );
};

export default App;
