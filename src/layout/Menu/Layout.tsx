import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from './Layout.module.css';
import Button from "../../components/Button/Button";
import cn from 'classnames';
import { CgMenuGridO} from "react-icons/cg";
import { RxExit } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getProfile, userActions } from "../../store/user.slice";
import { useEffect } from "react";
// import { RiBookmark3Line } from "react-icons/ri";
import { MdFileUpload } from "react-icons/md";

export function Layout() {
    const navigate=useNavigate();
    const dispatch=useDispatch<AppDispatch>();
    const profile=useSelector((s: RootState) => s.user.profile);
    // const item=useSelector((s: RootState) => s.cart.items);
    console.log(profile);
    

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    const logout=() => {
        dispatch(userActions.logout());
        navigate('/auth/login');
    };

    return <div className={styles['layout']}> 
        <div className={styles['sidebar']}>
            <div className={styles['user']}>
                <img className={styles['avatar']} src='/5.png' alt='Аватар пользователя' />
                <div className={styles['name']}>{profile?.name}</div>
                <div className={styles['email']}>{profile?.email}</div>
            </div>
            <div className={styles['menu']}>
                <NavLink to='/' className={({isActive})=>cn(styles['link'], {
                    [styles.active]: isActive
                })}>
                    {/* <img src='/1.png' alt='Иконка меню' /> */}
                    <CgMenuGridO />
                    Главная</NavLink>
                {/* <NavLink to='/cart' className={({isActive})=>cn(styles['link'], {
                    [styles.active]: isActive
                })}>
                    {/* <img src='/2.png' alt='Иконка корзины' /> */}
                    {/* <RiBookmark3Line />
                    Закладки <span className={styles['cart-count']}>{item.reduce((acc, item) => acc+=item.count, 0)}</span></NavLink> */}
                    
            </div>
            <NavLink to='/new' className={({isActive})=>cn(styles['link'], {
                    [styles.active]: isActive
                })}>
                <Button className={styles['upload']} >
                        <MdFileUpload />
                        Загрузить
                </Button>
            </NavLink>

            <Button className={styles['exit']} onClick={logout}>
                {/* <img src='/6.png' alt='Иконка выхода' /> */}
                <RxExit />
                Выход
            </Button>
            
        </div>
        <div className={styles['content']}>
            <Outlet />
        </div> 
    </div>;
}