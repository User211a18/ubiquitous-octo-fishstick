import Headling from "../../components/Headling/Headling";
import Search from "../../components/Search/Search";
import styles from '../../pages/Menu/Menu.module.css'
import { ChangeEvent, useEffect, useState } from "react";
import { PREFIX } from "../../helpers/API";
import { Product } from "../../interfaces/product.interface";
import axios, { AxiosError } from "axios";
import Button from "../../components/Button/Button";

import { MenuList } from "./MenuList/MenuList";

import * as XLSX from 'xlsx';

const convertToXLS = (objArray: Product[]): string => {
    if (!objArray?.length) return ''
    const wsData = [
        ["Название", "Год", "Автор", "Вид"],
        ...objArray.map(item => [item.name, item.year, item.author, item.view])
        ];

        const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);

    return url
    };

export function Menu() {
    const [products, setProducts]=useState<Product[]>([]);
    const [isLoading, setIsLoading]=useState<boolean>(false);
    const [error, setError]=useState<string | undefined>();
    const [filter, setFilter] = useState<string>();

    useEffect(() => {
        getMenu(filter);
    }, [filter]);

    const getMenu=async(name?: string)=> {
        try {
            setIsLoading(true);
            
            const {data}=await axios.get<Product[]>(`${PREFIX}/product`, {
                params: {
                    name
                }
            });
            setProducts(data);
            setIsLoading(false);
        } catch (e) {
            console.error(e);
            if (e instanceof AxiosError) {
                setError(e.message);
            }
            setIsLoading(false);
            return;
        }
    };

    const updateFilter=(e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    const handleDownload = () => {
        const url = convertToXLS(products);
        const link = document.createElement('a');
        link.href = url;
        link.download = (filter ?? "Все статьи") + '.xls';
        link.click();
        URL.revokeObjectURL(url); // Освобождаем URL после загрузки
    };

    return <>
            <div className={styles['head']}>
                <Headling>Главная</Headling>    
                <Search placeholder='Искать...' onChange={updateFilter}/>
            </div>
            <div>
                {error && <>{error}</>}
                {!isLoading && products.length>0 && <>
                    <div className={styles['report']}>
                        <Button onClick={handleDownload}>Сформировать отчет</Button>
                    </div>
                    <MenuList products={products}/>
                </>}
                {isLoading && <>Загрузка...</>}
                {!isLoading && products.length===0 && <>По вашему запросу ничего не найдено...</>}
            </div>
    </>;
}

export default Menu;
