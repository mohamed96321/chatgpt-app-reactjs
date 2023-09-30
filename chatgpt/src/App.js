import { useEffect } from "react";
import Dashboard from "./Dashboard/Dashboard";
import { connectWithSocketServer } from "./socketConnection/socketConn";

function App() {
  useEffect(() => {
    connectWithSocketServer();
  }, []);
  
  return (
   <div>
    <Dashboard />
   </div>
  );
}

export default App;
