import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import "./infoUser.scss";
import Select from "../../../components/select/Select";
import { useAuth } from "../../../context/authContext";
import { useParams } from "react-router-dom";
import { makeRequest } from "../../../axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function InfoUser() {
  const { currentUser } = useAuth();
  const [user, setUser] = useState();
  const [provinces, setProvinces] = useState();
  const [edit, setEdit] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    birthDay: "",
    sex: "",
    email: "",
    phone: "",
    idProvince: "",
    linkSocial: "",
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
      } catch (error) {}
    };
    getProvinces();
  }, []);

  useEffect(() => {
    if (parseInt(currentUser?.id) !== parseInt(id)) return navigate("/dang-nhap/nguoi-dung");
  }, []);

  const { isLoading, error, data } = useQuery(["user", id], async () => {
    await makeRequest.get("/user/owner/").then((res) => {
      setInputs({
        name: res.data.name,
        birthDay: res.data.birthDay,
        sex: res.data.sex,
        email: res.data.email,
        phone: res.data.phone,
        idProvince: res.data.idProvince,
        linkSocial: res.data.linkSocial,
      });
      setUser(res.data);
      return res.data;
    });
  });

  return (
    <div className="infoUser">
      <div className="infoUser__wrapper">
        <ItemInfo
          edit={edit}
          setEdit={setEdit}
          inputs={inputs}
          handleChange={handleChange}
          name="name"
          title={"Tên"}
          desc={user?.name}
        />
        <ItemInfo
          edit={edit}
          setEdit={setEdit}
          inputs={inputs}
          name="birthDay"
          handleChange={handleChange}
          title={"Ngày sinh :"}
          desc={user?.birthDay ? moment(user?.birthDay).format("DD/MM/YYYY") : null}
          type={"input-date"}
        />
        <ItemInfo
          edit={edit}
          setEdit={setEdit}
          inputs={inputs}
          name="sex"
          setInputs={setInputs}
          handleChange={handleChange}
          title={"Giới tính :"}
          desc={user?.sex}
          type={"input-radio"}
        />
        <ItemInfo
          edit={edit}
          setEdit={setEdit}
          inputs={inputs}
          name="email"
          handleChange={handleChange}
          title={"Email :"}
          desc={user?.email}
        />
        <ItemInfo
          edit={edit}
          setEdit={setEdit}
          inputs={inputs}
          name="linkSocial"
          handleChange={handleChange}
          title={"Liên kết facebook :"}
          desc={user?.linkSocial}
        />
        <ItemInfo
          edit={edit}
          setEdit={setEdit}
          inputs={inputs}
          name="phone"
          handleChange={handleChange}
          title={"Số điện thoại :"}
          desc={user?.phone}
        />
        <ItemInfo
          edit={edit}
          setEdit={setEdit}
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
  options,
  handleChange,
  setInputs,
  inputs,
  edit,
  setEdit,
}) {
  const [selectedOption, setSelectedOption] = useState(inputs?.idProvince);
  const { id } = useParams();
  const queryClient = useQueryClient();

  const putInfo = async () => {
    try {
      await makeRequest.put("/user/update", inputs);
      toast.success("Cập nhật thông tin thành công.");
    } catch (error) {
      toast.error(error?.response?.data);
    }
  };

  const mutation = useMutation(
    () => {
      return putInfo();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
      onError: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleSumbit = () => {
    if (type == "select") {
      inputs.idProvince = selectedOption?.pId;
    }
    setEdit();
    mutation.mutate();
  };

  return (
    <div className="personalInformation__wrapper__item">
      <div className="personalInformation__wrapper__item__left">
        <h6>{title}</h6>
        {edit != name ? (
          <span>{desc || "..."}</span>
        ) : (
          (type === "input" && (
            <input name={name} type="text" defaultValue={desc} onChange={handleChange} />
          )) ||
          (type === "input-date" && (
            <input name={name} type="date" defaultValue={desc} onChange={handleChange} />
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
        {edit != name ? (
          <button className="btn-edit" onClick={() => setEdit(name)}>
            <i className="fa-solid fa-pen-to-square"></i>
            <span>Chỉnh sửa</span>
          </button>
        ) : (
          <>
            <button className="btn-save" onClick={() => handleSumbit()}>
              Lưu
            </button>
            <button className="btn-cancel" onClick={() => setEdit()}>
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
        <input
          name="sex"
          type="radio"
          defaultChecked={value[0] == desc}
          onChange={handleChange}
          value={value[0]}
        />
        <label htmlFor="">{value[0]}</label>
      </div>
      <div className="input-radio-item">
        <input
          name="sex"
          type="radio"
          defaultChecked={value[1] == desc}
          onChange={handleChange}
          value={value[1]}
        />
        <label htmlFor="">{value[1]}</label>
      </div>
    </div>
  );
}
