import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import FormMap from '../formMap';
import { useGetLocation } from '../../services/getLocations';

interface FormData {
  lat: number;
  long: number;
  description: string;
  equipments: string[];
  rate: number;
  title: string;
}

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
  const [formData, setFormData] = useState<FormData>({
    description: '',
    equipments: [],
    rate: 0,
    title: '',
    lat: 0,
    long: 0,
  });
  const [formMap, setFormMap] = useState({});

  const debouncedGetLatLng = debounce(useGetLocation, 500);

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
    } else if (name === 'title') {
      setFormData({
        ...formData,
        [name]: value,
      });
      console.log(await delayedCallback(value)); // Call the debounced function with the title value
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);

    setFormData({
      description: '',
      equipments: [],
      rate: 0,
      title: '',
      lat: 0,
      long: 0,
    });
  };

  const getLatLngFromGoogleMapsUrl = (url: string) => {
    // Perform the necessary logic to extract the lat and long values from the Google Maps URL
    // Replace the following code with your implementation
    const lat = 0; // Replace with the extracted latitude value
    const long = 0; // Replace with the extracted longitude value

    setFormMap({
      lat,
      long,
    });
  };
  const delayedCallback = async (value: string) => {
    setTimeout(async () => {
      const res = await useGetLocation(value);
      console.log(res);
    }, 500);
  };


  return (
    <div>
      <Container>
        <FormWrapper onSubmit={handleSubmit}>
          <InputLabel>
            Nome:
            Nome:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
            <select name="title" value={formData.title} onChange={handleInputChange}>
              <option value="">Select an option</option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              {/* Add more options as needed */}
            </select>
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



function debounce(callback: (...args: any[]) => void, delay: number) {
  let timerId: NodeJS.Timeout;

  return function debouncedFunction(...args: any[]) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}
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