import React, { useState } from 'react';
import styled from 'styled-components';

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
function getLatLngFromGoogleMapsUrl(url: string) {
  // Extrai a parte da URL contendo a latitude e longitude
  const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
  const matches = url.match(regex);

  if (matches && matches.length >= 3) {
    const lat = parseFloat(matches[1]);
    const lng = parseFloat(matches[2]);
    return { lat, lng };
  } else {
    throw new Error('Não foi possível extrair a latitude e longitude da URL fornecida.');
  }
}
  console.log(getLatLngFromGoogleMapsUrl('https://www.google.com/maps/place/Pra%C3%A7a+H%C3%A9lvio+Cardoso/@-18.9187098,-48.2297792,17.86z/data=!4m9!1m2!2m1!1smartminas!3m5!1s0x94a44f9048f222d3:0x3083f3e7d625ff1f!8m2!3d-18.918167!4d-48.2279689!16s%2Fg%2F11b6lrtsj3?entry=ttu'))
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
    <form onSubmit={handleSubmit}>      
    <InputLabel>
        Titulo:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
    </InputLabel>
    <InputLabel>
        Link do google maps:
        <input
          type="text"
          name="link"
          value={formData.title}
          
          onChange={handleInputChange}
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
    <button type="submit">Enviar</button>
    </form>
  );
};

const InputLabel = styled.div`
display: flex;
align-items: column;

`

export default FormComponent;