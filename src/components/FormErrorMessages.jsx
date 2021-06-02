function FormErrorMessages({ errors }) {
  return (
    <>
      {
        errors ?
          <div className={`errors-container ${errors.length > 1 ? 'multipleErr' : ''} d-flex flex-nowrap`}>
            {errors.map((error, idx) => {
              return (
                <small
                  className="form-text text-danger text-capitalize"
                  key={idx}
                >
                  {error}
                </small>
              )
            })}
          </div >
          :
          <div className="errors-container"></div>
      }
    </>
  )
}

export default FormErrorMessages

