import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Card.scss";

import Moment from "react-moment";
import moment from "moment";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components"

function Card() {
  const [data, setData] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    axios
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=j8MvcwHy1qL4XgDz8qnCW7gFaf8MqNSuKALMSpAt`
      )
      .then(res => setData(res.data));
  }, []);

  const toggleDate = e => {
    e.preventDefault();
    const input = document.getElementById("toggle");
    if (input.className.match("hidden")) {
      input.className = "show";
    } else {
      input.className = "hidden";
    }
  };

  const onChange = date => {
    setStartDate(date);
    console.log(startDate);
    let fancyDate = moment(date).format("YYYY-MM-DD");
    console.log(fancyDate);
    axios
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=JnWo6HiIwC9BG0xa2UyobaexzaMVqCbQi9h9hs6q&date=${fancyDate}`
      )
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  };



  const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  border: 3px solid  rgb(161, 99, 6);
  `

  const DateDiv = styled.div`
  
  `
  const DescriptionH3 = styled.h3`
  font-family: 'Leckerli One', cursive;
  `
  const ExplanationP = styled.p`
  font-family: 'Merienda', cursive;
  border-right: 3px solid  rgb(161, 99, 6);
  border-left: 3px solid  rgb(161, 99, 6);
  padding: 0 2rem;
  `
  
  const PhotoImg = styled.img`
  border: 2px solid rgb(161, 99, 6);
  border-radius: 12px;
  `
  const AuthorP = styled.p`
  
  `

  const DatePickerButton = styled.button`
  
  `




  return (
    <div className="container">
      <div className="up">
        <Title>{data.title}</Title>
      </div>

      <div className="middle-container">
        <div className="first">
          <DateDiv className="date-container">
            <Moment className="date" format="MMMM Do YYYY">
              {data.date}
            </Moment>
          </DateDiv>
          <DescriptionH3>Description</DescriptionH3>
          <ExplanationP> {data.explanation}</ExplanationP>
        </div>

        <div className="second">
          <PhotoImg alt={data.title} src={data.hdurl} />
          <AuthorP>Author: {data.copyright}</AuthorP>
        </div>
      </div>

      <div className="bottom">
      <DatePickerButton className="date-picker" onClick={toggleDate}>
            <span>Choose date</span>
          </DatePickerButton>

        <form>
         
          <DatePicker
            selected={startDate}
            id="toggle"
            className="hidden"
            onChange={onChange}
          />
        </form>
      </div>
    </div>
  );
}

export default Card;
