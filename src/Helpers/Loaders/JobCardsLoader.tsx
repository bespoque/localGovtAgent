import ContentLoader from 'react-content-loader'

const JobCardLoader = (props: any) => {
  return (
    <ContentLoader
      speed={2}
      width={'100%'}
      height={93}
      backgroundColor={'#ffffff'}
      {...props}
    >
      <rect x='2' y='12' rx='2' ry='2' width='100%' height='93' />
    </ContentLoader>
  )
}

export default JobCardLoader
