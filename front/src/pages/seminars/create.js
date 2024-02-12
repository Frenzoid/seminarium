import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { CirclePicker } from 'react-color';
import FileBase64 from 'react-file-base64';

import axios from 'axios';

import Loading from '../../components/Loading';
import Error from '../../components/Error';
import SeminarCard from '@/components/SeminarCard';

import getConfig from 'next/config'

function CreateSeminar() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [seminar, setSeminar] = useState({
    image: '',
    title: '',
    description: '',
    speakers: '',
    date: '',
    txtcolor: '#000000',
    bgrcolor: '#FFFFFF',
    schedules: [],
    place: ''
  });

  const router = useRouter();

  const { publicRuntimeConfig } = getConfig()
  const { APIURL } = publicRuntimeConfig

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSeminar({ ...seminar, [name]: value });
  };

  const handleColorChange = (color, field) => {
    setSeminar({ ...seminar, [field]: color.hex });
  };

  const handleFileChange = (file) => {
    setSeminar({ ...seminar, image: file.base64 });
  };

  const addSchedule = () => {
    setSeminar({
      ...seminar,
      schedules: [...seminar.schedules, { time: '', name: '' }]
    });
  };

  const removeSchedule = (index) => {
    const newSchedules = seminar.schedules.filter((_, i) => i !== index);
    setSeminar({ ...seminar, schedules: newSchedules });
  };

  const handleScheduleChange = (index, field, value) => {
    const newSchedules = seminar.schedules.map((schedule, i) => {
      if (i === index) return { ...schedule, [field]: value };
      return schedule;
    });
    setSeminar({ ...seminar, schedules: newSchedules });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${APIURL}/seminars/`, seminar);
      router.push(`/seminars/${data.id}`);
    } catch (error) {
      console.error('There was an error creating the seminar:', error);
      setError('Failed to create seminar. ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (seminar.schedules.length === 0) {
      addSchedule();
    }
  }, []);

  return (
    <div className="container">
      {error && <Error error={error} />}
      <h2 className="mb-4 pt-4 text-white">Create Seminar</h2>
      <form onSubmit={handleSubmit} className="row">
        <div className="col-md-6">
          <input type="text" name="title" placeholder="Title" className="form-control mb-2" onChange={handleInputChange} value={seminar.title} />
          <textarea name="description" placeholder="Description" className="form-control mb-2" onChange={handleInputChange} value={seminar.description}></textarea>
          <input type="text" name="speakers" placeholder="Speakers" className="form-control mb-2" onChange={handleInputChange} value={seminar.speakers} />
          <input type="date" name="date" className="form-control mb-2" onChange={handleInputChange} value={seminar.date} />
          <input type="text" name="place" placeholder="Place" className="form-control mb-2" onChange={handleInputChange} value={seminar.place} />
          <div className="mb-2">
            <FileBase64 multiple={false} onDone={handleFileChange} />
          </div>
        </div>
        <div className="col-md-6 text-white">
          <div className="d-flex flex-row flex-wrap justify-content-around">
            <div className="p-3 border rounded m-1 bg-darkgrey">
              <h4>Text Color:</h4>
              <CirclePicker color={seminar.txtcolor} onChangeComplete={(color) => handleColorChange(color, 'txtcolor')}
                colors={['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b', '#000000', '#FFFFFF']} />
            </div>
            <div className="p-3 border rounded m-1 bg-darkgrey">
              <h4>Background Color:</h4>
              <CirclePicker color={seminar.bgrcolor} onChangeComplete={(color) => handleColorChange(color, 'bgrcolor')}
                colors={['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b', '#000000', '#FFFFFF']} />
            </div>
          </div>
          <hr />
          {seminar.schedules.map((schedule, index) => (
            <div key={index} className="row mb-2">
              <div className="col-5">
                <input
                  type="time"
                  placeholder="Time"
                  className="form-control"
                  onChange={(e) => handleScheduleChange(index, 'time', e.target.value)}
                  value={schedule.time}
                />
              </div>
              <div className="col-5">
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control"
                  onChange={(e) => handleScheduleChange(index, 'name', e.target.value)}
                  value={schedule.name}
                />
              </div>
              {index !== 0 && (
                <div className="col-2">
                  <button type="button" className="btn btn-danger" onClick={() => removeSchedule(index)}>Remove</button>
                </div>
              )}
            </div>

          ))}

          <button type="button" className="btn btn-secondary mb-2" onClick={addSchedule} style={{ marginTop: '15px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>Add Schedule</button>
        </div>
        <div className="col-12 my-3">
          <button type="submit" disabled={loading} className="btn btn-primary mt-2" style={{ marginTop: '15px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>Create Seminar</button>
          {loading && <Loading />}
        </div>
      </form >
      <div className="text-white">
        <hr />
      </div>
      <h3 className="text-white">Card Preview</h3>
      <div className="row">
        <div className="col-12 d-flex justify-content-center mb-5">
          <SeminarCard key={seminar.schedules.length} seminar={seminar} goToSeminarDetails={() => { }} />
        </div>
      </div>
    </div >
  );
}

export default CreateSeminar;
