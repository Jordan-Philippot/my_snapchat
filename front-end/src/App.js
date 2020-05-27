import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import './App.css';

import Header from './components/parts/header';
import Footer from './components/parts/footer';
import LoginPage from './views/auth/Login';
import RegisterPage from './views/auth/Register';
import LogoutPage from './views/auth/Logout';

function App () {
    return (
        <Router>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Switch>
                            <Route path="/login">
                                <LoginPage />
                            </Route>

                            <Route path="/register">
                                <RegisterPage />
                            </Route>

                            <Route path="/logout">
                                <LogoutPage />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
            <Footer />
        </Router>
    );
}

export default App;