import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate, Link, useParams, useLocation } from 'react-router-dom';
import agendaImg from '../assets/images/agenda.png';
import ProfileHeader from '../components/profile/ProfileHeader.jsx';
import Portfolio from '../components/profile/Portfolio.jsx';
import ProfessionalInfo from '../components/profile/ProfessionalInfo.jsx';
import Favorites from '../components/profile/Favorites.jsx';
import History from '../components/profile/History.jsx';
import ServiceCard from '../components/ServiceCard.jsx';

const Profile = () => {
  const { user, getProfile, fetchWithToken, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const { profileId } = useParams();
  const location = useLocation();

  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({});
  const [accordionOpen, setAccordionOpen] = useState({
    certificaciones: false,
    experiencia: false,
    condiciones: false,
    contacto: false
  });
  const [activeTab, setActiveTab] = useState('servicios');
  const [activeHistoryTab, setActiveHistoryTab] = useState('recibidos');

  const isOwnProfile = location.pathname === '/profile' && user;

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token && !profileId) {
          navigate('/login');
          return;
        }

        let perfil = null;

        if (profileId) {
          perfil = await fetchWithToken(`https://sbeautybackend.onrender.com/api/usuarios/${profileId}`);
          console.log('👤 Perfil ajeno cargado:', perfil);
        } else {
          perfil = await getProfile();
          console.log('👤 Perfil propio cargado:', perfil);
        }

        let historialCliente = { historial: [] };
        let historialProfesional = { historial: [] };
        let favoritos = { favoritos: [] };

        if (!profileId) {
          historialCliente = await fetchWithToken('https://sbeautybackend.onrender.com/api/reservas/cliente/historial');
          historialProfesional = await fetchWithToken('https://sbeautybackend.onrender.com/api/reservas/profesional/historial');
          favoritos = await fetchWithToken('https://sbeautybackend.onrender.com/api/favoritos');
        }

        const datosPerfil = {
          ...perfil,
          servicios: perfil.servicios || [],
          historialRecibidos: historialCliente.historial || [],
          historialRealizados: historialProfesional.historial || [],
          favoritos: favoritos.favoritos || []
        };

        setEditableData(datosPerfil);
      } catch (error) {
        console.error('❌ Error al cargar perfil:', error.message);
      }
    };

    cargarDatos();
  }, [profileId]);

  const handleEditProfile = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    setEditableData({ ...editableData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
    try {
      const userId = user.id;
      const camposParaGuardar = {
        nombre: editableData.nombre,
        apellido_paterno: editableData.apellido_paterno,
        apellido_materno: editableData.apellido_materno,
        telefono: editableData.telefono,
        region: editableData.region,
        comuna: editableData.comuna,
        categoria: editableData.categoria,
        categoria_personalizada: editableData.categoria_personalizada,
        experiencia: editableData.experiencia,
        certificaciones: editableData.certificaciones
      };
      const updated = await updateProfile(userId, camposParaGuardar);
      setEditableData((prev) => ({ ...prev, ...updated }));
      setIsEditing(false);
      console.log('✅ Perfil actualizado correctamente');
    } catch (error) {
      console.error('❌ Error al guardar perfil:', error.message);
    }
  };

  const toggleAccordion = (key) => {
    setAccordionOpen({ ...accordionOpen, [key]: !accordionOpen[key] });
  };

  if (!user && !profileId) {
    return <p>🔒 Debes iniciar sesión para ver tu perfil.</p>;
  }

  return (
    <section className="profile">
      <div className="profile-body-grid">
        {/* 🔹 COLUMNA IZQUIERDA */}
        <div className="profile-left-column">
          <ProfileHeader
            editableData={editableData}
            isEditing={isEditing}
            handleChange={handleChange}
            handleEditProfile={isOwnProfile ? handleEditProfile : undefined}
            handleSaveProfile={isOwnProfile ? handleSaveProfile : undefined}
            isOwnProfile={isOwnProfile}
          />

          {editableData.rol === 'Profesional' && (
            <>
              <Portfolio editableData={editableData} isEditing={isEditing && isOwnProfile} />
              <ProfessionalInfo
                editableData={editableData}
                isEditing={isEditing && isOwnProfile}
                handleChange={handleChange}
                accordionOpen={accordionOpen}
                toggleAccordion={toggleAccordion}
              />
            </>
          )}
        </div>

        {/* 🔹 COLUMNA DERECHA */}
        <div className="profile-right-column">
          <div className="profile-section services-section">
            {isOwnProfile && (
              <div className="tabs">
                {editableData.rol === 'Profesional' && (
                  <button className={activeTab === 'servicios' ? 'active' : ''} onClick={() => setActiveTab('servicios')}>
                    Mis Servicios
                  </button>
                )}
                <button className={activeTab === 'favoritos' ? 'active' : ''} onClick={() => setActiveTab('favoritos')}>
                  Favoritos
                </button>
                <button className={activeTab === 'historial' ? 'active' : ''} onClick={() => setActiveTab('historial')}>
                  Historial
                </button>
              </div>
            )}

            <h2>
              {activeTab === 'servicios'
                ? 'Mis Servicios'
                : activeTab === 'favoritos'
                ? 'Mis Favoritos'
                : 'Historial'}
            </h2>

            {(activeTab === 'servicios' && editableData.rol === 'Profesional') && (
              <>
                {isOwnProfile && (
                  <div className="services-actions">
                    <Link to="/create-service">
                      <button className="btn-primary">+ Agregar Servicio</button>
                    </Link>
                  </div>
                )}

                <div className="service-cards-container">
                  {editableData.servicios?.length > 0
                    ? editableData.servicios.map((servicio, index) => (
                        <ServiceCard key={index} service={servicio} compact={true} />
                      ))
                    : Array(4).fill(null).map((_, index) => (
                        <div key={`empty-${index}`} className="service-card empty">
                          <p>Servicio no registrado</p>
                        </div>
                      ))}
                </div>
              </>
            )}

            {activeTab === 'favoritos' && isOwnProfile && (
              <Favorites favoritos={editableData.favoritos} />
            )}

            {activeTab === 'historial' && isOwnProfile && (
              <History
                historialRecibidos={editableData.historialRecibidos}
                historialRealizados={editableData.historialRealizados}
                activeHistoryTab={activeHistoryTab}
                setActiveHistoryTab={setActiveHistoryTab}
              />
            )}

{isOwnProfile && editableData.rol === 'Profesional' && (
  <div className="agenda-highlight">
    <img src={agendaImg} alt="Agenda" className="agenda-image" />
    <div className="agenda-text">
      <h3>Gestiona tu agenda</h3>
      <Link to="/schedule">
        <button className="btn-agenda-destacada">Ver Agenda Completa</button>
      </Link>
    </div>
  </div>
)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;

