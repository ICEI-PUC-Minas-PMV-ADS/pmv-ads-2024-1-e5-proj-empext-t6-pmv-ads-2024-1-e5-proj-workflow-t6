import React, { useState } from 'react';
import './EventModal.css';
import axiosInstance from '../axiosInstance';
import { toast } from "react-toastify";

const EventModal = ({ closeModal }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const handleSave = async () => {
        const newEvent = {
            title,
            description,
            date,
        };

        try {
            const response = await axiosInstance.post('/event/event-create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEvent),
            });

            if (!response.ok) {
                throw new Error('Erro ao criar evento.');
            }
            toast.success('Evento criado com sucesso!')
            closeModal();
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('Erro ao criar evento:', error.message);
            toast.error(`Erro ao agendar evento.`);
        }
    };

    return (
        <div className="event-modal">
            <div className="event-modal-content">
                <span className="event-close" onClick={closeModal}>&times;</span>
                <h2>Criar Evento</h2>
                <label>Título:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label>Descrição:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <label>Data:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <button type="submit" onClick={handleSave}>Salvar</button>
            </div>
        </div>
    );
};

export default EventModal;
