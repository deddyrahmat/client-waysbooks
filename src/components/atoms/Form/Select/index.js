import { useState, useEffect, memo } from "react";
import { useField } from "formik";

function Select({
    name,
    options,
    disabled,
    notifWarning,
    event,
    className,
    ...otherProps
}) {
    const [field, mata] = useField(name);

    const [notifError, setNotifError] = useState("text-red-900");

    const configTextfield = {
        ...field,
        ...otherProps,
    };

    const [status, setStatus] = useState(
        " relative block text-black focus-within:text-gray-600"
    );

    useEffect(() => {
        // jika ada custom color dari notif error/warning, set datanya
        if (notifWarning) {
            setNotifError("text-black");
        }

        // kondisi styling form dalam status disabled
        if (disabled) {
            setStatus("disabled");
        } else {
            setStatus("relative block text-black focus-within:text-gray-600");
        }

        if (mata && mata.touched && mata.error) {
            setStatus("relative error");
        }
    }, [disabled]);

    // console.log("amta", mata)

    return (
        <>
            <label className={status}>
                <select
                    name={name}
                    className={className}
                    disabled={disabled}
                    {...configTextfield}
                >
                    <option value="">- - -</option>
                    {options?.map((opt) => (
                        <option
                            key={opt.id}
                            value={opt.value}
                            label={opt.label}
                        />
                    ))}
                </select>
            </label>

            {mata && mata.touched && mata.error ? (
                <p className={`text-sm ${notifError} py-2`}>{mata.error}</p>
            ) : null}
        </>
    );
}

export default memo(Select);
