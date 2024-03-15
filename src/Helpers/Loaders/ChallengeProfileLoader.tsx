import ContentLoader from 'react-content-loader'

const ProfileLoader = (props: any) => {
  return (
    <ContentLoader
      speed={2}
      width={288}
      height={355}
      backgroundColor={'#ffffff'}
      {...props}
    >
      <rect width='95%' height='100%' />
    </ContentLoader>
  )
}

export default ProfileLoader
