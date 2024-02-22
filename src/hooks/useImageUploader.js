import { useState } from "react";
import { useToast } from "@chakra-ui/react";

const useImageUploader = () => {
  const [picLoading, setPicLoading] = useState(false);
  const [pic, setPic] = useState(null);
  const toast = useToast();

  const postDetails = (pics) => {
    setPicLoading(true);

    if (pics === undefined) {
      showWarningToast("Please select an image");
      setPicLoading(false);
      return;
    }

    if (pics.type === "image/jpg" || pics.type === "image/jpeg") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dxkvnmbtd");

      fetch("https://api.cloudinary.com/v1_1/dxkvnmbtd/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      showWarningToast("Please select a valid image (jpg/jpeg)");
      setPicLoading(false);
    }
  };

  const showWarningToast = (message) => {
    toast({
      title: message,
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  };

  return { picLoading, pic, postDetails, setPic };
};

export default useImageUploader;
