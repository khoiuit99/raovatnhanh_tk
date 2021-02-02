import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Content from "./Components/Common/Content";
import LogInPage from "./Components/LogIn/signIn";
import CreatePost from './Components/Post/createPost';
import SignUpPage from './Components/LogIn/signUp';
import DetailPost from './Components/Post/detailPost';
import UserInfo from './Components/User/userInfo';
import ListPostByKey from './Components/Post/listPostByKey';
import FilterPost from './Components/Post/filterPost';
import ListAllOrderPhone from './Components/Post/listPostPhone';
import ListAllOrderLaptop from "./Components/Post/listPostLaptop";
import ListAllOrderGearPhone from "./Components/Post/listPostGearPhone";
import ListAllOrderGearLaptop from "./Components/Post/listPostGearLaptop";

function App() {
  return (
    <div classname="App">
      <Router>
        <Switch>
          <Route path="/login" component={LogInPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/xemchitiet/:id"  component={DetailPost} />
          <Route path="/thongtincanhan"  component={UserInfo} />
          <Route path="/taobaidang" component={CreatePost} />
          <Route path="/ketquatimkiem" component={ListPostByKey} />
          <Route path="/dtdd" component={ListAllOrderPhone} />
          <Route path="/laptop" component={ListAllOrderLaptop} />
          <Route path="/lkdidong" component={ListAllOrderGearPhone} />
          <Route path="/lklaptop" component={ListAllOrderGearLaptop} />
          <Route path="/locbaidang" component={FilterPost} />
          <Route path="/" component={Content} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

