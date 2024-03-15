import ContentLoader from 'react-content-loader'

const ChallengeLoader = (props: any) => {
  return (
    <ContentLoader
      speed={2}
      width={'100%'}
      height={300}
      backgroundColor={'#ffffff'}
      {...props}
    >
      <rect x='2' y='34' rx='2' ry='2' width='100%' height='250' />
      <rect x='2' y='284' rx='2' ry='2' width='100%' height='250' />
      <rect x='2' y='534' rx='2' ry='2' width='100%' height='250' />
    </ContentLoader>
  )
}

export default ChallengeLoader
