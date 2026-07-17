import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {

  const backendUrl = "http://localhost:4000";
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");

  const [bestseller, setBestseller] = useState(false);

  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
  e.preventDefault();

  try {

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("bestseller", bestseller);
    formData.append("sizes", JSON.stringify(sizes));

    image1 && formData.append("image1", image1);
    image2 && formData.append("image2", image2);
    image3 && formData.append("image3", image3);
    image4 && formData.append("image4", image4);

    const response = await axios.post(
      backendUrl + "/api/product/add",
      formData
    );

    if (response.data.success) {

      toast.success(response.data.message);

      setName("");
      setDescription("");
      setPrice("");

      setImage1(false);
      setImage2(false);
      setImage3(false);
      setImage4(false);

      setSizes([]);

      setCategory("Men");
      setSubCategory("Topwear");

      setBestseller(false);

    } else {

      toast.error(response.data.message);

    }

  } catch (error) {

    console.log(error);

    toast.error(error.message);

  }
};

  return (
   <form
  onSubmit={onSubmitHandler}
  className="flex flex-col w-full items-start gap-3">

      <div>
        <p className="mb-2">Upload Images</p>

        <div className="flex gap-2">

          <input
            onChange={(e) => setImage1(e.target.files[0])}
            type="file"
            id="image1"
            hidden
          />
          <label htmlFor="image1">
            <div className="w-24 h-24 border flex items-center justify-center cursor-pointer">
              {image1 ? (
                <img
                  className="w-full h-full object-cover"
                  src={URL.createObjectURL(image1)}
                  alt=""
                />
              ) : (
                <p>Image 1</p>
              )}
            </div>
          </label>

          <input
            onChange={(e) => setImage2(e.target.files[0])}
            type="file"
            id="image2"
            hidden
          />
          <label htmlFor="image2">
            <div className="w-24 h-24 border flex items-center justify-center cursor-pointer">
              {image2 ? (
                <img
                  className="w-full h-full object-cover"
                  src={URL.createObjectURL(image2)}
                  alt=""
                />
              ) : (
                <p>Image 2</p>
              )}
            </div>
          </label>

          <input
            onChange={(e) => setImage3(e.target.files[0])}
            type="file"
            id="image3"
            hidden
          />
          <label htmlFor="image3">
            <div className="w-24 h-24 border flex items-center justify-center cursor-pointer">
              {image3 ? (
                <img
                  className="w-full h-full object-cover"
                  src={URL.createObjectURL(image3)}
                  alt=""
                />
              ) : (
                <p>Image 3</p>
              )}
            </div>
          </label>

          <input
            onChange={(e) => setImage4(e.target.files[0])}
            type="file"
            id="image4"
            hidden
          />
          <label htmlFor="image4">
            <div className="w-24 h-24 border flex items-center justify-center cursor-pointer">
              {image4 ? (
                <img
                  className="w-full h-full object-cover"
                  src={URL.createObjectURL(image4)}
                  alt=""
                />
              ) : (
                <p>Image 4</p>
              )}
            </div>
          </label>

        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>

        <input
          className="w-full max-w-[500px] px-3 py-2 border"
          type="text"
          placeholder="Type here"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>

        <textarea
          className="w-full max-w-[500px] px-3 py-2 border"
          rows={4}
          placeholder="Write content here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Category, Sub Category & Price */}

<div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">

  <div>
    <p className="mb-2">Product Category</p>

    <select
      className="w-full px-3 py-2 border"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value="Men">Men</option>
      <option value="Women">Women</option>
      <option value="Kids">Kids</option>
    </select>
  </div>

  <div>
    <p className="mb-2">Sub Category</p>

    <select
      className="w-full px-3 py-2 border"
      value={subCategory}
      onChange={(e) => setSubCategory(e.target.value)}
    >
      <option value="Topwear">Topwear</option>
      <option value="Bottomwear">Bottomwear</option>
      <option value="Winterwear">Winterwear</option>
    </select>
  </div>

  <div>
    <p className="mb-2">Product Price</p>

    <input
      className="w-full px-3 py-2 border sm:w-[120px]"
      type="number"
      placeholder="25"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
    />
  </div>

</div>

{/* Product Sizes */}

<div>
  <p className="mb-2">Product Sizes</p>

  <div className="flex gap-3">

    {["S", "M", "L", "XL", "XXL"].map((item) => (
      <div key={item} onClick={() =>
        setSizes((prev) =>
          prev.includes(item)
            ? prev.filter((size) => size !== item)
            : [...prev, item]
        )
      }>
        <p
          className={`${
            sizes.includes(item)
              ? "bg-pink-100"
              : "bg-slate-200"
          } px-3 py-1 cursor-pointer`}
        >
          {item}
        </p>
      </div>
    ))}

  </div>
</div>

{/* Bestseller */}

<div className="flex gap-2 mt-2">

  <input
    type="checkbox"
    checked={bestseller}
    onChange={() => setBestseller((prev) => !prev)}
  />

  <p>Add to Bestseller</p>

</div>

<button
  className="w-28 py-3 mt-4 bg-black text-white"
  type="submit"
>
  ADD
</button>

    </form>
  );
};

export default Add;