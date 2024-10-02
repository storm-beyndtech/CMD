//handle input changes
export const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setFormValues: React.Dispatch<React.SetStateAction<any>>,
) => {
  const { id, value, checked } = e.target;

  setFormValues((prev: any) => {
    if (id === "terms") {
      return {
        ...prev,
        terms: checked,
      };
    } else if (id === "stayLoggedIn" || id === "isPrimaryAddress") {
      return {
        ...prev,
        [id]: checked,
      };
    } else if (id === "phoneNumber") {
      const cleanedValue = value.replace(/\D/g, "");
      return {
        ...prev,
        [id]: cleanedValue,
      };
    } else {
      return {
        ...prev,
        [id]: value,
      };
    }
  });
};
