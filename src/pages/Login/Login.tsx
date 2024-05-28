import Headling from "../../components/Headling/Headling";
import Input from "../../components/input/Input";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import styles from './Login.module.css'
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { login, userActions } from "../../store/user.slice";

export type LoginForm = {
    name: {
        value: string;
    };
    password: {
        value: string;
    };
}

export function Login() {
    const navigate=useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { jwt, loginErrorMessage }=useSelector((s: RootState) => s.user);

    useEffect(() => {
        console.log(jwt)
        if (jwt) {
            navigate('/');
        }
    }, [jwt, navigate]);

    const submit=(e: FormEvent) => {
        e.preventDefault();
        dispatch(userActions.clearLoginError());
        const target=e.target as typeof e.target & LoginForm;
        const {name, password}=target;
        // console.log(email.value);
        // console.log(password.value);
        sendLogin(name.value, password.value);
    };

    const sendLogin=async (name: string, password:string) => {
        dispatch(login({name, password}));
    };


    return <div className={styles['login']} >
        <Headling className={styles['label1']}>Вход</Headling>
        {loginErrorMessage && <div className={styles['error']}>{loginErrorMessage}</div>}
        <form className={styles['form']} onSubmit={submit}>
            <div className={styles['field']}>
                <label htmlFor='name'>Ваше имя</label>
                <Input id='name' name='name' placeholder="name"/>
            </div>
            <div className={styles['field']}>
                <label htmlFor='password'>Ваш пароль</label>
                <Input id='password' name='password' type='password' placeholder="password"/>
            </div>
            <Button appearence="big">Вход</Button>
        </form>
            <div className={styles['links']}>
            <div>Нет аккаунта?</div>
                <Link to='/auth/register'>Зарегистрироваться</Link>
            </div>
    </div>
}