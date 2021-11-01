import firebase from "./firebase";
import FirebaseContext from "./contexts/FirebaseContext";
import useAuth from "./hooks/useAuth";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Pokemon from "./components/pokemon/Pokemon";
import PostsPage from "./pages/PostsPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PostPage from "./pages/PostPage";

function App() {
  const { user, isAuthenticated } = useAuth();

  return (
    <FirebaseContext.Provider value={{ user, isAuthenticated, firebase }}>
      <Router>
        <Switch>
          <Route path="/" exact component={PostsPage} />
          <Route path="/posts" exact component={PostsPage} />
          <Route path="/posts/:postId" component={PostPage} />
          <Route path="/signIn" component={SignIn} />
          <Route path="/signUp" component={SignUp} />
          <Route path="/pokemon" component={Pokemon} />
        </Switch>
      </Router>
    </FirebaseContext.Provider>
  );
}

export default App;
