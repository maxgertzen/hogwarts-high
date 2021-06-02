function FormErrorMessages({ errors }) {
  return (
    <div className={`errors-container ${errors.length > 1 ? 'multipleErr' : ''} d-flex flex-nowrap`}>
      {
        errors ?
          errors.map((error, idx) => {
            return (
              <small
                className="form-text text-danger text-capitalize"
                key={idx}
              >
                {error}
              </small>
            )
          })
          :
          null
      }
    </div>
  )
}

export default FormErrorMessages

