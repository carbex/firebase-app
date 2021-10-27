import "./App.css";
import firebase from "./firebase";
import FirebaseContext from './contexts/FirebaseContext'
import useAuth from "./hooks/useAuth";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Pokemon from "./components/pokemon/Pokemon"
import Main from "./pages/Main"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChatRoom from "./pages/ChatRoom";

function App() {

  const { user , isAuthenticated } = useAuth();

  // SIGNIN ANONYMOUSLY
  // useEffect(() => {
  //   const anonymous = signInAnonymously(firebase.auth)
  //   return () => anonymous();
  // }, []);

  return (
    <FirebaseContext.Provider value={{ user, isAuthenticated, firebase }}>
      <Router>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/signIn" component={SignIn} />
          <Route path="/signUp" component={SignUp} />
          <Route path="/pokemon" component={Pokemon} />
          <Route path="/chat" component={ChatRoom} />
        </Switch>
      </Router>
    </FirebaseContext.Provider>
  );
}

export default App;
