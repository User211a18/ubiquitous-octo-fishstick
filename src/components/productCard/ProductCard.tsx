import styles from './ProductCard.module.css'
import { ProductCardProps } from './ProductCard.props';
import { Link } from 'react-router-dom';
// import { RiBookmark3Line } from "react-icons/ri";
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '../../store/store';
// import { cartActions } from '../../store/cart.slice';
// import { MouseEvent } from 'react';

function ProductCard(props: ProductCardProps) {
// const dispatch=useDispatch<AppDispatch>()

    // const add = (e: MouseEvent) => {
    //     e.preventDefault();
    //     dispatch(cartActions.add(props._id))
    // };

    return (
        <Link to={`/product/${props._id}`} className={styles['link']}>
            <div className={styles['card']}>
                {/* <div className={styles['head']}>
                    <button className={styles['add-to-cart']} onClick={add}>
                        <RiBookmark3Line />
                    </button>
                </div> */}
                <div className={styles['footer']}>
                    <div className={styles['name']}>{props.name}</div>
                    <div className={styles['author']}>{props.author}</div>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard;