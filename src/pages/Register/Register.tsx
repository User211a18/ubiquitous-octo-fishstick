import Headling from "../../components/Headling/Headling";
import Input from "../../components/input/Input";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import styles from './Register.module.css'
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { register, userActions } from "../../store/user.slice";

export type RegisterForm = {
    email: {
        value: string;
    };
    password: {
        value: string;
    };
    name: {
        value: string;
    };
}

export function Register() {
    const navigate=useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { jwt, registerErrorMessage }=useSelector((s: RootState) => s.user);

    useEffect(() => {
        if (jwt) {
            navigate('/');
        }
    }, [jwt, navigate]);

    const submit=async (e: FormEvent) => {
        e.preventDefault();
        dispatch(userActions.clearRegisterError());
        const target=e.target as typeof e.target & RegisterForm;
        const {email, password, name}=target;
        // console.log(email.value);
        // console.log(password.value);
        dispatch(register({email: email.value, password: password.value, name: name.value}));
    };


    return <div className={styles['login']} >
        <Headling className={styles['label1']}>Регистрация</Headling>
        {registerErrorMessage && <div className={styles['error']}>{registerErrorMessage}</div>}
        <form className={styles['form']} onSubmit={submit}>
            <div className={styles['field']}>
                <label htmlFor='email'>Ваш email</label>
                <Input id='email' name='email' placeholder="email"/>
            </div>
            <div className={styles['field']}>
                <label htmlFor='password'>Ваш пароль</label>
                <Input id='password' name='password' type='password' placeholder="password"/>
            </div>
            <div className={styles['field']}>
                <label htmlFor='name'>Ваше имя</label>
                <Input id='name' name='name' placeholder="Имя"/>
            </div>
            <Button appearence="big">Вход</Button>
        </form>
            <div className={styles['links']}>
            <div>Есть аккаунт?</div>
                <Link to='/auth/login'>Войти</Link>
            </div>
    </div>
}