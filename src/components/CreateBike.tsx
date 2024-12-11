import { useContext, useState } from "react"
import { BikeContext } from "../context/bike.context";
import { useNavigate } from "react-router-dom";

export default function CreateBike () {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [price, setPrice] = useState("");
    const [deposit, setDeposit] = useState("");
    const [image, setImage] = useState("");
    const [owner, setOwner] = useState("");

    const context = useContext(BikeContext);
    if (!context) {
      throw new Error("BikeContext must be used within a BikeProvider.");
    }
  
    const { createBike } = context;    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!title || !description || !tags || !price || !image) {
            alert("Please fill in all required fields.")
            return;
        }

        const bikeDetails = {
            title: title, 
            description: description,
            tags: tags,
            price: price,
            deposit: deposit,
            image: image,
            owner: owner,
        };

        try {
            await createBike(Promise.resolve(bikeDetails));

            setTitle("");
            setDescription("");
            setTags("");
            setPrice("");
            setDeposit("");
            setImage("");
            setOwner("");

            navigate('/bikes');
        }
        catch (err) {
            console.log("could not create bike", err);
            alert("An error occurred while trying to add a new bike.")
        } 
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            <fieldset>
                <div>
                    <input type="checkbox" value={tags} onChange={(e) => setTags(e.target.value)} />
                    <label>City Bike</label>
                    <input type="checkbox" value={tags} onChange={(e) => setTags(e.target.value)} />
                    <label>E-Bike</label>
                    <input type="checkbox" value={tags} onChange={(e) => setTags(e.target.value)} />
                    <label>Road Bike</label>
                    <input type="checkbox" value={tags} onChange={(e) => setTags(e.target.value)} />
                    <label>Touring Bike</label>
                    <input type="checkbox" value={tags} onChange={(e) => setTags(e.target.value)} />
                    <label>Mountain Bike</label>
                    <input type="checkbox" value={tags} onChange={(e) => setTags(e.target.value)} />
                    <label>Men's</label>
                    <input type="checkbox" value={tags} onChange={(e) => setTags(e.target.value)} />
                    <label>Women's</label>
                    <input type="checkbox" value={tags} onChange={(e) => setTags(e.target.value)} />
                    <label>Unisex</label>
                    <input type="checkbox" value={tags} onChange={(e) => setTags(e.target.value)} />
                    <label>Kids</label>
                </div>
            </fieldset>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            <input type="deposit" value={deposit} onChange={(e) => setDeposit(e.target.value)} />
            <input type="img" value={image} onChange={(e) => setImage(e.target.value)} />
            <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} />
        </form>
        </>
    )
}