import ProductCard from "../../../components/productCard/ProductCard";
import { MenuListProps } from "./MenuList.props";
import styles from './MenuList.module.css';

export function MenuList({products}: MenuListProps) {
    return <div className={styles.wrapper}>{products.map(p => (
        <ProductCard 
            key={p._id}
            _id={p._id}
            name={p.name}
            author={p.author}
            year={p.year}
            view={p.view}
            description={p.description}
            file={p.file}
        />
    ))}
    </div>
}