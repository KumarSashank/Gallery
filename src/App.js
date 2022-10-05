import "./App.css";
import logo from "./logo.svg";
import letter from "./letter_logo.svg";
import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import { UilUpload } from "@iconscout/react-unicons";

function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = ["image/png", "image/jpeg"];

  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setImageUpload(selected);
      setError("");
    } else {
      setImageUpload(null);
      setError("Please select an image file (png or jpg)");
    }
  };

  const imagesListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="logo1">
            <img src={logo} alt="" />
          </div>
          <div className="logo2">
            <img src={letter} alt="" />
          </div>
        </div>
      </div>
      <div className="gallery_container">
        <div className="upload">
          {/* <span className="upload_button">
            <input
              type="file"
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
              // style={{ display: "none" }}
            />
            Select a file
          </span>
          <button onClick={uploadFile}> Upload Image</button> */}
          <label>
            <input
              type="file"
              onChange={handleChange}
              style={{ display: "none" }}
            />
            <span id="select">Select Image</span>
          </label>
          <button onClick={uploadFile}>Upload</button>
        </div>
        {/* <input
        ref="fileInput"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
        type="file"
        
        // multiple={false}1
      /> */}
        <div className="gallery_pics">
          {/* <button onClick={() => this.refs.fileInput.click()}>Upload File</button> */}
          {imageUrls.map((url) => {
            return (
              <div className="img_container">
                <div className="img_gallerY">
                  <img classname="gallery" src={url} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
