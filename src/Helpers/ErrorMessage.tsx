
interface ErrorMessageInteface{
    content: string
}

const ErrorMessage = ({content}: ErrorMessageInteface) => {
  return (
    <div id='errorSpan' className='mb-3'>
        {content}
    </div>
  )
}

export default ErrorMessage