import ContentLoader from 'react-content-loader'

const CardLoader = (props: any) => {
  return (
    <ContentLoader
      speed={2}
      width={'100%'}
      height={170}
      backgroundColor={'#ffffff'}
      {...props}
    >
      <rect x='' y='' rx='' ry='' width='100%' height='157' />
    </ContentLoader>
  )
}

export default CardLoader
