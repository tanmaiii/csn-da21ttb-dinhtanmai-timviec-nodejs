import React from "react";
import "./itemCandidate.scss";

export default function ItemCandidate() {
  return (
    <tr className="itemCandidate">
      <td width={"1%"}></td>
      <td width={"29%"}>
        <div>
          <h6>Tên</h6>
          <span>Đinh Tấn Mãi</span>
        </div>
        <div>
          <h6>Email</h6>
          <span>tanmai833@gmail.com</span>
        </div>
        <div>
          <h6>SDT</h6>
          <span>0123128312</span>
        </div>
      </td>
      <td  width={"10%"}>27/10/2004</td>
      <td width={"15%"}>
        <select name="" id="">
          <option value="">Đã xem</option>
          <option value="">Đã xem</option>
          <option value="">Đã xem</option>
          <option value="">Đã xem</option>
          <option value="">Đã xem</option>
        </select>
      </td>
      <td width={"30%"}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </td>
      <td  width={"15%"}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </td>
    </tr>
  );
}
