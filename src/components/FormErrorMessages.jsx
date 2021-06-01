function FormErrorMessages({ errors }) {
  return (
    <>
      {errors.map((error, idx) => {
        return (
          <small
            className="form-text text-danger d-flex align-items-start"
            key={idx}
          >
            {error}
          </small>
        )
      })}
    </>
  )
}

export default FormErrorMessages
