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
    sex: "",
    email: "",
    phone: "",
    idProvince: "",
    linkCv: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
        sex: res.data.sex,
        email: res.data.email,
        phone: res.data.phone,
        idProvince: res.data.idProvince,
        linkCv: res.data.linkCv,
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
          type={"input-date"}
        />
        <ItemInfo
          inputs={inputs}
          name="sex"
          setInputs={setInputs}
          handleChange={handleChange}
          title={"Giới tính :"}
          desc={user?.sex}
          type={"input-radio"}
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
          name="linkCv"
          handleChange={handleChange}
          title={"Liên kết CV (Kết nối với Google Drive) :"}
          desc={user?.linkCv}
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
          options={provinces}
          desc={user?.province}
          type={"select"}
        />
      </div>
    </div>
  );
}

function ItemInfo({
  title,
  desc,
  name,
  type = "input",
  select,
  options,
  handleChange,
  setInputs,
  inputs,
}) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(desc);
  const [selectedOption, setSelectedOption] = useState(inputs?.idProvince);
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
    if (type == "select") {
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
        ) : (
          (type === "input" && (
            <input
              name={name}
              type="text"
              defaultValue={desc}
              onChange={handleChange}
            />
          )) ||
          (type === "input-date" && (
            <input
              name={name}
              type="date"
              defaultValue={desc}
              onChange={handleChange}
            />
          )) ||
          (type === "input-radio" && (
            <InputRadio
              input={inputs}
              setInputs={setInputs}
              desc={desc}
              value={["Nam", "Nữ"]}
              onChange={handleChange}
            />
          )) ||
          (type === "select" && (
            <Select
              name={name}
              options={options}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          ))
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

function InputRadio({ inputs, setInputs, value, name, desc, onChange }) {
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="input-radio">
      <div className="input-radio-item">
        <label htmlFor="">{value[0]}</label>
        <input
          name="sex"
          type="radio"
          defaultChecked={value[0] == desc}
          onChange={handleChange}
          value={value[0]}
        />
      </div>
      <div className="input-radio-item">
        <label htmlFor="">{value[1]}</label>
        <input
          name="sex"
          type="radio"
          defaultChecked={value[1] == desc}
          onChange={handleChange}
          value={value[1]}
        />
      </div>
    </div>
  );
}
