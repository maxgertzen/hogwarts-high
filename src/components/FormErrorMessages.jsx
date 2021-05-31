function FormErrorMessages({ errors }) {
  return (
    <small className="form-text text-danger d-flex align-items-start">
      {errors[0]}
    </small>
  )
}

export default FormErrorMessages
