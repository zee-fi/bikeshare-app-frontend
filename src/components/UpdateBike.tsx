import { useContext, useState, useEffect } from "react";
import { BikeContext } from "../context/bike.context";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../css/form.css";

export default function UpdateBike() {
  const { bikeId } = useParams(); 
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

  const { updateBike, getBikes } = context; 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBike = async () => {
      try {
        const response = await axios.get(`/api/bikes/${bikeId}`);
        const bike = response.data;
        setTitle(bike.title);
        setDescription(bike.description);
        setTags(bike.tags);
        setPrice(bike.price.toString());
        setDeposit(bike.deposit.toString());
        setImageUrl(bike.image);
        setOwner(bike.owner);
      } catch (err) {
        console.error("Error fetching bike details", err);
      }
    };

    if (bikeId) {
      fetchBike();
    }
  }, [bikeId]);

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
      setWaitingForImageUrl(true);

      const url = `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_NAME
      }/upload`;

      const dataToUpload = new FormData();
      dataToUpload.append("file", files[0]);
      dataToUpload.append(
        "upload_preset",
        import.meta.env.VITE_UNSIGNED_UPLOAD_PRESET
      );

      axios
        .post(url, dataToUpload)
        .then((response) => {
          setImageUrl(response.data.secure_url);
          setWaitingForImageUrl(false);
        })
        .catch((error) => {
          console.error("Error uploading the file:", error);
        });
    }
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

    const updatedBikeDetails = {
        title,
        description,
        tags,
        price: parseFloat(price),
        deposit: deposit ? parseFloat(deposit) : 0,
        image: imageUrl,
        owner,
    };

    try {
        
        await updateBike({
            bikeId: bikeId || "", 
            updatedBikeDetails 
        });

        setTitle("");
        setDescription("");
        setTags([]);
        setPrice("");
        setDeposit("");
        setImageUrl("");
        setOwner("");

        await getBikes();
        navigate(`/bikes/${bikeId}`);
    } catch (err) {
        console.log("Could not update bike", err);
        alert("An error occurred while trying to update the bike.");
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
            />
            <label>City Bike</label>
            <input
              type="checkbox"
              value="E Bike"
              checked={tags.includes("E Bike")}
              onChange={handleTagChange}
            />
            <label>E-Bike</label>
            <input
              type="checkbox"
              value="Road Bike"
              checked={tags.includes("Road Bike")}
              onChange={handleTagChange}
            />
            <label>Road Bike</label>
            <input
              type="checkbox"
              value="Touring Bike"
              checked={tags.includes("Touring Bike")}
              onChange={handleTagChange}
            />
            <label>Touring Bike</label>
            <input
              type="checkbox"
              value="Mountain Bike"
              checked={tags.includes("Mountain Bike")}
              onChange={handleTagChange}
            />
            <label>Mountain Bike</label>
            <input
              type="checkbox"
              value="Mens"
              checked={tags.includes("Mens")}
              onChange={handleTagChange}
            />
            <label>Men's</label>
            <input
              type="checkbox"
              value="Womens"
              checked={tags.includes("Womens")}
              onChange={handleTagChange}
            />
            <label>Women's</label>
            <input
              type="checkbox"
              value="Unisex"
              checked={tags.includes("Unisex")}
              onChange={handleTagChange}
            />
            <label>Unisex</label>
            <input
              type="checkbox"
              value="Kids"
              checked={tags.includes("Kids")}
              onChange={handleTagChange}
            />
            <label>Kids</label>
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
          Update Bike
        </button>
      </form>
    </>
  );
}
