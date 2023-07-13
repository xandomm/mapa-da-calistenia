import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import FormMap from '../formMap';
import { getLocation, Location } from '../../services/getLocations';

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
  const [selectPlaces, setSelectPlaces] = useState<Location[] | null>();
  const selectRef = useRef(null)
  
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
      delayedCallback(value);
      // Call the debounced function with the title value
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

  const delayedCallback = async (value: string) => {
    const res = await getLocation(value);
    setSelectPlaces(res);
    console.log(res);
  };

  function onSelect(id: number) {
    console.log(id);
    const place = selectPlaces?.filter((place) => place.place_id === id);
    if (place) {
      setFormMap({
        lat: place[0].lat,
        long: place[0].lon,
      });
      setFormData({
        ...formData,
        title: place[0].display_name,
      });
      setSelectPlaces(null);
    }
  }
  console.log(selectRef)
  return (
    <div>
      <Container>
        <FormWrapper onSubmit={handleSubmit}>
          <InputLabel>
            Nome:
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
            {selectPlaces && (
              <StyledSelect
                ref={selectRef}
                name="title"
                multiple
                value={formData.title}
                onChange={(event) => onSelect(Number(event.target.value))}
              >
                <option >
                  Selecione um local
                </option>
                {selectPlaces.map((place) => (
                  <option key={place.place_id} value={place.place_id}>
                    {place.display_name}
                  </option>
                ))}
              </StyledSelect>
            )}
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
            {calisthenicsEquipments.map((equipamento) => (
              <div className="equipments" key={equipamento.id}>
                <input
                  type="checkbox"
                  name="equipments"
                  value={equipamento.text}
                  checked={formData.equipments.includes(`${equipamento.text}`)}
                  onChange={handleInputChange}
                />{' '}
                {equipamento.text}
              </div>
            ))}
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
          {formMap.lat && formMap.long ? <FormMap lat={formMap.lat} long={formMap.long} /> : null}
        </MapWrapper>
      </Container>
      <StyledButton type="submit">Enviar</StyledButton>
    </div>
  );
};

const InputLabel = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 30px;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 47vw;
  margin-left: 30px;
`;

const MapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledSelect = styled.select`
  width: 70vw;

  font-size: 16px;
  overflow: auto;
  border-radius: 5px;
`;

const StyledButton = styled.button`
  margin-top: 10px;
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

export default FormComponent;