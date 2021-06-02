function FormErrorMessages({ errors }) {
  return (
    <div className="errors-container d-flex flex-nowrap">
      {errors.map((error, idx) => {
        return (
          <small
            className="form-text text-danger"
            key={idx}
          >
            {error}
          </small>
        )
      })}
    </div>
  )
}

export default FormErrorMessages
