import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Firmalar from "./scenes/firma";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import Protected from "./scenes/login/Protected";
import Projeler from "./scenes/proje";
import ProjeRaporlari from "./scenes/projeraporlari";
import Satinalma from "./scenes/satinalma";
import Siparis from "./scenes/siparis";
import Stokcikisi from "./scenes/stokcikisi";
import StokDurumu from "./scenes/stokdurumu";
import Stokgirisi from "./scenes/stokgirisi";
import Stokkarti from "./scenes/stokkarti";

const Layout = () => {
    const [isSidebar, setIsSidebar] = useState(true);

    return (
     
          
        <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Routes>

                    
                    <Route path="/stokkarti" element={<Protected cmd={Stokkarti} />} />
                    <Route path="/firmalar" element={<Protected cmd={Firmalar} />} />
                    <Route path="/projeler" element={<Protected cmd={Projeler} />} />
                    <Route path="/stokdurumu" element={<Protected cmd={StokDurumu} />} />
                    <Route path="/siparis" element={<Protected cmd={Siparis} />} />
                    <Route path="/satinalma" element={<Protected cmd={Satinalma} />} />
                    <Route path="/stokgirisi" element={<Protected cmd={Stokgirisi} />} />
                    <Route path="/stokcikisi" element={<Protected cmd={Stokcikisi} />} />
                    <Route path="/projeraporlari" element={<Protected cmd={ProjeRaporlari} />} />
                   
                    {/* <Route path="/faq" element={<FAQ />} /> */}


                </Routes>

            </main>
        </div>
      
    )
}
export default Layout;