import React, { useEffect, useState } from "react";
import "./infoUser.scss";
import Select from "../../../components/select/Select";
import { useAuth } from "../../../context/authContext";
import { useParams } from "react-router-dom";
import { makeRequest } from "../../../axios";
import moment from "moment";

import { useMutation, useQuery, useQueryClient } from "react-query";

export default function InfoUser() {
  const { currentUser } = useAuth();
  const [user, setUser] = useState();
  const [err, setErr] = useState();
  const [provinces, setProvinces] = useState();

  const [inputs, setInputs] = useState({
    name: "",
    birthDay: "",
    email: "",
    phone: "",
    idProvince: "",
    cv: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputs);
  };

  useEffect(() => {
    const getProvinces = async () => {
      try {
        const res = await makeRequest("/provinces");
        setProvinces(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProvinces();
  }, []);

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(["user"], async () => {
    await makeRequest.get("/user/owner/").then((res) => {
      setInputs({
        name: res.data.name,
        birthDay: res.data.birthDay,
        email: res.data.email,
        phone: res.data.phone,
        idProvince: res.data.idProvince,
        cv: res.data.cv,
      });
      setUser(res.data);
      return res.data;
    });
  });

  return (
    <div className="infoUser">
      <div className="infoUser__wrapper">
        <ItemInfo
          inputs={inputs}
          handleChange={handleChange}
          name="name"
          title={"Tên"}
          desc={user?.name}
        />
        <ItemInfo
          inputs={inputs}
          name="birthDay"
          handleChange={handleChange}
          title={"Ngày sinh :"}
          desc={moment(user?.birthDay).format("DD/MM/YYYY")}
          type={"date"}
        />
        <ItemInfo
          inputs={inputs}
          name="email"
          handleChange={handleChange}
          title={"Email :"}
          desc={user?.email}
        />
        <ItemInfo
          inputs={inputs}
          name="cv"
          handleChange={handleChange}
          title={"Liên kết CV (Kết nối với Google Drive) :"}
          desc={user?.cv}
        />
        <ItemInfo
          inputs={inputs}
          name="phone"
          handleChange={handleChange}
          title={"Số điện thoại :"}
          desc={user?.phone}
        />
        <ItemInfo
          inputs={inputs}
          name="province"
          setInputs={setInputs}
          title={"Địa chỉ :"}
          select={true}
          options={provinces}
          desc={user?.province}
        />
      </div>
    </div>
  );
}

function ItemInfo({
  title,
  desc,
  name,
  type = "text",
  select,
  options,
  handleChange,
  setInputs,
  inputs,
}) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(desc);
  const [selectedOption, setSelectedOption] = useState(inputs.idProvince);
  const { setCurrentUser } = useAuth();

  const queryClient = useQueryClient();

  const mutation = useMutation(
    () => {
      return makeRequest.put("/user/update", inputs);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleSumbit = () => {
    if (select) {
      inputs.idProvince = selectedOption?.pId;
    }
    setEdit(false);
    mutation.mutate();
  };

  return (
    <div className="personalInformation__wrapper__item">
      <div className="personalInformation__wrapper__item__left">
        <h6>{title}</h6>
        {!edit ? (
          <span>{desc || "..."}</span>
        ) : select ? (
          <Select
            name={name}
            options={options}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        ) : (
          <input
            name={name}
            type={type}
            defaultValue={desc}
            onChange={handleChange}
          />
        )}
      </div>
      <div className="personalInformation__wrapper__item__right">
        {!edit ? (
          <button className="btn-edit" onClick={() => setEdit(true)}>
            <i className="fa-solid fa-pen-to-square"></i>
            <span>Chỉnh sửa</span>
          </button>
        ) : (
          <>
            <button className="btn-save" onClick={() => handleSumbit()}>
              Lưu
            </button>
            <button className="btn-cancel" onClick={() => setEdit(false)}>
              Hủy
            </button>
          </>
        )}
      </div>
    </div>
  );
}
