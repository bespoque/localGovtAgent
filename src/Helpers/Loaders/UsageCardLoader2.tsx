import ContentLoader from 'react-content-loader'

const UsageCardLoader = (props: any) => {
  return (
    <ContentLoader
      speed={2}
      width='100%'
      height={400}
      backgroundColor={'#ffffff'}
      {...props}
      // className="log-card"
    >
      <rect x='-2' y='2' rx='2' ry='2' width='100%' height='400px' />
    </ContentLoader>
  )
}

export default UsageCardLoader
