import React, { useState, useEffect, useRef } from "react";
import "./modalCropImage.scss";
import Cropper from "react-easy-crop";
import { makeRequest } from "../../axios";
import { useAuth } from "../../context/authContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

//import img from "../../assets/images/logoJobQuest.png";

//const CROP_AREA_ASPECT = 2 / 2;


export default function ModalCropImage({ openModal, setOpenModal }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [img, setImg] = useState();
  const [croppedImage, setCroppedImage] = useState(null);
  const { currentCompany, currentUser } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const modalCropImageRef = useRef();

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleInputImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type && file.type.startsWith('image/')) {
        // File là hình ảnh, xử lý tại đây
        file.preview = URL.createObjectURL(file);
        setImg(file.preview);
      } else {
        toast.error('Chỉ chấp nhận các tệp hình ảnh.');
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const croppedImage = await getCroppedImg(img, croppedAreaPixels, rotation);
      setCroppedImage(croppedImage);

      console.log(croppedImage);

      const formData = new FormData();
      formData.append("file", croppedImage);
      const postImage = await makeRequest.post("/upload", formData);

      currentCompany
        ? await makeRequest.put("/company/uploadImage", {
            avatarPic: postImage.data,
          })
        : await makeRequest.put("/user/uploadImage", {
            avatarPic: postImage.data,
          });

      toast.success("Thay đổi ảnh đại diện thành công.");
      setOpenModal(false);
      setImg(null);
    } catch (e) {
      toast.error("Ảnh không hợp lệ vui lòng thử lại !");
    }
  };

  const mutationSubmit = useMutation(
    () => {
      return handleSubmit();
    },
    {
      onSuccess: () => {
        currentCompany
          ? queryClient.invalidateQueries(["company"])
          : queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleClickCancel = () => {
    setImg(null);
    setOpenModal(false);
  };

  useEffect(() => {
    const handleMousedown = (e) => {
      if (!modalCropImageRef.current.contains(e.target)) {
        setOpenModal(false);
      }
    };
    document.addEventListener("mousedown", handleMousedown);
    return () => document.removeEventListener("mousedown", handleMousedown);
  });

  useEffect(() => {
    if (openModal === true) {
      document.body.style.overflow = "hidden";
    }
    if (openModal === false) {
      document.body.style.overflow = "unset";
    }
  }, [openModal]);

  return (
    <div className={`modalCropImage ${openModal ? "active" : ""}`}>
      <div ref={modalCropImageRef} className="modalCropImage__wrapper">
        <div className="modalCropImage__wrapper__header">
          <h2>Thay đổi ảnh đại diện</h2>
          <button onClick={() => handleClickCancel()}>
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="modalCropImage__wrapper__body">
          <div className="modalCropImage__wrapper__body__image">
            {img ? (
              <Cropper
                image={img}
                aspect={1}
                crop={crop}
                zoom={zoom}
                cropShape="round"
                rotation={rotation}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                onCropAreaChange={setCroppedArea}
              />
            ) : (
              <div className="modalCropImage__wrapper__body__image__input">
                <label htmlFor="input-modal-image">
                  <i className="fa-solid fa-upload"></i>
                  <span>Tải ảnh lên</span>
                  <input
                    id="input-modal-image"
                    type="file"
                    name="file"
                    onChange={(e) => handleInputImg(e)}
                  />
                </label>
              </div>
            )}
          </div>
          {img && (
            <div className="modalCropImage__wrapper__body__controls">
              <h4>Phóng to :</h4>
              <div className="modalCropImage__wrapper__body__controls__zoom">
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => {
                    setZoom(e.target.value);
                  }}
                  className="zoom-range"
                />
              </div>
              <h4>Xoay :</h4>
              <div className="modalCropImage__wrapper__body__controls__rotation">
                <input
                  type="range"
                  value={rotation}
                  min={0}
                  max={360}
                  step={1}
                  aria-labelledby="Zoom"
                  onChange={(e) => {
                    setRotation(e.target.value);
                  }}
                  className="zoom-range"
                />
              </div>
            </div>
          )}
        </div>
        <div className="modalCropImage__wrapper__bottom">
          <button className="btn-cancel" onClick={() => handleClickCancel()}>
            Hủy
          </button>
          <button className="btn-submit" onClick={() => mutationSubmit.mutate()}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}

export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

export function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}
/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width, height, rotation) {
  const rotRad = getRadianAngle(rotation);

  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}
/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
async function getCroppedImg(
  imageSrc,
  pixelCrop,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  const rotRad = getRadianAngle(rotation);

  // calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation);

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  // draw rotated image
  ctx.drawImage(image, 0, 0);

  const croppedCanvas = document.createElement("canvas");

  const croppedCtx = croppedCanvas.getContext("2d");

  if (!croppedCtx) {
    return null;
  }

  // Set the size of the cropped canvas
  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  // Draw the cropped image onto the new canvas
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // As Base64 string
  //return croppedCanvas.toDataURL('image/jpeg')

  // As a blob
  return new Promise((resolve, reject) => {
    croppedCanvas.toBlob((file) => {
      resolve(file);
    }, "image/jpeg");
  });
}
