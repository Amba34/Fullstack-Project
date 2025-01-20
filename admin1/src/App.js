import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, roomColomns, userColumns } from "./datatablesource";
import NewHotle from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/NewRoom/NewRoom";


function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRouts = ({ children }) => {
    const { user } = useContext(AuthContext)
    if (!user) {
      return <Navigate to="/login" />
    }
    return children
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route index element={<ProtectedRouts>
              <Home />
            </ProtectedRouts>} />
            
            <Route path="users">
              <Route index element={<ProtectedRouts>
                <List columns = {userColumns}/>
              </ProtectedRouts>
              } />
              <Route path=":userId" element={<ProtectedRouts>
                <Single />
              </ProtectedRouts>
              } />
              <Route
                path="new"
                element={<ProtectedRouts>
                  <New inputs={userInputs} title="Add New User" />
                </ProtectedRouts>
                }
              />
            </Route>
            <Route path="hotels">
              <Route index element={<ProtectedRouts>
                <List columns = {hotelColumns} />
              </ProtectedRouts>
              } />
              <Route path=":productId" element={<ProtectedRouts>
                <Single />
              </ProtectedRouts>
              } />
              <Route
                path="new"
                element={<ProtectedRouts>
                  <NewHotle  />
                </ProtectedRouts>
                }
              />
            </Route>
            <Route path="rooms">
              <Route index element={<ProtectedRouts>
                <List columns = {roomColomns} />
              </ProtectedRouts>
              } />
              <Route path=":productId" element={<ProtectedRouts>
                <Single />
              </ProtectedRouts>
              } />
              <Route
                path="new"
                element={<ProtectedRouts>
                  <NewRoom inputs={productInputs} title="Add New Product" />
                </ProtectedRouts>
                }
              />
              

            </Route>



          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
