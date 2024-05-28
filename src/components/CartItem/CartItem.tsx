import styles from './CartItem.module.css'
import { CiCircleRemove } from "react-icons/ci";
import { CartItemProps } from './CartItem.props';
import { useDispatch } from "react-redux";
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';
import { Link } from 'react-router-dom';

function CartItem(props: CartItemProps) {
const dispatch=useDispatch<AppDispatch>()

    // const add = (e: MouseEvent) => {
    //     e.preventDefault();
    //     dispatch(cartActions.add(props.id))
    // };

    const remove = () => {
        dispatch(cartActions.remove(props._id));
    };

    return (
            <div className={styles['item']}>
                <Link to={`/products/${props._id}`} className={styles['link']}>
                        <div className={styles['description']}>
                            <div className={styles['name']}>{props.name}</div>
                        </div>
                </Link>
                <div className={styles['actions']}>
                    <button className={styles['remove']} onClick={remove}>
                        <CiCircleRemove className={styles['remove-icon']} />
                    </button>
                </div>
            </div>
    )
}

export default CartItem;