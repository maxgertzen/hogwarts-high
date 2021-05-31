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

  //set the new email input value
  //set the errors

  return { errors: newErrors, isErrors: newErrors.length > 0 }
}

// const validateDataOnSubmit = () => {
//   for (const name in wizardValidations) {
//     const { value } = wizardData[name]
//     const isErrors = validateWizardData({ target: { value, name } })
//     if (isErrors) return isErrors
//   }
// }

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

export { validateWizardData }
