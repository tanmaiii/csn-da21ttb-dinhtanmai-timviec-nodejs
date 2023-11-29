import React, { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import "./infoCompany.scss";
import Select from "../../../components/select/Select";
import { scale } from "../../../config/data";
import { useParams } from "react-router-dom";
import { makeRequest } from "../../../axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Loader from "../../../components/loader/Loader";

export default function InfoCompany() {
  const [company, setCompany] = useState();
  const [err, setErr] = useState();
  const [loading, setLoading] = useState();
  const [edit, setEdit] = useState();
  const [provinces, setProvinces] = useState();
  const { id } = useParams();
  const [inputs, setInputs] = useState();

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
        setErr(error);
      }
    };
    getProvinces();
  }, []);

  const getInfo = async () => {
    try {
      await makeRequest.get("/company/owner/").then((res) => {
        setInputs(res.data);
        setCompany(res.data);
        return res.data;
      });
    } catch (error) {
      toast.error("Lỗi! Vui lòng đăng nhập lại.");
    }
  };

  const { isLoading, error, data } = useQuery(["company"], () => {
    return getInfo();
  });

  return (
    <div className="infoCompany">
      <div className="infoCompany__wrapper">
        <div className="infoCompany__wrapper__header"></div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="infoCompany__wrapper__body">
            <ItemInfoCompany
              edit={edit}
              setEdit={setEdit}
              inputs={inputs}
              handleChange={handleChange}
              name={"nameCompany"}
              title={"Tên công ty"}
              desc={company?.nameCompany}
            />
            <ItemInfoCompany
              edit={edit}
              setEdit={setEdit}
              inputs={inputs}
              handleChange={handleChange}
              name={"nameAdmin"}
              title={"Tên người đại diện"}
              desc={company?.nameAdmin}
            />
            <ItemInfoCompany
              edit={edit}
              setEdit={setEdit}
              inputs={inputs}
              handleChange={handleChange}
              name={"email"}
              title={"Email"}
              desc={company?.email}
            />
            <ItemInfoCompany
              edit={edit}
              setEdit={setEdit}
              inputs={inputs}
              handleChange={handleChange}
              name={"phone"}
              title={"Điện thoại"}
              desc={company?.phone}
            />
            <ItemInfoCompany
              edit={edit}
              setEdit={setEdit}
              inputs={inputs}
              handleChange={handleChange}
              name={"web"}
              title={"Web"}
              desc={company?.web}
            />
            <ItemInfoCompany
              edit={edit}
              setEdit={setEdit}
              inputs={inputs}
              handleChange={handleChange}
              name={"idProvince"}
              title={"Địa chỉ"}
              desc={company?.province}
              select={"province"}
              options={provinces}
            />
            <ItemInfoCompany
              edit={edit}
              setEdit={setEdit}
              inputs={inputs}
              handleChange={handleChange}
              name={"scale"}
              title={"Quy mô"}
              desc={company?.scale}
              select={"scale"}
              options={scale}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function ItemInfoCompany({
  title,
  desc,
  type = "text",
  select,
  options,
  inputs,
  handleChange,
  name,
  edit,
  setEdit,
}) {
  const [selectedOption, setSelectedOption] = useState();
  const queryClient = useQueryClient();

  const putInfo = async () => {
    try {
      await makeRequest.put("/company/update", inputs);
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
        queryClient.invalidateQueries(["company"]);
      },
    }
  );

  const handleSubmitSave = () => {
    if (select == "province") {
      inputs.idProvince = selectedOption?.pId;
    } else if (select == "scale") {
      inputs.scale = selectedOption?.name;
    }
    mutation.mutate();
    setEdit(false);
  };

  return (
    <div className="infoCompany__wrapper__body__item">
      <div className="infoCompany__wrapper__body__item__left">
        <h6>{title}</h6>
        {edit != name ? (
          <span>{desc || "..."}</span>
        ) : select ? (
          <Select
            name={name}
            options={options}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        ) : (
          <input type={type} defaultValue={desc} name={name} onChange={handleChange} />
        )}
      </div>
      <div className="infoCompany__wrapper__body__item__right">
        {edit != name ? (
          <button className="btn-edit" onClick={() => setEdit(name)}>
            Thay đổi
          </button>
        ) : (
          <>
            <button className="btn-save" onClick={() => handleSubmitSave()}>
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
