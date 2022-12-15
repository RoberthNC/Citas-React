import { useState, useEffect } from 'react';
import Error from './Error';


const Formulario = ({ setPacientes, pacientes, paciente, setPaciente }) => {

  const [nombre,setNombre] = useState("");
  const [propietario,setPropietario] = useState("");
  const [email,setEmail] = useState("");
  const [alta,setAlta] = useState("");
  const [sintomas,setSintomas] = useState("");

  const [error,setError] = useState(false);

  useEffect(()=>{
      if(Object.keys(paciente).length > 0){
        setNombre(paciente.nombre);
        setPropietario(paciente.propietario);
        setEmail(paciente.email);
        setAlta(paciente.alta);
        setSintomas(paciente.sintomas);
      }
  },[paciente]);

  const generarId = ()=> {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validación del formulario
    if([nombre,propietario,email,alta,sintomas].includes("")){
      setError(true);
    }
    else{
      setError(false);
    }

    const objetoPaciente = {
      nombre,
      propietario,
      email,
      alta,
      sintomas
    }

    if(paciente.id){
      //Editando el registro
      objetoPaciente.id = paciente.id;

      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente:pacienteState );

      setPacientes(pacientesActualizados);
      setPaciente({});
    }else{
      //Agregando un nuevo registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes,objetoPaciente]);
    }


    setNombre("");
    setPropietario("");
    setEmail("");
    setAlta("");
    setSintomas("");

  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5">
        { error && <Error /> }
        <div className="mb-5">
          <label htmlFor="nombre" className="block text-gray-700 uppercase font-bold">Nombre Mascota:</label>
          <input value={nombre} onChange={(e)=>setNombre(e.target.value)} id="nombre" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="text" placeholder="Nombre de la mascota"/>
        </div>

        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario:</label>
          <input value={propietario} onChange={(e)=>setPropietario(e.target.value)} id="propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="text" placeholder="Nombre del propietario"/>
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email:</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} id="email" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="email" placeholder="Email de contacto"/>
        </div>

        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta:</label>
          <input value={alta} onChange={(e)=>setAlta(e.target.value)} id="alta" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="date" />
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Síntomas:</label>
          <textarea value={sintomas} onChange={(e)=>setSintomas(e.target.value)} id="sintomas" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Describe los síntomas" />
        </div>

        <input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all" value={ paciente.id ? "Editar Paciente" : "Agregar Paciente" }/>
      </form>
    </div>
  )
}

export default Formulario;