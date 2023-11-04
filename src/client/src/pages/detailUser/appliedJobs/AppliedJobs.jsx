import jobs from "../../../config/jobs";
import './appliedJobs.scss'


export default function AppliedJobs() {
    return (
      <div className="appliedJobs">
        <div className="appliedJobs__wrapper">
          {jobs.map((job, i) => (
            <div key={i} className="appliedJobs__wrapper__item">
              <div className="col pc-9 t-9 m-7">
                <div className="appliedJobs__wrapper__item__left ">
                  <h4 className="appliedJobs__wrapper__item__left__name">
                    {job?.name}
                  </h4>
                  <h5 className="appliedJobs__wrapper__item__left__company">
                    {job?.company}
                  </h5>
                  <div className="appliedJobs__wrapper__item__left__address">
                    <i className="fa-solid fa-location-dot"></i>
                    <span>{job?.address}</span>
                  </div>
                  <div className="appliedJobs__wrapper__item__left__wage">
                    <i className="fa-solid fa-dollar-sign"></i>
                    <span>{job?.wage}</span>
                  </div>
                  <p className="appliedJobs__wrapper__item__left__workingForm">
                    {job?.workingForm}
                  </p>
                </div>
              </div>
              <div className="col pc-3 t-3 m-4">
                <div className="appliedJobs__wrapper__item__right">
                  <span>Trạng thái</span>
                  <button>Đã xem hồ sơ</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }