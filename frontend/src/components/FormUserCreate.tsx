//Componente especifico para crear un usuario usando el formulario reutilizable
import { FormUser } from "../components/FormUser/FormUser"
import {type FormValues } from "../schemas/schemaForm"

interface props{
    closeForm:()=>void
}

export const FormUserCreate=({closeForm}:props)=>{

    //Data es lo que coloca el usuario en el formulario, por lo tanto aca tendriamos que tener la funcion que crea el usuario en la base de datos
    //Lo ideal seria crear service->hook->componente(este)
    const hola = async (data: FormValues): Promise<void> => {
        //Esta funcion quizas tendria que ir al componente camera con los parametros (data)
        console.log("datos del formulario:", data);

    };

    return(
        <>
        <FormUser initialValues={{}} onSubmit={hola} buttonText="Crear" title="Añadir Usuario" closeForm={closeForm}/>
        </>
    )
}

