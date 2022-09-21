import React, {useState, useContext}  from 'react';
import {Container, Form} from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {NavLink, useLocation} from 'react-router-dom'
import {REGISTRATION_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from '../utils/consts'
import Row from 'react-bootstrap/Row'
// import {login, registration} from '../http/userAPI'
import UserStore from '../store/UserStore'

import { observer } from 'mobx-react-lite'
import {Context} from '../index'
import {useNavigate} from "react-router-dom"

const Auth = observer(() => {
    const {user} = useContext(Context)
    let data;
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const click = async () => {
        try{
            if(isLogin) {
                data = await UserStore.login(email, password)
            }else{
                data = await UserStore.registration(email, password)
            }
            user.setUser(user)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
        }catch(e){
            alert(e)
        }
       
    }
     
    return (
        <div>
            <Container className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
            >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите вааш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите вааш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content: space-between mt-3 pl-3 pr-3">
                    {isLogin ? 
                        <div>
                            Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                        </div>
                        :
                        <div>
                            Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                        </div>
                    }   
                        <Button
                            onClick={click} 
                            variant={"outline-dark"}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                       
                    </Row>
                    
                </Form>
            </Card>
            </Container>
        </div>
    );
});

export default Auth;