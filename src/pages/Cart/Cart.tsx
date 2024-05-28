import { useSelector } from "react-redux";
import Headling from "../../components/Headling/Headling";
import { RootState } from "../../store/store";
import CartItem from "../../components/CartItem/CartItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { PREFIX } from "../../helpers/API";
import { Product } from "../../interfaces/product.interface";
import styles from '../Cart/Cart.module.css';

export function Cart() {
    const [cartProducts, setCartProducts] = useState<Product[]>([]);
    const items = useSelector((s: RootState) => s.cart.items);

    const getItem = async (_id: string) => {
        const { data } =await axios.get(`${PREFIX}/product/${_id}`);
        return data;
    };  

    const loadAllItems = async () => {
        const res = await Promise.all(items.map(i => getItem(i._id)));
        setCartProducts(res);
    };
    

    useEffect(() => {
        loadAllItems();
    }, [items]);

    return <>
        <Headling className={styles['headling']}>Закладки</Headling>
        {items.map(i => {
            const product = cartProducts.find(p => p._id === i._id);
            if (!product) {
                return;
            }
            return <CartItem key={product._id} {...product} />
        })}
    </>;
}