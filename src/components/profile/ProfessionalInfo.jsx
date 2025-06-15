import React from 'react';

const ProfessionalInfo = ({
  editableData,
  isEditing,
  handleChange,
  accordionOpen,
  toggleAccordion
}) => {
  return (
    <div className="profile-section professional-info">
      <h2>Información Profesional</h2>
      <div className="accordion-container">
        {['certificaciones', 'experiencia', 'condiciones', 'contacto'].map((key) => (
          <div key={key} className="accordion-item">
            <button
              className={`accordion-header ${accordionOpen[key] ? 'open' : ''}`}
              onClick={() => toggleAccordion(key)}
            >
              {key.charAt(0).toUpperCase() + key.slice(1).replace('condiciones', 'Condiciones del Servicio')}
              <span className="accordion-icon">{accordionOpen[key] ? '−' : '+'}</span>
            </button>
            {accordionOpen[key] && (
              <div className="accordion-content">
                {key === 'contacto' ? (
                  <>
                    <div className="contact-field">
                      <strong>Email:</strong>{' '}
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={editableData.email || ''}
                          onChange={handleChange}
                          className="input-edit"
                        />
                      ) : (
                        <a href={`mailto:${editableData.email}`}>{editableData.email || 'No disponible'}</a>
                      )}
                    </div>
                    <div className="contact-field">
                      <strong>Teléfono:</strong>{' '}
                      {isEditing ? (
                        <input
                          type="tel"
                          name="telefono"
                          value={editableData.telefono || ''}
                          onChange={handleChange}
                          className="input-edit"
                        />
                      ) : (
                        <a href={`tel:${editableData.telefono}`}>{editableData.telefono || 'No disponible'}</a>
                      )}
                    </div>
                  </>
                ) : isEditing ? (
                  <textarea
                    name={key}
                    value={editableData[key] || ''}
                    onChange={handleChange}
                    placeholder={`Ingresa tus ${key}...`}
                  />
                ) : (
                  <p>{editableData[key] || `No hay ${key} registradas.`}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalInfo;
