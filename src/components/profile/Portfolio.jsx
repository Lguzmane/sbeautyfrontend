import React from 'react';
import imageDefault from "../../assets/images/imagendefault.png";

const Portfolio = ({ editableData, isEditing }) => {
  return (
    <div className="profile-section portfolio-section">
      <h2>Portafolio</h2>
      <div className="portfolio-container">
        <div className="portfolio-images">
          {[0, 1, 2].map((index) => (
            <div key={index} className="portfolio-photo">
              <img
                src={
                  editableData.portafolio && editableData.portafolio[index]
                    ? editableData.portafolio[index]
                    : imageDefault
                }
                alt={`Portafolio ${index + 1}`}
              />
              {isEditing && <button className="btn-remove-photo">×</button>}
            </div>
          ))}
        </div>

        {isEditing && (
          <div className="portfolio-actions">
            <button className="btn-primary">Agregar Fotos</button>
            <button className="btn-secondary">Reorganizar</button>
          </div>
        )}

        <div className="carousel-controls">
          <button className="carousel-button left">{'<'}</button>
          <button className="carousel-button right">{'>'}</button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
