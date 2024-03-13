import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Logins from "./scenes/login/Logins";
import Protected from "./scenes/login/Protected";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
// import Calendar from "./scenes/calendar/calendar";
import Layout from "./Layout";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

   


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
        <div className="app">
          <Routes>
            <Route exact path="/login" element={<Logins />} />
            <Route exact path="/*" element={<Protected  cmd={Layout}/>}>
             
            </Route>



          </Routes>
          {/* <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            
              <Routes>
                <Route exact path="/Logins" element={<Dashboard/>} />
                <Route path="/" element={<Logins />} />
                <Route path="/team" element={<Team />} />
                <Route path="/stokkarti" element={<Stokkarti />} />
                <Route path="/firmalar" element={<Firmalar />} />
        
          
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/projeler" element={<Protected cmd={Projeler}  />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
              </Routes>
            
          </main> */}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
