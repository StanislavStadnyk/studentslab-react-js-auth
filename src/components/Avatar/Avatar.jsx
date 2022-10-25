import React, { useEffect, useState } from "react";
import { FormGroup } from "reactstrap";

import { supabase } from "../../services/supabaseClient";

export default function Avatar({ url, size, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  // TODO: image downloads all the time when open the page
  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  const downloadImage = async (path) => {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) throw error;

      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    }
  };

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div aria-live="polite">
      <FormGroup>
        <div className="m-auto" style={{ maxWidth: size }}>
          <img
            src={
              avatarUrl ? avatarUrl : `https://place-hold.it/${size}x${size}`
            }
            alt={avatarUrl ? "Avatar" : "No image"}
            style={{ height: size, width: "100%" }}
          />
        </div>
      </FormGroup>

      <FormGroup>
        {uploading ? (
          "Uploading..."
        ) : (
          <>
            <label className="btn btn-primary btn-block" htmlFor="single">
              Upload an avatar
            </label>
            <div className="d-none">
              <input
                type="file"
                id="single"
                accept="image/*"
                onChange={uploadAvatar}
                disabled={uploading}
              />
            </div>
          </>
        )}
      </FormGroup>
    </div>
  );
}
