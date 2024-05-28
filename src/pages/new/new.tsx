import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './new.module.css';
import Button from '../../components/Button/Button';
import Input from '../../components/input/Input';

interface FormData {
    name: string;
    description: string;
    author: string;
    year: string;
    view: string;
    file: File | null;
}

export const New: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        author: '',
        year: '',
        view: '',
        file: null,
    });

    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({
                ...formData,
                file: e.target.files[0],
            });
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const postData = new FormData();
        postData.append('name', formData.name);
        postData.append('description', formData.description);
        postData.append('author', formData.author);
        postData.append('year', formData.year);
        postData.append('view', formData.view);
        if (formData.file) {
            postData.append('file', formData.file);
        }

        fetch('http://localhost:9666/api/product', {
            method: 'POST',
            body: postData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                setSuccessMessage('Запись успешно создана');
                // Clear the success message after 3 seconds
                setTimeout(() => setSuccessMessage(null), 3000);
            })
            .catch((error) => {
                console.error('Error:', error);
                setSuccessMessage(null); // Clear the success message on error
            });
    };

    return (
        <div className={styles['item']}>
            <form onSubmit={handleSubmit}>
                <label className={styles['name']}>
                    Название: 
                    <Input className={styles['input']}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label className={styles['name']}>
                    Автор:
                    <Input className={styles['author']}
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label className={styles['name']}>
                    Год публикации: 
                    <Input className={styles['year']}
                        type="text"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label className={styles['name']}>
                    Вид публикации: 
                    <Input className={styles['view']}
                        type="text"
                        name="view"
                        value={formData.view}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label className={styles['name']}>
                    Описание:
                    <textarea className={styles['textarea']}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label className={styles['name']}>
                    Приложенный файл: 
                    <Input className={styles['input1']}
                        type="file"
                        name="file"
                        onChange={handleFileChange}
                        required
                    />
                </label>
                <br />
                <div className={styles['button-container']}>
                    <Button className={styles['button']} type="submit">Добавить запись</Button>
                    {successMessage && <span className={styles['success-message']}>{successMessage}</span>}
                </div>
            </form>
        </div>
    );
};
