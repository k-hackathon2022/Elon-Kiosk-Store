import React, { useState } from "react";
//import { useRecoilValue } from "recoil";
import styled from "styled-components";
//import { loginState } from "../atom/login";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const StyledTitle = styled.h2`
  margin-top: 20px;
  margin-left: 20px;
`;

const StyledForm = styled.form`
  font-size: 1.2rem;
  font-weight: bold;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  box-shadow: 0 10px 10px 0 gray;
  width: 70%;
  height: auto;
`;

const StyledInput = styled.input`
  width: 60%;
  height: 50px;
  border: none;
  border-bottom: 1px solid gray;
`;

const StyledFileInput = styled.input`
  width: 60%;
  border: none;
`;

const StyledTextArea = styled.input`
  width: 60%;
  height: 200px;
  border-radius: 5px;
`;

const StyledTable = styled.table`
  width: 100%;
  height: 50%;
`;

const Td = styled.td`
  text-align: center;
  padding: 10px;
`;

const CategoryWrapper = styled.div`
  height: 50px;
`;

const StyledCategory = styled.input`
  margin-top: 20px;
`;

const BtnWrapper = styled.div`
  display: flex;
  padding: 0;
  margin-top: 20px;
  padding-top: 20px;
  height: auto;
  justify-content: space-evenly;
`;

const StyledSubmit = styled.input`
  height: 50px;
  width: 200px;
  background-color: #a7dee8;
  color: black;
  border-radius: 4px;
  align-items: center;
  font-size: 70%;
  font-weight: 600;
  border: none;

  &:hover {
    background-color: #82adb5;
    cursor: pointer;
  }
`;

const DelBtn = styled.button`
  height: 50px;
  width: 200px;
  background-color: #2895a8;
  color: black;
  border-radius: 4px;
  align-items: center;
  font-size: 70%;
  font-weight: 600;
  margin-bottom: 20px;
  border: none;

  &:hover {
    background-color: #82adb5;
    cursor: pointer;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
export default function InsertForm() {
  const [files, setFiles] = useState();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [explanation, setExplanation] = useState("");

  const storeId = localStorage.getItem("storeId");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log(files);
    e.preventDefault();

    const formData = new FormData();

    const bodyObj = {
      store: storeId,
      name: name,
      category: category,
      price: price,
      explanation: explanation,
    };

    formData.append("body", JSON.stringify(bodyObj));
    formData.append("file", files);
    console.log(files);

    axios({
      method: "post",
      url: "https://qr-ufo.com/api/menu",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setFiles(null);
    navigate(`/menulist`);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(e.target.files[0]);
    setFiles(file);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledTitle>?????? ????????????</StyledTitle>
      <StyledTable>
        <tbody>
          <tr>
            <Td>
              <label> ?????? ?????? </label>
            </Td>
            <Td>
              <StyledInput
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Td>
          </tr>

          <tr>
            <Td>
              <label> ???????????? </label>
            </Td>

            <Td>
              <CategoryWrapper>
                <label> ?????? </label>
                <StyledCategory
                  type="radio"
                  name="category"
                  value="??????"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCategory("??????");
                    }
                  }}
                />
                <label> ?????? </label>
                <StyledCategory
                  type="radio"
                  name="category"
                  value="????????????"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCategory("????????????");
                    }
                  }}
                />
                <label> ??? </label>
                <StyledCategory
                  type="radio"
                  name="category"
                  value="???"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCategory("???");
                    }
                  }}
                />
              </CategoryWrapper>
            </Td>
          </tr>

          <tr>
            <Td>
              <label> ?????? </label>
            </Td>
            <Td>
              <StyledInput
                type="number"
                name="price"
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Td>
          </tr>

          <tr>
            <Td>
              <label> ?????? ?????? </label>
            </Td>
            <Td>
              <StyledTextArea
                type="textarea"
                name="explanation"
                onChange={(e) => setExplanation(e.target.value)}
                required
              />
            </Td>
          </tr>

          <tr>
            <Td>
              <label> ?????? ????????? </label>
            </Td>
            <Td>
              <StyledFileInput
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                name="file"
                onChange={handleUpload}
                required
              />
            </Td>
          </tr>
        </tbody>
      </StyledTable>

      <hr />

      <BtnWrapper>
        <StyledSubmit type="submit" value="?????? ????????????" />
        <StyledLink to="/menulist">
          <DelBtn>?????????</DelBtn>
        </StyledLink>
      </BtnWrapper>
    </StyledForm>
  );
}
