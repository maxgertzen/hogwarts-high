const wizardValidations = {
  fullname: {
    required: true,
    pattern: /[a-zA-Z]{2,} /,
  },
  email: {
    required: true,
    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  birthDate: {
    required: true,
  },
}

const validateWizardData = ({ target: { value, name } }) => {
  const newErrors = []
  const validations = wizardValidations[name]

  if (validations.required && !value) {
    newErrors.push(`${name} is required`)
  }

  if (validations.pattern && !validations.pattern.test(value)) {
    newErrors.push(`Invalid ${name} value`)
  }

  return newErrors
}

const validateDataOnSubmit = (wizardData) => {
  for (const name in wizardValidations) {
    const { value } = wizardData[name]
    const newErrors = validateWizardData({ target: { value, name } })
    if (newErrors.length > 0) return { errors: newErrors, value, name }
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
