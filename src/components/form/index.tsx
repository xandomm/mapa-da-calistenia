import React, { useState } from 'react';
import styled from 'styled-components';
import FormMap from '../formMap';

// interface FormData {
//   lat: number;
//   long: number;
//   description: string;
//   equipments: string;
//   rate: number;
//   title: string;
// }

const calisthenicsEquipments = [
  {id: 1, text: 'Barras Horizontais'},
  {id: 2, text: 'Barra de pull-up'},
  {id: 3, text: 'Barras de Tração'},
  {id: 4, text: 'Barras Paralelas Assimétricas'},
  {id: 5, text: 'Barras de Equilíbrio'},
  {id: 6, text: 'Estruturas de Salto'},
  {id: 7, text: 'Bancos para Agachamento'},
  {id: 8, text: 'Estruturas Abdominais'},
  {id: 9, text: 'Bancos para Flexões'},
  {id: 10, text: 'Barras de Equilíbrio para os Braços'},
  {id: 11, text: 'Argolas Olímpicas'},
];

const FormComponent: React.FC = () => {
  const [formData, setFormData] = useState({
    description: '',
    equipments: [''],
    rate: 0,
    title: '',
  });
  const [formMap, setFormMap] = useState({})
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    if (type === 'checkbox') {
      if (checked) {
        setFormData({
          ...formData,
          equipments: [...formData.equipments, value],
        });
      } else {
        setFormData({
          ...formData,
          equipments: formData.equipments.filter((equipments) => equipments !== value),
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  console.log(formMap)
function getLatLngFromGoogleMapsUrl(url: string) {
  const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
  const matches = url.match(regex);

  if (matches && matches.length >= 3) {
    const lat = parseFloat(matches[1]);
    const long = parseFloat(matches[2]);
    console.log(lat, long);
    
    return setFormMap({ lat, long });
  } else {
    throw new Error('Não foi possível extrair a latitude e longitude da URL fornecida.');
  }
}
 
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    formData.equipments.shift()
    event.preventDefault();
    console.log(formData);

    setFormData({
      description: '',
      equipments: [''],
      rate: 0,
      title: '',
    });
  };

  return (
    <div>


    <Container>

    <FormWrapper onSubmit={handleSubmit}>      
    <InputLabel>
        Titulo:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
    </InputLabel>
    <br />
    <InputLabel>
        Insira aqui a URL do google maps:
        <input
          type="text"
          onChange={(e) => getLatLngFromGoogleMapsUrl(e.target.value)}
        />
    </InputLabel>
    <br />
    <InputLabel>
        Descrição:
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
    </InputLabel>
      <br />
    <InputLabel>
        Equipamentos:
        {
        calisthenicsEquipments.map((equipamento) => (

          <div className='equipments' key={equipamento.id}>
            <input
              type="checkbox"
              name="equipments"
              value={equipamento.text}
              checked={formData.equipments.includes(`${equipamento.text}`)}
              onChange={handleInputChange}
            /> {equipamento.text} 
          </div>
         ))
        }
        
    </InputLabel>
    <br />
    <InputLabel>
        Nota:
        <input
          type="number"
          name="rate"
          value={formData.rate}
          onChange={handleInputChange}
          step="0.01"
        />
    </InputLabel>
    <br />

    </FormWrapper>        
    <MapWrapper>
      {
        formMap.lat && formMap.long ? <FormMap lat={formMap.lat} long={formMap.long} /> : null
      
      }

    </MapWrapper>
  
    </Container>   
        <button type="submit">Enviar</button>
     </div>
  );
};

const InputLabel = styled.div`
display: flex;
flex-direction: column;
padding-right: 30px

`

const FormWrapper = styled.div`
display: flex;
flex-direction: column;
width: 47vw;
margin-left: 30px;
`

const MapWrapper = styled.div`
display: flex;
flex-direction: column;
width: 50vw 
`
const Container = styled.div`
  display: flex;
  flex-direction: row; 
`

export default FormComponent;