import React, { useEffect, useState } from "react";
import "./listJobCol.scss";
//import ItemJob from "../../components/itemJob/ItemJob";
import { makeRequest, apiImage } from "../../axios";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/images/avatarCpn.png";
import { useAuth } from "../../context/authContext";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "react-query";
import PropTypes from 'prop-types'

export default function ListJobCol({ name, nameField, idField, idJob }) {
  const [jobs, setJobs] = useState();
  const limit = 6;
  const paginate = 1;
  const navigate = useNavigate()

  useEffect(() => {
    if (idField) {
      const getJob = async () => {
        try {
          const res = await makeRequest.get(`job/field/${idField}?page=${paginate}&limit=${limit}`);
          setJobs(res.data.data);
        } catch (error) {}
      };
      getJob();
    }
  }, [idField]);


  return (
    jobs?.length > 1 && (
      <div className="listJobCol">
        <div className="listJobCol__wrapper">
          <div className="listJobCol__wrapper__header">
            <h4>{name}</h4>
          </div>
          <div className="listJobCol__wrapper__body">
            {jobs?.map((job, i) => {
              if (job?.id === idJob) return;
              return <ItemJob key={i} job={job} className={"col pc-12"} />;
            })}
          </div>
          <div className="listJobCol__wrapper__bottom">
            <button onClick={() => navigate(`/tim-kiem?&field[]=${nameField}`)}>
              <h4>Xem thêm</h4>
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </div>
        </div>
      </div>
    )
  );
}

function ItemJob({ job }) {
  const { currentUser } = useAuth();
  const [userSave, setUserSave] = useState();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const getUserSave = async () => {
    try {
      const res = await makeRequest.get(`save/user?idJob=${job.id}`);
      setUserSave(res.data);
    } catch (error) {}
  };

  const { isLoading, error, data } = useQuery(["save", job.id], () => {
    return getUserSave();
  });

  const mutationSave = useMutation(
    (saved) => {
      if (saved) return makeRequest.delete("/save?idJob=" + job?.id);
      return makeRequest.post("/save?idJob=" + job?.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["save"]);
      },
    }
  );

  const handleSubmitSave = () => {
    if (!currentUser) return navigate("/dang-nhap/nguoi-dung");
    mutationSave.mutate(userSave?.includes(currentUser?.id));
    userSave?.includes(currentUser?.id)
      ? toast.success("Đã gỡ khỏi việc làm yêu thích.", {
          action: {
            label: "Việc làm",
            onClick: () => navigate(`/nguoi-dung/${currentUser?.id}/jobs`),
          },
        })
      : toast.success("Đã thêm vào việc làm yêu thích.", {
          action: {
            label: "Việc làm",
            onClick: () => navigate(`/nguoi-dung/${currentUser?.id}/jobs`),
          },
        });
  };

  return (
    <div className="col__itemJob">
      <div className="col__itemJob__wrapper">
        <div className="header">
          <img src={job?.avatarPic ? apiImage + job?.avatarPic : img} alt="" />
          <div className="text">
            <Link to={`/viec-lam/${job?.id}`}>
              <h4 className="nameJob" data-tooltip={job?.nameJob}>
                {job?.nameJob}
              </h4>
              <span className={`tooltip`} data-tooltip={job?.nameJob}>
                {job?.nameJob}
              </span>
            </Link>
            <Link to={`/nha-tuyen-dung/${job?.idCompany}`}>
              <h6 className="nameCompany">{job?.nameCompany}</h6>
            </Link>
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <div className="wage">
              <i className="fa-solid fa-dollar-sign"></i>
              <span>
                {job?.salaryMax === 0 && job?.salaryMin === 0
                  ? "Thảo thuận"
                  : `${job?.salaryMin} - ${job?.salaryMax} triệu`}
              </span>
            </div>
            {/* <div className="typeWork">
              <span>{job?.typeWork}</span>
            </div> */}
            <div className="province">
              <i className="fa-solid fa-location-dot"></i>
              <span>{job?.province}</span>
            </div>
          </div>

          <button className="button__save" onClick={() => handleSubmitSave()}>
            {userSave?.includes(currentUser?.id) ? (
              <i class="fa-solid fa-heart"></i>
            ) : (
              <i class="fa-regular fa-heart"></i>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

ListJobCol.propTypes = {
  name: PropTypes.string,
  nameField: PropTypes.string,
  idField: PropTypes.number,
  idJob: PropTypes.number,
}

ItemJob.propTypes = {
  job: PropTypes.object
}