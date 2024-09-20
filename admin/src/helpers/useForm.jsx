import { useState, useCallback } from "react";

const useForm = (initialState, validate) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  // Set form data and errors
  const setDataAndErrors = useCallback(
    (data) => {
      setFormData(data);
      const newErrors = validate(data);
      setErrors(newErrors);
    },
    [validate]
  );

  // Change input handler
  const changeHandler = useCallback(
    (e, positionId = null, projectId = null) => {
      const { name, value, type, checked, files, tagName } = e.target;

      let updatedData;

      if (positionId !== null) {
        updatedData = {
          ...formData,
          positions: formData.positions.map((pos) =>
            pos._id === positionId
              ? projectId !== null
                ? {
                    ...pos,
                    projects: pos.projects.map((proj) =>
                      proj._id === projectId ? { ...proj, [name]: value } : proj
                    ),
                  }
                : { ...pos, [name]: type === "checkbox" ? checked : value }
              : pos
          ),
        };
      } else {
        updatedData = {
          ...formData,
          [name]: {
            ...formData[name],
            value:
              tagName === "INPUT" && type === "checkbox"
                ? checked
                : tagName === "INPUT" && type === "file"
                ? files
                : value,
            touched: true,
          },
        };
      }

      setDataAndErrors(updatedData);
    },
    [setDataAndErrors, formData]
  );

  return {
    formData,
    errors,
    changeHandler,
    setErrors,
    setFormData,
  };
};

export default useForm;
