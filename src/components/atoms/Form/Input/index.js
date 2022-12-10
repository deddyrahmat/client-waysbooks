import { useState, useEffect, memo } from "react";
import { useField } from "formik";

function Input({
  name,
  iconRight,
  disabled,
  notifWarning,
  propsClassName,
  ...otherProps
}) {
  const [field, mata] = useField(name);

  const configTextfield = {
    ...field,
    ...otherProps,
  };

  const [notifError, setNotifError] = useState("text-red-900");

  const [status, setStatus] = useState(
    " relative block text-black focus-within:text-gray-600"
  );

  // function menampilkan image icon di sebelah kanan form. contoh di form password
  const imageRight = () => {
    // jika icon dikanan ada tampilkan
    if (iconRight !== undefined) {
      return <div>
        {iconRight}
    </div>
    }
  };

  useEffect(() => {
    // kondisi styling form dalam status disabled
    if (disabled) {
      setStatus("disabled");
    } else {
      setStatus(
        "relative block text-black focus-within:text-gray-600"
      );
    }

    if (mata && mata.touched && mata.error) {
      setStatus("relative error");
    }

    imageRight();

    // jika ada custom color dari notif error/warning, set datanya
    if (notifWarning) {
      setNotifError("text-black");
    }
  }, [ imageRight, disabled]);

  // console.log("amta", mata)

  return (
    <>
      <label className={status}>

        <input
          name={name}
          className={propsClassName}
          disabled={disabled}
          {...configTextfield}
        />

        {imageRight()}
      </label>

      {mata && mata.touched && mata.error ? (
        <p className={`text-sm ${notifError} py-2`}>
          {mata.error}
        </p>
      ) : null}
    </>
  );
}

export default memo(Input);