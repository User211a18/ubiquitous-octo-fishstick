import { forwardRef } from "react";
import styles from './Search.module.css';
import cn from 'classnames';
import { SearchProps } from "./Search.props";
import { FaSearch } from "react-icons/fa";

const Input=forwardRef<HTMLInputElement, SearchProps>(function Input({isValid=true, className, ...props}, ref) {
    return (
        <div className={styles['input-wrapper']}> 
            <input ref={ref} className={cn(styles['input'], className, {
                [styles['invalid']]: isValid
            })} {...props} />
                <FaSearch className={styles['icon']} />
            {/* <img className={styles['icon']}src='/search.png' alt='Иконка лупы' /> */}
        </div>
        
    );

});

export default Input;
