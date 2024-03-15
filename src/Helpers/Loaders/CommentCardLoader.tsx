import ContentLoader from 'react-content-loader'


const CommentCardLoader = (props: any) => {
  return (
    <ContentLoader 
    speed={2}
    width={"100%"}
    height={150}
    backgroundColor={"#f9f9f9"}
    {...props}
  >
    <rect x="-2" y="34" rx="2" ry="2" width="100vw" height="140" />
  </ContentLoader>
  )
}

export default CommentCardLoader