import { useState } from "react";
import { StyledRegisterVideo } from "./styles";

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
//TODO afert submit not changing values beacuse of error

export default function RegisterVideo() {
  //make 'add' button [x]
  //modal [x]
  //constrolar o state do modal
  //formulario
  const formCadastro = useForm({ initialValues:{ titulo: "new video", url: "www.youtube.com"} })
  const [formVisivel, SetFormVisivel] = useState(true);
  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => SetFormVisivel(true)}>
        +
      </button>
      {formVisivel ? (
        <>
          <form onSubmit={(e)=>{
            e.preventDefault();
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
