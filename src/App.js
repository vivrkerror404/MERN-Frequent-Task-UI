import RegistrationForm from "./pages/registrationForm";
import User from "./pages/users";
function App() {
  const pathname = window.location.pathname;
  return <>{pathname === "/user/list" ? <User /> : <RegistrationForm />}</>;
}

export default App;
