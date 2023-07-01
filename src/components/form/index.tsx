import React, { useState } from 'react';

interface FormData {
  lat: number;
  long: number;
  description: string;
  equipments: string;
  rate: number;
  title: string;
}

const FormComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    lat: 0,
    long: 0,
    description: '',
    equipments: '',
    rate: 0,
    title: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission, e.g., send data to server
    console.log(formData);
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
        <input
          type="text"
          name="equipments"
          value={formData.equipments}
          onChange={handleInputChange}
        />
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