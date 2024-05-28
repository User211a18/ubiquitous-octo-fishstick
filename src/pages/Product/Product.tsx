import { Await, useLoaderData } from "react-router-dom";
import { Product } from "../../interfaces/product.interface";
import { Suspense } from "react";
import styles from "./Product.module.css"

export function Product() {
    const data = useLoaderData() as {data: Product};


    return <>
        <Suspense fallback={'Загружаю...'}>
            <Await
                resolve={data.data}
            >
                {({data}: {data: Product})=>(
                    <div className={styles['text']}>
                    <h1>{data.name}</h1>
                    <h2>{data.author}</h2>
                    <h3>Год публикации: {data.year}</h3>
                    <h3>Тип публикации: {data.view}</h3>
                    <h3>Описание:</h3>
                    <p>{data.description}</p>
                    <a href={`http://localhost:9666/${data.file}`} download={data.name}>Скачать</a>
                    </div>
                )}
            </Await>
        </Suspense>
    </>;
}