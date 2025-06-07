import { useState } from "react";
import LoginScreen from "./components/LoginScreen";
import ClientForm from "./components/ClientForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <ClientForm />
      )}
    </div>
  );
}

export default App;