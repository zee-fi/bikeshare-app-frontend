import { useContext, useState } from "react";
import { BikeContext } from "../context/bike.context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/form.css";

export default function CreateBike() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [price, setPrice] = useState("");
  const [deposit, setDeposit] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [owner, setOwner] = useState("");

  const [waitingForImageUrl, setWaitingForImageUrl] = useState(false);

  const context = useContext(BikeContext);
  if (!context) {
    throw new Error("BikeContext must be used within a BikeProvider.");
  }

  const { createBike, getBikes } = context;
  const navigate = useNavigate();

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTags((prevTags) =>
      e.target.checked
        ? [...prevTags, value]
        : prevTags.filter((tag) => tag !== value)
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      console.log("Selected file:", files[0]);
    } else {
      return;
    }

    setWaitingForImageUrl(true);

    console.log("The file to be uploaded is: ", files[0]);

    const url = `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_NAME
    }/upload`;
    console.log("Cloudinary Name:", import.meta.env.VITE_CLOUDINARY_NAME);
    console.log("Upload Preset:", import.meta.env.VITE_UNSIGNED_UPLOAD_PRESET);
    
    const dataToUpload = new FormData();
    dataToUpload.append("file", files[0]);
    dataToUpload.append(
      "upload_preset",
      import.meta.env.VITE_UNSIGNED_UPLOAD_PRESET
    );

    axios
      .post(url, dataToUpload)
      .then((response) => {
        console.log("RESPONSE ", response.data);
        setImageUrl(response.data.secure_url);
        setWaitingForImageUrl(false);
      })
      .catch((error) => {
        console.error("Error uploading the file:", error);
      });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    

    if (
      !title.trim() ||
      !description.trim() ||
      tags.length === 0 ||
      !price.trim() ||
      !imageUrl.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const bikeDetails = {
      title: title,
      description: description,
      tags: tags,
      price: parseFloat(price),
      deposit: deposit ? parseFloat(deposit) : 0,
      image: imageUrl,
      owner: owner,
    };
    console.log("Bike Details:", bikeDetails);

    try {
      await createBike(bikeDetails);

      setTitle("");
      setDescription("");
      setTags([]);
      setPrice("");
      setDeposit("");
      setImageUrl("");
      setOwner("");

      await getBikes();
      navigate("/bikes");
      
    } catch (err) {
      console.log("could not create bike", err);
      alert("An error occurred while trying to add a new bike.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Title* </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description of your bike* </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <fieldset>
          <label>Select relevant tags* </label>
          <div>
            <input
              type="checkbox"
              value="City Bike"
              checked={tags.includes("City Bike")}
              onChange={handleTagChange}
            /><label>City Bike</label>
            <input
              type="checkbox"
              value="E Bike"
              checked={tags.includes("E Bike")}
              onChange={handleTagChange}
            /><label>E-Bike</label>
            <input
              type="checkbox"
              value="Road Bike"
              checked={tags.includes("Road Bike")}
              onChange={handleTagChange}
            /><label>Road Bike</label>
            <input
              type="checkbox"
              value="Touring Bike"
              checked={tags.includes("Touring Bike")}
              onChange={handleTagChange}
            /><label>Touring Bike</label>
            <input
              type="checkbox"
              value="Mountain Bike"
              checked={tags.includes("Mountain Bike")}
              onChange={handleTagChange}
            /><label>Mountain Bike</label>
            <input
              type="checkbox"
              value="Mens"
              checked={tags.includes("Mens")}
              onChange={handleTagChange}
            /><label>Men's</label>
            <input
              type="checkbox"
              value="Womens"
              checked={tags.includes("Womens")}
              onChange={handleTagChange}
            /><label>Women's</label>
            <input
              type="checkbox"
              value="Unisex"
              checked={tags.includes("Unisex")}
              onChange={handleTagChange}
            /><label>Unisex</label>
            <input
              type="checkbox"
              value="Kids"
              checked={tags.includes("Kids")}
              onChange={handleTagChange}
            /><label>Kids</label>
          </div>
        </fieldset>
        <label>Price* </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label>Deposit</label>
        <input
          type="number"
          value={deposit}
          onChange={(e) => setDeposit(e.target.value)}
        />
        <label>Image</label>
        <input type="file" onChange={(e) => handleFileUpload(e)} />
        <label>Owner</label>
        <input
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
        <button type="submit" disabled={waitingForImageUrl}>
          Submit
        </button>
      </form>
    </>
  );
}
