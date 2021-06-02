const wizardValidations = {
  "full-name": {
    required: true,
    pattern: /[a-zA-Z]{2,} /,
  },
  email: {
    required: true,
    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  "birth-date": {
    required: true,
  },
  city: {
    required: true,
  },
  street: {
    required: true,
  },
  "street-number": {
    required: false,
  },
  image: {
    required: true,
    pattern: /([a-zA-Z0-9\s_\\.\-\(\):])+(.png|.jpeg|.jpg)$/i,
  },
  hobbie: {
    required: false,
    pattern: null,
  },
}

const validateWizardData = ({ target: { value, name } }) => {
  const newErrors = []
  const validations = wizardValidations[name]

  if (validations.pattern && !validations.pattern.test(value)) {
    newErrors.push(`Invalid ${name.replace("-", " ")}`)
  }

  if (validations.required && !value) {
    newErrors.push(`required*`)
  }

  return newErrors
}

const validateDataOnSubmit = (wizardData) => {
  for (const name in wizardValidations) {
    if (name in wizardData) {
      const { value } = wizardData[name]
      const newErrors = validateWizardData({ target: { value, name } })
      if (newErrors.length > 0) return { errors: newErrors, value, name }
    }
  }

  return { errors: [], value: "", name: "" }
}

// const clearState = () => {
//   setWizardData({
//     fullname: {
//       value: "",
//       errors: [],
//     },
//     email: {
//       value: "",
//       errors: [],
//     },
//     birthDate: {
//       value: "",
//       errors: [],
//     },
//   })
// }

// const handleFormSubmit = (e) => {
//   e.preventDefault()

//   const isErrors = validateDataOnSubmit()

//   if (isErrors) return

//   clearState()

//   onNextPhase(wizardData)
// }

export { validateWizardData, validateDataOnSubmit }
