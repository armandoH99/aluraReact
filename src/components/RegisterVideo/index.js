import { useState } from "react";
import { StyledRegisterVideo } from "./styles";
import {createClient} from "@supabase/supabase-js"
//Custom Hook
function useForm(propsDoForm) {
  const [values, setValues] = useState(propsDoForm.initialValues);
    
    return {
        values,
        handleChange: (e) => {
            const value = e.target.value;
            const name = e.target.name;
            setValues({
              ...values,
              [name]: value,
            });
          },
          clearForm() {
            setValues({});
          }
    };

   
}
function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

//TODO afert submit not changing values beacuse of error
const PROJECT_URL= "https://jmobredsdkxekxfivrtw.supabase.co";
const PROJECT_KEY= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imptb2JyZWRzZGt4ZWt4Zml2cnR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk4NTg0NTMsImV4cCI6MTk4NTQzNDQ1M30.eGLLcccX5W9J4JIqtPuI_elmtQrbqM8dv5fDGhCkGhY"
const suprabase = createClient(PROJECT_URL, PROJECT_KEY)


export default function RegisterVideo() {
  //make 'add' button [x]
  //modal [x]
  //constrolar o state do modal
  //formulario
  const formCadastro = useForm({ initialValues:{ titulo: "jump up", url: "https://www.youtube.com/watch?v=4dGeRb2qSho"} })
  const [formVisivel, SetFormVisivel] = useState(false);
  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => SetFormVisivel(true)}>
        +
      </button>
      {formVisivel ? (
        <>
          <form onSubmit={(e)=>{
            e.preventDefault();
            suprabase.from("video").insert({
              title:formCadastro.values.titulo,
              url:formCadastro.values.url,
              thumb:getThumbnail(formCadastro.values.url),
              playlist:"Asmongold",
            })
            .then((what)=>{
              // console.log(what);
            })
            .catch((err)=>{
              console.log(err);
            })

            SetFormVisivel(false);
            
            formCadastro.clearForm()}}>
            <div>
              <button
                className="close-modal"
                onClick={() => SetFormVisivel(false)}
                type='button'
              >
                X
              </button>
              <input
                name="titulo"
                placeholder="Title"
                value={formCadastro.values.titulo}
                onChange={formCadastro.handleChange}
              />
              <input
                name="url"
                placeholder="URL"
                value={formCadastro.values.url}
                onChange={formCadastro.handleChange}
              />
              <button type="submit">Upload</button>
            </div>
          </form>
        </>
      ) : null}
    </StyledRegisterVideo>
  );
}
