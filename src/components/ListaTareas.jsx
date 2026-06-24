import React, { Fragment, use, useEffect, useRef, useState } from "react";
import { ItemTarea } from "./ItemTarea";
import { v4 as uuidv4 } from "uuid";

export function ListaTareas() {
    const KEY = "tareasapp-listatareas";

    const [listaTareas, setListaTareas] = useState([]);

    const [error,setError] = useState('');

    useEffect(() => {
        const listaTareasJson = localStorage.getItem("tareasapp-listatareas");
        const listaTareasStorage = JSON.parse(listaTareasJson);
        console.log(listaTareasJson);
        setListaTareas((tareasAnteriores) => {
            return [...tareasAnteriores, ...listaTareasStorage];
        });
    }, []);
    
        const tarea = useRef();
        const descripcion = useRef();
        const importante = useRef();
    
    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(listaTareas))
    }, [listaTareas]);

    function agregarTarea() {
        const valorTarea = tarea.current.value;
        const valorDescripcion = descripcion.current.value;
        const valorImportante = importante.current.checked;
        if (valorDescripcion === ""){
            setError('Se necesita una descripcion')
            return;
        }
        const nuevaTarea = {
            id: uuidv4(),
            nombre: valorTarea,
            descripcion: valorDescripcion,
            esImportante: valorImportante
        }
        setListaTareas((tareasAnteriores) => {
            return [...tareasAnteriores, nuevaTarea];
        });
        tarea.current.value="";
        descripcion.current.value="";
        importante.current.checked = false;
        setError('');
    }

    function borrarTarea(id){
        const nuevaLista=listaTareas.filter((item) => item.id !== id );
        setListaTareas(nuevaLista);
    }


    return (
        <Fragment>
            <h2 className="mb-4 text-center">Notas / Tareas</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <h1 className="app-title mt-4 mb-4">Simulador de posteo de notas</h1>
            <div className="card p-2 form-simulador mb-5">
                <div className="row g-2 align-items-center">
                    <div className="col-12 col-md-3">
                        <input ref={tarea} type="text" className="form-control form-control-sm" placeholder="Titulo" />
                    </div>
                    <div className="col-12 col-md-4">
                        <input ref={descripcion} type="text" className="form-control form-control-sm" placeholder="Descripcion" />
                    </div>
                    <div className="col-6 col-md-2 d-flex justify-content-center">
                        <div className="form-check text-white m-0">
                            <input ref={importante} className="form-check-input" type="checkbox" id="checkImportante" />
                            <label className="form-check-label small fw-bold" htmlFor="checkImportante">Importante!</label>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <button onClick={agregarTarea} className="btn btn-agregar btn-sm w-100 py-2 text-center">AGREGAR</button>
                    </div>
                </div>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            </div>
            <div className="row">
                {listaTareas.length === 0 ? (
                    <p className="text-center text-muted fs-5">No hay notas guardadas.</p>
                ):(listaTareas.map((item) => (
                        <ItemTarea 
                            key={item.id} 
                            id={item.id}
                            nombre={item.nombre} 
                            descripcion={item.descripcion}
                            esImportante={item.esImportante}
                            onEliminar={borrarTarea} />))
                )}
            </div>
        </Fragment>
    );
}