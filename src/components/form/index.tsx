import React, { useState } from 'react';

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
    lat: 0,
    long: 0,
    description: '',
    equipments: [''],
    rate: 0,
    title: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   [name]: value,
    // }));

    // Atualize o estado de acordo com o tipo de input
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    formData.equipments.shift()
    event.preventDefault();
    // Handle form submission, e.g., send data to server
    console.log(formData);

    setFormData({
      lat: 0,
      long: 0,
      description: '',
      equipments: [''],
      rate: 0,
      title: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>      
    <label>
        Titulo:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Latitude:
        <input
          type="number"
          name="lat"
          value={formData.lat}
          onChange={handleInputChange}
          step="0.000001"
        />
      </label>
      <br />
      <label>
        Longitude:
        <input
          type="number"
          name="long"
          value={formData.long}
          onChange={handleInputChange}
          step="0.000001"
        />
      </label>
      <br />
      <label>
        Descrição:
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
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
        
      </label>
      <br />
      <label>
        Nota:
        <input
          type="number"
          name="rate"
          value={formData.rate}
          onChange={handleInputChange}
          step="0.01"
        />
      </label>
      <br />

      <button type="submit">Enviar</button>
    </form>
  );
};

export default FormComponent;