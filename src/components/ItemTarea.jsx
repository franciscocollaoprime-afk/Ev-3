import React from "react";

export function ItemTarea({ id, nombre, descripcion, esImportante, onEliminar }){
    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 grid-container">
            <div className={`post-it h-100 ${esImportante ? "importante" : ""}`}>
                <button onClick={() => onEliminar(id)} className="btn-close-custom" aria-label="Eliminar">X</button>
                <div className="post-it-title text-truncate pe-3">
                    {nombre || "Sin Título"}
                </div>
                <div className="post-it-body">
                    {descripcion}
                </div>
            </div>
        </div>
    );
}